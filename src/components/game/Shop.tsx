'use client'
import React from 'react'
import Button from '@/components/library/Button'
import { ShopItem, GameState } from '@/types/game'
import { costFunctions } from '@/components/game/Items'

interface ShopProps {
    /** The player's current currency (Lines of Code). */
    state: GameState
    /** An array of all available items in the shop. */
    items: ShopItem[]
    /** Callback function to handle the purchase of an item. */
    onPurchase: (item: ShopItem) => void
}

/**
 * Displays a list of items available for purchase.
 * Handles UI and purchase checking
 *
 * @param {ShopProps} props - The props for the component.
 * @returns {React.ReactElement} The rendered shop component.
 */
export default function Shop({ state, items, onPurchase }: ShopProps) {
    /**
     * Handles the click event for the buy button.
     * @param {ShopItem} item - The item to be purchased.
     */
    const handleBuy = (item: ShopItem) => {
        onPurchase(item)
    }
    let purchasedItemIds = state.items.map((item) => item.id)

    return (
        <div>
            <h2>Shop</h2>
            <ul>
                {items.map((item) => {
                    const cannotAfford =
                        state.money < costFunctions[item.id](state)

                    const unlocked = state.loc >= item.unlocksAt

                    const numberPurchased = purchasedItemIds.filter(
                        (id) => id === item.id
                    ).length

                    const isLimited =
                        item.limit && numberPurchased >= item.limit
                    const isDisabled = cannotAfford || isLimited
                    if (unlocked) {
                        return (
                            <div
                                key={item.id}
                                className="flex justify-between items-center gap-4 p-2"
                            >
                                <div>
                                    {/* Display item name and purchase count if limited */}
                                    <li>
                                        {item.name}{' '}
                                        {item.limit &&
                                            `(${numberPurchased}/${item.limit})`}
                                    </li>
                                    <small className="text-secondary">
                                        Cost: ${costFunctions[item.id](state)},{' '}
                                        {item.description}
                                    </small>
                                </div>
                                <Button
                                    onClick={() => handleBuy(item)}
                                    disabled={isDisabled}
                                    className={
                                        isDisabled
                                            ? 'bg-gray-500 cursor-not-allowed hover:bg-gray-500'
                                            : ''
                                    }
                                >
                                    {/* Change button text to "Owned" if the limit is reached */}
                                    {isLimited ? 'Max Owned' : 'Buy'}
                                </Button>
                            </div>
                        )
                    }
                })}
            </ul>
        </div>
    )
}
