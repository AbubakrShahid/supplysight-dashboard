const TopBar = ({ currentPage, selectedRange, onRangeChange, user }) => {
  const getPageTitle = () => {
    const titles = {
      dashboard: 'Dashboard',
      products: 'Products',
      warehouses: 'Warehouses', 
      analytics: 'Analytics',
      settings: 'Settings'
    }
    return titles[currentPage] || 'Dashboard'
  }

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="flex items-center justify-between h-16 px-6">
        <div className="flex items-center">
          <h2 className="text-xl font-semibold text-gray-900 ml-12 lg:ml-0">
            {getPageTitle()}
          </h2>
        </div>

        <div className="flex items-center space-x-4">
          {currentPage === 'dashboard' && (
            <div className="flex space-x-2">
              {['7d', '14d', '30d'].map(range => (
                <button
                  key={range}
                  onClick={() => onRangeChange(range)}
                  className={`px-3 py-1 text-sm rounded-md transition-colors ${
                    selectedRange === range
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>
          )}

          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-gray-600">
                {user?.name?.charAt(0) || 'U'}
              </span>
            </div>
            <span className="text-sm text-gray-700 hidden sm:block">
              {user?.name || 'User'}
            </span>
          </div>
        </div>
      </div>
    </header>
  )
}

export default TopBar
