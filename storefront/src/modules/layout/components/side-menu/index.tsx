"use client"

import { Popover, Transition } from "@headlessui/react"
import { Text, clx, useToggleState } from "@medusajs/ui"
import { Fragment, useEffect, useState } from "react"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CountrySelect from "../country-select"
import { HttpTypes } from "@medusajs/types"

const SideMenuItems = {
  Home: "/",
  Products: "/store",
  "Free From": "/collections/free-from",
  About: "/about",
  Blog: "/blog",
  Account: "/account",
  Help: "/help",
  Cart: "/cart",
}

const SideMenu = ({ regions }: { regions: HttpTypes.StoreRegion[] | null }) => {
  const toggleState = useToggleState()
  const [mounted, setMounted] = useState(false)
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear())

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="h-full">
      <div className="flex items-center h-full">
        <Popover className="h-full flex">
          {({ open, close }) => (
            <>
              <div className="relative flex h-full">
                <Popover.Button
                  data-testid="nav-menu-button"
                  className="relative h-full flex items-center px-4 py-2 text-gray-700 hover:text-pink-500 transition-all ease-out duration-200 focus:outline-none font-medium font-nav"
                >
                  <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                  Menu
                </Popover.Button>
              </div>

              <Transition
                show={open}
                as={Fragment}
                enter="transition ease-out duration-150"
                enterFrom="opacity-0"
                enterTo="opacity-100 backdrop-blur-2xl"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 backdrop-blur-2xl"
                leaveTo="opacity-0"
              >
                <Popover.Panel className="flex flex-col absolute w-full pr-4 sm:pr-0 sm:w-1/3 2xl:w-1/4 sm:min-w-min h-[calc(100vh-1rem)] z-30 inset-x-0 text-sm text-white m-2 backdrop-blur-2xl">
                  <div
                    data-testid="nav-menu-popup"
                    className="flex flex-col h-full bg-gradient-to-br from-pink-500/95 via-pink-500/95 to-orange-500/95 rounded-2xl justify-between p-6 shadow-2xl"
                  >
                    <div className="flex justify-end" id="xmark">
                      <button 
                        data-testid="close-menu-button" 
                        onClick={close}
                        className="p-2 hover:bg-white/20 rounded-full transition-colors duration-200"
                      >
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    <ul className="flex flex-col gap-6 items-start justify-start">
                      {Object.entries(SideMenuItems).map(([name, href]) => {
                        return (
                          <li key={name}>
                            <LocalizedClientLink
                              href={href}
                              className="text-2xl md:text-3xl leading-10 hover:text-yellow-200 transition-colors duration-200 font-medium font-nav"
                              onClick={close}
                              data-testid={`${name.toLowerCase().replace(' ', '-')}-link`}
                            >
                              {name}
                            </LocalizedClientLink>
                          </li>
                        )
                      })}
                    </ul>
                    <div className="flex flex-col gap-y-6">
                      <div
                        className="flex justify-between items-center p-4 bg-white/10 rounded-lg backdrop-blur-sm"
                        onMouseEnter={toggleState.open}
                        onMouseLeave={toggleState.close}
                      >
                        {regions && (
                          <CountrySelect
                            toggleState={toggleState}
                            regions={regions}
                          />
                        )}
                        <svg 
                          className={clx(
                            "w-5 h-5 transition-transform duration-150 text-white",
                            toggleState.state ? "-rotate-90" : ""
                          )}
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                      <Text className="flex justify-between txt-compact-small text-white/80">
                        © {currentYear} Cake Box Gifts. All rights reserved.
                      </Text>
                    </div>
                  </div>
                </Popover.Panel>
              </Transition>
            </>
          )}
        </Popover>
      </div>
    </div>
  )
}

export default SideMenu
