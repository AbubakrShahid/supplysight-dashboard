const ProductCard = ({ product, onClick }) => {
  const getStatus = () => {
    if (product.stock > product.demand) return { label: 'Healthy', color: 'bg-green-100 text-green-800' }
    if (product.stock === product.demand) return { label: 'Low', color: 'bg-yellow-100 text-yellow-800' }
    return { label: 'Critical', color: 'bg-red-100 text-red-800' }
  }

  const status = getStatus()
  const bgColor = product.stock < product.demand ? 'bg-red-50' : 'bg-gray-50'

  return (
    <div 
      className={`flex justify-between items-center p-4 ${bgColor} rounded-lg cursor-pointer hover:shadow-md transition-shadow`}
      onClick={() => onClick?.(product)}
    >
      <div>
        <h4 className="font-medium text-gray-900">{product.name}</h4>
        <p className="text-sm text-gray-500">
          SKU: {product.sku} • {product.warehouse}
        </p>
      </div>
      <div className="text-right">
        <div className="flex items-center space-x-4">
          <div className="text-sm">
            <span className="text-gray-600">Stock:</span>
            <span className="font-medium ml-1">{product.stock}</span>
          </div>
          <div className="text-sm">
            <span className="text-gray-600">Demand:</span>
            <span className="font-medium ml-1">{product.demand}</span>
          </div>
          <span className={`px-2 py-1 text-xs rounded-full font-medium ${status.color}`}>
            {status.label}
          </span>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
