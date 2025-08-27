import { useState } from 'react'

const ProductModal = ({ product, isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: product?.name || '',
    sku: product?.sku || '',
    warehouse: product?.warehouse || '',
    stock: product?.stock || 0,
    demand: product?.demand || 0
  })

  const [activeTab, setActiveTab] = useState('details')

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave({ ...product, ...formData })
    onClose()
  }

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const getStatus = () => {
    if (formData.stock > formData.demand) return { label: 'Healthy', color: 'text-green-600 bg-green-100' }
    if (formData.stock === formData.demand) return { label: 'Low Stock', color: 'text-yellow-600 bg-yellow-100' }
    return { label: 'Critical', color: 'text-red-600 bg-red-100' }
  }

  const status = getStatus()
  const fillRate = formData.demand > 0 ? (Math.min(formData.stock, formData.demand) / formData.demand * 100) : 0

  if (!isOpen || !product) return null

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={onClose}></div>
        
        <div className="relative bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-screen overflow-hidden">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">{product.name}</h2>
              <p className="text-sm text-gray-500">SKU: {product.sku}</p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl"
            >
              ✕
            </button>
          </div>

          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {['details', 'history', 'actions'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm capitalize ${
                    activeTab === tab
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6 max-h-96 overflow-y-auto">
            {activeTab === 'details' && (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Product Name
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      SKU
                    </label>
                    <input
                      type="text"
                      value={formData.sku}
                      onChange={(e) => handleChange('sku', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Warehouse
                    </label>
                    <select
                      value={formData.warehouse}
                      onChange={(e) => handleChange('warehouse', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="BLR-A">Bangalore A</option>
                      <option value="PNQ-C">Pune C</option>
                      <option value="DEL-B">Delhi B</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Current Status
                    </label>
                    <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${status.color}`}>
                      {status.label}
                    </span>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Stock Level
                    </label>
                    <input
                      type="number"
                      value={formData.stock}
                      onChange={(e) => handleChange('stock', parseInt(e.target.value) || 0)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Demand Forecast
                    </label>
                    <input
                      type="number"
                      value={formData.demand}
                      onChange={(e) => handleChange('demand', parseInt(e.target.value) || 0)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-3">Quick Stats</h4>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-2xl font-bold text-gray-900">{fillRate.toFixed(1)}%</p>
                      <p className="text-sm text-gray-600">Fill Rate</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900">{formData.stock - formData.demand}</p>
                      <p className="text-sm text-gray-600">Surplus/Deficit</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900">{Math.ceil(formData.stock / Math.max(formData.demand, 1))}d</p>
                      <p className="text-sm text-gray-600">Days of Stock</p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            )}

            {activeTab === 'history' && (
              <div className="space-y-4">
                <h4 className="text-lg font-medium text-gray-900">Recent Activity</h4>
                <div className="space-y-3">
                  {[
                    { date: '2025-08-26', action: 'Stock Updated', details: 'Stock increased from 160 to 180', user: 'Admin' },
                    { date: '2025-08-25', action: 'Demand Forecast', details: 'Demand updated to 120 units', user: 'System' },
                    { date: '2025-08-24', action: 'Warehouse Transfer', details: 'Transferred from DEL-B to BLR-A', user: 'Manager' },
                    { date: '2025-08-23', action: 'Product Created', details: 'Product added to inventory', user: 'Admin' }
                  ].map((item, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h5 className="font-medium text-gray-900">{item.action}</h5>
                          <span className="text-sm text-gray-500">{item.date}</span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{item.details}</p>
                        <p className="text-xs text-gray-500 mt-1">by {item.user}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'actions' && (
              <div className="space-y-6">
                <h4 className="text-lg font-medium text-gray-900">Quick Actions</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button className="p-4 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">📦</span>
                      <div>
                        <h5 className="font-medium text-gray-900">Restock Item</h5>
                        <p className="text-sm text-gray-600">Add inventory to this product</p>
                      </div>
                    </div>
                  </button>

                  <button className="p-4 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">🔄</span>
                      <div>
                        <h5 className="font-medium text-gray-900">Transfer Stock</h5>
                        <p className="text-sm text-gray-600">Move to another warehouse</p>
                      </div>
                    </div>
                  </button>

                  <button className="p-4 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">📊</span>
                      <div>
                        <h5 className="font-medium text-gray-900">Update Forecast</h5>
                        <p className="text-sm text-gray-600">Adjust demand prediction</p>
                      </div>
                    </div>
                  </button>

                  <button className="p-4 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">📈</span>
                      <div>
                        <h5 className="font-medium text-gray-900">View Analytics</h5>
                        <p className="text-sm text-gray-600">Detailed performance data</p>
                      </div>
                    </div>
                  </button>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <span className="text-yellow-600 text-lg">⚠️</span>
                    <div>
                      <h5 className="font-medium text-yellow-800">Stock Alert</h5>
                      <p className="text-sm text-yellow-700 mt-1">
                        This product is running low. Consider restocking soon to avoid stockouts.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductModal
