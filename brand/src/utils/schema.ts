import { z } from "zod"

export const CampaignDataSchema = z.object({
  id: z.string(),
  name: z.string(),
  creatorAmount: z.number(),
  audienceAgeDistribution: z.record(z.number()),
  audienceGenderDistribution: z.record(z.number()),
  audienceCountries: z.array(z.string()),
  engagementRate: z.union([z.string(), z.number()])
})

export const BrandDashboardDataSchema = z.object({
  id: z.string(),
  name: z.string(),
  campaigns: z.array(CampaignDataSchema)
})

// TypeScript type (valideret af Zod)
export type BrandDashboardData = z.infer<typeof BrandDashboardDataSchema>
