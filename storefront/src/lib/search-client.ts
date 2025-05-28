import { instantMeiliSearch } from "@meilisearch/instant-meilisearch"

const endpoint =
  process.env.NEXT_PUBLIC_SEARCH_ENDPOINT || "https://meilisearch-production-b4d1.up.railway.app"

const apiKey = process.env.MEILISEARCH_API_KEY || "q6fyay2ow9ipwhlnqo1ui3xga0hu8pxh"

export const searchClient = instantMeiliSearch(endpoint, apiKey)

export const SEARCH_INDEX_NAME =
  process.env.NEXT_PUBLIC_INDEX_NAME || "products"

// If you want to use Algolia instead then uncomment the following lines, and delete the above lines
// you should also install algoliasearch - yarn add algoliasearch

// import algoliasearch from "algoliasearch/lite"

// const appId = process.env.NEXT_PUBLIC_SEARCH_APP_ID || "test_app_id"

// const apiKey = process.env.NEXT_PUBLIC_SEARCH_API_KEY || "test_key"

// export const searchClient = algoliasearch(appId, apiKey)

// export const SEARCH_INDEX_NAME =
//   process.env.NEXT_PUBLIC_INDEX_NAME || "products"
