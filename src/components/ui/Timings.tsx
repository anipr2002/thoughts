import React, { useState, useEffect } from "react";

const Timings = () => {
  const [date, setDate] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setDate(new Date()), 1000);
    return function cleanup() {
      clearInterval(timer);
    };
  });

  return <div className="font-mono text-2xl">{date.toLocaleTimeString()}</div>;
};

export default Timings;
