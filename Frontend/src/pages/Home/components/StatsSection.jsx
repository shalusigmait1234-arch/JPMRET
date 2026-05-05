import React from 'react';
import { useGetStatsQuery } from '../../../store/api/contentApi';

const defaultStats = [
  { label: "Projects completed", value: "300", target: "+" },
  { label: "Communities supported", value: "250", target: "+" },
  { label: "Volunteers engaged", value: "550", target: "+" },
  { label: "Beneficiaries reached", value: "500", target: "+" }
];

const StatsSection = () => {
  const { data: dynamicStats } = useGetStatsQuery();
  const stats = (dynamicStats && dynamicStats.length > 0) ? dynamicStats : defaultStats;

  return (
    <div className="counter-area">
      <div className="container">
        <div className="counter-bg">
          <div className="row">
            {stats.map((stat, i) => (
              <div key={stat._id || i} className="col-6 col-sm-6 col-lg-3">
                <div className="counter-item">
                  <h3>
                    <span className="odometer">{stat.value}</span>
                    <span className="target">{stat.target}</span>
                  </h3>
                  <p>{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsSection;
