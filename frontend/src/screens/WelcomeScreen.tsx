import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { Heading } from "@/components/ui/heading";
import { Box } from "@/components/ui/box";

export default function WelcomeScreen() {

  return (
    <ScrollView
    >
      <Box className="bg-info-100 p-5">
        <Heading>Welcome to ZGolfApp!</Heading>
      </Box>
    </ScrollView>
  );
}