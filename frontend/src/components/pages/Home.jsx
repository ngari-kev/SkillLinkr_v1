import React from 'react'
import Header from '../Header'
import MainContent from '../MainContent'
import HomeImage from '../HomeImage'

const Home = () => {
  return (
    <>
      <div className="bg-white min-h-screen flex flex-col">
      <Header />
      <main className="relative flex flex-col lg:flex-row flex-1">
        <MainContent />
        <HomeImage />
      </main>
    </div>
    </>
  )
}

export default Home
