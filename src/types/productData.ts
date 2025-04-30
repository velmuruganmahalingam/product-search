export interface Product {
    id: number
    title: string
    description: string
    price: number
    category: string
}

export interface Settings {
    fields: (keyof Product)[]
    caseSensitive: boolean
    exact: boolean
    max: number
}