import React from 'react'

const GrammarTable = () => {
  return (
    <div className="p-16">
      <h2 className="mb-8 uppercase font-black text-2xl">Production Rules</h2>
      <ul>
        <li>Assignment → Identifier "=" Expression</li>
        <li>Expression → Term Operator Term | Term Operator Primary | Primary</li>
        <li>Term → Primary Operator Primary | Primary</li>
        <li>Primary → NUMBER | IDENTIFIER | "(" Expression ")"</li>
        <li>Number → [0-9]</li>
        <li>Operator → '+' | '-' | '*' | '/'</li>
        <li>Identifier → [a-zA-Z]</li>
      </ul>
    </div>
  )
}

export default GrammarTable
