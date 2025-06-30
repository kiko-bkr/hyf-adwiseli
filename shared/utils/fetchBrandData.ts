export interface BrandData {
	id: string
	name: string
	creatorAmount: number
	audienceAge: string
	audienceGender: string
	audienceCountry: string
}

export async function fetchBrandData(): Promise<BrandData> {
	try {
		const res = await fetch(
			`http://localhost:8080/brand/brand-001/campaigns`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			}
		)

		if (!res.ok) {
			throw new Error(
				`Failed to fetch brand data: ${res.status} ${res.statusText}`
			)
		}

		const data = await res.json()

		return {
			id: data.id ?? '',
			name: data.name ?? '',
			creatorAmount: data.creatorAmount ?? 0,
			audienceAge: data.audienceAge ?? '',
			audienceGender: data.audienceGender ?? '',
			audienceCountry: data.audienceCountry ?? '',
		}
	} catch (err) {
		console.error('Error fetching brand data:', err)
		throw err
	}
}
