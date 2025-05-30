import { sdk } from "@lib/config"
import { cache } from "react"
import { HttpTypes } from "@medusajs/types"

export const listRegions = cache(async function () {
  try {
    const { regions } = await sdk.store.region.list({}, { next: { tags: ["regions"] } })
    return regions
  } catch (error) {
    console.error("Error fetching regions:", error)
    return []
  }
})

export const retrieveRegion = cache(async function (id: string) {
  try {
    const { region } = await sdk.store.region.retrieve(id, {}, { next: { tags: ["regions"] } })
    return region
  } catch (error) {
    console.error("Error retrieving region:", error)
    return null
  }
})

const regionMap = new Map<string, HttpTypes.StoreRegion>()

export const getRegion = cache(async function (countryCode: string) {
  try {
    if (regionMap.has(countryCode)) {
      return regionMap.get(countryCode)
    }

    const regions = await listRegions()

    if (!regions || regions.length === 0) {
      console.error("No regions found")
      return null
    }

    regions.forEach((region) => {
      region.countries?.forEach((c) => {
        regionMap.set(c?.iso_2 ?? "", region)
      })
    })

    const region = countryCode
      ? regionMap.get(countryCode)
      : regionMap.get("us")

    if (!region) {
      console.error(`No region found for country code: ${countryCode}`)
    }

    return region
  } catch (error) {
    console.error("Error getting region:", error)
    return null
  }
})
