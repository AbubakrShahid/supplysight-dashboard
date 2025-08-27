import { useState } from 'react'

function App() {
  const [selectedRange, setSelectedRange] = useState('7d')

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
                  className={`px-3 py-1 text-sm rounded-md ${
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-sm font-medium text-gray-500">Total Stock</h3>
            <p className="text-2xl font-bold text-gray-900">334</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-sm font-medium text-gray-500">Total Demand</h3>
            <p className="text-2xl font-bold text-gray-900">400</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-sm font-medium text-gray-500">Fill Rate</h3>
            <p className="text-2xl font-bold text-gray-900">83.5%</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Products</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-medium">12mm Hex Bolt</h4>
                  <p className="text-sm text-gray-500">SKU: HEX-12-100 • BLR-A</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm">Stock: 180</span>
                    <span className="text-sm">Demand: 120</span>
                    <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                      Healthy
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center p-4 bg-red-50 rounded-lg">
                <div>
                  <h4 className="font-medium">Steel Washer</h4>
                  <p className="text-sm text-gray-500">SKU: WSR-08-500 • BLR-A</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm">Stock: 50</span>
                    <span className="text-sm">Demand: 80</span>
                    <span className="px-2 py-1 text-xs bg-red-100 text-red-800 rounded-full">
                      Critical
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center text-gray-500">
          <p>✅ Module 1 Complete: React + Tailwind + GraphQL Setup</p>
          <p className="text-sm">Selected Range: {selectedRange}</p>
        </div>
      </main>
    </div>
  )
}

export default App
