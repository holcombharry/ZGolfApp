import { StyleSheet, Image, Platform } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';
import RoundsScreen from '@/src/screens/RoundsScreen';

const RoundsStack = createStackNavigator();

export default function TabTwoScreen() {
  return (
    <RoundsStack.Navigator initialRouteName="Welcome">
      <RoundsStack.Screen name="Rounds" component={RoundsScreen} options={{ title: 'Rounds' }} />
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
