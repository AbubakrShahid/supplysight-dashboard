import { useState, useMemo } from 'react'
import ProductCard from './ProductCard'
import SearchFilters from './SearchFilters'
import Pagination from './Pagination'
import BulkActions from './BulkActions'

const ProductsTable = ({ products, warehouses, onProductClick }) => {
  const [filters, setFilters] = useState({
    search: '',
    status: 'all',
    warehouse: 'all'
  })
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' })
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(25)
  const [selectedProducts, setSelectedProducts] = useState([])

  const filteredProducts = useMemo(() => {
    let filtered = [...products]

    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchLower) ||
        product.sku.toLowerCase().includes(searchLower) ||
        product.id.toLowerCase().includes(searchLower)
      )
    }

    if (filters.status !== 'all') {
      filtered = filtered.filter(product => {
        if (filters.status === 'healthy') return product.stock > product.demand
        if (filters.status === 'low') return product.stock === product.demand
        if (filters.status === 'critical') return product.stock < product.demand
        return true
      })
    }

    if (filters.warehouse !== 'all') {
      filtered = filtered.filter(product => product.warehouse === filters.warehouse)
    }

    if (sortConfig.key) {
      filtered.sort((a, b) => {
        const aValue = a[sortConfig.key]
        const bValue = b[sortConfig.key]
        
        if (typeof aValue === 'string') {
          return sortConfig.direction === 'asc' 
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue)
        }
        
        return sortConfig.direction === 'asc' 
          ? aValue - bValue 
          : bValue - aValue
      })
    }

    return filtered
  }, [products, filters, sortConfig])

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    return filteredProducts.slice(startIndex, startIndex + itemsPerPage)
  }, [filteredProducts, currentPage, itemsPerPage])

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage)

  const handleSort = (key) => {
    setSortConfig(prevConfig => ({
      key,
      direction: prevConfig.key === key && prevConfig.direction === 'asc' ? 'desc' : 'asc'
    }))
  }

  const handlePageChange = (page) => {
    setCurrentPage(page)
    setSelectedProducts([])
  }

  const handleItemsPerPageChange = (newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage)
    setCurrentPage(1)
    setSelectedProducts([])
  }

  const handleSelectProduct = (product) => {
    setSelectedProducts(prev => {
      const isSelected = prev.some(p => p.id === product.id)
      if (isSelected) {
        return prev.filter(p => p.id !== product.id)
      } else {
        return [...prev, product]
      }
    })
  }

  const handleSelectAll = () => {
    if (selectedProducts.length === paginatedProducts.length) {
      setSelectedProducts([])
    } else {
      setSelectedProducts([...paginatedProducts])
    }
  }

  const handleBulkAction = (action, products) => {
    console.log(`Bulk action ${action} on`, products)
    if (action === 'export') {
      setSelectedProducts([])
    }
  }

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return '↕️'
    return sortConfig.direction === 'asc' ? '↑' : '↓'
  }

  const getStatusStats = () => {
    const healthy = filteredProducts.filter(p => p.stock > p.demand).length
    const low = filteredProducts.filter(p => p.stock === p.demand).length
    const critical = filteredProducts.filter(p => p.stock < p.demand).length
    return { healthy, low, critical }
  }

  const stats = getStatusStats()
  const isAllSelected = paginatedProducts.length > 0 && selectedProducts.length === paginatedProducts.length

  return (
    <div className="space-y-6">
      <SearchFilters 
        onFiltersChange={setFilters}
        warehouses={warehouses}
      />

      <BulkActions
        selectedProducts={selectedProducts}
        onBulkAction={handleBulkAction}
        onClearSelection={() => setSelectedProducts([])}
      />

      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-900">
              Products ({filteredProducts.length})
            </h3>
            <div className="flex space-x-4 text-sm">
              <span className="text-green-600">● {stats.healthy} Healthy</span>
              <span className="text-yellow-600">● {stats.low} Low</span>
              <span className="text-red-600">● {stats.critical} Critical</span>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={isAllSelected}
                    onChange={handleSelectAll}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </th>
                <th className="px-6 py-3 text-left">
                  <button
                    onClick={() => handleSort('name')}
                    className="flex items-center text-xs font-medium text-gray-500 uppercase tracking-wider hover:text-gray-700"
                  >
                    Product {getSortIcon('name')}
                  </button>
                </th>
                <th className="px-6 py-3 text-left">
                  <button
                    onClick={() => handleSort('warehouse')}
                    className="flex items-center text-xs font-medium text-gray-500 uppercase tracking-wider hover:text-gray-700"
                  >
                    Warehouse {getSortIcon('warehouse')}
                  </button>
                </th>
                <th className="px-6 py-3 text-right">
                  <button
                    onClick={() => handleSort('stock')}
                    className="flex items-center justify-end text-xs font-medium text-gray-500 uppercase tracking-wider hover:text-gray-700"
                  >
                    Stock {getSortIcon('stock')}
                  </button>
                </th>
                <th className="px-6 py-3 text-right">
                  <button
                    onClick={() => handleSort('demand')}
                    className="flex items-center justify-end text-xs font-medium text-gray-500 uppercase tracking-wider hover:text-gray-700"
                  >
                    Demand {getSortIcon('demand')}
                  </button>
                </th>
                <th className="px-6 py-3 text-center">
                  <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedProducts.map(product => {
                const getStatus = () => {
                  if (product.stock > product.demand) return { label: 'Healthy', color: 'bg-green-100 text-green-800' }
                  if (product.stock === product.demand) return { label: 'Low', color: 'bg-yellow-100 text-yellow-800' }
                  return { label: 'Critical', color: 'bg-red-100 text-red-800' }
                }
                const status = getStatus()
                const isSelected = selectedProducts.some(p => p.id === product.id)

                return (
                  <tr 
                    key={product.id}
                    className={`hover:bg-gray-50 cursor-pointer ${isSelected ? 'bg-blue-50' : ''}`}
                  >
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => handleSelectProduct(product)}
                        onClick={(e) => e.stopPropagation()}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                    </td>
                    <td className="px-6 py-4" onClick={() => onProductClick?.(product)}>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{product.name}</div>
                        <div className="text-sm text-gray-500">SKU: {product.sku}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900" onClick={() => onProductClick?.(product)}>
                      {product.warehouse}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 text-right font-medium" onClick={() => onProductClick?.(product)}>
                      {product.stock.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 text-right font-medium" onClick={() => onProductClick?.(product)}>
                      {product.demand.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-center" onClick={() => onProductClick?.(product)}>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${status.color}`}>
                        {status.label}
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {paginatedProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-lg mb-2">📦</div>
            <p className="text-gray-500">No products match your current filters</p>
            <p className="text-sm text-gray-400 mt-1">Try adjusting your search criteria</p>
          </div>
        )}

        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={filteredProducts.length}
            itemsPerPage={itemsPerPage}
            onPageChange={handlePageChange}
            onItemsPerPageChange={handleItemsPerPageChange}
          />
        )}
      </div>
    </div>
  )
}

export default ProductsTable
