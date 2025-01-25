import React, { useState } from 'react';
import { useRoute } from '@react-navigation/native';

import { ScrollView, Alert } from 'react-native';
import { Heading } from "@/components/ui/heading";
import { Box } from "@/components/ui/box";
import { Card } from '@/components/ui/card';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { User } from '../types/user.types';
import { HStack } from '@/components/ui/hstack';
import { Avatar, AvatarFallbackText } from '@/components/ui/avatar';
import { Button, ButtonText } from '@/components/ui/button';
import AddScoreModal from '../components/AddScoreModal';
import { Score } from '../types/scorecard.types';
import { updateRoundById } from '@/api/apiService';

const RoundScreen: React.FC = () => {
    const route = useRoute();

    const [round, setRound] = useState(route.params.round);
    const [showAddScoreModal, setShowAddScoreModal] = useState(false);

    const handleShowAddScoreModal = () => {
        setShowAddScoreModal(true);
    }

    const handleCloseAddScoreModal = () => {
        setShowAddScoreModal(false);
    }

    const handleSaveScores = (updatedScorecard: Score[]) => {
        const updatedRound = { ...round, scorecard: updatedScorecard, currentHole: round.currentHole + 1 };

        updateRoundById(round._id, updatedRound)
            .then(() => {
                setRound(updatedRound);
                Alert.alert('Success', 'Scores updated successfully!');
            })
            .catch(() => {
                Alert.alert('Error', 'Scores not updated!');
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
            <Card className="p-5 mx-4 my-2">
                <Heading>Current Hole</Heading>
                <Box className="py-4 pr-4 flex flex-row justify-center items-center">
                    <Text size="2xl" className="flex-1">{round.currentHole}</Text>
                    <Button onPress={handleShowAddScoreModal}>
                        <ButtonText>Add scores</ButtonText>
                    </Button>
                </Box>
            </Card>
            <Card className="p-5 mx-4 my-2">
                <HStack className='flex justify-between items-center w-full'>
                    <Heading className='text-left'>Leaderboard</Heading>
                    <Text className='text-right'>Through {round.currentHole - 1}</Text>
                </HStack>
                {[...round.scorecard]
                    .sort((a, b) => {
                        const totalScoreA = a.score.filter(strokes => strokes !== null).reduce((acc, holeStrokes) => acc + holeStrokes, 0);
                        const totalScoreB = b.score.filter(strokes => strokes !== null).reduce((acc, holeStrokes) => acc + holeStrokes, 0);
                        return totalScoreA - totalScoreB;                    })
                    .map((score: Score, index: number) => (
                    <Card key={`${score.golfer._id}-${index}`}>
                        <HStack space='md' className='flex justify-between items-center w-full'>
                            <Box className='text-left'>
                                <HStack className='flex items-center'>
                                    <Avatar className='mr-3'>
                                        <AvatarFallbackText>
                                            {score.golfer.name}
                                        </AvatarFallbackText>
                                    </Avatar>
                                    <Text>{score.golfer.name}</Text>
                                </HStack>
                            </Box>
                            <Text className='text-right'>{score.score.filter(strokes => strokes !== null).reduce((acc, holeStrokes) => acc + holeStrokes, 0)}</Text>
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