export interface NftTokenMetadata {
  name?: string //"Plantoid #028",
  symbol?: string //"PLANT",
  description?: string //"Digital native plants that evolve over time and capture CO2",
  seller_fee_basis_points?: number //1000,
  image?: string //"https://arweave.net/mZRbjVG60S1vq0iArjHdHQSfaudtPKXkEtiXoWtJtiA?ext=png",
  animation_url?: string //"https://arweave.net/neTKFbh8u6sZlzXq9cGJ1j3-FEAQf6nB4TOsp7M5zL0?ext=png",
  external_url?: string //"https://www.plantoids.io/OG.png",
  attributes?: any[]
  collection?: {
    name?: string //"Plantoids | OG edition",
    family?: string //"Plantoids"
  }
  properties?: {
    creators?: any[]
  }
  mint?: string //"GMzzLqHCXyED22VdEzrabi4uWcMYEGG7WGR5CoswW2KP"
}

export type NftTokenMetadataAttributes = {
  birthday?: string // '2022-5-4',
  randomSeed?: number // 8736521647423441,
  generation?: number // string; // 4,
  initialStemWidth?: number // 8,
  initialStemLength?: number // 55,
  flower?: number // 0,
  baseFlowerDimension?: number // 20,
  leaf?: number // 7,
  baseLeafDimension?: number // 81,
  pot?: number // 0,
  potDimension?: number // 100,
  growthRate?: number // 5,
  sunTolerance?: number // 1,
  rainTolerance?: number // 5,
}
