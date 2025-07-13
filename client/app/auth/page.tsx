'use client'
import { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'

export default function AuthPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState('')
  const [step, setStep] = useState(1)
  const [token, setToken] = useState('')
  const [error, setError] = useState('')

  const sendOtp = async () => {
    try {
      await axios.post('https://myjobb-assignment-3h8q.vercel.app/api/auth/send-otp', { email })
      setStep(2)
      setError('')
    } catch {
      setError('Failed to send OTP')
    }
  }

  const verifyOtp = async () => {
  try {
    const res = await axios.post('https://myjobb-assignment-3h8q.vercel.app/api/auth/verify-otp', { email, otp });
    setToken(res.data.token);
    localStorage.setItem("token", res.data.token);
    setError('');
    router.push('/products');
  } catch {
    setError('Invalid OTP');
  }
};


  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Login with Email OTP</h2>
      {step === 1 && (
        <>
          <input
            type="email"
            placeholder="Email"
            className="border px-3 py-2 w-full mb-4"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <button onClick={sendOtp} className="bg-blue-600 text-white px-4 py-2 rounded w-full">
            Send OTP
          </button>
        </>
      )}
      {step === 2 && (
        <>
          <input
            type="text"
            placeholder="Enter OTP"
            className="border px-3 py-2 w-full mb-4"
            value={otp}
            onChange={e => setOtp(e.target.value)}
          />
          <button onClick={verifyOtp} className="bg-green-600 text-white px-4 py-2 rounded w-full">
            Verify OTP
          </button>
           <button
                onClick={sendOtp}
                className="bg-blue-100 text-blue-700 px-4 py-2 rounded w-full mt-2"
                type="button"
                >
                Resend OTP
            </button>
        </>
      )}
      {token && <div className="mt-4 text-green-700">Login successful! Token: {token}</div>}
      {error && <div className="mt-4 text-red-600">{error}</div>}
    </div>
  )
}
