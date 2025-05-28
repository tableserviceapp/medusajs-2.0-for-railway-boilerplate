"use client"

import { useFormState } from "react-dom"

import Input from "@modules/common/components/input"
import { LOGIN_VIEW } from "@modules/account/templates/login-template"
import ErrorMessage from "@modules/checkout/components/error-message"
import { SubmitButton } from "@modules/checkout/components/submit-button"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { signup } from "@lib/data/customer"

type Props = {
  setCurrentView: (view: LOGIN_VIEW) => void
}

const Register = ({ setCurrentView }: Props) => {
  const [message, formAction] = useFormState(signup, null)

  return (
    <div className="w-full" data-testid="register-page">
      {/* Register Form */}
      <form className="w-full space-y-6" action={formAction}>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="First name"
              name="first_name"
              required
              autoComplete="given-name"
              data-testid="first-name-input"
            />
            <Input
              label="Last name"
              name="last_name"
              required
              autoComplete="family-name"
              data-testid="last-name-input"
            />
          </div>
          
          <Input
            label="Email Address"
            name="email"
            required
            type="email"
            autoComplete="email"
            data-testid="email-input"
          />
          
          <Input
            label="Phone Number"
            name="phone"
            type="tel"
            autoComplete="tel"
            data-testid="phone-input"
          />
          
          <Input
            label="Password"
            name="password"
            required
            type="password"
            autoComplete="new-password"
            data-testid="password-input"
          />
        </div>

        {/* Error Message */}
        {message && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <ErrorMessage error={message} data-testid="register-error" />
          </div>
        )}

        {/* Terms and Conditions */}
        <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-600">
          <p className="text-center">
            By creating an account, you agree to our{" "}
            <LocalizedClientLink
              href="/content/privacy-policy"
              className="text-pink-500 hover:text-pink-600 font-medium underline"
            >
              Privacy Policy
            </LocalizedClientLink>{" "}
            and{" "}
            <LocalizedClientLink
              href="/content/terms-of-use"
              className="text-pink-500 hover:text-pink-600 font-medium underline"
            >
              Terms of Use
            </LocalizedClientLink>
            .
          </p>
        </div>

        {/* Submit Button */}
        <SubmitButton 
          className="w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2" 
          data-testid="register-button"
        >
          Create Account
        </SubmitButton>
      </form>

      {/* Login Link */}
      <div className="text-center mt-8 pt-6 border-t border-gray-100">
        <p className="text-gray-600 mb-3">
          Already have an account?
        </p>
        <button
          onClick={() => setCurrentView(LOGIN_VIEW.SIGN_IN)}
          className="inline-flex items-center gap-2 text-pink-500 hover:text-pink-600 font-semibold transition-colors duration-200"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
          </svg>
          Sign In Instead
        </button>
      </div>
    </div>
  )
}

export default Register
