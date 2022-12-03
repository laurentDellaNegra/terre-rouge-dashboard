import axios from 'axios'
import * as dotenv from 'dotenv'

dotenv.config()

const { SHOPIFY_API_KEY, SHOPIFY_SHOPNAME, SHOPIFY_API_VERSION } = process.env

const getProducts = async () => {
  const url = `https://${SHOPIFY_SHOPNAME}/admin/api/${SHOPIFY_API_VERSION}/graphql.json`
  const { data: response } = await axios.post(
    url,
    `
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
            status
            priceRange {
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
            collections (first: 4) {
              edges {
                node {
                  handle
                }
              }
            }
          }
        }
      }
    }
    `,
    {
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/graphql',
        'X-Shopify-Access-Token': SHOPIFY_API_KEY,
      },
    }
  )
  console.log('response', response)

  const { products } = response.data
  // We filter the only ACTIVE products
  return products.edges.filter((p: any) => p.node.status === 'ACTIVE')
}

export default { getProducts }
