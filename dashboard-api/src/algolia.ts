import algoliasearch from 'algoliasearch'
import * as dotenv from 'dotenv'

dotenv.config()

const { ALGOLIA_APPLICATION_ID, ALGOLIA_API_KEY, ALGOLIA_INDEX_PROD } = process.env

const client = algoliasearch(ALGOLIA_APPLICATION_ID, ALGOLIA_API_KEY)
const index = client.initIndex(ALGOLIA_INDEX_PROD)

const convertToRecords = (products: any) =>
  products.map((edge: any) => {
    const { node: product } = edge
    return {
      objectID: product.id,
      title: product.title,
      description: product.description,
      category: product.productType,
      tags: product.tags,
      handle: product.handle,
      compareAtPrice: Number(product.compareAtPriceRange.minVariantPrice.amount),
      price: Number(product.priceRange.minVariantPrice.amount),
      currency: product.priceRange.minVariantPrice.currencyCode,
      image: product.images.edges[0]?.node?.transformedSrc,
      collections: product.collections.edges.map((edge: any) => edge.node.handle),
      variants: product.variants.edges
        .flatMap((e: any) => e.node.selectedOptions)
        .filter((v: any) => v.name !== 'Title'),
      // check if every product variant are out of stocks
      availableForSale: product.variants.edges.every((e: any) => e.node.availableForSale),
    }
  })

const saveRecords = (records: any) => {
  return index.replaceAllObjects(records, {
    autoGenerateObjectIDIfNotExist: true,
  })
}

const saveProducts = async (products: any) => {
  const algoliaRecords = convertToRecords(products)
  const { objectIDs } = await saveRecords(algoliaRecords)
  return objectIDs
}

export default { saveProducts }
