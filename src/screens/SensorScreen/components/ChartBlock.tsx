import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LineChart } from 'react-native-gifted-charts';
import CustomChart from '../../../components/CustomChart';

type Props = {
  pulse: number;
};

const ChartBlock: React.FC<Props> = ({ pulse }) => {
  const [pulseHistory, setPulseHistory] = useState<number[]>([]);
  const [showCustomChart, setShowCustomChart] = useState(false);

  const chatData = pulseHistory.map(x => ({ value: x, label: `${x} BPM` }));

  useEffect(() => {
    setPulseHistory(prevHistory => {
      if (prevHistory.length > 0 && prevHistory[prevHistory.length - 1] === pulse) {
        return prevHistory;
      }
      const newHistory = [...prevHistory, pulse].slice(-20);
      AsyncStorage.setItem('pulseHistory', JSON.stringify(newHistory));
      return newHistory;
    });
  }, [pulse]);

  return (
    <>
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
            <>
              <Text style={styles.chartTitle}>Custom Pulse Chart</Text>
              <CustomChart
                data={pulseHistory}
                width={Dimensions.get('window').width - 32}
                height={300}
              />
            </>
          ) : (
            <>
              <Text style={styles.chartTitle}>Library Pulse Chart</Text>
              <View style={styles.chart}>
                <LineChart data={chatData} scrollToEnd scrollAnimation />
              </View>
            </>
          )}
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  toggleChartButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 16,
    alignSelf: 'center',
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
    alignSelf: 'flex-start',
    marginLeft: 16,
  },
  toggleChartText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  chart: { overflow: 'hidden', width: '100%', height: 300 },
});

export default ChartBlock;
