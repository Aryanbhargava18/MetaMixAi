import { Edit, Sparkles } from 'lucide-react'
import React, { useState } from 'react'
import Markdown from 'react-markdown'
import { useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'

const WriteArticle = () => {
  const articleLength = [
    { length: 800, text: 'Short (500–800 words)' },
    { length: 1200, text: 'Medium (800–1200 words)' },
    { length: 1600, text: 'Long (1200+ words)' },
  ]

  const navigate = useNavigate()
  const [selectedLength, setSelectedLength] = useState(articleLength[0])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [content, setContent] = useState('')

  // ---- OPTIONAL REAL GENERATION LOGIC (CONNECT WHEN READY) ----
  const onSubmitHandler = async (e) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setContent(
        `### Demo Article  
This is placeholder content.  
Replace setTimeout with your API call.`
      )
      setLoading(false)
    }, 1200)
  }

  return (
    <div className="min-h-screen w-full bg-[#0A0A0F] text-white">

      {/* NAVBAR */}
      <nav className="w-full px-10 h-16 flex items-center justify-between 
                      border-b border-white/10 bg-black/20 backdrop-blur-xl">
        <img
          className="cursor-pointer w-32 hover:opacity-70 transition"
          src={assets.logo}
          alt="logo"
          onClick={() => navigate('/')}
        />
      </nav>

      {/* GRID LAYOUT */}
      <div className="px-10 py-8 grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* LEFT PANEL */}
        <form
          onSubmit={onSubmitHandler}
          className="w-full p-7 rounded-2xl 
                     bg-white/5 backdrop-blur-2xl border border-white/10
                     shadow-[0px_0px_40px_rgba(0,0,0,0.2)] 
                     space-y-7 transition-all"
        >
          {/* Header */}
          <div className="flex items-center gap-3">
            <Sparkles className="w-7 h-7 text-blue-400 drop-shadow-xl animate-pulse" />
            <h1 className="text-2xl font-semibold tracking-wide">Article Configuration</h1>
          </div>

          {/* Topic Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Article Topic</label>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="e.g. The Future of AI"
              className="w-full p-3 rounded-lg bg-black/30 
                         border border-white/10 text-white
                         focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          {/* Length Selection */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Article Length</label>
            <div className="flex flex-wrap gap-2">
              {articleLength.map((item, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setSelectedLength(item)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all
                    ${
                      selectedLength.text === item.text
                        ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30'
                        : 'bg-white/10 text-gray-200 hover:bg-white/20'
                    }`}
                >
                  {item.text}
                </button>
              ))}
            </div>
          </div>

          {/* Submit */}
           <button disabled={loading} className='w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#226BFF] to-[#65ADFF] text-white px-4 py-2 mt-6 text-sm rounded-lg cursor-pointer'>
            {
              loading ? <span className="w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin"></span>
              : <Edit className='w-5'/>
            }
            Generate article
          </button>
        </form>

        {/* RIGHT PANEL */}
        <div
          className="w-full h-full p-7 rounded-2xl bg-white/5 backdrop-blur-2xl 
                     border border-white/10 shadow-[0px_0px_40px_rgba(0,0,0,0.2)]
                     flex flex-col"
        >
          <div className="flex items-center gap-3 mb-4">
            <Edit className="w-6 h-6 text-blue-300" />
            <h2 className="text-xl font-semibold">Generated Article</h2>
          </div>

          {!content ? (
            <div className="flex-1 flex flex-col items-center justify-center text-gray-400">
              <Edit className="w-10 h-10 mb-3" />
              <p className="text-sm">Enter a topic and click “Generate article”</p>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto text-gray-200 prose prose-invert">
              <Markdown>{content}</Markdown>
            </div>
          )}
        </div>

      </div>
    </div>
  )
}

export default WriteArticle
