'use client'
import React from 'react'
import PropTypes from 'prop-types'

const Button = ({ onClick, children, className = '', ...props }) => {
    return (
        <button
            onClick={onClick}
            className={`bg-primary text-background font-semibold py-2 px-4 rounded-lg cursor-pointer transition-all hover:bg-primary-hover ${className}`}
            {...props}
        >
            {children}
        </button>
    )
}

Button.propTypes = {
    /**
     * Function to be called when the button is clicked.
     */
    onClick: PropTypes.func,
    /**
     * The content to be displayed inside the button.
     */
    children: PropTypes.node.isRequired,
    /**
     * Additional CSS classes to apply to the button.
     */
    className: PropTypes.string,
}

export default Button
