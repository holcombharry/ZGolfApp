import React from 'react';
import { Card } from '@/components/ui/card';
import { Box } from '@/components/ui/box';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { Round } from '../types/round.types';

interface RoundCardProps {
  round: Round;
}

const RoundCard: React.FC<RoundCardProps> = ({ round }) => {

  return (
    <Card>
      <Box>
        <Heading>{round.course?.name}</Heading>
        <Text>{round.matchType}</Text>
        <Text>
          {new Date(round.date).toLocaleString()}
        </Text>
      </Box>
    </Card>
  );
};

export default RoundCard;
