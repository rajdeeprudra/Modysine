'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

export function SizeChart() {
  const [isOpen, setIsOpen] = useState(false)

  const sizes = [
    { size: 'XS', chest: '32-34', length: '27', sleeve: '7.5' },
    { size: 'S', chest: '34-36', length: '28', sleeve: '8' },
    { size: 'M', chest: '38-40', length: '29', sleeve: '8.5' },
    { size: 'L', chest: '42-44', length: '30', sleeve: '9' },
    { size: 'XL', chest: '46-48', length: '31', sleeve: '9.5' },
    { size: 'XXL', chest: '50-52', length: '32', sleeve: '10' },
  ]

  return (
    <div className="border-t border-border pt-8">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full py-4 text-sm font-light tracking-wide text-foreground hover:text-primary transition-colors"
      >
        <span>SIZE GUIDE</span>
        <ChevronDown
          size={18}
          className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div className="py-6 overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-2 font-light text-secondary">SIZE</th>
                <th className="text-left py-3 px-2 font-light text-secondary">CHEST (inches)</th>
                <th className="text-left py-3 px-2 font-light text-secondary">LENGTH (inches)</th>
                <th className="text-left py-3 px-2 font-light text-secondary">SLEEVE (inches)</th>
              </tr>
            </thead>
            <tbody>
              {sizes.map((row, idx) => (
                <tr key={idx} className="border-b border-border/50">
                  <td className="py-3 px-2 font-light text-foreground">{row.size}</td>
                  <td className="py-3 px-2 font-light text-foreground">{row.chest}</td>
                  <td className="py-3 px-2 font-light text-foreground">{row.length}</td>
                  <td className="py-3 px-2 font-light text-foreground">{row.sleeve}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-xs text-secondary mt-4 font-light">
            All measurements in inches. For best fit, measure a t-shirt that fits you well.
          </p>
        </div>
      )}
    </div>
  )
}
