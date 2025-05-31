import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query

  if (!process.env.MEDUSA_ADMIN_TOKEN) {
    return res.status(500).json({ error: "Admin token not configured" })
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL}/admin/products/${id}?expand=options,variants.options`,
      {
        headers: {
          Authorization: `Bearer ${process.env.MEDUSA_ADMIN_TOKEN}`,
          Accept: "application/json",
          "Content-Type": "application/json",
          "Cache-Control": "no-cache, no-store, must-revalidate",
          "Pragma": "no-cache",
          "Expires": "0"
        },
      }
    )

    if (!response.ok) {
      const error = await response.json()
      return res.status(response.status).json({ 
        error: error.message || "Failed to fetch product" 
      })
    }

    const product = await response.json()
    
    // Set cache control headers on the response
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate')
    res.setHeader('Pragma', 'no-cache')
    res.setHeader('Expires', '0')
    
    return res.status(200).json(product)
  } catch (err) {
    console.error("Error fetching product:", err)
    return res.status(500).json({ 
      error: "Server error", 
      detail: err instanceof Error ? err.message : "Unknown error" 
    })
  }
} 