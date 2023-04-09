
import styled from "styled-components";

const cleanPercentage = (percentage) => {
  const isNegativeOrNaN = !Number.isFinite(+percentage) || percentage < 0; // we can set non-numbers to 0 here
  const isTooHigh = percentage > 100;
  return isNegativeOrNaN ? 0 : isTooHigh ? 100 : +percentage;
};

const Circle = ({ color, percentage }) => {
  const r = 40;
  const circ = 2 * Math.PI * r;
  const strokePct = ((100 - percentage) * circ) / 100; // where stroke will start, e.g. from 15% to 100%.
  return (
    <circle
      r={r}
      cx={100}
      cy={100}
      fill="transparent"
      stroke={strokePct !== circ ? color : ""} // remove colour as 0% sets full circumference
      strokeWidth={"1rem"}
      strokeDasharray={circ}
      strokeDashoffset={percentage ? strokePct : 0}
    ></circle>
  );
};

const Text = ({ percentage }) => {
  return (
    <text
      x="50%"
      y="50%"
      dominantBaseline="central"
      textAnchor="middle"
      fontSize={"1.5em"}
    >
      {percentage.toFixed(0)}%
    </text>
  );
};

function ProgressCircle ({ percentage, color }) {
  // console.log('progress circle rendered')
  const pct = cleanPercentage(percentage);
  return (
    <svg className="progressCircle" width={200} height={200}>
      <g transform={`rotate(-90 ${"100 100"})`}>
        <Circle color="lightgrey"/>
        {pct > 0 ? <Circle color={color} percentage={pct} /> : <></>}
      </g>
      <Text percentage={pct} />
    </svg>
  );
};


export default ProgressCircle
