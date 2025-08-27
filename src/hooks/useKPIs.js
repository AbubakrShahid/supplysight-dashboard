import { useState, useEffect } from 'react'
import { graphqlClient, GET_PRODUCTS_QUERY, GET_WAREHOUSES_QUERY, GET_KPIS_QUERY } from '../lib/graphql'

export const useKPIs = (dateRange = '7d') => {
  const [data, setData] = useState({
    products: [],
    warehouses: [],
    chartData: []
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)

        const [productsData, warehousesData, kpisData] = await Promise.all([
          graphqlClient.query(GET_PRODUCTS_QUERY),
          graphqlClient.query(GET_WAREHOUSES_QUERY),
          graphqlClient.query(GET_KPIS_QUERY, { range: dateRange })
        ])

        setData({
          products: productsData.products || [],
          warehouses: warehousesData.warehouses || [],
          chartData: kpisData.kpis || []
        })
      } catch (err) {
        setError(err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [dateRange])

  const kpis = {
    totalStock: 0,
    totalDemand: 0,
    fillRate: 0,
    healthyProducts: 0,
    lowProducts: 0,
    criticalProducts: 0
  }

  if (data.products.length > 0) {
    const products = data.products
    
    kpis.totalStock = products.reduce((sum, product) => sum + product.stock, 0)
    kpis.totalDemand = products.reduce((sum, product) => sum + product.demand, 0)
    
    const fulfilledDemand = products.reduce((sum, product) => 
      sum + Math.min(product.stock, product.demand), 0
    )
    kpis.fillRate = kpis.totalDemand > 0 ? (fulfilledDemand / kpis.totalDemand) * 100 : 0

    kpis.healthyProducts = products.filter(p => p.stock > p.demand).length
    kpis.lowProducts = products.filter(p => p.stock === p.demand).length
    kpis.criticalProducts = products.filter(p => p.stock < p.demand).length
  }

  return {
    kpis,
    products: data.products,
    warehouses: data.warehouses,
    chartData: data.chartData,
    loading,
    error
  }
}
