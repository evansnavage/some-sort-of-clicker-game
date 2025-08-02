'use client'
import React from 'react'
import Button from '@/components/library/Button'
import { ShopItem, GameState } from '@/types/game'

interface ShopProps {
    /** The player's current currency (Lines of Code). */
    state: GameState
    /** An array of all available items in the shop. */
    items: ShopItem[]
    /** An array of IDs of items that have been purchased. */
    purchasedItemIds: string[]
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
export default function Shop({
    state,
    items,
    purchasedItemIds,
    onPurchase,
}: ShopProps) {
    /**
     * Handles the click event for the buy button.
     * @param {ShopItem} item - The item to be purchased.
     */
    const handleBuy = (item: ShopItem) => {
        onPurchase(item)
    }

    return (
        <div>
            <h2>Shop</h2>
            <ul>
                {items.map((item) => {
                    // Check if the player has enough LOC to afford the item.
                    const cannotAfford = state.loc < item.cost

                    // Count how many times the current item has been purchased.
                    const numberPurchased = purchasedItemIds.filter(
                        (id) => id === item.id
                    ).length

                    // Check if the item has a purchase limit and if it has been reached.
                    const isLimited =
                        item.limit && numberPurchased >= item.limit
                    // The buy button is disabled if the player can't afford the item or its limit is reached.
                    const isDisabled = cannotAfford || isLimited

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
                                {/* Display item cost and benefit */}
                                <small className="text-secondary">
                                    Cost: {item.cost} LOC, {item.description}
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
                                {isLimited ? 'Owned' : 'Buy'}
                            </Button>
                        </div>
                    )
                })}
            </ul>
        </div>
    )
}
