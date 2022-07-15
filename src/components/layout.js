import * as React from "react"
import Navigation from "./navigation"
import { useStaticQuery, graphql } from "gatsby"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faHeart,
  faHandFist,
  faArrowRightLong,
  faHammer,
  faUserAstronaut,
  faServer,
} from "@fortawesome/free-solid-svg-icons"
import Icon from "./logo.inline.svg"
import "./layout.scss"

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath
  const data = useStaticQuery(graphql`
    query {
      currentBuildDate {
        currentDate
      }
    }
  `)

  return (
    <div className="global-wrapper" data-is-root-path={isRootPath}>
      <Navigation />
      <main>
        <div className="max-w-screen-2xl mx-auto px-2 sm:px-6 lg:px-12">
          {children}
        </div>
      </main>
      <footer className="max-w-screen-2xl mx-auto px-2 sm:px-6 lg:px-12">
        <p className="text-center text-sm">
          <span className="font-medium">
            © {new Date().getFullYear()}
            {` `}
            <Icon className="inline m-auto h-4 pb-[2px] footer-logo" />
            {` `}
            Matthew Y.F. Poon -{` `}
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
    </div>
  )
}

export default Layout
