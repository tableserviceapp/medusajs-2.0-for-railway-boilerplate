"use client"

import { useState } from "react"

import Register from "@modules/account/components/register"
import Login from "@modules/account/components/login"

export enum LOGIN_VIEW {
  SIGN_IN = "sign-in",
  REGISTER = "register",
}

const LoginTemplate = () => {
  const [currentView, setCurrentView] = useState("sign-in")

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12">
      {/* Main Content */}
      <div className="w-full max-w-md mx-auto px-4">
        {/* Tab Navigation */}
        <div className="flex bg-white rounded-t-xl shadow-sm border border-gray-200 border-b-0">
          <button
            onClick={() => setCurrentView("sign-in")}
            className={`flex-1 py-4 px-6 text-center font-semibold transition-all duration-200 rounded-tl-xl ${
              currentView === "sign-in"
                ? "bg-white text-gray-900 border-b-2 border-pink-500"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setCurrentView("register")}
            className={`flex-1 py-4 px-6 text-center font-semibold transition-all duration-200 rounded-tr-xl ${
              currentView === "register"
                ? "bg-white text-gray-900 border-b-2 border-pink-500"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
            }`}
          >
            Register
          </button>
        </div>

        {/* Form Content */}
        <div className="bg-white rounded-b-xl shadow-sm border border-gray-200 border-t-0 p-8">
          {currentView === "sign-in" ? (
            <Login setCurrentView={setCurrentView} />
          ) : (
            <Register setCurrentView={setCurrentView} />
          )}
        </div>

        {/* Additional Info */}
        <div className="mt-8 text-center">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-center gap-3 mb-4">
              <svg className="w-6 h-6 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <h3 className="text-lg font-bold text-gray-800">Secure & Safe</h3>
            </div>
            <p className="text-gray-600">
              Your personal information is protected with industry-standard encryption and security measures.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginTemplate
