'use client';

import React, { useState } from 'react';
import { LinePath, Bar } from '@visx/shape';
import { Group } from '@visx/group';
import { scaleLinear } from '@visx/scale';
import { curveMonotoneX } from '@visx/curve';
import { TooltipWithBounds } from '@visx/tooltip';
import { tooltipStyles } from './helpers';

interface LineChartProps {
  data: any[];
  xLabel: string;
  yLabel: string;
  tooltipTitle: string;
}
/**
 *
 * @dev have a hidden bar chart as the tooltip implementation on a line chart was too thin and not good enough
 * if for any reason switching back to the normal recommended implementation is needed, the easies way to do that is to copy the stacksmetrics implementation
 */
const LineChart = ({ data, xLabel, yLabel, tooltipTitle }: LineChartProps) => {
  const [tooltipData, setTooltipData] = useState(null);
  const [tooltipTop, setTooltipTop] = useState(0);
  const [tooltipLeft, setTooltipLeft] = useState(0);

  if (!data || !data.length || !xLabel || !yLabel) return null;
  // Accessors
  const xAccessor = (d) => d[xLabel];
  const yAccessor = (d) => d[yLabel];

  // Dimensions
  const width = 300;
  const height = 100;
  const margin = { top: 20, bottom: 20, left: 0, right: 30 };

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

  const handleTooltip = (
    event: React.MouseEvent<SVGRectElement, MouseEvent>,
    d: any
  ) => {
    const y = event.clientY;
    const x = event.clientX;
    setTooltipData(
      <div>
        <strong className='m-1 text-cyan-600'>{tooltipTitle} : </strong>
        <p className='m-2'>
          {xLabel.replace('_', ' ')}: {d[xLabel].toLocaleString()}
        </p>
        <p className='m-2'>
          {yLabel.replace('_', ' ')}: {d[yLabel].toLocaleString()}
        </p>
      </div>
    );
    setTooltipTop(y);
    setTooltipLeft(x);
  };

  return (
    <div>
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
          {data.map((d) => {
            const barWidth = width / data.length;
            const barHeight = height;
            const barX = xScale(d[xLabel]);
            const barY = height - barHeight;
            return (
              <Bar
                key={d[xLabel]}
                x={barX}
                y={barY}
                width={barWidth}
                height={barHeight}
                fill='transparent'
                onMouseOver={(event) => handleTooltip(event, d)}
                onMouseMove={(event) => handleTooltip(event, d)}
                onMouseOut={() => setTooltipData(null)}
              />
            );
          })}
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
};

export default LineChart;
