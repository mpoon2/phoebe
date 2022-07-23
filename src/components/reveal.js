import React, { useState } from "react"
import "./reveal.scss"

export default function ShowButtonHover({ start, hover, className }) {
  // useState keeps an internal state in the component
  let initialTxt = start
  let hoverTxt = hover
  const [text, setText] = React.useState(initialTxt)

  return (
    <span
      className={`${className} reveal-span`}
      onMouseOver={() => setText(hoverTxt)}
      onMouseLeave={() => setText(initialTxt)}
    >
      {text}
    </span>
  )
}
