import React, { useState, useEffect } from 'react';
import { ScrollView, Alert } from 'react-native';
import { Heading } from "@/components/ui/heading";
import { Box } from "@/components/ui/box";
import { Card } from "@/components/ui/card";
import { Button, ButtonText } from "@/components/ui/button";
import { FormControl, FormControlLabel, FormControlLabelText, FormControlHelper, FormControlHelperText } from '@/components/ui/form-control';
import { Select, SelectTrigger, SelectPortal, SelectBackdrop, SelectContent, SelectDragIndicatorWrapper, SelectDragIndicator, SelectItem, SelectInput, SelectIcon } from '@/components/ui/select';
import { VStack } from '@/components/ui/vstack';
import { Spinner } from '@/components/ui/spinner';
import { ChevronDownIcon } from '@/components/ui/icon';

import { createRound, getAllCourses } from '../../api/apiService';
import { MatchType } from '../types/matchType.types';
import { Course } from '../types/course.types';

export default function CreateRoundScreen() {

    const [groupSize, setGroupSize] = useState<number | null>(null);
    const [matchType, setMatchType] = useState<MatchType | null>(null);
    const [course, setCourse] = useState<Course | null>(null);
    const [courseOptions, setCourseOptions] = useState<Course[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
              const response = await getAllCourses();
              if (response && response.status === 200) {
                const data = response.data;
                setCourseOptions(data);
              } else {
                Alert.alert('Error', 'Failed to fetch courses');
              }
            } catch (error) {
              console.error('Error fetching courses:', error);
              Alert.alert('Error', 'An error occurred while fetching courses');
            } finally {
                setIsLoading(false); // Set loading to false after fetching
            }
          };
      
          fetchCourses();
    }, [])

    const handleGroupSizeChange = (value: string) => {
        setGroupSize(Number(value));
    }

    const handleMatchTypeChange = (value: MatchType) => {
        setMatchType(value);
    }

    const handleCourseChange = (value: string) => {
        const result = courseOptions.find(item => item._id === value);
        if (result) {
            setCourse(result); // Only set if a result is found
        } else {
            console.error('Course not found: ' + value);
        }
    }

    const handleCreateRound = async () => {
        try {
          const response = await createRound({
            groupSize,
            course,
            matchType,
            date: new Date()
          });
          if (response && response.status === 201) {
            Alert.alert('Success', 'Trip created successfully!');
          } else {
            Alert.alert('Error', 'Failed to create trip');
          }
        } catch (error) {
          console.error('Error creating trip:', error);
          Alert.alert('Error', 'An error occurred while creating the trip');
        }
      };

      if (isLoading) {
        return (
          <Box style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Spinner size="small" />
          </Box>
        );
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
                            <FormControlLabelText style={{ fontSize: 12 }}>Group Size</FormControlLabelText>
                        </FormControlLabel>
                        <Select onValueChange={handleGroupSizeChange}>
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
                        <Select onValueChange={(value) => handleMatchTypeChange(value as MatchType)}>
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
                        <Select onValueChange={handleCourseChange}>
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
                                    {courseOptions.map((course) => (
                                        <SelectItem key={course._id} label={course.name} value={course._id} />
                                    ))}
                                </SelectContent>
                            </SelectPortal>
                        </Select>
                    </Box>
                    <Button size="md" variant="solid" action="primary" className="my-2"
                        onPress={handleCreateRound}>
                        <ButtonText>Create Match</ButtonText>
                    </Button>
                </VStack>
            </FormControl>
        </Card>
    </ScrollView>
  );
}