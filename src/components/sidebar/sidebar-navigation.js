import * as React from "react"
import Tree from "./sidebar-tree"
import styled from "@emotion/styled"
import { Link, StaticQuery, graphql } from "gatsby"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faArrowLeft,
  faArrowUpRightFromSquare,
} from "@fortawesome/free-solid-svg-icons"
import config from "../../../config"

// eslint-disable-next-line no-unused-vars
const ListItem = styled(({ className, active, level, ...props }) => {
  return (
    <li className={className}>
      <a href={props.to} {...props} target="_blank" rel="noopener noreferrer">
        {props.children}
      </a>
    </li>
  )
})`
  list-style: none;
  a {
    display: block;
    position: relative;
    ${props => props.active && ``} // external link icon
    svg {
      display: inline;
      margin-left: 0.5rem;
    }
  }
`

const Sidebar = styled("aside")``

const Divider = styled(props => (
  <li {...props}>
    <hr />
  </li>
))``

const SidebarLayout = ({ location }) => (
  <StaticQuery
    query={graphql`
      query {
        allMarkdownRemark {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
              }
            }
          }
        }
      }
    `}
    render={({ allMarkdownRemark }) => {
      return (
        <Sidebar>
          <p className="header-div">导航 · Sidebar Navigation</p>
          <Link to="/" className="text-sm">
            <FontAwesomeIcon icon={faArrowLeft} size="s" />
            {` `}Home
          </Link>
          <ul className={"sideBarUL ml-[2px] text-sm"}>
            <Tree edges={allMarkdownRemark.edges} />
            {config.sidebar.links && config.sidebar.links.length > 0 && (
              <Divider />
            )}
          </ul>
          {config.sidebar.links.map((link, key) => {
            if (link.link !== "" && link.text !== "") {
              return (
                <ListItem className="text-sm" key={key} to={link.link}>
                  {link.text}
                  <FontAwesomeIcon icon={faArrowUpRightFromSquare} size="xs" />
                </ListItem>
              )
            }
          })}
        </Sidebar>
      )
    }}
  />
)

export default SidebarLayout
