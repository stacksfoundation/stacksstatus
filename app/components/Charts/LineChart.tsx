import React from 'react';
import { LinePath } from '@visx/shape';
import { Group } from '@visx/group';
import { scaleLinear } from '@visx/scale';
import { curveMonotoneX } from '@visx/curve';

interface LineChartProps {
  data: any[];
  x: string;
  y: string;
}

const LineChart = ({ data, x, y }: LineChartProps) => {
  if (!data || !x || !y) return;
  // Accessors
  const xAccessor = (d) => d[x];
  const yAccessor = (d) => d[y];
  // Dimensions
  const width = 300;
  const height = 100;
  const margin = { top: 20, bottom: 20, left: 30, right: 30 };

  // Scales
  const xScale = scaleLinear({
    range: [margin.left, width - margin.right],
    domain: [
      Math.min(...data.map(xAccessor)),
      Math.max(...data.map(xAccessor)),
    ],
  });
  const yScale = scaleLinear({
    range: [height - margin.bottom, margin.top],
    domain: [
      Math.min(...data.map(yAccessor)),
      Math.max(...data.map(yAccessor)),
    ],
  });

  return (
    <svg width={width} height={height}>
      <Group>
        <LinePath
          data={data}
          curve={curveMonotoneX}
          x={(d) => xScale(xAccessor(d))}
          y={(d) => yScale(yAccessor(d))}
          stroke='#4f95f0'
          strokeWidth={2}
          strokeLinecap='round'
          fill='none'
        />
      </Group>
    </svg>
  );
};

export default LineChart;
