import React, { useState, useEffect } from 'react'
import { Tree } from 'react-d3-tree'
import '../../App.scss'

const D3Tree = ({ data }) => {
  const [translate, setTranslate] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const dimensions = { width: window.innerWidth, height: window.innerHeight }
    const customTranslate = { x: dimensions.width / 2.5, y: 100 }
    setTranslate(customTranslate)
  }, [])

  console.log(data)

  return (
    <Tree
      data={data}
      collapsible={false}
      pathFunc="step"
      orientation="vertical"
      enableLegacyTransitions={true}
      separation={{ siblings: 2, nonSiblings: 1 }}
      translate={translate}
    />
  )
}

export default D3Tree
