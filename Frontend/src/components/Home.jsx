import React from 'react'
import Navbar from './shared/Navbar'
import HeroSection from './shared/HeroSection'
import AllItems from './shared/AllItems'
import Footer from './shared/Footer'

function Home() {
  return (
    <div className="bg-gradient-to-b from-white to-blue-100 dark:from-gray-900 dark:to-gray-800 min-h-screen transition-colors duration-300">
      <Navbar />
      <HeroSection />
      <AllItems />
      <Footer />
    </div>
  )
}

export default Home;