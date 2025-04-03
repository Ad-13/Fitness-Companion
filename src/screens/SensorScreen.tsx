import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Dimensions,
} from 'react-native';
import type { StackScreenProps } from '@react-navigation/stack';
import type { RootStackParamList } from '../navigation/RootNavigator';
import { usePulseSensor } from '../hooks/usePulseSensor';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { LineChart } from 'react-native-gifted-charts';
import CustomChart from '../components/CustomChart';

type Props = StackScreenProps<RootStackParamList, 'Sensor'>;

const SensorScreen: React.FC<Props> = ({ navigation }) => {
  const { pulse, isConnecting } = usePulseSensor();
  const [pulseHistory, setPulseHistory] = useState<number[]>([]);
  const [showCustomChart, setShowCustomChart] = useState(false);

  const chatData = pulseHistory.map(x => ({ value: x, label: `${x} BPM` }));

  useEffect(() => {
    if (isConnecting) return;

    setPulseHistory(prevHistory => {
      if (prevHistory.length > 0 && prevHistory[prevHistory.length - 1] === pulse) {
        return prevHistory;
      }
      const newHistory = [...prevHistory, pulse];
      AsyncStorage.setItem('pulseHistory', JSON.stringify(newHistory));
      return newHistory;
    });
  }, [pulse, isConnecting]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Ваш пульс</Text>
      {isConnecting ? (
        <ActivityIndicator size="large" color="#2196f3" />
      ) : (
        <View style={styles.pulseContainer}>
          <Icon name="heart-pulse" size={48} color="#e53935" />
          <Text style={styles.pulse}>{pulse} BPM</Text>
        </View>
      )}
      <Text style={styles.hint}>Нажмите &quot;Назад&quot; для возвращения</Text>

      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Icon name="arrow-left" size={24} color="#fff" style={styles.icon} />
        <Text style={styles.backButtonText}>Назад</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.toggleChartButton}
        onPress={() => setShowCustomChart(!showCustomChart)}
      >
        <Text style={styles.toggleChartText}>
          {showCustomChart ? 'Show Library Chart' : 'Show Custom Chart'}
        </Text>
      </TouchableOpacity>

      {pulseHistory.length > 0 && (
        <>
          {showCustomChart ? (
            <CustomChart
              data={pulseHistory}
              width={Dimensions.get('window').width - 32}
              height={300}
            />
          ) : (
            <View style={styles.chart}>
              <LineChart data={chatData} scrollToEnd scrollAnimation />
            </View>
          )}
        </>
      )}
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
  toggleChartButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 16,
    alignSelf: 'center',
  },
  toggleChartText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  chart: { overflow: 'hidden', width: '100%', height: 300 },
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
  },
  icon: { marginRight: 8 },
  backButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  chartContainer: { width: '100%', height: 300, alignItems: 'center', marginTop: 16 },
  chartTitle: { fontSize: 20, fontWeight: '600', marginBottom: 8 },
});

export default SensorScreen;
