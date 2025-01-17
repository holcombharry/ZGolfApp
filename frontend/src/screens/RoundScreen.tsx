import React from 'react';
import { useRoute } from '@react-navigation/native';

import { ScrollView } from 'react-native';
import { Heading } from "@/components/ui/heading";
import { Box } from "@/components/ui/box";
import { Card } from '@/components/ui/card';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { User } from '../types/user.types';

const RoundScreen: React.FC = () => {

    const route = useRoute();

    const { round } = route.params;

    const golfers = round.golfers.length < 4
    ? [...round.golfers, ...Array(4 - round.golfers.length).fill(null)]
    : round.golfers;

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
                <Heading>Scorecard</Heading>
            </Card>
            <Card className="p-5 mx-4 my-2">
                <Heading>Golfers</Heading>
                {golfers.map((golfer: User, index: number) => (
                    golfer === null ? (
                        <Card className="bg-info-50 my-1">
                            <Text>Golfer {index + 1}</Text>
                        </Card>

                    ) : (
                        <Card>
                            <Text>{golfer?.name}</Text>
                        </Card>
                    )
                ))}
            </Card>
        </VStack>

    </ScrollView>
  );
}

export default RoundScreen;