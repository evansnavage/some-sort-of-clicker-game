'use client'
import { useState, useEffect } from 'react'
import TextInput from '@/components/library/TextInput'

interface Requirement {
    label: string
    Function: (value: string) => boolean
}

interface CodeSubmissionProps {
    requirements: Requirement[]
    onSuccess: () => void
}

export default function CodeSubmission({
    requirements,
    onSuccess,
}: CodeSubmissionProps) {
    const [inputValue, setInputValue] = useState('')
    const [isError, setIsError] = useState(false)

    const handleSubmit = () => {
        const allRequirementsMet = requirements.every((req) =>
            req.Function(inputValue)
        )

        if (allRequirementsMet) {
            onSuccess()
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
                {requirements.length === 0 ? (
                    <p className="text-secondary">
                        Type anything to write your first line of code!
                    </p>
                ) : (
                    <ul className="list-disc list-inside">
                        {requirements.map((req, index) => {
                            const isMet = req.Function(inputValue)
                            return (
                                <li
                                    key={index}
                                    className={
                                        isMet ? 'text-success' : 'text-error'
                                    }
                                >
                                    {req.label}
                                </li>
                            )
                        })}
                    </ul>
                )}
            </div>
        </div>
    )
}
