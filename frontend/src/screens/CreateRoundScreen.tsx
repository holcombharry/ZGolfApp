import React from 'react';
import { ScrollView } from 'react-native';
import { Heading } from "@/components/ui/heading";
import { Box } from "@/components/ui/box";

export default function CreateRoundScreen() {

  return (
    <ScrollView
    >
      <Box className="bg-primary-100 p-5">
        <Heading>Welcome to Create Rounds on ZGolfApp!</Heading>
      </Box>
    </ScrollView>
  );
}