# SupplySight Dashboard - Implementation Notes

## Project Overview
This is a supply chain management dashboard built as a take-home challenge using React, Vite, and GraphQL. The application provides inventory management capabilities with KPI tracking, product management, and analytics.

## Technology Stack
- **Frontend**: React 19 + Vite 4.5.3
- **Styling**: Tailwind CSS 3.4.0
- **Backend**: Apollo Server Express with GraphQL
- **Data**: Mock GraphQL API with sample data
- **Charts**: Chart.js integration for data visualization

## Key Features Implemented

### 1. Dashboard Page
- **KPI Cards**: Total Products, Low Stock Alerts, Total Warehouses, Average Fill Rate
- **Interactive Charts**: Stock levels over time, demand vs supply
- **Warehouse Overview**: Quick stats for each warehouse location
- **Recent Products**: Latest product activity with quick access

### 2. Products Page
- **Advanced Table**: Sortable columns, search filters, pagination
- **Bulk Actions**: Select multiple products, export to CSV/JSON
- **Product Drawer**: Right-side sliding drawer for detailed product management
- **Real-time Filtering**: Filter by warehouse, status, and search terms

### 3. Product Management
- **Product Details**: Full product information editing
- **Stock Management**: Update inventory levels and forecasts
- **History Tracking**: View recent product activities
- **Quick Actions**: Restock, transfer, and forecast updates

## Project Structure
```
src/
├── components/          # React components
│   ├── Dashboard.jsx    # Main dashboard page
│   ├── ProductsPage.jsx # Products management page
│   ├── ProductDrawer.jsx # Product detail drawer
│   ├── ProductsTable.jsx # Advanced products table
│   ├── Sidebar.jsx      # Navigation sidebar
│   ├── TopBar.jsx       # Header with user info
│   └── [other components]
├── hooks/               # Custom React hooks
│   └── useKPIs.js      # Data fetching and state management
├── utils/               # Utility functions
│   └── graphql.js      # GraphQL client setup
└── server/              # GraphQL server
    └── index.js        # Apollo Server setup
```

## Design Decisions

### 1. GraphQL Implementation
- Used fetch-based GraphQL client instead of Apollo Client due to React 19 compatibility
- Custom `useKPIs` hook manages all data fetching and state
- Mock data provides realistic supply chain scenarios

### 2. Component Architecture
- Modular component design for reusability
- Separation of concerns between data and presentation
- Custom hooks for complex state management

### 3. User Experience
- Responsive design that works on mobile and desktop
- Drawer-based product editing for better screen utilization
- Real-time feedback with loading states and error handling
- Intuitive navigation with clear visual hierarchy

### 4. Data Management
- Centralized data fetching through custom hooks
- Local state management for UI interactions
- Mock backend provides complete CRUD operations simulation

## Performance Considerations
- Lazy loading for large datasets
- Efficient re-rendering with React keys
- Optimized bundle size with Vite
- Minimal external dependencies

## Development Setup
1. `npm install` - Install dependencies
2. `npm start` - Start both frontend (port 5173+) and backend (port 4000)
3. Visit `http://localhost:5173` to view the application

## Key Metrics
- **Total Components**: 14 modular React components
- **Bundle Size**: Optimized with Vite for fast loading
- **Performance**: Sub-second load times with mock data
- **Responsive**: Fully responsive across device sizes

## Future Enhancements
- Real backend integration
- Advanced analytics and reporting
- User authentication and permissions
- Real-time notifications
- Advanced filtering and search capabilities
