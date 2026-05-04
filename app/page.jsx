'use client'

import dynamic from 'next/dynamic'
import { Suspense, useEffect, useState } from 'react'

const Character = dynamic(() => import('@/components/Character'), { ssr: false })
const View = dynamic(() => import('@/components/canvas/View').then((m) => m.View), { ssr: false })
const Common = dynamic(() => import('@/components/canvas/View').then((m) => m.Common), { ssr: false })

export default function Page() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)

  const [resetOpen, setResetOpen] = useState(false)
  const [resetEmail, setResetEmail] = useState('')
  const [resetMsg, setResetMsg] = useState(null)

  // Cinematic progress
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const len = password.length

    if (len === 0) setProgress(0)
    else if (len < 3) setProgress(0.2)
    else if (len < 6) setProgress(0.5)
    else setProgress(1)
  }, [password])

  const handleLogin = () => {
    setError(null)

    if (!email || !password) {
      setError('Lütfen tüm alanları doldurunuz.')
      return
    }

    if (password.length < 6) {
      setError('Şifre en az 6 karakter olmalıdır.')
      return
    }

    if (email !== 'admin@demo.com' || password !== '123456') {
      setError('E-posta veya şifre hatalı.')
      return
    }

    alert('Giriş başarılı 🚀')
  }

  const handleReset = () => {
    setResetMsg(null)

    if (!resetEmail) {
      setResetMsg('Lütfen e-posta giriniz.')
      return
    }

    setResetMsg('Şifre sıfırlama linki e-posta adresinize gönderildi.')
  }

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#0b0b10] text-white">

      {/* LEFT */}
      <div className="relative flex w-full items-center justify-center px-8 md:w-1/2">
        <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-10 backdrop-blur-xl shadow-2xl">

          <h1 className="text-3xl font-semibold">Welcome</h1>
          <p className="mt-2 text-sm text-white/60">
            Sign in to continue
          </p>

          <div className="mt-8 space-y-5">

            {/* EMAIL */}
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder=" "
                className="peer w-full rounded-xl bg-black/30 px-4 pt-6 pb-2 outline-none ring-1 ring-white/10 focus:ring-2 focus:ring-gray-500"
              />
              <label className="absolute left-4 top-0 text-xs text-white/60 transition-all
                peer-placeholder-shown:top-3.5 
                peer-placeholder-shown:text-sm 
                peer-placeholder-shown:text-white/40
                peer-focus:top-1 
                peer-focus:text-xs 
                peer-focus:text-gray-100">
                Email
              </label>
            </div>

            {/* PASSWORD */}
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder=" "
                className="peer w-full rounded-xl bg-black/30 px-4 pt-6 pb-2 outline-none ring-1 ring-white/10 focus:ring-2 focus:ring-gray-500"
              />
              <label className="absolute left-4 top-0 text-xs text-white/60 transition-all
                peer-placeholder-shown:top-3.5 
                peer-placeholder-shown:text-sm 
                peer-placeholder-shown:text-white/40
                peer-focus:top-1 
                peer-focus:text-xs 
                peer-focus:text-gray-100">
                Password
              </label>
            </div>

            <button
              onClick={handleLogin}
              className="w-full rounded-xl bg-gray-800 py-3 font-medium transition hover:bg-gray-700"
            >
              Sign In
            </button>
          </div>

          {/* ERROR */}
          <div className="mt-2 text-center text-sm">
            {error && (
              <div className="mt-4 text-sm text-gray-300 text-center">
                  {error}
                </div>
            )}
          </div>

          {/* FORGOT */}
          <div
            onClick={() => setResetOpen(true)}
            className="mt-4 cursor-pointer text-center text-xs text-white/40 hover:text-white/70"
          >
            Forgot password?
          </div>

          {/* RESET */}
          {resetOpen && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="absolute inset-0 bg-black/80 backdrop-blur-3xl" />

              <div className="relative z-10 w-full max-w-sm rounded-2xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-3xl">

                <h2 className="text-xl font-semibold">Reset Password</h2>

                <div className="relative mt-5">
                  <input
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    placeholder=" "
                    className="peer w-full rounded-xl bg-black/30 px-4 pt-6 pb-2 outline-none ring-1 ring-white/10 focus:ring-2 focus:ring-gray-500"
                  />
                  <label className="absolute left-4 top-2 text-xs text-white/60">
                    Email
                  </label>
                </div>

                {resetMsg && (
                  <div className="mt-4 text-green-300 text-sm">
                    {resetMsg}
                  </div>
                )}

                <div className="mt-5 flex gap-3">
                  <button
                    onClick={handleReset}
                    className="flex-1 rounded-xl bg-gray-800 py-2 hover:bg-gray-700"
                  >
                    Send
                  </button>

                  <button
                    onClick={() => {
                      setResetOpen(false)
                      setResetEmail('')
                      setResetMsg(null)
                    }}
                    className="flex-1 rounded-xl border border-white/10 py-2 hover:bg-white/10"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* RIGHT - 3D */}
      <div className="relative hidden w-1/2 overflow-hidden md:flex">
        <img
          src="/img/logo2.png"
          alt="logo bg"
          className="absolute right-[auto] top-1/2 -translate-y-1/2 w-[750px]
          opacity-[0.2] pointer-events-none select-none z-0"
        />

        {/* Blur (wall effect) */}
        <div
          className={`absolute inset-0 backdrop-blur-[8px] transition-all duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)]
          ${progress > 0.3 ? 'opacity-0' : 'opacity-100'}`}
        />

        {/* Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br via-transparent to-blue-500/10" />
            
            <View key={progress > 0 ? 'active' : 'idle'} className="h-full w-full">
              <Suspense fallback={null}>
                {progress > 0 && <Character intensity={progress} />}
                <Common color={''} />
              </Suspense>
            </View>        
      
        </div>
      </div>
  )
} 
