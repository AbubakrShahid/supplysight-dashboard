import { useQuery } from '@apollo/client'
import { GET_PRODUCTS, GET_WAREHOUSES } from './lib/apollo'

function App() {
  const { data: productsData, loading: productsLoading, error: productsError } = useQuery(GET_PRODUCTS);
  const { data: warehousesData, loading: warehousesLoading, error: warehousesError } = useQuery(GET_WAREHOUSES);

  if (productsLoading || warehousesLoading) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-lg">Loading SupplySight Dashboard...</div>
    </div>
  );

  if (productsError || warehousesError) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-lg text-red-600">
        Error: {productsError?.message || warehousesError?.message}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">SupplySight</h1>
            </div>
            <div className="flex space-x-2">
              <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md">7d</button>
              <button className="px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded-md">14d</button>
              <button className="px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded-md">30d</button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Test Data Display */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">Products ({productsData?.products?.length || 0})</h2>
            <div className="space-y-2">
              {productsData?.products?.slice(0, 3).map(product => (
                <div key={product.id} className="text-sm">
                  <span className="font-medium">{product.name}</span> - 
                  <span className="text-gray-600"> Stock: {product.stock}, Demand: {product.demand}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">Warehouses ({warehousesData?.warehouses?.length || 0})</h2>
            <div className="space-y-2">
              {warehousesData?.warehouses?.map(warehouse => (
                <div key={warehouse.code} className="text-sm">
                  <span className="font-medium">{warehouse.name}</span> - 
                  <span className="text-gray-600"> {warehouse.city}, {warehouse.country}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 text-center text-gray-600">
          <p>✅ Module 1 Complete: Project Setup with React + Tailwind + GraphQL</p>
          <p className="text-sm mt-2">Ready to implement the dashboard modules!</p>
        </div>
      </main>
    </div>
  )
}

export default App
