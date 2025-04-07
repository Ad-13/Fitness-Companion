import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import type { StackScreenProps } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { usePulseSensor } from '../../hooks/usePulseSensor';
import ChartBlock from './components/ChartBlock';
import AnimatedPulse from './components/AnimatedPulse';
import { RootStackParamList } from '../../types';

type Props = StackScreenProps<RootStackParamList, 'Sensor'>;

const SensorScreen: React.FC<Props> = ({ navigation }) => {
  const { pulse } = usePulseSensor();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Your pulse</Text>

      <View style={styles.pulseContainer}>
        <AnimatedPulse pulse={pulse} />
        <Text style={styles.pulse}>{pulse} BPM</Text>
      </View>
      <Text style={styles.hint}>Press &quot;Back&quot; for return</Text>

      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Icon name="arrow-left" size={24} color="#fff" style={styles.icon} />
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>

      <ChartBlock pulse={pulse} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: { fontSize: 28, fontWeight: '700', marginBottom: 16 },
  pulse: { fontSize: 48, fontWeight: '800', color: '#e53935', marginBottom: 16 },
  pulseContainer: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  hint: { fontSize: 16, color: '#555', marginBottom: 32 },
  backButton: {
    backgroundColor: '#2196f3',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginBottom: 32,
    flexDirection: 'row',
  },
  icon: { marginRight: 8 },
  backButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});

export default SensorScreen;
