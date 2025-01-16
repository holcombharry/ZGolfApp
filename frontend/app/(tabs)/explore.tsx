import { StyleSheet, Image, Platform } from 'react-native';

import { ScrollView } from 'react-native';

export default function TabTwoScreen() {
  return (
    <ScrollView
    >
      {/* <Text>Welcome to ZGolfApp!</Text> */}
    </ScrollView>
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
