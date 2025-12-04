import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import ModelExplorer from '../components/ModelExplorer'
import Footer from '../components/Footer'
function Home() {
  return (
    <div>
      <Navbar/>
      <Hero/>
      <ModelExplorer/>
      <Footer/>
    </div>
  )
}

export default Home
