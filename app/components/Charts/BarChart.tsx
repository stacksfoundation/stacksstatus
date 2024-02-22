'use client';

import React, { useState } from 'react';
import { Group } from '@visx/group';
import { Bar } from '@visx/shape';
import { scaleBand, scaleLinear } from '@visx/scale';
import { TooltipWithBounds, defaultStyles } from '@visx/tooltip';
import { AxisBottom, AxisLeft } from '@visx/axis';
import { BlockExecutionCost, blockLimits } from '../../../lib/util';

// Define the dimensions and margins of the graph
const margin = { top: 25, bottom: 25, left: 100, right: 20 };

// Accessors
const getName = (d) => d.name;

// Tooltip styles
const tooltipStyles = {
  ...defaultStyles,
  minWidth: 60,
  backgroundColor: 'rgba(0,0,0,0.9)',
  color: 'white',
};

const renderPercent = (num: number) => {
  return `${(Math.round(num * 100) / 100).toFixed(2)}%`;
};

export default function BarChart({
  data,
  width,
  height,
  blockCosts,
}: {
  width: number;
  height: number;
  data: { name: string; value: number }[];
  blockCosts: BlockExecutionCost;
}) {
  const [tooltipData, setTooltipData] = useState(null);
  const [tooltipTop, setTooltipTop] = useState(0);
  const [tooltipLeft, setTooltipLeft] = useState(0);

  const yMax = height - margin.bottom;

  const xScale = scaleLinear({
    domain: [0, 100],
    nice: true,
    round: true,
    range: [margin.left, width - margin.right],
  });

  const yScale = scaleBand({
    domain: data.map(getName),
    padding: 0.2,
    range: [margin.top, height - margin.bottom],
  });

  const handleMouseOver = (
    event: React.MouseEvent<SVGRectElement, MouseEvent>,
    d: { name: string; value: number }
  ) => {
    const y = event.clientY;
    const x = event.clientX;
    const key = d.name.replace(' ', '_').toLowerCase();
    setTooltipData(
      <div>
        <strong className='m-1 text-cyan-600'>{d.name} : </strong>
        <p className='m-2'>Bytes : {blockCosts[key].toString()}</p>
        <p className='m-2'>Block Limit : {blockLimits[key].toString()}</p>
        <p className='m-2'>{renderPercent(d.value)}</p>
      </div>
    );
    setTooltipTop(y);
    setTooltipLeft(x);
  };

  return (
    <div>
      <svg width={width} height={height}>
        <Group>
          <text
            x={width / 2}
            y={margin.top / 2}
            textAnchor='middle'
            style={{ fontSize: '16px', fontWeight: 'bold', fill: 'white' }}
          >
            Block Fullness (%)
          </text>
          {data.map((d) => (
            <Bar
              key={d.name}
              x={margin.left}
              y={yScale(d.name)}
              width={xScale(d.value) - margin.left}
              height={yScale.bandwidth()}
              fill='#4f95f0'
              onMouseOver={(event) => handleMouseOver(event, d)}
              onMouseOut={() => setTooltipData(null)}
            />
          ))}
          <AxisBottom
            top={yMax}
            tickValues={[0, 50, 100]}
            scale={xScale}
            stroke='#fff'
            tickStroke='#fff'
            tickLabelProps={{
              fill: '#fff',
              fontSize: 11,
              textAnchor: 'middle',
            }}
          />
          <AxisLeft
            hideAxisLine
            hideTicks
            scale={yScale}
            tickLabelProps={{
              fill: '#fff',
              fontSize: 14,
              textAnchor: 'start',
              dx: 10,
            }}
          />
        </Group>
      </svg>
      {tooltipData && (
        <TooltipWithBounds
          top={tooltipTop}
          left={tooltipLeft}
          style={tooltipStyles}
        >
          {tooltipData}
        </TooltipWithBounds>
      )}
    </div>
  );
}
