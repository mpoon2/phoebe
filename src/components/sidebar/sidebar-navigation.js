import * as React from "react"
import Tree from "./sidebar-tree"
import { Link, StaticQuery, graphql } from "gatsby"
import styled from "@emotion/styled"
import { ExternalLink } from "react-feather"
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
    font-weight: ${({ level }) => (level === 0 ? 700 : 400)};
    padding: 0.45rem 0 0.45rem ${props => 2 + (props.level || 0) * 1}rem;
    display: block;
    position: relative;
    &:hover {
      color: #1ed3c6 !important;
    }
    ${props =>
      props.active &&
      `
      // color: #663399;
      border-color: rgb(230,236,241) !important;
      border-style: solid none solid solid;
      border-width: 1px 0px 1px 1px;
      background-color: #fff;
    `} // external link icon
    svg {
      float: right;
      margin-right: 1rem;
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
          <Link to="/">Home</Link>
          <ul className={"sideBarUL"}>
            <Tree edges={allMarkdownRemark.edges} />
            {config.sidebar.links && config.sidebar.links.length > 0 && (
              <Divider />
            )}
          </ul>
            {config.sidebar.links.map((link, key) => {
              if (link.link !== "" && link.text !== "") {
                return (
                  <ListItem key={key} to={link.link}>
                    {link.text}
                    <ExternalLink size={14} />
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
