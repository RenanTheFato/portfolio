'use client'

import { useState } from "react"

interface CopyButtonProps {
  email: string
}

export function CopyButton({ email }: CopyButtonProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    navigator.clipboard.writeText(email).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2200)
    })
  }

  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-2 px-3.5 py-1.5 rounded border font-brains text-xs transition-all duration-300 cursor-pointer shrink-0"
      style={{ borderColor: copied ? "hsla(158.113, 64.372%, 51.569%, 0.55)" : "hsla(0, 0%, 100%, 0.16)",
        color: copied ? "hsl(158.113, 64.372%, 51.569%)" : "hsla(0, 0%, 100%, 0.38)",
        background: copied ? "hsla(158.113, 64.372%, 51.569%, 0.07)" : "hsla(0, 0%, 100%, 0.03)",
      }}
    >
      {copied ? (
        <>
          <svg viewBox="0 0 10 10" fill="none" className="w-3 h-3 shrink-0">
            <polyline points="1.5,5 4,7.5 8.5,2.5" stroke="#34D399" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          COPIED
        </>
      ) : (
        <>
          <svg viewBox="0 0 10 10" fill="none" className="w-3 h-3 shrink-0">
            <rect x="3.5" y="0.5" width="6" height="7" rx="1" stroke="currentColor" strokeWidth="1.1" />
            <rect x="0.5" y="2.5" width="6" height="7" rx="1" stroke="currentColor" strokeWidth="1.1" fill="transparent" />
          </svg>
          COPY
        </>
      )}
    </button>
  )
}