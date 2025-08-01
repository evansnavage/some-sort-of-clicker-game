'use client'
import { useState, useEffect } from 'react'
import styles from './page.module.css'
import TextInput from '@/components/library/TextInput'

export default function Home() {
    const [loc, setLoc] = useState(0)
    const [requirements, _] = useState([
        {
            Label: 'Must be at least 8 characters long',
            Function: (value: string) => value.length >= 8,
        },
        {
            Label: 'Must contain the word "Javascript"',
            Function: (value: string) => value.includes('Javascript'),
        },
        {
            Label: 'Must not contain any numbers',
            Function: (value: string) => !/\d/.test(value),
        },
    ])
    const [inputValue, setInputValue] = useState('')
    const [isError, setIsError] = useState(false)

    const handleSubmit = () => {
        // only run the first x requirement functions where x is the current loc
        const activeRequirements = requirements.slice(
            0,
            Math.min(loc, requirements.length)
        )
        const allRequirementsMet = activeRequirements.every((req) =>
            req.Function(inputValue)
        )

        // run the input value through each function from the requirements array
        if (allRequirementsMet) {
            setLoc((prevLoc) => prevLoc + 1)
            setInputValue('') // Clear the input after submit
        } else {
            setIsError(true)
        }
    }

    useEffect(() => {
        if (!isError) return

        const timeoutId = setTimeout(() => setIsError(false), 820) // Animation duration

        return () => clearTimeout(timeoutId)
    }, [isError])

    return (
        <div className={styles.page}>
            <main className={`${styles.main} flex flex-col items-center gap-8`}>
                <h1 className="text-2xl font-bold">
                    Some Sort of Clicker Game
                </h1>
                <h2 className="text-xl">Lines Written: {loc}</h2>
                <div className="flex flex-col gap-4 w-full items-center">
                    <TextInput
                        placeholder="Start Typing"
                        value={inputValue}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setInputValue(e.target.value)
                        }
                        onSubmit={handleSubmit}
                        className={`${isError ? 'animate-shake' : ''}`}
                    />
                    <div className="p-4 rounded-lg bg-tertiary">
                        <h3 className="font-bold mb-2">Requirements:</h3>
                        {loc === 0 ? (
                            <p className="text-secondary">
                                Type anything to write your first line of code!
                            </p>
                        ) : (
                            <ul className="list-disc list-inside">
                                {requirements
                                    .slice(0, loc)
                                    .map((req, index) => {
                                        const isMet = req.Function(inputValue)
                                        return (
                                            <li
                                                key={index}
                                                className={
                                                    isMet
                                                        ? 'text-success'
                                                        : 'text-error'
                                                }
                                            >
                                                {req.Label}
                                            </li>
                                        )
                                    })}
                            </ul>
                        )}
                    </div>
                </div>
            </main>
        </div>
    )
}
