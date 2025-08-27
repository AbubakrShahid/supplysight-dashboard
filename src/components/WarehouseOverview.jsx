const WarehouseOverview = ({ warehouses, products }) => {
  const getWarehouseStats = () => {
    return warehouses.map(warehouse => {
      const warehouseProducts = products.filter(p => p.warehouse === warehouse.code)
      const totalStock = warehouseProducts.reduce((sum, p) => sum + p.stock, 0)
      const totalDemand = warehouseProducts.reduce((sum, p) => sum + p.demand, 0)
      const criticalCount = warehouseProducts.filter(p => p.stock < p.demand).length
      
      return {
        ...warehouse,
        productCount: warehouseProducts.length,
        totalStock,
        totalDemand,
        criticalCount,
        utilizationRate: totalDemand > 0 ? (totalStock / totalDemand * 100) : 0
      }
    })
  }

  const warehouseStats = getWarehouseStats()

  const getUtilizationColor = (rate) => {
    if (rate >= 100) return 'bg-green-500'
    if (rate >= 80) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Warehouse Overview</h3>
      </div>
      
      <div className="p-6">
        <div className="space-y-4">
          {warehouseStats.map(warehouse => (
            <div key={warehouse.code} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex-1">
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{warehouse.name}</h4>
                    <p className="text-sm text-gray-500">{warehouse.city}, {warehouse.country}</p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-6 text-sm">
                <div className="text-center">
                  <p className="font-medium text-gray-900">{warehouse.productCount}</p>
                  <p className="text-gray-500">Products</p>
                </div>
                
                <div className="text-center">
                  <p className="font-medium text-gray-900">{warehouse.totalStock.toLocaleString()}</p>
                  <p className="text-gray-500">Stock</p>
                </div>
                
                <div className="text-center">
                  <p className={`font-medium ${warehouse.criticalCount > 0 ? 'text-red-600' : 'text-green-600'}`}>
                    {warehouse.criticalCount}
                  </p>
                  <p className="text-gray-500">Critical</p>
                </div>
                
                <div className="flex items-center space-x-2">
                  <div className="w-16 bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${getUtilizationColor(warehouse.utilizationRate)}`}
                      style={{ width: `${Math.min(warehouse.utilizationRate, 100)}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-600 w-12">
                    {warehouse.utilizationRate.toFixed(0)}%
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default WarehouseOverview
