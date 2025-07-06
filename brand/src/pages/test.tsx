import React, { useEffect, useState } from "react";
import { fetchBrandDashboard } from "../queries/brand/dashboard";
import type { BrandDashboardData } from "../utils/schema";

// Extract the type for individual campaign
type Campaign = BrandDashboardData["campaigns"][number];

export default function TestDashboard() {
  const [data, setData] = useState<BrandDashboardData | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const brandId = "brand-003";
    fetchBrandDashboard(brandId)
      .then(setData)
      .catch((err) => {
        console.error("Error:", err);
        setError("Something went wrong while fetching data");
      });
  }, []);

  if (error) {
    return (
      <div style={{ padding: 20, color: "red" }}>
        ❌ Error: {error}
      </div>
    );
  }

  if (!data) {
    return (
      <div style={{ padding: 20 }}>
        ⏳ Loading...
      </div>
    );
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>✅ Brand Dashboard</h1>
      <h2>{data.name}</h2>

      <ul>
        {data.campaigns.map((c: Campaign) => (
          <li key={c.id}>
            <strong>{c.name}</strong> — Engagement: <em>{Number(c.engagementRate)}%</em>
          </li>
        ))}
      </ul>
    </div>
  );
}
