const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const cors = require('cors');

// Sample data
const warehouses = [
  { code: "BLR-A", name: "Bangalore A", city: "Bangalore", country: "India" },
  { code: "PNQ-C", name: "Pune C", city: "Pune", country: "India" },
  { code: "DEL-B", name: "Delhi B", city: "Delhi", country: "India" }
];

let products = [
  { id: "P-1001", name: "12mm Hex Bolt", sku: "HEX-12-100", warehouse: "BLR-A", stock: 180, demand: 120 },
  { id: "P-1002", name: "Steel Washer", sku: "WSR-08-500", warehouse: "BLR-A", stock: 50, demand: 80 },
  { id: "P-1003", name: "M8 Nut", sku: "NUT-08-200", warehouse: "PNQ-C", stock: 80, demand: 80 },
  { id: "P-1004", name: "Bearing 608ZZ", sku: "BRG-608-50", warehouse: "DEL-B", stock: 24, demand: 120 }
];

// Generate mock KPI data for different date ranges
const generateKPIData = (range) => {
  const days = range === '7d' ? 7 : range === '14d' ? 14 : 30;
  const data = [];
  
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    
    // Calculate totals for this date (with some variation)
    const variation = Math.random() * 0.2 - 0.1; // ±10% variation
    const totalStock = Math.floor(products.reduce((sum, p) => sum + p.stock, 0) * (1 + variation));
    const totalDemand = Math.floor(products.reduce((sum, p) => sum + p.demand, 0) * (1 + variation));
    
    data.push({
      date: date.toISOString().split('T')[0],
      stock: totalStock,
      demand: totalDemand
    });
  }
  
  return data;
};

// GraphQL type definitions
const typeDefs = `
  type Warehouse {
    code: ID!
    name: String!
    city: String!
    country: String!
  }

  type Product {
    id: ID!
    name: String!
    sku: String!
    warehouse: String!
    stock: Int!
    demand: Int!
  }

  type KPI {
    date: String!
    stock: Int!
    demand: Int!
  }

  type Query {
    products(search: String, status: String, warehouse: String): [Product!]!
    warehouses: [Warehouse!]!
    kpis(range: String!): [KPI!]!
  }

  type Mutation {
    updateDemand(id: ID!, demand: Int!): Product!
    transferStock(id: ID!, from: String!, to: String!, qty: Int!): Product!
  }
`;

// GraphQL resolvers
const resolvers = {
  Query: {
    products: (_, { search, status, warehouse }) => {
      let filteredProducts = [...products];

      // Filter by warehouse
      if (warehouse && warehouse !== 'all') {
        filteredProducts = filteredProducts.filter(p => p.warehouse === warehouse);
      }

      // Filter by search (name, sku, or id)
      if (search) {
        const searchLower = search.toLowerCase();
        filteredProducts = filteredProducts.filter(p =>
          p.name.toLowerCase().includes(searchLower) ||
          p.sku.toLowerCase().includes(searchLower) ||
          p.id.toLowerCase().includes(searchLower)
        );
      }

      // Filter by status
      if (status && status !== 'all') {
        filteredProducts = filteredProducts.filter(p => {
          if (status === 'healthy') return p.stock > p.demand;
          if (status === 'low') return p.stock === p.demand;
          if (status === 'critical') return p.stock < p.demand;
          return true;
        });
      }

      return filteredProducts;
    },
    warehouses: () => warehouses,
    kpis: (_, { range }) => generateKPIData(range)
  },
  Mutation: {
    updateDemand: (_, { id, demand }) => {
      const productIndex = products.findIndex(p => p.id === id);
      if (productIndex === -1) {
        throw new Error('Product not found');
      }
      
      products[productIndex].demand = demand;
      return products[productIndex];
    },
    transferStock: (_, { id, from, to, qty }) => {
      const productIndex = products.findIndex(p => p.id === id);
      if (productIndex === -1) {
        throw new Error('Product not found');
      }
      
      const product = products[productIndex];
      if (product.warehouse !== from) {
        throw new Error('Product is not in the source warehouse');
      }
      
      if (product.stock < qty) {
        throw new Error('Insufficient stock for transfer');
      }
      
      // For simplicity, we'll just update the warehouse and reduce stock
      // In a real app, you'd create a new product entry in the destination warehouse
      product.warehouse = to;
      product.stock -= qty;
      
      return product;
    }
  }
};

async function startServer() {
  const app = express();
  
  // Enable CORS
  app.use(cors());
  
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
    playground: true
  });

  await server.start();
  server.applyMiddleware({ app, path: '/graphql' });

  const PORT = process.env.PORT || 4000;
  
  app.listen(PORT, () => {
    console.log(`🚀 GraphQL Server ready at http://localhost:${PORT}${server.graphqlPath}`);
  });
}

startServer().catch(error => {
  console.error('Error starting server:', error);
});
