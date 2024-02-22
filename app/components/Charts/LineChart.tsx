import React from 'react';
import { LinePath } from '@visx/shape';
import { Group } from '@visx/group';
import { scaleLinear } from '@visx/scale';
import { curveMonotoneX } from '@visx/curve';

// Dummy data
const data = [
  { x: 0, y: 5 },
  { x: 1, y: 9 },
  { x: 2, y: 7 },
  { x: 3, y: 5 },
  { x: 4, y: 3 },
  { x: 5, y: 4 },
  { x: 6, y: 2 },
  { x: 7, y: 3 },
  { x: 8, y: 2 },
  { x: 9, y: 4 },
];

// Accessors
const x = (d) => d.x;
const y = (d) => d.y;

// Dimensions
const width = 300;
const height = 100;
const margin = { top: 20, bottom: 20, left: 30, right: 30 };

// Scales
const xScale = scaleLinear({
  range: [margin.left, width - margin.right],
  domain: [Math.min(...data.map(x)), Math.max(...data.map(x))],
});
const yScale = scaleLinear({
  range: [height - margin.bottom, margin.top],
  domain: [Math.min(...data.map(y)), Math.max(...data.map(y))],
});

const LineChart = () => (
  <svg width={width} height={height}>
    <Group>
      <LinePath
        data={data.map((d) => {
          return { x: d.x, y: Math.random() * 10 };
        })}
        curve={curveMonotoneX}
        x={(d) => xScale(x(d))}
        y={(d) => yScale(y(d))}
        stroke='#4f95f0'
        strokeWidth={2}
        strokeLinecap='round'
        fill='none'
      />
    </Group>
  </svg>
);

export default LineChart;
