import { StyleSheet } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from '../../src/screens/WelcomeScreen';

const HomeStack = createStackNavigator();

export default function HomeScreen() {
  return (
    <HomeStack.Navigator initialRouteName="Home">
      <HomeStack.Screen name="Home" component={WelcomeScreen} options={{ title: 'Home' }} />
    </HomeStack.Navigator>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
