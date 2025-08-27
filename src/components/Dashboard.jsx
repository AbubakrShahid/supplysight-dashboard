import { useKPIs } from '../hooks/useKPIs'
import KPICard from './KPICard'
import ProductCard from './ProductCard'

const Dashboard = ({ selectedRange }) => {
  const { kpis, products, loading, error } = useKPIs(selectedRange)

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-gray-600 mt-4">Loading dashboard data...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <div className="text-red-600 text-lg font-medium mb-2">Connection Error</div>
        <p className="text-red-700">Unable to load dashboard data: {error.message}</p>
      </div>
    )
  }

  const handleProductClick = (product) => {
    console.log('Product clicked:', product)
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title="Total Stock"
          value={kpis.totalStock.toLocaleString()}
          subtitle="Units in inventory"
        />
        <KPICard
          title="Total Demand"
          value={kpis.totalDemand.toLocaleString()}
          subtitle="Units requested"
        />
        <KPICard
          title="Fill Rate"
          value={`${kpis.fillRate.toFixed(1)}%`}
          subtitle="Demand fulfillment"
          className={kpis.fillRate < 80 ? 'border-l-4 border-red-500' : 'border-l-4 border-green-500'}
        />
        <KPICard
          title="Product Status"
          value={`${kpis.criticalProducts}/${products.length}`}
          subtitle="Critical products"
          className={kpis.criticalProducts > 0 ? 'border-l-4 border-red-500' : 'border-l-4 border-green-500'}
        />
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-900">
              Products ({products.length})
            </h3>
            <div className="flex space-x-4 text-sm">
              <span className="text-green-600">● {kpis.healthyProducts} Healthy</span>
              <span className="text-yellow-600">● {kpis.lowProducts} Low</span>
              <span className="text-red-600">● {kpis.criticalProducts} Critical</span>
            </div>
          </div>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {products.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onClick={handleProductClick}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
