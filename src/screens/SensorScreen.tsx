import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import type { StackScreenProps } from '@react-navigation/stack';
import type { RootStackParamList } from '../navigation/RootNavigator';
import { usePulseSensor } from '../hooks/usePulseSensor';

type Props = StackScreenProps<RootStackParamList, 'Sensor'>;

const SensorScreen: React.FC<Props> = ({ navigation }) => {
  const { pulse, isConnecting } = usePulseSensor();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ваш пульс</Text>
      {isConnecting ? (
        <ActivityIndicator size="large" color="#2196f3" />
      ) : (
        <Text style={styles.pulse}>{pulse} BPM</Text>
      )}
      <Text style={styles.hint}>Нажмите &quot;Назад&quot; для возвращения</Text>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>Назад</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', padding: 16 },
  title: { fontSize: 28, fontWeight: '700', marginBottom: 16 },
  pulse: { fontSize: 48, fontWeight: '800', color: '#e53935', marginBottom: 16 },
  hint: { fontSize: 16, color: '#555', marginBottom: 32 },
  backButton: { backgroundColor: '#2196f3', paddingVertical: 12, paddingHorizontal: 24, borderRadius: 8 },
  backButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});

export default SensorScreen;
