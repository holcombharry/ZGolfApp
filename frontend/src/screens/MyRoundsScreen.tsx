import React, { useEffect, useState } from 'react';
import { Alert, ScrollView, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Heading } from "@/components/ui/heading";
import { Box } from "@/components/ui/box";
import { Spinner } from '@/components/ui/spinner';
import { Pressable } from 'react-native';
import { getAllRounds } from '@/api/apiService';
import RoundCard from '../components/RoundCard';
import { useRounds } from '../../hooks/RoundsContext';

export default function MyRoundsScreen() {
  const { rounds, setRounds } = useRounds();
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState(false);

  const finishedRounds = rounds.filter(round => round.status === 'Finished');
  const inProgressRounds = rounds.filter(round => round.status !== 'Finished');

  const navigation = useNavigation(); 

  useEffect(() => {
    fetchRounds();
  }, [])

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchRounds();
    setRefreshing(false);
  };

  const fetchRounds = async () => {
    try {
      const response = await getAllRounds();
      if(response && response.status === 200) {
        const data = response.data.map(round => ({
          ...round,
          scorecard: round.scorecard.map((score, index) => ({
            ...score,
            golfer: {
              ...score.golfer,
              displayName: score.golfer.placeholder ? `Golfer ${index + 1}` : score.golfer.name
            }
          }))
        }));
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
  };

  if (loading) {
    return (
      <Box style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Spinner size="small" />
      </Box>
    );
  }

  return (
    <ScrollView
    refreshControl={
      <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
    }>
      <Box className="bg-info-100 p-5">
        <Heading>Welcome to Rounds on ZGolfApp!</Heading>
      </Box>
      <Heading className='p-3'>In Progress</Heading>
      {inProgressRounds.map((round) => (
        <Pressable key={round._id} onPress={() => navigation.navigate('Round', { round })}>
          <RoundCard key={round._id} round={round} />
        </Pressable>
      ))}
      <Heading className='p-3'>Completed</Heading>
      {finishedRounds.map((round) => (
        <Pressable key={round._id} onPress={() => navigation.navigate('Round', { round })}>
          <RoundCard key={round._id} round={round} />
        </Pressable>
      ))}
    </ScrollView>
  );
}