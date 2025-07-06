// brand/src/queries/brand/dashboard.ts

import { BrandDashboardDataSchema, BrandDashboardData } from "@/utils/schema"

export async function fetchBrandDashboard(brandId: string): Promise<BrandDashboardData> {
  try {
    const res = await fetch(`http://localhost:8080/brand/${brandId}/dashboard`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })

    if (!res.ok) {
      throw new Error(`Failed to fetch brand dashboard: ${res.status} ${res.statusText}`)
    }

    const json = await res.json()

    // ✅ Validate and parse with Zod
    const data = BrandDashboardDataSchema.parse(json)

    return data
  } catch (err) {
    console.error("Error fetching brand dashboard:", err)
    throw err
  }
}
