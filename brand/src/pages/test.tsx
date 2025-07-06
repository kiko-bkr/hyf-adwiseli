import React, { useEffect, useState } from "react"
import { fetchBrandDashboard } from "../queries/brand/dashboard"
import type { BrandDashboardData } from "../queries/brand/dashboard"

export default function TestDashboard() {
  const [data, setData] = useState<BrandDashboardData | null>(null)
  const [error, setError] = useState("")

  useEffect(() => {
    const brandId = "brand-003"
    fetchBrandDashboard(brandId)
      .then(setData)
      .catch((err) => {
        console.error("Fejl:", err)
        setError("Noget gik galt ved hentning")
      })
  }, [])

  if (error) return <div>❌ Fejl: {error}</div>
  if (!data) return <div>⏳ Indlæser...</div>

  return (
    <div style={{ padding: 20 }}>
      <h1>✅ Brand Dashboard</h1>
      <h2>{data.name}</h2>
      <ul>
        {data.campaigns.map((c) => (
          <li key={c.id}>
            {c.name} ({c.engagementRate}%)
          </li>
        ))}
      </ul>
    </div>
  )
}
