import React from 'react'

export default function Description({ desc }) {
  return (
    <div className="space-y-6 max-w-3xl">
      {Array.isArray(desc) && desc.map((block, index) =>
        block.type === "paragraph"
          ? block.children.map((child, i) => (
            <p
              className="text-[17px] leading-[1.8] text-gray-600 dark:text-gray-300 antialiased font-medium tracking-tight"
              key={`${index}-${i}`}
            >
              {child.text}
            </p>
          ))
          : null
      )}
    </div>
  )
}
