"use client"

import { clx } from "@medusajs/ui"
import { useParams, usePathname } from "next/navigation"

import ChevronDown from "@modules/common/icons/chevron-down"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { HttpTypes } from "@medusajs/types"
import { signout } from "@lib/data/customer"

const AccountNav = ({
  customer,
}: {
  customer: HttpTypes.StoreCustomer | null
}) => {
  const route = usePathname()
  const { countryCode } = useParams() as { countryCode: string }

  const handleLogout = async () => {
    await signout(countryCode)
  }

  const navItems = [
    {
      href: "/account",
      label: "Overview",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v0a2 2 0 01-2 2h-4a2 2 0 01-2-2v0z" />
        </svg>
      ),
      testId: "overview-link"
    },
    {
      href: "/account/profile",
      label: "Profile",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      testId: "profile-link"
    },
    {
      href: "/account/addresses",
      label: "Addresses",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
        </svg>
      ),
      testId: "addresses-link"
    },
    {
      href: "/account/orders",
      label: "Orders",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119.993z" />
        </svg>
      ),
      testId: "orders-link"
    }
  ]

  return (
    <div>
      {/* Mobile Navigation */}
      <div className="lg:hidden" data-testid="mobile-account-nav">
        {route !== `/${countryCode}/account` ? (
          <LocalizedClientLink
            href="/account"
            className="flex items-center gap-x-3 text-gray-700 hover:text-pink-500 py-3 px-4 rounded-lg hover:bg-pink-50 transition-all duration-200"
            data-testid="account-main-link"
          >
            <ChevronDown className="transform rotate-90 w-4 h-4" />
            <span className="font-medium">Back to Account</span>
          </LocalizedClientLink>
        ) : (
          <div className="space-y-2">
            {navItems.map((item) => (
              <LocalizedClientLink
                key={item.href}
                href={item.href}
                className="flex items-center justify-between py-4 px-4 border-b border-gray-100 hover:bg-pink-50 rounded-lg transition-all duration-200 group"
                data-testid={item.testId}
              >
                <div className="flex items-center gap-x-3">
                  <div className="text-gray-400 group-hover:text-pink-500 transition-colors duration-200">
                    {item.icon}
                  </div>
                  <span className="font-medium text-gray-700 group-hover:text-pink-500 transition-colors duration-200">
                    {item.label}
                  </span>
                </div>
                <ChevronDown className="transform -rotate-90 w-4 h-4 text-gray-400 group-hover:text-pink-500 transition-colors duration-200" />
              </LocalizedClientLink>
            ))}
            <button
              type="button"
              className="flex items-center justify-between py-4 px-4 w-full hover:bg-red-50 rounded-lg transition-all duration-200 group"
              onClick={handleLogout}
              data-testid="logout-button"
            >
              <div className="flex items-center gap-x-3">
                <svg className="w-5 h-5 text-gray-400 group-hover:text-red-500 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                </svg>
                <span className="font-medium text-gray-700 group-hover:text-red-500 transition-colors duration-200">
                  Log out
                </span>
              </div>
              <ChevronDown className="transform -rotate-90 w-4 h-4 text-gray-400 group-hover:text-red-500 transition-colors duration-200" />
            </button>
          </div>
        )}
      </div>

      {/* Desktop Navigation */}
      <div className="hidden lg:block" data-testid="account-nav">
        <nav className="space-y-2">
          {navItems.map((item) => (
            <AccountNavLink
              key={item.href}
              href={item.href}
              route={route!}
              icon={item.icon}
              data-testid={item.testId}
            >
              {item.label}
            </AccountNavLink>
          ))}
          <button
            type="button"
            onClick={handleLogout}
            className="flex items-center gap-x-3 w-full text-left py-3 px-4 text-gray-700 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200 font-medium"
            data-testid="logout-button"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
            </svg>
            <span>Log out</span>
          </button>
        </nav>
      </div>
    </div>
  )
}

type AccountNavLinkProps = {
  href: string
  route: string
  children: React.ReactNode
  icon: React.ReactNode
  "data-testid"?: string
}

const AccountNavLink = ({
  href,
  route,
  children,
  icon,
  "data-testid": dataTestId,
}: AccountNavLinkProps) => {
  const params = useParams()
  const countryCode = params?.countryCode as string

  const active = route.split(countryCode)[1] === href
  
  return (
    <LocalizedClientLink
      href={href}
      className={clx(
        "flex items-center gap-x-3 py-3 px-4 rounded-lg transition-all duration-200 font-medium",
        {
          "bg-gradient-to-r from-pink-500 to-orange-500 text-white shadow-lg": active,
          "text-gray-700 hover:text-pink-500 hover:bg-pink-50": !active,
        }
      )}
      data-testid={dataTestId}
    >
      <div className={clx("w-5 h-5", {
        "text-white": active,
        "text-gray-400": !active,
      })}>
        {icon}
      </div>
      <span>{children}</span>
    </LocalizedClientLink>
  )
}

export default AccountNav
