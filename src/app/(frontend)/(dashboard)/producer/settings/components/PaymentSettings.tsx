'use client'

import { useState } from 'react'

export function PaymentSettings() {
  const [isLoading, setIsLoading] = useState(false)
  const [settings, setSettings] = useState({
    payoutMethod: 'bank',
    bankAccount: {
      accountHolderName: '',
      accountNumber: '',
      routingNumber: '',
      bankName: '',
    },
    paypal: {
      email: '',
    },
    minimumPayout: 50,
    payoutFrequency: 'monthly',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setIsLoading(true)

      const res = await fetch('/api/users/payment-settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(settings),
      })

      if (!res.ok) {
        throw new Error('Failed to update payment settings')
      }
    } catch (error) {
      console.error('Error updating payment settings:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="overflow-hidden rounded-lg bg-white shadow">
      <div className="p-6">
        <h3 className="text-base font-semibold leading-6 text-gray-900">Payment Settings</h3>
        <p className="mt-1 text-sm text-gray-500">
          Configure your payout preferences and payment methods.
        </p>

        <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
          <div className="sm:col-span-3">
            <label htmlFor="payoutMethod" className="block text-sm font-medium text-gray-700">
              Payout Method
            </label>
            <div className="mt-1">
              <select
                id="payoutMethod"
                name="payoutMethod"
                value={settings.payoutMethod}
                onChange={(e) => setSettings((prev) => ({ ...prev, payoutMethod: e.target.value }))}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              >
                <option value="bank">Bank Account</option>
                <option value="paypal">PayPal</option>
              </select>
            </div>
          </div>

          {settings.payoutMethod === 'bank' ? (
            <>
              <div className="sm:col-span-6">
                <label
                  htmlFor="accountHolderName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Account Holder Name
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="accountHolderName"
                    id="accountHolderName"
                    value={settings.bankAccount.accountHolderName}
                    onChange={(e) =>
                      setSettings((prev) => ({
                        ...prev,
                        bankAccount: {
                          ...prev.bankAccount,
                          accountHolderName: e.target.value,
                        },
                      }))
                    }
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="accountNumber" className="block text-sm font-medium text-gray-700">
                  Account Number
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="accountNumber"
                    id="accountNumber"
                    value={settings.bankAccount.accountNumber}
                    onChange={(e) =>
                      setSettings((prev) => ({
                        ...prev,
                        bankAccount: {
                          ...prev.bankAccount,
                          accountNumber: e.target.value,
                        },
                      }))
                    }
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="routingNumber" className="block text-sm font-medium text-gray-700">
                  Routing Number
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="routingNumber"
                    id="routingNumber"
                    value={settings.bankAccount.routingNumber}
                    onChange={(e) =>
                      setSettings((prev) => ({
                        ...prev,
                        bankAccount: {
                          ...prev.bankAccount,
                          routingNumber: e.target.value,
                        },
                      }))
                    }
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
              </div>

              <div className="sm:col-span-6">
                <label htmlFor="bankName" className="block text-sm font-medium text-gray-700">
                  Bank Name
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="bankName"
                    id="bankName"
                    value={settings.bankAccount.bankName}
                    onChange={(e) =>
                      setSettings((prev) => ({
                        ...prev,
                        bankAccount: {
                          ...prev.bankAccount,
                          bankName: e.target.value,
                        },
                      }))
                    }
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
              </div>
            </>
          ) : (
            <div className="sm:col-span-6">
              <label htmlFor="paypalEmail" className="block text-sm font-medium text-gray-700">
                PayPal Email
              </label>
              <div className="mt-1">
                <input
                  type="email"
                  name="paypalEmail"
                  id="paypalEmail"
                  value={settings.paypal.email}
                  onChange={(e) =>
                    setSettings((prev) => ({
                      ...prev,
                      paypal: { ...prev.paypal, email: e.target.value },
                    }))
                  }
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>
            </div>
          )}

          <div className="sm:col-span-3">
            <label htmlFor="minimumPayout" className="block text-sm font-medium text-gray-700">
              Minimum Payout Amount
            </label>
            <div className="mt-1">
              <input
                type="number"
                name="minimumPayout"
                id="minimumPayout"
                min="0"
                value={settings.minimumPayout}
                onChange={(e) =>
                  setSettings((prev) => ({ ...prev, minimumPayout: parseInt(e.target.value) }))
                }
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>
          </div>

          <div className="sm:col-span-3">
            <label htmlFor="payoutFrequency" className="block text-sm font-medium text-gray-700">
              Payout Frequency
            </label>
            <div className="mt-1">
              <select
                id="payoutFrequency"
                name="payoutFrequency"
                value={settings.payoutFrequency}
                onChange={(e) =>
                  setSettings((prev) => ({ ...prev, payoutFrequency: e.target.value }))
                }
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              >
                <option value="weekly">Weekly</option>
                <option value="biweekly">Bi-weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
        <button
          type="submit"
          disabled={isLoading}
          className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
        >
          {isLoading ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </form>
  )
}
