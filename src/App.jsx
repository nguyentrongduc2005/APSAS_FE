import React from 'react'
import Header from './components/shared/Header'
import Footer from './components/shared/Footer'
import AppRoutes from './routes'

export default function App() {
  return (
    <div className="app-root">
      <Header />
      <main className="app-main">
        <AppRoutes />
      </main>
      <Footer />
    </div>
  )
}
