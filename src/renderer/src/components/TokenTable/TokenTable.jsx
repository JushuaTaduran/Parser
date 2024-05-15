import React from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow
} from '../../../../components/ui/table'

const TokenTable = ({ data }) => {
  const flattenParseTree = (node, tokens = []) => {
    if (!node) return tokens

    if (node.name === 'IDENTIFIER' || node.name === 'CONSTANT') {
      const value = node.attributes?.value || 'N/A'
      tokens.push({ name: node.name, value })
    }

    if (node.name === 'OPERATOR') {
      const operator = node.attributes?.operator || 'N/A'
      tokens.push({ name: node.name, value: operator })
    }

    if (node.children && Array.isArray(node.children)) {
      node.children.forEach((child) => flattenParseTree(child, tokens))
    } else if (node.children && typeof node.children === 'object') {
      flattenParseTree(node.children, tokens)
    }

    return tokens
  }

  const tokens = flattenParseTree(data)

  return (
    <div style={{ height: '100%', overflowY: 'auto' }}>
      <Table>
        <TableCaption>Token Table</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Token Name</TableHead>
            <TableHead>Token Value</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tokens.map((token, index) => (
            <TableRow key={index}>
              <TableCell>{token.name}</TableCell>
              <TableCell>{token.value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={2}>Total Tokens: {tokens.length}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  )
}

export default TokenTable
