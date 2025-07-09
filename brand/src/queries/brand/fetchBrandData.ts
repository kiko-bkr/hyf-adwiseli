import http, { getError } from '@/queries/http'

export interface BrandDashboardData {
  id: string
  name: string
  campaigns: number
  followers: number
  roi: number
  topPerformingCampaign: string | null
  audienceGender: {
    male: number
    female: number
    other: number
  }
  audienceCountry: {
    country: string
    percentage: number
  }[]
  metrics: {
    views: number
    likes: number
    comments: number
    shares: number
  }
  reach: number
  impressions: number
  engagementCount: number
  engagementRate: number
  videoWatchTime: number // in seconds
  profileClicks: number
  audienceAge: string
  deltas: {
    reach: number
    engagement: number
    engagementRate: number
    impressions: number
    videoWatchTime: number
    profileClicks: number
  }
}

export default async function fetchBrandData(
  brandId: string
): Promise<BrandDashboardData> {
  try {
    const res = await http.get(`/${brandId}/dashboard`)
    const data = res.data

    return {
      id: data.id,
      name: data.name ?? 'Unknown',
      campaigns: data.campaigns ?? 0,
      followers: data.followers ?? 0,
      roi: data.roi ?? 0,
      topPerformingCampaign: data.topPerformingCampaign ?? null,
      audienceGender: data.audienceGender ?? { male: 0, female: 0, other: 0 },
      audienceCountry: data.audienceCountry ?? [],
      metrics: data.metrics ?? {
        views: 0,
        likes: 0,
        comments: 0,
        shares: 0,
      },
      reach: data.reach ?? 0,
      impressions: data.impressions ?? 0,
      engagementCount: data.engagementCount ?? 0,
      engagementRate: data.engagementRate ?? 0,
      videoWatchTime: data.videoWatchTime ?? 0,
      profileClicks: data.profileClicks ?? 0,
      audienceAge: data.audienceAge ?? 'Unknown',
      deltas: data.deltas ?? {
        reach: 0,
        engagement: 0,
        engagementRate: 0,
        impressions: 0,
        videoWatchTime: 0,
        profileClicks: 0,
      },
    }
  } catch (err) {
    throw getError(err)
  }
}
