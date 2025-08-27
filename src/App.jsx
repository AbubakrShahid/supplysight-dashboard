import { useState } from 'react'
import { useKPIs } from './hooks/useKPIs'
import KPICard from './components/KPICard'
import ProductCard from './components/ProductCard'

function App() {
  const [selectedRange, setSelectedRange] = useState('7d')
  const { kpis, products, loading, error } = useKPIs(selectedRange)

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-gray-600 mt-4">Loading SupplySight Dashboard...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 text-xl mb-2">⚠️ Connection Error</div>
          <p className="text-gray-600">
            Unable to connect to GraphQL server: {error.message}
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Make sure the server is running on port 4000
          </p>
        </div>
      </div>
    )
  }

  const handleProductClick = (product) => {
    console.log('Product clicked:', product)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">SupplySight</h1>
            </div>
            <div className="flex space-x-2">
              {['7d', '14d', '30d'].map(range => (
                <button
                  key={range}
                  onClick={() => setSelectedRange(range)}
                  className={`px-3 py-1 text-sm rounded-md transition-colors ${
                    selectedRange === range
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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
              <h2 className="text-lg font-semibold text-gray-900">
                Products ({products.length})
              </h2>
              <div className="flex space-x-4 text-sm">
                <span className="text-green-600">
                  ● {kpis.healthyProducts} Healthy
                </span>
                <span className="text-yellow-600">
                  ● {kpis.lowProducts} Low
                </span>
                <span className="text-red-600">
                  ● {kpis.criticalProducts} Critical
                </span>
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
      </main>
    </div>
  )
}

export default App
