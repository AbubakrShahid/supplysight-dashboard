import { useState } from 'react'

const SearchFilters = ({ onFiltersChange, warehouses }) => {
  const [filters, setFilters] = useState({
    search: '',
    status: 'all',
    warehouse: 'all'
  })

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    onFiltersChange(newFilters)
  }

  const clearFilters = () => {
    const clearedFilters = { search: '', status: 'all', warehouse: 'all' }
    setFilters(clearedFilters)
    onFiltersChange(clearedFilters)
  }

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'healthy', label: 'Healthy' },
    { value: 'low', label: 'Low Stock' },
    { value: 'critical', label: 'Critical' }
  ]

  const hasActiveFilters = filters.search || filters.status !== 'all' || filters.warehouse !== 'all'

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Search Products
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="Search by name, SKU, or ID..."
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-400">🔍</span>
            </div>
          </div>
        </div>

        <div className="lg:w-48">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Status Filter
          </label>
          <select
            value={filters.status}
            onChange={(e) => handleFilterChange('status', e.target.value)}
            className="w-full py-2 px-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {statusOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="lg:w-48">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Warehouse
          </label>
          <select
            value={filters.warehouse}
            onChange={(e) => handleFilterChange('warehouse', e.target.value)}
            className="w-full py-2 px-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Warehouses</option>
            {warehouses.map(warehouse => (
              <option key={warehouse.code} value={warehouse.code}>
                {warehouse.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-end">
          <button
            onClick={clearFilters}
            disabled={!hasActiveFilters}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              hasActiveFilters
                ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                : 'bg-gray-50 text-gray-400 cursor-not-allowed'
            }`}
          >
            Clear Filters
          </button>
        </div>
      </div>

      {hasActiveFilters && (
        <div className="mt-4 flex flex-wrap gap-2">
          {filters.search && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
              Search: "{filters.search}"
              <button
                onClick={() => handleFilterChange('search', '')}
                className="ml-2 text-blue-600 hover:text-blue-800"
              >
                ✕
              </button>
            </span>
          )}
          {filters.status !== 'all' && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800">
              Status: {statusOptions.find(s => s.value === filters.status)?.label}
              <button
                onClick={() => handleFilterChange('status', 'all')}
                className="ml-2 text-green-600 hover:text-green-800"
              >
                ✕
              </button>
            </span>
          )}
          {filters.warehouse !== 'all' && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-purple-100 text-purple-800">
              Warehouse: {warehouses.find(w => w.code === filters.warehouse)?.name}
              <button
                onClick={() => handleFilterChange('warehouse', 'all')}
                className="ml-2 text-purple-600 hover:text-purple-800"
              >
                ✕
              </button>
            </span>
          )}
        </div>
      )}
    </div>
  )
}

export default SearchFilters
