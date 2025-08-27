import { useMemo } from 'react'

const KPIChart = ({ title, data, type = 'line', className = '' }) => {
  const chartData = useMemo(() => {
    if (!data || data.length === 0) return []
    
    const maxValue = Math.max(...data.map(d => Math.max(d.stock, d.demand)))
    const minValue = 0
    const range = maxValue - minValue || 1

    return data.map((item, index) => ({
      ...item,
      stockPercent: ((item.stock - minValue) / range) * 100,
      demandPercent: ((item.demand - minValue) / range) * 100,
      x: (index / (data.length - 1)) * 100
    }))
  }, [data])

  const generatePath = (dataKey) => {
    if (chartData.length === 0) return ''
    
    const points = chartData.map(d => `${d.x},${100 - d[dataKey]}`)
    return `M ${points.join(' L ')}`
  }

  const getGradientColor = () => {
    if (title.includes('Stock')) return 'from-blue-500 to-blue-300'
    if (title.includes('Demand')) return 'from-red-500 to-red-300'
    if (title.includes('Fill')) return 'from-green-500 to-green-300'
    return 'from-gray-500 to-gray-300'
  }

  return (
    <div className={`bg-white p-6 rounded-lg shadow ${className}`}>
      <h3 className="text-sm font-medium text-gray-500 mb-4">{title}</h3>
      
      <div className="h-32 relative">
        {chartData.length > 0 ? (
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <defs>
              <linearGradient id={`gradient-${title}`} x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" className="stop-color-blue-500" stopOpacity="0.8"/>
                <stop offset="100%" className="stop-color-blue-500" stopOpacity="0.1"/>
              </linearGradient>
            </defs>
            
            <path
              d={`${generatePath('stockPercent')} L 100,100 L 0,100 Z`}
              fill={`url(#gradient-${title})`}
              className="opacity-30"
            />
            
            <path
              d={generatePath('stockPercent')}
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
              className="text-blue-600"
            />
            
            {title === 'Stock vs Demand Trend' && (
              <path
                d={generatePath('demandPercent')}
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
                className="text-red-500"
                strokeDasharray="2,2"
              />
            )}
            
            {chartData.map((point, index) => (
              <circle
                key={index}
                cx={point.x}
                cy={100 - point.stockPercent}
                r="0.8"
                fill="currentColor"
                className="text-blue-600"
              />
            ))}
          </svg>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            <span className="text-sm">No data available</span>
          </div>
        )}
      </div>

      {chartData.length > 0 && (
        <div className="mt-4 flex justify-between text-xs text-gray-500">
          <span>{chartData[0]?.date?.split('-').slice(1).join('/')}</span>
          <span>{chartData[chartData.length - 1]?.date?.split('-').slice(1).join('/')}</span>
        </div>
      )}
    </div>
  )
}

export default KPIChart
