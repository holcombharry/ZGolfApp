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
            <Heading size="md" className="py-2">
                Starting a round?
            </Heading>
            <FormControl isRequired className="py-2">
                <VStack>
                    <Box className="py-2">
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
                    </Box>

                    <Box className="py-2">
                        <FormControlLabel>
                            <FormControlLabelText style={{ fontSize: 12 }}>Match Type</FormControlLabelText>
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
                                    <SelectItem label="Match Play" value="Match Play" />
                                    <SelectItem label="Stroke Play" value="Stroke Play" />
                                    <SelectItem label="Scramble" value="Scramble" />
                                    <SelectItem label="Best Ball" value="Best Ball" />
                                </SelectContent>
                            </SelectPortal>
                        </Select>
                    </Box>

                    <Box className="py-2">
                        <FormControlLabel>
                            <FormControlLabelText style={{ fontSize: 12 }}>Golf Course</FormControlLabelText>
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
                                    <SelectItem label="Torrey Pines" value="Torrey Pines" />
                                    <SelectItem label="Bandon" value="Bandon" />
                                    <SelectItem label="LACC" value="LACC" />
                                    <SelectItem label="Tierra Verde" value="Tierra Verde" />
                                </SelectContent>
                            </SelectPortal>
                        </Select>
                    </Box>
                    <Button size="md" variant="solid" action="primary" className="my-2"
                        onPress={pressThatBih}>
                        <ButtonText>Create Match</ButtonText>
                    </Button>
                </VStack>
            </FormControl>
        </Card>
    </ScrollView>
  );
}