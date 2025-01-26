import { StyleSheet, Image, Platform } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';
import MyRoundsScreen from '@/src/screens/MyRoundsScreen';
import RoundScreen from '@/src/screens/RoundScreen';
import { RoundsProvider } from '@/hooks/RoundsContext';

const RoundsStack = createStackNavigator();

export default function TabTwoScreen() {
  return (
    <RoundsProvider>
      <RoundsStack.Navigator initialRouteName="MyRounds">
        <RoundsStack.Screen name="MyRounds" component={MyRoundsScreen} options={{ title: 'Rounds' }} />
        <RoundsStack.Screen name="Round" component={RoundScreen} options={{ title: 'Round' }} />
      </RoundsStack.Navigator>
    </RoundsProvider>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
