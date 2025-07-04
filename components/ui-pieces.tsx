import React from "react"

// Button component
export function Button({ children, className = "", ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={`bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

// Input component
export function Input({ className = "", ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed ${className}`}
      {...props}
    />
  )
}

// Textarea component
export function Textarea({ className = "", ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed ${className}`}
      {...props}
    />
  )
}

// Label component
export function Label({ children, className = "", ...props }: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label className={`block text-sm font-medium text-gray-700 mb-1 ${className}`} {...props}>
      {children}
    </label>
  )
}

// Card component (for highlight cards)
export function Card({ children, className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200 ${className}`} {...props}>
      {children}
    </div>
  )
}

// CardImage (for the top image in the card)
export function CardImage({ src, alt, className = "", ...props }: React.ImgHTMLAttributes<HTMLImageElement>) {
  return (
    <div className="aspect-video bg-gray-200 flex items-center justify-center">
      {src ? (
        <img src={src} alt={alt} className={`w-full h-full object-cover ${className}`} {...props} />
      ) : (
        <div className="text-gray-400">Image Placeholder</div>
      )}
    </div>
  )
} 