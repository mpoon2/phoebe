/**
 * Code adpated from https://github.com/hasura/gatsby-gitbook-starter
 */
import * as React from "react"
import config from "../../../config"
import Link from "../link"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCaretDown, faCaretLeft } from "@fortawesome/free-solid-svg-icons"

const TreeNode = ({
  className = "",
  setCollapsed,
  collapsed,
  url,
  title,
  items,
  ...rest
}) => {
  const isCollapsed = collapsed[url]

  const collapse = () => {
    setCollapsed(url)
  }

  const hasChildren = items.length !== 0

  let location

  if (typeof document != "undefined") {
    location = document.location
  }
  const active =
    location &&
    (location.pathname === url ||
      location.pathname === config.gatsby.pathPrefix + url)

  const calculatedClassName = `${className} item ${active ? "active" : ""}`

  return (
    <li
      className={
        !config.sidebar.frontLine && title && hasChildren
          ? `${calculatedClassName} parent`
          : `${calculatedClassName}`
      }
    >
      {title && <Link to={url}>{title}</Link>}
      {!config.sidebar.frontLine && title && hasChildren ? (
        <button onClick={collapse} aria-label="collapse" className="collapser">
          {!isCollapsed ? (
            <FontAwesomeIcon icon={faCaretDown} className="ml-1" size="xs" />
          ) : (
            <FontAwesomeIcon icon={faCaretLeft} className="ml-1" size="xs" />
          )}
        </button>
      ) : null}

      {!isCollapsed && hasChildren ? (
        <ul className="sidebar-nav-item ml-4">
          {items.map((item, index) => (
            <TreeNode
              key={item.url + index.toString()}
              setCollapsed={setCollapsed}
              collapsed={collapsed}
              {...item}
            />
          ))}
        </ul>
      ) : null}
    </li>
  )
}

export default TreeNode
