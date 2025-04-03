import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import type { StackScreenProps } from '@react-navigation/stack';
import type { RootStackParamList } from '../navigation/RootNavigator';

type Props = StackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Fitness Companion</Text>
      {/* <Button
        title="Подключиться к датчику"
        onPress={() => navigation.navigate('Sensor')}
      /> */}
      <Button
        title="Найти устройства"
        onPress={() => navigation.navigate('DeviceList')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 24,
  },
});

export default HomeScreen;
