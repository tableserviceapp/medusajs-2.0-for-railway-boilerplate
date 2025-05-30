import React from "react"

import UnderlineLink from "@modules/common/components/interactive-link"

import AccountNav from "../components/account-nav"
import { HttpTypes } from "@medusajs/types"

interface AccountLayoutProps {
  customer: HttpTypes.StoreCustomer | null
  children: React.ReactNode
}

const AccountLayout: React.FC<AccountLayoutProps> = ({
  customer,
  children,
}) => {
  // If no customer (login page), render without the account layout wrapper
  if (!customer) {
    return <>{children}</>
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-pink-50" data-testid="account-page">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-pink-500 to-orange-500 text-white py-16">
        <div className="content-container">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Welcome back, {customer.first_name}!
            </h1>
            <p className="text-xl text-white/90">
              Manage your orders, profile, and preferences all in one place
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="content-container py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
            {/* Sidebar Navigation */}
            <div className="lg:sticky lg:top-8 lg:self-start">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="p-6 bg-gradient-to-r from-pink-50 to-orange-50 border-b border-gray-100">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {customer.first_name?.charAt(0)?.toUpperCase() || 'U'}
                    </div>
          <div>
                      <h3 className="font-bold text-gray-800">{customer.first_name} {customer.last_name}</h3>
                      <p className="text-sm text-gray-600">{customer.email}</p>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <AccountNav customer={customer} />
                </div>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="p-8">
                  {children}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Help Section */}
      <div className="bg-white border-t border-gray-200">
        <div className="content-container py-16">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-pink-50 to-orange-50 rounded-2xl p-8 border border-gray-100">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="text-center md:text-left">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2 flex items-center gap-2">
                    <svg className="w-6 h-6 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Need Help?
                  </h3>
                  <p className="text-gray-600 text-lg">
                    Find answers to frequently asked questions and get support from our customer service team.
                  </p>
          </div>
          <div>
            <UnderlineLink href="/customer-service">
                    <button className="px-8 py-3 bg-gradient-to-r from-pink-500 to-orange-500 text-white font-bold rounded-full hover:from-pink-600 hover:to-orange-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                      Contact Support
                    </button>
            </UnderlineLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AccountLayout
