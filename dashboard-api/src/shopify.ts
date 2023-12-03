import axios from 'axios'
import * as dotenv from 'dotenv'

dotenv.config()

const { SHOPIFY_GRAPHQL_API_URL, SHOPIFY_STOREFRONT_ACCESS_TOKEN } = process.env

const getProducts = async () => {
  const { data: response } = await axios.post(
    SHOPIFY_GRAPHQL_API_URL,
    JSON.stringify({
      query: `
    {
      products(first: 80) {
        edges {
          node {
            id
            handle
            title
            productType
            tags
            description
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            compareAtPriceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            images(first: 1) {
              edges {
                node {
                  transformedSrc(maxHeight: 384, maxWidth: 384, crop: CENTER, scale: 3)
                  originalSrc
                }
              }
            }
            collections(first: 4) {
              edges {
                node {
                  handle
                }
              }
            }
            variants(first: 3) {
              edges {
                node {
                  selectedOptions {
                    name
                    value
                  }
                  availableForSale
                }
              }
            }
          }
        }
      }
    }    
    `,
    }),
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_ACCESS_TOKEN,
      },
    }
  )

  const { products } = response.data
  return products.edges
}

export default { getProducts }
