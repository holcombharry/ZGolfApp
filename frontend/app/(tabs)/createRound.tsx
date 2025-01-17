import { StyleSheet, Image, Platform } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';
import CreateRoundScreen from '@/src/screens/CreateRoundScreen';

const RoundsStack = createStackNavigator();

export default function TabThreeScreen() {
  return (
    <RoundsStack.Navigator initialRouteName="Create Round">
      <RoundsStack.Screen name="Create Round" component={CreateRoundScreen} options={{ title: 'Rounds' }} />
    </RoundsStack.Navigator>
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
