import { GameState, ShopItem } from '@/types/game'
export const items: ShopItem[] = [
    {
        id: 'sales_friend_free',
        name: 'Friend in Sales',
        description: 'Slowly generates money from your lines.',
        limit: 1,
        unlocksAt: 25,
    },
    {
        id: 'ghost_writer_0',
        name: 'Ghost Writer',
        description: 'Slowly Writes Lines for You.',
        limit: 20,
        unlocksAt: 100,
    },
]
export const costFunctions: Record<string, (state: GameState) => number> = {
    sales_friend_free: (state: GameState) => 0,
    ghost_writer_0: (state: GameState) => {
        return (
            5 +
            2 *
                state.items.filter((item) => item.id === 'ghost_writer_0')
                    .length
        )
    },
}

export const itemEffects: Record<
    string,
    (state: GameState, delta: number) => void
> = {
    sales_friend_free: (state: GameState, delta: number) => {
        const gain = (0.004 * state.loc * delta) / 1000
        state.money += gain
    },
    ghost_writer_0: (state: GameState, delta: number) => {
        const gain = (0.25 * delta) / 1000
        state.loc += gain
    },
}
