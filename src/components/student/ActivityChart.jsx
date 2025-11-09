import { Calendar } from "lucide-react";
import { useState } from "react";

export default function ActivityChart({ data, onDateRangeChange }) {
  const [dateRange, setDateRange] = useState("7days");

  const dateRangeOptions = [
    { value: "7days", label: "7 ngày" },
    { value: "30days", label: "30 ngày" },
    { value: "90days", label: "90 ngày" },
  ];

  const maxActivity = Math.max(...data.map((d) => d.value), 100); // Đảm bảo scale tối đa là 100

  // Calculate linear regression for trend line
  const calculateTrendLine = () => {
    const n = data.length;
    let sumX = 0,
      sumY = 0,
      sumXY = 0,
      sumX2 = 0;

    data.forEach((item, index) => {
      sumX += index;
      sumY += item.value;
      sumXY += index * item.value;
      sumX2 += index * index;
    });

    const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
    const intercept = (sumY - slope * sumX) / n;

    return { slope, intercept };
  };

  const { slope, intercept } = calculateTrendLine();

  const handleDateRangeChange = (value) => {
    setDateRange(value);
    onDateRangeChange?.(value);
  };

  return (
    <div className="bg-[#0f1419] border border-[#202934] rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-white font-bold text-lg">Biểu đồ điểm số</h3>

        {/* Date Range Selector */}
        <div className="flex items-center gap-2">
          <Calendar size={18} className="text-gray-400" />
          <select
            value={dateRange}
            onChange={(e) => handleDateRangeChange(e.target.value)}
            className="bg-[#0b0f12] border border-[#202934] text-white text-sm rounded-lg px-3 py-1.5 focus:border-emerald-500 focus:outline-none cursor-pointer"
          >
            {dateRangeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Area Chart with Smooth Curve */}
      <div className="relative h-64">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="overflow-visible"
        >
          {/* Y-axis Labels */}
          <g className="text-xs">
            {[100, 75, 50, 25, 0].map((value, index) => (
              <text
                key={value}
                x="-2"
                y={index * 25 + 2}
                fill="#6b7280"
                fontSize="3"
                textAnchor="end"
              >
                {value}
              </text>
            ))}
          </g>

          {/* Grid Lines */}
          {[0, 25, 50, 75, 100].map((percent) => (
            <line
              key={percent}
              x1="0"
              y1={100 - percent}
              x2="100"
              y2={100 - percent}
              stroke="#202934"
              strokeWidth="0.3"
              strokeDasharray="1"
              vectorEffect="non-scaling-stroke"
            />
          ))}

          {/* Gradient Definition */}
          <defs>
            <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.05" />
            </linearGradient>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
            <linearGradient
              id="trendGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#34d399" stopOpacity="0.5" />
            </linearGradient>
          </defs>

          {/* Area Fill */}
          <path
            d={`
              M ${data
                .map((item, index) => {
                  const x = (index / (data.length - 1)) * 100;
                  const y = 100 - (item.value / maxActivity) * 80 - 10;
                  return `${x},${y}`;
                })
                .join(" L ")}
              L 100,100 L 0,100 Z
            `}
            fill="url(#areaGradient)"
          />

          {/* Trend Line (Linear Regression) */}
          <line
            x1="0"
            y1={100 - (intercept / maxActivity) * 80 - 10}
            x2="100"
            y2={
              100 -
              ((slope * (data.length - 1) + intercept) / maxActivity) * 80 -
              10
            }
            stroke="url(#trendGradient)"
            strokeWidth="0.5"
            strokeDasharray="2 1"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />

          {/* Line */}
          <polyline
            points={data
              .map((item, index) => {
                const x = (index / (data.length - 1)) * 100;
                const y = 100 - (item.value / maxActivity) * 80 - 10;
                return `${x},${y}`;
              })
              .join(" ")}
            fill="none"
            stroke="url(#lineGradient)"
            strokeWidth="0.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
          />

          {/* Data Points */}
          {data.map((item, index) => {
            const x = (index / (data.length - 1)) * 100;
            const y = 100 - (item.value / maxActivity) * 80 - 10;
            return (
              <g key={index}>
                <circle
                  cx={x}
                  cy={y}
                  r="1.2"
                  fill="#3b82f6"
                  stroke="#0f1419"
                  strokeWidth="0.5"
                  className="cursor-pointer transition-all hover:r-2"
                  vectorEffect="non-scaling-stroke"
                />
                <circle
                  cx={x}
                  cy={y}
                  r="2.5"
                  fill="transparent"
                  className="cursor-pointer"
                >
                  <title>{`${item.day}: ${item.value} điểm`}</title>
                </circle>
              </g>
            );
          })}
        </svg>

        {/* X-axis Labels */}
        <div className="flex justify-between mt-4 px-2">
          {data.map((item, index) => (
            <div key={index} className="text-gray-400 text-xs text-center">
              {item.day}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
