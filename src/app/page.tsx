'use client'
import { useState, useEffect, useRef } from 'react'
import styles from './page.module.css'
import CodeSubmission from '@/components/game/CodeSubmission'
import Shop from '@/components/game/Shop'
import { ShopItem, GameState } from '@/types/game'
import { itemEffects, items, costFunctions } from '@/components/game/Items'

export default function Home() {
    const [state, setState] = useState<GameState>({
        loc: 0,
        money: 0,
        items: [],
    })
    const [requirements, _setRequirements] = useState([
        {
            Label: 'Must be at least 8 characters long',
            Unlock: 100,
            Function: (value: string) => value.length >= 8,
        },
        {
            Label: 'Must contain the word "Javascript"',
            Unlock: 250,
            Function: (value: string) => value.includes('Javascript'),
        },
        {
            Label: 'Must not contain any numbers',
            Unlock: 500,
            Function: (value: string) => !/\d/.test(value),
        },
    ])
    const activeRequirements = requirements.filter((r) => r.Unlock <= state.loc)

    const handleSuccess = () => {
        setState((prev) => ({ ...prev, loc: prev.loc + 1 }))
    }
    // GAME LOOP
    const lastTick = useRef(Date.now())

    useEffect(() => {
        const loop = setInterval(() => {
            const now = Date.now()
            const delta = now - lastTick.current
            lastTick.current = now

            setState((prevState) => {
                const newState = JSON.parse(JSON.stringify(prevState))
                for (const item of newState.items) {
                    const effectFn = itemEffects[item.id]
                    if (effectFn) effectFn(newState, delta)
                }
                return newState
            })
        }, 100)

        return () => clearInterval(loop)
    }, [])

    return (
        <div className={styles.page}>
            <main className={`${styles.main} flex flex-col items-center gap-8`}>
                <h1 className="text-2xl font-bold">
                    Some Sort of Clicker Game
                </h1>
                <h2 className="text-xl">
                    Lines Written:{' '}
                    {state.loc.toLocaleString('en-us', {
                        maximumFractionDigits: 0,
                    })}
                </h2>
                <h2 className="text-xl">
                    Money:{' '}
                    {state.money.toLocaleString('en-us', {
                        style: 'currency',
                        currency: 'USD',
                    })}
                </h2>
                <CodeSubmission
                    requirements={activeRequirements}
                    onSuccess={handleSuccess}
                />
                {state.loc >= 25 ? (
                    <Shop
                        state={state}
                        items={items}
                        onPurchase={(item) => {
                            setState((prev) => ({
                                ...prev,
                                money:
                                    prev.money - costFunctions[item.id](state),
                                items: [...prev.items, item],
                            }))
                        }}
                    />
                ) : (
                    ''
                )}
            </main>
        </div>
    )
}
