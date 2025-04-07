import React, { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type Props = {
  pulse: number;
};

const AnimatedPulse: React.FC<Props> = ({ pulse }) => {
  const pulseAnimation = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(pulseAnimation, {
        toValue: 1.2,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(pulseAnimation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }, [pulse]);

  return (
    <Animated.View style={{ transform: [{ scale: pulseAnimation }] }}>
      <Icon name="heart-pulse" size={48} color="#e53935" />
    </Animated.View>
  );
};

export default AnimatedPulse;
