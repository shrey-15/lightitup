import React from 'react'

const CircularBar = (props) => {
  const size = props.size;
  const radius = (props.size - props.strokeWidth) / 2;
  const viewBox = `0 0 ${size} ${size}`;
  const dashArray = radius * Math.PI * 2;
  const dashOffset = dashArray - dashArray * props.value / props.max;
  const percentage = (props.value / props.max * 100).toFixed();

  return (
    <div className="flex justify-center items-center">
      <svg
        width={props.size}
        height={props.size}
        viewBox={viewBox}
      >
        <circle
          fill={'none'}
          stroke={'#ddd'}
          cx={props.size / 2}
          cy={props.size / 2}
          r={radius}
          strokeWidth={`${props.strokeWidth}px`} />
        <circle
          fill={'none'}
          stroke={props.stroke}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={dashArray}
          strokeDashoffset={dashOffset}
          cx={props.size / 2}
          cy={props.size / 2}
          r={radius}
          strokeWidth={`${props.strokeWidth}px`}
          transform={`rotate(-90 ${props.size / 2} ${props.size / 2})`}
        />
        <text
          x="50%"
          y="50%"
          dy="-1rem"
          textAnchor="middle"
          fill={props.stroke}
          style={
            {
              fontSize: '1rem',
              fontFamily: 'inherit',
              fontWeight: 'bold',
            }
          }
        >
          {props.text}
        </text>
        <text
          x="50%"
          y="50%"
          dy="2rem"
          textAnchor="middle"
          fill={props.stroke}
          style={
            {
              fill: '#4B5563',
              fontSize: '2.5rem',
              fontFamily: 'inherit',
            }
          }
        >
          {`${percentage}%`}
        </text>
      </svg>
    </div>
  )
}

CircularBar.defaultProps = {
  size: 250,
  value: 25,
  max: 100,
  strokeWidth: 15,
  stroke: 'red',
  text: ""
}

export default CircularBar




