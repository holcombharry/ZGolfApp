import React from 'react';
import { ScrollView } from 'react-native';
import { Heading } from "@/components/ui/heading";
import { Box } from "@/components/ui/box";
import { Card } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { Button, ButtonText } from "@/components/ui/button";
import { FormControl, FormControlLabel, FormControlLabelText, FormControlHelper, FormControlHelperText } from '@/components/ui/form-control';
import { Select, SelectTrigger, SelectPortal, SelectBackdrop, SelectContent, SelectDragIndicatorWrapper, SelectDragIndicator, SelectItem, SelectInput, SelectIcon } from '@/components/ui/select';
import { VStack } from '@/components/ui/vstack';
import { ChevronDownIcon } from '@/components/ui/icon';

export default function CreateRoundScreen() {

    // const []

    const pressThatBih = () => {
        alert("Yo! This bih was pressed homes!")
    }

  return (
    <ScrollView
    >
        <Box className="bg-primary-100 p-5">
            <Heading>Welcome to Create Rounds on ZGolfApp!</Heading>
        </Box>
        <Card size="md" variant="elevated" className="m-3">
            <VStack>
            <Heading size="md" className="py-2">
                Starting a round?
            </Heading>
            <FormControl className="py-4">
                <FormControlLabel>
                    <FormControlLabelText style={{ fontSize: 12 }}>Number of Players</FormControlLabelText>
                </FormControlLabel>
                    <Select>
                        <SelectTrigger variant="outline" size="md">
                            <SelectInput placeholder="Select option" className="flex-1" />
                            <SelectIcon className="mr-3" as={ChevronDownIcon} />
                        </SelectTrigger>
                        <SelectPortal>
                            <SelectBackdrop />
                            <SelectContent className="pb-6">
                                <SelectDragIndicatorWrapper>
                                    <SelectDragIndicator />
                                </SelectDragIndicatorWrapper>
                                <SelectItem label="1" value="1" />
                                <SelectItem label="2" value="2" />
                                <SelectItem label="3" value="3" />
                                <SelectItem label="4" value="4" />
                            </SelectContent>
                        </SelectPortal>
                    </Select>
            </FormControl>
            <Button size="md" variant="solid" action="primary" className="flex-1"
                onPress={pressThatBih}>
                <ButtonText>Create Match</ButtonText>
            </Button>
            </VStack>
        </Card>
    </ScrollView>
  );
}