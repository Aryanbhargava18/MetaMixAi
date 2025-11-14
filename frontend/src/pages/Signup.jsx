import { useState } from 'react'
import { signup } from '../api'
import toast from 'react-hot-toast'

const Signup = () => {
  const [form, setForm] = useState({ username: '', email: '', password: '' })
  const [loading, setLoading] = useState(false)

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      console.log("📤 Sending signup data:", form) // Debug log

      const res = await signup(form)
      console.log("✅ Server response:", res) // Debug log

      if (res.message === 'User registered successfully!') {
        toast.success('Signup successful! Redirecting to login...')
        setTimeout(() => (window.location.href = '/login'), 1500)
      } else {
        toast.error(res.message || 'Signup failed.')
      }
    } catch (error) {
      console.error("❌ Signup error:", error)
      toast.error("Something went wrong. Check console for details.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-80">
        <h2 className="text-2xl font-bold mb-6 text-center">Signup</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            name="username"
            placeholder="Username"
            onChange={handleChange}
            value={form.username}
            required
            className="p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            name="email"
            placeholder="Email"
            type="email"
            onChange={handleChange}
            value={form.email}
            required
            className="p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            value={form.password}
            required
            className="p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            disabled={loading}
            className={`${
              loading
                ? 'bg-green-700 cursor-not-allowed'
                : 'bg-green-500 hover:bg-green-600'
            } transition text-white py-2 rounded font-semibold`}
          >
            {loading ? 'Signing up...' : 'Signup'}
          </button>
        </form>

        <p className="text-sm text-center mt-4">
          Already have an account?{' '}
          <a
            href="/login"
            className="text-green-400 hover:text-green-300 underline"
          >
            Login
          </a>
        </p>
      </div>
    </div>
  )
}

export default Signup
