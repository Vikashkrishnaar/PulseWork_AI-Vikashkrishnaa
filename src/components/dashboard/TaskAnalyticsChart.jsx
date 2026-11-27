import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'

export default function TaskAnalyticsChart({ statusData, colors, total }) {
  const activeStatuses = statusData.filter((item) => item.value > 0)

  return (
    <div className="chart-area">
      <div className="chart-wrap">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={activeStatuses}
              dataKey="value"
              nameKey="name"
              innerRadius={66}
              outerRadius={88}
              paddingAngle={4}
              stroke="none"
            >
              {activeStatuses.map((item) => (
                <Cell key={item.name} fill={colors[item.name]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
        <div className="chart-center"><strong>{total}</strong><span>total tasks</span></div>
      </div>
      <div className="chart-legend">
        {statusData.map((item) => (
          <div className="legend-row" key={item.name}>
            <span className="legend-color" style={{ backgroundColor: colors[item.name] }} />
            <span>{item.name}</span><strong>{item.value}</strong>
          </div>
        ))}
      </div>
    </div>
  )
}
