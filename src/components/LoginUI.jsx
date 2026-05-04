'use client'

import { useState } from 'react'

export default function LoginUI({ setPassword }) {
  const [email, setEmail] = useState('')
  const [password, setPass] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = async () => {
    setLoading(true)
    setError('')

    setTimeout(() => {
      if (!email || !password) {
        setError('Email ve şifre gerekli')
        setLoading(false)
        return
      }

      if (setPassword) setPassword(password)

      console.log('login:', { email, password })
      setLoading(false)
    }, 500)
  }

  const inputBase =
    "peer w-full p-3 pt-5 rounded-xl bg-white/80 backdrop-blur-md text-gray-900 border border-gray-200 focus:outline-none focus:border-blue-400"

  const labelBase =
    "absolute left-3 top-3 text-sm text-gray-400 transition-all duration-200 " +
    "peer-focus:-top-2 peer-focus:text-xs peer-focus:text-blue-500 " +
    "peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400"

  return (
    <div className="w-screen h-screen flex overflow-hidden">

      {/* LEFT - LOGIN */}
      <div className="w-1/2 flex items-center justify-center relative bg-[#f6f7fb]">

        {/* soft glow background */}
        <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-blue-50 opacity-80" />

        <div className="relative z-10 w-full max-w-md rounded-2xl
          bg-white/70 backdrop-blur-xl
          border border-white/40
          shadow-[0_30px_80px_rgba(0,0,0,0.12)]
          p-10 space-y-6">

          {/* HEADER */}
          <div>
            <h1 className="text-3xl font-semibold text-gray-900">
              Welcome back
            </h1>
            <p className="text-sm text-gray-500 mt-2">
              Sign in to continue your workspace
            </p>
          </div>

          {/* INPUTS */}
          <div className="space-y-4">

            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder=" "
                className={inputBase}
              />
              <label className={labelBase}>Email</label>
            </div>

            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPass(e.target.value)}
                placeholder=" "
                className={inputBase}
              />
              <label className={labelBase}>Password</label>
            </div>

            {error && (
              <div className="text-sm text-red-500">
                {error}
              </div>
            )}

            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full py-3 rounded-xl
              bg-gradient-to-r from-gray-900 to-black
              text-white font-medium
              hover:scale-[1.01] active:scale-[0.98]
              transition-all shadow-lg"
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </div>

          <div className="text-center text-sm text-gray-500">
            Don’t have an account?{" "}
            <span className="text-gray-900 font-medium cursor-pointer hover:underline">
              Sign up
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}