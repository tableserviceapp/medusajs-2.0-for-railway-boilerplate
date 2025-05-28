import { useFormState } from "react-dom"

import { LOGIN_VIEW } from "@modules/account/templates/login-template"
import Input from "@modules/common/components/input"
import ErrorMessage from "@modules/checkout/components/error-message"
import { SubmitButton } from "@modules/checkout/components/submit-button"
import { login } from "@lib/data/customer"

type Props = {
  setCurrentView: (view: LOGIN_VIEW) => void
}

const Login = ({ setCurrentView }: Props) => {
  const [message, formAction] = useFormState(login, null)

  return (
    <div className="w-full" data-testid="login-page">
      {/* Login Form */}
      <form className="w-full space-y-6" action={formAction}>
        <div className="space-y-4">
          <Input
            label="Email Address"
            name="email"
            type="email"
            title="Enter a valid email address."
            autoComplete="email"
            required
            data-testid="email-input"
          />
          
          <Input
            label="Password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            data-testid="password-input"
          />
        </div>

        {/* Error Message */}
        {message && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <ErrorMessage error={message} data-testid="login-error-message" />
          </div>
        )}

        {/* Submit Button */}
        <SubmitButton 
          data-testid="sign-in-button" 
          className="w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
        >
          Sign In
        </SubmitButton>
      </form>

      {/* Forgot Password Link */}
      <div className="text-center mt-6">
        <button className="text-pink-500 hover:text-pink-600 text-sm font-medium transition-colors duration-200">
          Forgot your password?
        </button>
      </div>

      {/* Register Link */}
      <div className="text-center mt-8 pt-6 border-t border-gray-100">
        <p className="text-gray-600 mb-3">
          New customer?
        </p>
        <button
          onClick={() => setCurrentView(LOGIN_VIEW.REGISTER)}
          className="inline-flex items-center gap-2 text-pink-500 hover:text-pink-600 font-semibold transition-colors duration-200"
          data-testid="register-button"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
          </svg>
          Create an Account
        </button>
      </div>
    </div>
  )
}

export default Login
