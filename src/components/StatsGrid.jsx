const StatsGrid = ({ kpis, products }) => {
  const stats = [
    {
      title: 'Avg Fill Rate',
      value: `${kpis.fillRate.toFixed(1)}%`,
      change: '+2.4%',
      trend: 'up',
      description: 'vs last period'
    },
    {
      title: 'Critical Items',
      value: kpis.criticalProducts,
      change: '-1',
      trend: 'down',
      description: 'items resolved'
    },
    {
      title: 'Total Warehouses',
      value: '3',
      change: '0',
      trend: 'neutral',
      description: 'active locations'
    },
    {
      title: 'Stock Turnover',
      value: '2.8x',
      change: '+0.3x',
      trend: 'up',
      description: 'monthly average'
    }
  ]

  const getTrendIcon = (trend) => {
    if (trend === 'up') return '↗️'
    if (trend === 'down') return '↘️'
    return '➡️'
  }

  const getTrendColor = (trend) => {
    if (trend === 'up') return 'text-green-600'
    if (trend === 'down') return 'text-red-600'
    return 'text-gray-600'
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-500">{stat.title}</h3>
            <span className="text-lg">{getTrendIcon(stat.trend)}</span>
          </div>
          
          <div className="flex items-end justify-between">
            <div>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-xs text-gray-600 mt-1">{stat.description}</p>
            </div>
            
            <div className={`text-sm font-medium ${getTrendColor(stat.trend)}`}>
              {stat.change}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default StatsGrid
