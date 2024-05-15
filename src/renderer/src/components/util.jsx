import React from 'react'

const convertToObjects = (parsedResult) => {
  const objectArrays = []

  const convert = (node) => {
    if (!node) return null

    const jsxElement = (
      <div className="node">
        <div>Type: {node.type}</div>
        <div>Value: {node.value}</div>
        {node.left && <div>Left: {convert(node.left)}</div>}
        {node.right && <div>Right: {convert(node.right)}</div>}
      </div>
    )

    return jsxElement
  }

  objectArrays.push(convert(parsedResult))

  return objectArrays
}

export default convertToObjects
