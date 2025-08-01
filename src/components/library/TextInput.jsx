'use client'
import React from 'react'
import PropTypes from 'prop-types'

const TextInput = ({
    value,
    onChange,
    onSubmit,
    placeholder = '',
    className = '',
    ...props
}) => {
    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && onSubmit) {
            onSubmit(event)
        }
    }
    return (
        <input
            type="text"
            value={value}
            onChange={onChange}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className={`bg-background text-foreground border border-secondary rounded-lg py-2 px-4 focus:outline-none focus:border-primary transition-all ${className}`}
            {...props}
        />
    )
}

TextInput.propTypes = {
    /**
     * The current value of the input.
     */
    value: PropTypes.string.isRequired,
    /**
     * Function to be called when the input value changes.
     */
    onChange: PropTypes.func.isRequired,
    /**
     * Function to be called when the form is submitted.
     */
    onSubmit: PropTypes.func,
    /**
     * Placeholder text for the input.
     */
    placeholder: PropTypes.string,
    /**
     * Additional CSS classes to apply to the input.
     */
    className: PropTypes.string,
}

export default TextInput
