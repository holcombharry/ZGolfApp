import React, { useState, useMemo, useEffect } from 'react';
import { useRoute } from '@react-navigation/native';

import { ScrollView, Alert } from 'react-native';
import { Heading } from "@/components/ui/heading";
import { Box } from "@/components/ui/box";
import { Card } from '@/components/ui/card';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Avatar, AvatarFallbackText } from '@/components/ui/avatar';
import { Button, ButtonIcon, ButtonText } from '@/components/ui/button';
import AddScoreModal from '../components/AddScoreModal';
import { Score } from '../types/scorecard.types';
import { updateRoundById } from '@/api/apiService';
import { useRounds } from '../../hooks/RoundsContext';
import { calculateStrokeScore, calculateMatchScore } from '../utils/matchUtils';
import { User } from '../types/user.types';
import { ChevronLeftIcon, ChevronRightIcon } from '@/components/ui/icon';

const RoundScreen: React.FC = () => {
    const route = useRoute();

    const [round, setRound] = useState(route.params.round);
    const [showAddScoreModal, setShowAddScoreModal] = useState(false);
    const [scoreHole, setScoreHole] = useState(round.currentHole);

    const [inputScores, setInputScores] = useState<number[]>(() =>
    round.scorecard.map((entry: Score) => {
        const scoreForHole = entry.score[scoreHole - 1] ?? 0;
        return scoreForHole;
        })
    );

    useEffect(() => {
        setInputScores(
            round.scorecard.map((entry: Score) => {
                const scoreForHole = entry.score[scoreHole - 1] ?? 0;
                return scoreForHole;
            })
        );
    }, [scoreHole, round.scorecard]);

    const updatedScorecard = useMemo(() => {
        let matchPlayScores: number[] = [];

        if (round.matchType === 'Match Play') {
            const allScores = round.scorecard.map((score: Score) => score.score);
            matchPlayScores = calculateMatchScore(...allScores);
        }
        
        return round.scorecard.map((score: Score, index: number) => ({
        ...score,
        matchScore:
            round.matchType === 'Stroke Play'
                ? calculateStrokeScore(score.score, round.course.scorecard)
                : matchPlayScores[index] ?? 0
        }));
    }, [round.scorecard, round.course.scorecard, round.matchType]);
    
    // Use updatedScorecard directly instead of updating the round state
    const sortedScorecard = [...updatedScorecard].sort((a, b) => {
        return round.matchType === 'Match Play'
            ? b.matchScore - a.matchScore // Higher scores first for Match Play
            : a.matchScore - b.matchScore; // Lower scores first for Stroke Play
    });

    const { updateRound } = useRounds();

    const handleAddStroke = (index: number) => {
        setInputScores(prevScores =>
            prevScores.map((score, i) => (i === index ? score + 1 : score))
        );
    }

    const handleSubtractStroke = (index: number) => {
        setInputScores(prevScores =>
            prevScores.map((score, i) => (i === index && score > 0 ? score - 1 : score))
        );
    }

    const handleSubmitScores = () => {
        const status = round.currentHole + 1 > 18 ? 'Finished' : 'In Progress';
        const updatedScorecard = round.scorecard.map((score: Score, index: number) => {
            if (index === scoreHole - 1) {
                // Create a new score array with the updated value
                const updatedScore = [...score.score];
                updatedScore[scoreHole - 1] = inputScores[index]; // Updating based on current hole
    
                return { ...score, score: updatedScore }; // Return the updated Score object
            }
            return score; // Return the original Score if no update is needed
        });

        const updatedCurrentHole = (() => {
            for (let holeIndex = 0; holeIndex < 18; holeIndex++) {
                if (updatedScorecard.some((score: Score) => score.score[holeIndex] === null)) {
                    return holeIndex + 1;
                }
            }
            return 19;
        })();
        
        const updatedRound = { ...round, scorecard: updatedScorecard, currentHole: updatedCurrentHole, status: status };

        updateRoundById(round._id, updatedRound)
            .then(() => {
                setRound(updatedRound);
                updateRound(updatedRound);
                setScoreHole((prevHole: number) => (prevHole < round.course.holes ? prevHole + 1 : prevHole));
                Alert.alert("Successfully updated score!");
            })
            .catch((error) => {
                console.error('Scores not updated!', error);
            })
    }

    const handleShowAddScoreModal = () => {
        setShowAddScoreModal(true);
    }

    const handleCloseAddScoreModal = () => {
        setShowAddScoreModal(false);
    }

    const handleSaveScores = (updatedScorecard: Score[]) => {
        const status = round.currentHole + 1 > 18 ? 'Finished' : 'In Progress';
        const updatedRound = { ...round, scorecard: updatedScorecard, currentHole: round.currentHole + 1, status: status };

        updateRoundById(round._id, updatedRound)
            .then(() => {
                setRound(updatedRound);
                updateRound(updatedRound);
            })
            .catch((error) => {
                console.error('Scores not updated!', error);
            })
      };

  return (
    <ScrollView>
        <VStack>
            <Box className="p-5">
                <Heading>{round.course?.name}</Heading>
                <Text>{round.matchType}</Text>
                <Text>
                {new Date(round.date).toLocaleString()}
                </Text>
            </Box>
            {round.currentHole <= 18 ? (
            <Card className="p-5 mx-4 my-2">
                <Box className="py-4 pr-4 flex flex-row justify-center items-center">
                    <Heading size="2xl" className="flex-1">Hole</Heading>
                    <Heading size="2xl">{scoreHole}</Heading>
                </Box>
                <VStack>
                    {round.golfers.map((golfer: User, index: number) => (
                        <Box key={`${golfer._id}-${index}`} className="py-4 pr-4 flex flex-row items-center justify-between">
                            <Avatar className='mr-3'>
                                <AvatarFallbackText>
                                    {golfer.displayName}
                                </AvatarFallbackText>
                            </Avatar>
                            <Text className="mr-10">{golfer.displayName}</Text>
                            <Button onPress={() => handleSubtractStroke(index)}>
                                <ButtonIcon as={ChevronLeftIcon} />
                            </Button>
                            <Text size="2xl" className="flex-1 text-center">{inputScores[index] ?? 0}</Text>
                            <Button onPress={() => handleAddStroke(index)}>
                                <ButtonIcon as={ChevronRightIcon} />
                            </Button>
                        </Box>
                    ))}
                    <Box className="py-4 pr-4 flex flex-row justify-between items-center">
                        <Box className="flex flex-row">
                            <Button variant="outline" className="mr-2" onPress={() => setScoreHole((prevHole: number) => (prevHole > 1 ? prevHole - 1 : prevHole))}>
                                <ButtonIcon as={ChevronLeftIcon} />
                            </Button>
                            <Button variant="outline" onPress={() => setScoreHole((prevHole: number) => (prevHole < round.course.holes ? prevHole + 1 : prevHole))}>
                                <ButtonIcon as={ChevronRightIcon} />
                            </Button>
                        </Box>

                        <Button onPress={handleSubmitScores}>
                            <ButtonText>Submit</ButtonText>
                        </Button>
                    </Box>
                </VStack>
            </Card>
            ) : (
            <Card className="p-5 mx-4 my-2">
                <HStack className='flex justify-between items-center w-full'>
                    <Heading className='text-left'>Round Finished!</Heading>
                    <Button className='text-right' onPress={handleShowAddScoreModal}>
                        <ButtonText>Edit scores</ButtonText>
                    </Button>
                </HStack>
            </Card>
            )}

            <Card className="p-5 mx-4 my-2">
                <HStack className='flex justify-between items-center w-full'>
                    <Heading className='text-left'>Leaderboard</Heading>
                    <Text className='text-right'>Through {round.currentHole - 1}</Text>
                </HStack>
                {sortedScorecard.map((score: Score, index: number) => (
                    <Card key={`${score.golfer._id}-${index}`}>
                        <HStack space='md' className='flex justify-between items-center w-full'>
                            <Box className='text-left'>
                                <HStack className='flex items-center'>
                                    <Avatar className='mr-3'>
                                        <AvatarFallbackText>
                                            {score.golfer.displayName}
                                        </AvatarFallbackText>
                                    </Avatar>
                                    <Text>{score.golfer.displayName}</Text>
                                </HStack>
                            </Box>
                            <Text className='text-right'>{score.matchScore > 0 ? `+${score.matchScore}` : score.matchScore}</Text>
                        </HStack>
                    </Card>
                ))}
            </Card>
        </VStack>
        <AddScoreModal scorecard={round.scorecard} hole={round.currentHole} showModal={showAddScoreModal} onCloseModal={handleCloseAddScoreModal} onSaveScores={handleSaveScores}/>
    </ScrollView>
  );
}

export default RoundScreen;