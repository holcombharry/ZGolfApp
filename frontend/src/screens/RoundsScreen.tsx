import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { Heading } from "@/components/ui/heading";
import { Box } from "@/components/ui/box";

export default function RoundsScreen() {

  return (
    <ScrollView
    >
      <Box className="bg-primary-100 p-5">
        <Heading>Welcome to Rounds on ZGolfApp!</Heading>
      </Box>
    </ScrollView>
  );
}