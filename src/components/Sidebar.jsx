import { useState } from 'react'

const Sidebar = ({ currentPage, onPageChange }) => {
  const [isOpen, setIsOpen] = useState(false)

  const menuItems = [
    { id: 'dashboard', name: 'Dashboard', icon: '📊' },
    { id: 'products', name: 'Products', icon: '📦' },
    { id: 'warehouses', name: 'Warehouses', icon: '🏢' },
    { id: 'analytics', name: 'Analytics', icon: '📈' },
    { id: 'settings', name: 'Settings', icon: '⚙️' }
  ]

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-md shadow-md"
      >
        <span className="text-xl">{isOpen ? '✕' : '☰'}</span>
      </button>

      <div className={`fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-center h-16 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-900">SupplySight</h1>
        </div>
        
        <nav className="mt-8">
          {menuItems.map(item => (
            <button
              key={item.id}
              onClick={() => {
                onPageChange(item.id)
                setIsOpen(false)
              }}
              className={`w-full flex items-center px-6 py-3 text-left hover:bg-gray-50 transition-colors ${
                currentPage === item.id ? 'bg-blue-50 border-r-2 border-blue-600 text-blue-600' : 'text-gray-700'
              }`}
            >
              <span className="mr-3 text-lg">{item.icon}</span>
              {item.name}
            </button>
          ))}
        </nav>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  )
}

export default Sidebar
