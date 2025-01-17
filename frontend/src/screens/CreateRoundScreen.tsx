import React from 'react';
import { ScrollView } from 'react-native';
import { Heading } from "@/components/ui/heading";
import { Box } from "@/components/ui/box";
import { Card } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { Button, ButtonText } from "@/components/ui/button";

export default function CreateRoundScreen() {

    const pressThatBih = () => {
        alert("Yo! This bih was pressed homes!")
    }

  return (
    <ScrollView
    >
        <Box className="bg-primary-100 p-5">
            <Heading>Welcome to Create Rounds on ZGolfApp!</Heading>
        </Box>
        <Card size="md" variant="elevated" className="bg-primary-50 m-3">
            <Heading size="md" className="mb-1 pb-4">
                Starting a round?
            </Heading>
            <Button size="md" variant="solid" action="primary" className="flex-1"
                onPress={pressThatBih}>
                <ButtonText>Create Match</ButtonText>
            </Button>
        </Card>
    </ScrollView>
  );
}