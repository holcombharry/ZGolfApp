import React, { useEffect, useState } from 'react';
import { Alert, ScrollView } from 'react-native';
import { Heading } from "@/components/ui/heading";
import { Box } from "@/components/ui/box";
import { Spinner } from '@/components/ui/spinner';

import { getAllRounds } from '@/api/apiService';
import { Round } from '../types/round.types';
import RoundCard from '../components/RoundCard';

export default function RoundsScreen() {

  const [rounds, setRounds] = useState<Round[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchRounds = async () => {
      try {
        const response = await getAllRounds();
        if(response && response.status === 200) {
          const data = response.data;
          setRounds(data);
        } else {
          Alert.alert('Error', 'Failed to fetch courses');
        }
      } catch (error) {
        console.error('Error fetching courses:', error);
        Alert.alert('Error', 'An error occurred while fetching courses');
      } finally {
          setLoading(false); // Set loading to false after fetching
      }
    }

    fetchRounds();
  }, [])

  if (loading) {
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
        <Heading>Welcome to Rounds on ZGolfApp!</Heading>
      </Box>
      {rounds.map((round) => (
        <RoundCard round={round} />
      ))}
    </ScrollView>
  );
}