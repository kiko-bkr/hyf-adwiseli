import { Router } from 'express'
import db from '@/controllers/DatabaseController'

const router = Router({ mergeParams: true })


router.get('/', async (req, res) => {
  try {
    const { brandId } = req.params as { brandId: string }

 if (!brandId) return res.status(400).json({ error: 'Missing brandId' })

    const brand = await db.brand.findUnique({
      where: { id: brandId },
      include: {
        campaigns: {
          include: {
            creatorResults: true,
          },
        },
      },
    })

    if (!brand) return res.status(404).json({ error: 'Brand not found' })

    const followers = 100000
    const roi = 120

    const gender = { male: 0, female: 0, other: 0 }
    const countryMap: Record<string, number> = {}

    for (const camp of brand.campaigns) {
      const g = (camp.audienceGenderDistribution as any) ?? {
        male: 0,
        female: 0,
        other: 0,
      }
      gender.male += g.male ?? 0
      gender.female += g.female ?? 0
      gender.other += g.other ?? 0

      for (const c of camp.audienceCountries ?? []) {
        countryMap[c] = (countryMap[c] ?? 0) + 1
      }
    }

    const topCountries = Object.entries(countryMap)
      .map(([country, count]) => ({
        country,
        percentage: Math.round((count / brand.campaigns.length) * 100),
      }))
      .sort((a, b) => b.percentage - a.percentage)
      .slice(0, 3)

    const topPerformingCampaign =
      brand.campaigns
        .map((c) => ({
          name: c.name,
          avgScore: c.creatorResults.length
            ? c.creatorResults.reduce((a, b) => a + b.performanceMetricsScore, 0) /
              c.creatorResults.length
            : 0,
        }))
        .sort((a, b) => b.avgScore - a.avgScore)[0]?.name ?? null

    const metrics = {
      views: 87000,
      likes: 15000,
      comments: 3200,
      shares: 550,
    }

    res.json({
      id: brand.id,
      name: brand.name,
      campaigns: brand.campaigns.length,
      followers,
      roi,
      topPerformingCampaign,
      audienceGender: gender,
      audienceCountry: topCountries,
      metrics,
    })
  } catch (err) {
    console.error('Error in /brand/dashboard:', err)
    res.status(500).json({ error: 'Internal server error' })
  }
})

export default router
