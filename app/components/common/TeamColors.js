import React, { useEffect, useState } from "react";

const TeamColors = ({ teamColors }) => {
  const baseRadius = 25;

  const calculateRadius = (index, totalColors) => {
    const maxRadius = baseRadius;
    const minRadius = 8;

    const step = (maxRadius - minRadius) / (totalColors - 1);
    return maxRadius - index * step;
  };

  const [circleData, setCircleData] = useState([]);

  useEffect(() => {
    const circles = teamColors.map((color, index) => {
      const radius = calculateRadius(index, teamColors.length);
      return { radius, color };
    });

    setCircleData(circles);
  }, [teamColors]);

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <div style={{ position: 'relative', width: baseRadius * 2, height: baseRadius * 2 }}>
        {circleData.map((circle, index) => (
          <div
            key={index}
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: circle.radius * 2,
              height: circle.radius * 2,
              borderRadius: "50%",
              backgroundColor: circle.color,
              zIndex: index + 1,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default TeamColors;
