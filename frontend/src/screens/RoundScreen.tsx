import React from 'react';
import { useRoute } from '@react-navigation/native';

import { ScrollView } from 'react-native';
import { Heading } from "@/components/ui/heading";
import { Box } from "@/components/ui/box";
import { Card } from '@/components/ui/card';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { User } from '../types/user.types';
import { HStack } from '@/components/ui/hstack';
import { Avatar, AvatarFallbackText } from '@/components/ui/avatar';
import { Button, ButtonText } from '@/components/ui/button';

const RoundScreen: React.FC = () => {
    const route = useRoute();

    const { round } = route.params;

    const golfers = round.golfers.length < 4
    ? [...round.golfers, ...Array(4 - round.golfers.length).fill(null)]
    : round.golfers;

    const getCurrentHole = (score: number[]) => {
        for(let i = 0; i < score.length; i++) {
            if(score[i] === null) {
                return i + 1;
            }
        }
        // To indicate round is over
        return -1;
    }

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
                    <Text size="2xl" className="flex-1">{getCurrentHole(round.score)}</Text>
                    <Button>
                        <ButtonText>Add scores</ButtonText>
                    </Button>
                </Box>
            </Card>
            <Card className="p-5 mx-4 my-2">
                <Heading>Golfers</Heading>
                {golfers.map((golfer: User, index: number) => (
                    golfer === null ? (
                        <Card key={index + 1} className="bg-info-50 my-1">
                            <HStack space='md' className='items-center'>
                                <Avatar>
                                    <AvatarFallbackText>
                                        Golfer
                                    </AvatarFallbackText>
                                </Avatar>
                                
                                <Text>Golfer {index + 1}</Text>
                            </HStack>
                        </Card>

                    ) : (
                        <Card key={golfer._id}>
                            <HStack space='md' className='items-center'>
                                <Avatar>
                                    <AvatarFallbackText>
                                        {golfer.name}
                                    </AvatarFallbackText>
                                </Avatar>
                                <Text>{golfer.name}</Text>
                            </HStack>
                        </Card>
                    )
                ))}
            </Card>
        </VStack>

    </ScrollView>
  );
}

export default RoundScreen;