const GRAPHQL_URL = 'http://localhost:4000/graphql'

export const graphqlClient = {
  async query(query, variables = {}) {
    try {
      const response = await fetch(GRAPHQL_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query,
          variables,
        }),
      })

      const result = await response.json()
      
      if (result.errors) {
        throw new Error(result.errors[0].message)
      }
      
      return result.data
    } catch (error) {
      throw new Error(`GraphQL Error: ${error.message}`)
    }
  }
}

export const GET_PRODUCTS_QUERY = `
  query GetProducts($search: String, $status: String, $warehouse: String) {
    products(search: $search, status: $status, warehouse: $warehouse) {
      id
      name
      sku
      warehouse
      stock
      demand
    }
  }
`

export const GET_WAREHOUSES_QUERY = `
  query GetWarehouses {
    warehouses {
      code
      name
      city
      country
    }
  }
`

export const GET_KPIS_QUERY = `
  query GetKPIs($range: String!) {
    kpis(range: $range) {
      date
      stock
      demand
    }
  }
`
