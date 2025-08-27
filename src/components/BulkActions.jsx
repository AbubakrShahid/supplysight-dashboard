const BulkActions = ({ selectedProducts, onBulkAction, onClearSelection }) => {
  const handleExport = (format) => {
    const data = selectedProducts.map(product => ({
      ID: product.id,
      Name: product.name,
      SKU: product.sku,
      Warehouse: product.warehouse,
      Stock: product.stock,
      Demand: product.demand,
      Status: product.stock > product.demand ? 'Healthy' : product.stock === product.demand ? 'Low' : 'Critical'
    }))

    if (format === 'csv') {
      const headers = Object.keys(data[0]).join(',')
      const rows = data.map(row => Object.values(row).join(','))
      const csv = [headers, ...rows].join('\n')
      
      const blob = new Blob([csv], { type: 'text/csv' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `products-${new Date().toISOString().split('T')[0]}.csv`
      link.click()
      URL.revokeObjectURL(url)
    } else if (format === 'json') {
      const json = JSON.stringify(data, null, 2)
      const blob = new Blob([json], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `products-${new Date().toISOString().split('T')[0]}.json`
      link.click()
      URL.revokeObjectURL(url)
    }

    onBulkAction('export', selectedProducts)
  }

  const actions = [
    {
      id: 'export-csv',
      label: 'Export CSV',
      icon: '📄',
      action: () => handleExport('csv')
    },
    {
      id: 'export-json',
      label: 'Export JSON',
      icon: '📋',
      action: () => handleExport('json')
    },
    {
      id: 'update-demand',
      label: 'Update Demand',
      icon: '📊',
      action: () => onBulkAction('update-demand', selectedProducts)
    },
    {
      id: 'transfer-stock',
      label: 'Transfer Stock',
      icon: '🔄',
      action: () => onBulkAction('transfer-stock', selectedProducts)
    }
  ]

  if (selectedProducts.length === 0) return null

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <span className="text-sm font-medium text-blue-900">
            {selectedProducts.length} product{selectedProducts.length > 1 ? 's' : ''} selected
          </span>
          <button
            onClick={onClearSelection}
            className="text-sm text-blue-600 hover:text-blue-800 underline"
          >
            Clear selection
          </button>
        </div>

        <div className="flex items-center space-x-2">
          {actions.map(action => (
            <button
              key={action.id}
              onClick={action.action}
              className="flex items-center space-x-1 px-3 py-1 text-sm bg-white text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
              <span>{action.icon}</span>
              <span>{action.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default BulkActions
