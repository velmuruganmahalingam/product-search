export interface ProductData {
    id: number
    title: string
    description: string
    price: number
    category: string
}

export interface Settings {
    fields: (keyof ProductData)[]
    caseSensitive: boolean
    exact: boolean
    max: number
}