import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHeart } from "@fortawesome/free-solid-svg-icons"
import Icon from "./logo.inline.svg"

const Footer = () => {
  const data = useStaticQuery(graphql`
    query {
      currentBuildDate {
        currentDate
      }
    }
  `)
  return (
    <footer className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-12">
      <p className="text-center text-sm">
        <span className="font-medium">
          © {new Date().getFullYear()}
          {` `}
          潘怡暉 · Mattycakes
          {` `}-{` `}
          Made with
          {` `}
          <FontAwesomeIcon icon={faHeart} size="s" />
          {` `} and proudly self-hosted
        </span>
      </p>
      <p className="text-center text-sm build-stamp">
        {` `} Last built on {` `} {data.currentBuildDate.currentDate}
      </p>
    </footer>
  )
}
export default Footer
