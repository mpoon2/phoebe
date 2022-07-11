import React from 'react';
import { Link } from 'gatsby';
import { useStaticQuery, graphql } from 'gatsby'
import {
  SignedOut,
  UserButton,
  SignInButton,
} from "@clerk/clerk-react";

import Icon from "./logo.inline.svg";
import DarkToggle from "./darkToggle"
import "./navigation.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faUserAstronaut,
  faMagnifyingGlass
} from '@fortawesome/free-solid-svg-icons'
import SearchModal from "../components/searchModal"

/* This example requires Tailwind CSS v2.0+ */
import { Disclosure } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'

const navigation = [
  { name: 'academic', href: '/academic', current: false },
  { name: 'journal', href: '/journal', current: false },
  { name: 'personal', href: '/personal', current: false },
  { name: 'ramblings', href: '/ramblings', current: false },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Example() {

  const [isOpen, setOpen] = React.useState(false);
  const handleClick = () => {
    setOpen(!isOpen);
  };
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
    <Disclosure as="nav" className="nav">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
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
                    <Icon 
                      className="block md:hidden h-6 w-auto my-auto brand-logo" 
                    />
                    <Icon 
                      className="hidden md:block h-6 w-auto my-auto brand-logo"
                    />
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
                      {navigation.map((item) => (
                        <Link
                          to={item.href}
                          className={classNames(
                            'nav-item',
                            'px-3 py-2 rounded-md text-sm font-medium'
                          )}
                          activeClassName="active-nav-item"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>

                <DarkToggle />

                {/* Profile dropdown */}
                <UserButton />
                {/* If the user is signed out, show the SignIn component */}
                {/* After signing in, the user button will be visible */}
                <SignedOut>
                  <SignInButton>
                    <button className="px-2 py-2 rounded-md text-regular font-medium" >
                      <FontAwesomeIcon icon={faUserAstronaut} size="s" />
                    </button>
                  </SignInButton>
                </SignedOut>
                <button type="button" className="px-2 py-2 rounded-md text-regular font-medium" onClick={handleClick}>
                  <FontAwesomeIcon icon={faMagnifyingGlass} size="s" />
                </button>
              </div>
            </div>
          </div>

          {/* Search */}
          {isOpen && 
            <div>
              <SearchModal />
            </div>
          }

          <Disclosure.Panel className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block px-3 py-2 rounded-md text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
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