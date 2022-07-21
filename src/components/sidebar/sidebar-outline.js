/**
 * Code adapted from https://haseebmajid.dev/blog/toc-in-gatsby
 */
import styled from "@emotion/styled"
import React from "react"
import tw from "twin.macro"
import "./sidebar-outline.scss"

const ToC = ({ headings }) => (
  <Toc>
    <p className="header-div">Table of contents</p>
    <InnerScroll>
      {headings.map(heading => {
        if (heading.depth > 4) {
          return <div />
        }

        return (
          <ToCElement className={`toc-${heading.depth}`} key={heading.value}>
            <ToCLink
              href={`#${heading.value.replace(/\s+/g, "-").toLowerCase()}`}
            >
              {heading.value}
            </ToCLink>
          </ToCElement>
        )
      })}
    </InnerScroll>
  </Toc>
)

const Toc = styled.ul`
  ${tw``};
`

const Title = tw.p`font-semibold`

const ToCElement = tw.li`mt-2 mb-2 list-none`

const ToCLink = tw.a`transition-all`

const InnerScroll = styled.div``

export default ToC
