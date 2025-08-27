# SupplySight Dashboard

A React-based dashboard for supply chain inventory management with GraphQL backend.

## Module 1: Project Setup ✅

### Features Implemented
- ✅ React + Vite project setup
- ✅ Tailwind CSS configuration
- ✅ Apollo GraphQL Server with sample data
- ✅ Apollo Client integration
- ✅ Basic UI layout with responsive design
- ✅ GraphQL queries and mutations setup

### Technology Stack
- **Frontend**: React 19, Vite, Tailwind CSS
- **Backend**: Apollo Server Express, GraphQL
- **Data**: Apollo Client for state management
- **Charts**: Recharts (ready for Module 4)
- **Icons**: Lucide React

### Quick Start

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start both server and client**:
   ```bash
   npm start
   ```
   
   This runs both the GraphQL server (port 4000) and React dev server (port 5173) concurrently.

3. **Access the application**:
   - Dashboard: http://localhost:5173
   - GraphQL Playground: http://localhost:4000/graphql

### Project Structure
```
src/
├── lib/
│   └── apollo.js          # GraphQL queries, mutations, and Apollo Client config
├── components/            # React components (to be created in next modules)
├── App.jsx               # Main app component
└── main.jsx              # React entry point with Apollo Provider

server/
└── index.js              # GraphQL server with mock data and resolvers
```

### Available Scripts
- `npm run dev` - Start React development server
- `npm run server` - Start GraphQL server only
- `npm start` - Start both server and client
- `npm run build` - Build for production

### GraphQL Schema
- **Types**: Warehouse, Product, KPI
- **Queries**: products (with filters), warehouses, kpis
- **Mutations**: updateDemand, transferStock

### Sample Data
- 4 Products across 3 Warehouses
- Dynamic KPI data generation for 7d/14d/30d ranges
- Status-based filtering (Healthy/Low/Critical)

## Next Steps

Ready to implement:
- **Module 2**: API & Data Module - Enhanced GraphQL resolvers
- **Module 3**: Layout & Navigation Module - Top bar and navigation
- **Module 4**: KPI & Chart Module - Dashboard cards and trending charts
- **Module 5**: Filters Module - Search and filtering functionality
- **Module 6**: Products Table Module - Data table with pagination
- **Module 7**: Drawer & Forms Module - Product details and actions
- **Module 8**: State & Logic Module - Business logic and error handling

## Development Notes

The current setup provides a solid foundation with:
- Mock GraphQL server ready for development
- Apollo Client configured for data fetching
- Tailwind CSS for rapid UI development
- Responsive design patterns established
- Error and loading state handling
