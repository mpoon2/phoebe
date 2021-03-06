import React from "react"
import { Link } from "gatsby"
import { useStaticQuery, graphql } from "gatsby"
import Icon from "./logo.inline.svg"
import DarkToggle from "./dark-toggle"
import { Fragment } from "react"
import { Disclosure, Menu, Transition } from "@headlessui/react"
import { MenuIcon, XIcon } from "@heroicons/react/outline"
import { useKeycloak } from "@react-keycloak/web"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUserAstronaut, faLock } from "@fortawesome/free-solid-svg-icons"
import Search from "./search/search-simple"
import "./navigation.scss"

const navigationPublic = [
  { name: "personal", href: "/personal", current: false },
  { name: "ramblings", href: "/ramblings", current: false },
]
const navigationPrivate = [
  { name: "academic", href: "/academic", current: false },
  { name: "journal", href: "/journal", current: false },
  { name: "personal", href: "/personal", current: false },
  { name: "ramblings", href: "/ramblings", current: false },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(" ")
}

export default function Navbar() {
  const { keycloak, initialized } = useKeycloak()

  const query = useStaticQuery(graphql`
    query SITE_TITLE {
      site {
        siteMetadata {
          title
          subtitle
        }
      }
    }
  `)

  return (
    <Disclosure as="nav" className="nav sticky top-0 z-10 w-full backdrop-blur">
      {({ open }) => (
        <>
          <div className="max-w-screen-2xl mx-auto px-2 sm:px-12 lg:px-16 my-auto py-8">
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="mobile-nav-button inline-flex items-center justify-center p-2 rounded-md hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex-shrink-0 flex items-center">
                  <Link to="/" className="flex">
                    <Icon className="block md:hidden h-6 w-auto my-auto brand-logo" />
                    <Icon className="hidden md:block h-6 w-auto my-auto brand-logo" />
                    <div className="site-title my-auto">
                      <span className="title hidden md:block px-1 py-0 font-bold text-lg leading-4">
                        {query.site.siteMetadata.title}
                      </span>
                      <span className="subtitle hidden md:block px-1 py-0 font-semibold text-xxs tracking-tight">
                        {query.site.siteMetadata.subtitle}
                      </span>
                    </div>
                  </Link>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <div className="hidden sm:block sm:ml-6">
                  <div className="flex space-x-4">
                    {keycloak &&
                      keycloak.hasResourceRole("viewers") &&
                      navigationPrivate.map(item => (
                        <Link
                          to={item.href}
                          className={classNames(
                            "nav-item",
                            "px-3 py-2 rounded-md text-sm font-medium"
                          )}
                          activeClassName="active-nav-item"
                        >
                          {item.name}
                        </Link>
                      ))}
                    {keycloak &&
                      !keycloak.authenticated &&
                      navigationPublic.map(item => (
                        <Link
                          to={item.href}
                          className={classNames(
                            "nav-item",
                            "px-3 py-2 rounded-md text-sm font-medium"
                          )}
                          activeClassName="active-nav-item"
                        >
                          {item.name}
                        </Link>
                      ))}
                  </div>
                </div>
                {/* Dark Mode Toggle */}
                <DarkToggle />
                {/* Profile dropdown */}
                <Menu as="div" className="relative">
                  <div>
                    <Menu.Button className="px-2 py-2 rounded-md text-regular font-medium">
                      <span className="sr-only">Open user menu</span>
                      {keycloak && keycloak.authenticated ? (
                        <FontAwesomeIcon icon={faUserAstronaut} size="s" />
                      ) : (
                        <FontAwesomeIcon icon={faLock} size="s" />
                      )}
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            Profile
                          </a>
                        )}
                      </Menu.Item>
                      {keycloak && keycloak.authenticated ? (
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              onClick={() => keycloak.logout()}
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Sign out
                            </a>
                          )}
                        </Menu.Item>
                      ) : (
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              onClick={() => keycloak.login()}
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Sign in
                            </a>
                          )}
                        </Menu.Item>
                      )}
                    </Menu.Items>
                  </Transition>
                </Menu>
                {/* Search Toggle*/}
                <Search />
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {keycloak &&
                keycloak.hasResourceRole("viewers") &&
                navigationPrivate.map(item => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className={classNames(
                      item.current
                        ? "bg-gray-900 text-white mobile-nav-item-active"
                        : "mobile-nav-item hover:bg-gray-700 hover:text-white",
                      "block px-3 py-2 rounded-md text-base font-medium"
                    )}
                    aria-current={item.current ? "page" : undefined}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              {keycloak &&
                !keycloak.authenticated &&
                navigationPublic.map(item => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className={classNames(
                      item.current
                        ? "bg-gray-900 text-white mobile-nav-item-active"
                        : "mobile-nav-item hover:bg-gray-700 hover:text-white",
                      "block px-3 py-2 rounded-md text-base font-medium"
                    )}
                    aria-current={item.current ? "page" : undefined}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}
