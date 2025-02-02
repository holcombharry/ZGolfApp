import React, { useState, useMemo } from 'react';
import { useRoute } from '@react-navigation/native';

import { ScrollView, Alert } from 'react-native';
import { Heading } from "@/components/ui/heading";
import { Box } from "@/components/ui/box";
import { Card } from '@/components/ui/card';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Avatar, AvatarFallbackText } from '@/components/ui/avatar';
import { Button, ButtonText } from '@/components/ui/button';
import AddScoreModal from '../components/AddScoreModal';
import { Score } from '../types/scorecard.types';
import { updateRoundById } from '@/api/apiService';
import { useRounds } from '../../hooks/RoundsContext';
import { calculateStrokeScore, calculateMatchScore } from '../utils/matchUtils';

const RoundScreen: React.FC = () => {
    const route = useRoute();

    const [round, setRound] = useState(route.params.round);
    const [showAddScoreModal, setShowAddScoreModal] = useState(false);

    // const playerScores = round.scorecard.map((score: Score, index: number) => calculateStrokeScore(score.score, round.course.scorecard));

    const updatedScorecard = useMemo(() => {
        return round.scorecard.map((score: Score) => ({
            ...score,
            strokeScore: calculateStrokeScore(score.score, round.course.scorecard)
        }));
    }, [round.scorecard, round.course.scorecard]);
    
    // Use updatedScorecard directly instead of updating the round state
    const sortedScorecard = [...updatedScorecard].sort((a, b) => a.strokeScore - b.strokeScore);

    const { updateRound } = useRounds();

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
                <Heading>Current Hole</Heading>
                <Box className="py-4 pr-4 flex flex-row justify-center items-center">
                    <Text size="2xl" className="flex-1">{round.currentHole}</Text>
                    <Button onPress={handleShowAddScoreModal}>
                        <ButtonText>Add scores</ButtonText>
                    </Button>
                </Box>
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
                            <Text className='text-right'>{score.strokeScore > 0 ? `+${score.strokeScore}` : score.strokeScore}</Text>
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