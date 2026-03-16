import React from 'react'

export default function Description({desc}) {
  return (
    <>
   <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
            Description
          </h3>
          {desc.map((desc) =>
                      desc.type === "paragraph"
                        ? desc.children.map((d, i) => (
                            <p
                              className="text-base leading-relaxed text-gray-600 dark:text-gray-400 mb-2"
                              key={i}
                            >
                              {d.text}
                            </p>
                          ))
                        : null
                    )}

    </>
  )
}
