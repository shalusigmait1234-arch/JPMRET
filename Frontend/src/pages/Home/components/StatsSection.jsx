import React, { useEffect, useState } from 'react';
import { useGetStatsQuery } from '../../../store/api/contentApi';

const defaultStats = [
  { label: "Projects completed", value: 300, target: "+" },
  { label: "Communities supported", value: 250, target: "+" },
  { label: "Volunteers engaged", value: 550, target: "+" },
  { label: "Beneficiaries reached", value: 500, target: "+" }
];

// ✅ Convert text to Normal Case (First Capital)
const formatLabel = (text) => {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

// ✅ Counter
const Counter = ({ end }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 2000;
    const increment = end / (duration / 20);

    const timer = setInterval(() => {
      start += increment;

      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 20);

    return () => clearInterval(timer);
  }, [end]);

  return count;
};

const StatsSection = () => {
  const { data: dynamicStats } = useGetStatsQuery();

  const stats =
    dynamicStats && dynamicStats.length > 0
      ? dynamicStats
      : defaultStats;

  return (
    <div
      className="relative w-full py-10 md:py-14 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/assets/img/banner/counter-bg.jpg')"
      }}
    >
      <div className="absolute inset-0 bg-black/40"></div>

      <div className="relative max-w-[1200px] mx-auto px-4">

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">

          {stats.map((stat, i) => (
            <div key={stat._id || i}>

              {/* NUMBER */}
              <div className="flex items-end justify-center gap-1">

                <h2 className="text-4xl md:text-6xl lg:text-7xl !text-white font-semibold">
                  <Counter end={Number(stat.value)} />
                </h2>

                <span className="text-5xl md:text-6xl lg:text-7xl text-white font-light">
                  {stat.target}
                </span>

              </div>

              {/* LABEL */}
              <p className="mt-3 text-xs md:text-sm font-medium text-white tracking-wide">
                {formatLabel(stat.label)}
              </p>

            </div>
          ))}

        </div>
      </div>
    </div>
  );
};

export default StatsSection;