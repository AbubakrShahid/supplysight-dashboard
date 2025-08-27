import { useState } from 'react'
import Sidebar from './components/Sidebar'
import TopBar from './components/TopBar'
import Dashboard from './components/Dashboard'
import ProductsPage from './components/ProductsPage'

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard')
  const [selectedRange, setSelectedRange] = useState('7d')
  
  const user = { name: 'Admin User' }

  const renderContent = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard selectedRange={selectedRange} />
      case 'products':
        return <ProductsPage />
      default:
        return <Dashboard selectedRange={selectedRange} />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar currentPage={currentPage} onPageChange={setCurrentPage} />
      
      <div className="flex-1 flex flex-col lg:ml-0">
        <TopBar
          currentPage={currentPage}
          selectedRange={selectedRange}
          onRangeChange={setSelectedRange}
          user={user}
        />
        
        <main className="flex-1 p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  )
}

export default App
