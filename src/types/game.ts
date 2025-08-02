export interface ShopItem {
    id: string
    name: string
    description: string
    limit?: number
    unlocksAt: number
}

export interface GameState {
    loc: number
    money: number
    items: ShopItem[]
}
