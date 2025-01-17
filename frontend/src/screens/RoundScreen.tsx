import React from 'react';
import { useRoute } from '@react-navigation/native';

import { ScrollView } from 'react-native';
import { Heading } from "@/components/ui/heading";
import { Box } from "@/components/ui/box";

const RoundScreen: React.FC = () => {

    const route = useRoute();

    const { round } = route.params;

  return (
    <ScrollView>
      <Box className="bg-primary-100 p-5">
        <Heading>{round._id}</Heading>
      </Box>
    </ScrollView>
  );
}

export default RoundScreen;