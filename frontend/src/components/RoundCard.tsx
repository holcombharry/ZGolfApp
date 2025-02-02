import React from 'react';
import { Card } from '@/components/ui/card';
import { Box } from '@/components/ui/box';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { Round } from '../types/round.types';
import { HStack } from '@/components/ui/hstack';

interface RoundCardProps {
  round: Round;
}

const RoundCard: React.FC<RoundCardProps> = ({ round }) => {

  return (
    <Card>
      <Box>
        <HStack className='flex justify-between items-center w-full'>
          <Heading className='text-left'>{round.course?.name}</Heading>
          {round.currentHole > 18 ? (
            <Text className='text-right'>Finished</Text>
          ) : (
            <Text className='text-right'>Through {round.currentHole - 1}</Text>
          )}
        </HStack>
        <Text>{round.matchType}</Text>
        <Text>
          {new Date(round.date).toLocaleString()}
        </Text>
      </Box>
    </Card>
  );
};

export default RoundCard;
