import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import fetchBrandData, { BrandDashboardData } from '@/queries/brand/fetchBrandData'
import Layout from '@/components/layout'

export default function DashboardBrandPage() {
  const router = useRouter()
  const { brandId } = router.query

  const [data, setData] = useState<BrandDashboardData | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!brandId || typeof brandId !== 'string') return

    fetchBrandData(brandId)
      .then(setData)
      .catch((err) => {
        console.error('Failed to fetch brand data:', err)
        setError('Failed to load brand data.')
      })
  }, [brandId])

  return (
    <Layout active="dashboard" title="Dashboard">
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!error && !data && <p>Loading...</p>}
      {data && (
        <div style={{ padding: '1rem' }}>
          <h1>{data.name}</h1>
          <p><strong>Followers:</strong> {data.followers.toLocaleString()}</p>
          <p><strong>Campaigns:</strong> {data.campaigns}</p>
          <p><strong>ROI:</strong> {data.roi}%</p>
          <p><strong>Top Campaign:</strong> {data.topPerformingCampaign ?? 'N/A'}</p>

          <h3>Audience Gender:</h3>
          <ul>
            <li>Male: {data.audienceGender.male}%</li>
            <li>Female: {data.audienceGender.female}%</li>
            <li>Other: {data.audienceGender.other}%</li>
          </ul>

          <h3>Audience Country:</h3>
          <ul>
            {data.audienceCountry.map((c, i) => (
              <li key={i}>{c.country}: {c.percentage}%</li>
            ))}
          </ul>

          <h3>Metrics:</h3>
          <ul>
            <li>Views: {data.metrics.views.toLocaleString()}</li>
            <li>Likes: {data.metrics.likes.toLocaleString()}</li>
            <li>Comments: {data.metrics.comments.toLocaleString()}</li>
            <li>Shares: {data.metrics.shares.toLocaleString()}</li>
          </ul>
        </div>
      )}
    </Layout>
  )
}
