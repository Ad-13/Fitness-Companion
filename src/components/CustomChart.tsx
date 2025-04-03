import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Svg, { Path, G, Line, Text as SvgText, Circle } from 'react-native-svg';

interface CustomChartProps {
  data: number[];
  width?: number;
  height?: number;
}

const CustomChart: React.FC<CustomChartProps> = ({ 
  data, 
  width = Dimensions.get('window').width - 32, 
  height = 300 
}) => {
  if (data.length === 0) return null;

  const chartPadding = {
    left: 40,
    right: 20,
    top: 20,
    bottom: 40,
  };

  const maxValue = Math.max(...data);
  const minValue = Math.min(...data);
  const chartWidth = width - chartPadding.left - chartPadding.right;
  const chartHeight = height - chartPadding.top - chartPadding.bottom;
  const step = chartWidth / Math.max(1, data.length - 1);

  const getY = (value: number) => {
    const valueRange = maxValue - minValue;
    const normalizedValue = valueRange > 0 ? (value - minValue) / valueRange : 0.5;
    return chartPadding.top + chartHeight - (normalizedValue * chartHeight);
  };

  const getX = (index: number) => {
    return chartPadding.left + (index * step);
  };

  let path = `M ${getX(0)} ${getY(data[0])}`;
  for (let i = 1; i < data.length; i++) {
    path += ` L ${getX(i)} ${getY(data[i])}`;
  }

  const gridLines = [];
  const ySteps = 5;
  
  for (let i = 0; i <= ySteps; i++) {
    const value = minValue + ((maxValue - minValue) / ySteps) * i;
    const y = getY(value);
    
    gridLines.push(
      <G key={`grid-y-${i}`}>
        <Line
          x1={chartPadding.left}
          y1={y}
          x2={width - chartPadding.right}
          y2={y}
          stroke="#eee"
          strokeWidth={1}
          strokeDasharray="4 4"
        />
        <SvgText
          x={chartPadding.left - 10}
          y={y + 4}
          fill="#666"
          fontSize="10"
          textAnchor="end"
        >
          {Math.round(value)}
        </SvgText>
      </G>
    );
  }

  const xLabels = [];
  const xStep = Math.ceil(data.length / 5);
  
  for (let i = 0; i < data.length; i += xStep) {
    xLabels.push(
      <SvgText
        key={`label-x-${i}`}
        x={getX(i)}
        y={height - chartPadding.bottom + 15}
        fill="#666"
        fontSize="10"
        textAnchor="middle"
      >
        {i}s
      </SvgText>
    );
  }

  return (
    <View style={[styles.container, { width, height }]}>
      <Svg width={width} height={height}>
        <G>
          <Line
            x1={chartPadding.left}
            y1={chartPadding.top}
            x2={chartPadding.left}
            y2={height - chartPadding.bottom}
            stroke="#333"
            strokeWidth={1}
          />
          
          <Line
            x1={chartPadding.left}
            y1={height - chartPadding.bottom}
            x2={width - chartPadding.right}
            y2={height - chartPadding.bottom}
            stroke="#333"
            strokeWidth={1}
          />
          
          {gridLines}
          {xLabels}
        </G>
        
        <Path
          d={path}
          fill="none"
          stroke="#e53935"
          strokeWidth={3}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        
        {data.map((value, index) => (
          <G key={`point-${index}`}>
            <Circle
              cx={getX(index)}
              cy={getY(value)}
              r={4}
              fill="#e53935"
            />
            <SvgText
              x={getX(index)}
              y={getY(value) - 10}
              fill="#e53935"
              fontSize="10"
              textAnchor="middle"
            >
              {value}
            </SvgText>
          </G>
        ))}
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
});

export default CustomChart;
