import { GameState } from '@/types/game'
export const itemEffects: Record<
    string,
    (state: GameState, delta: number) => void
> = {
    sales_friend_free: (state: GameState, delta: number) => {
        const gain = (0.004 * state.loc * delta) / 1000
        console.log(`Friend in Sales Just Made ${gain}`)
        state.money += gain
    },
}
