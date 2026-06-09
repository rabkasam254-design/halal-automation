import './index.css'
import Header from './components/Header'
import Hero from './components/Hero'
import Features from './components/Features'
import Pricing from './components/Pricing'
import FAQ from './components/FAQ'
import ContactForm from './components/ContactForm'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="relative min-h-screen bg-[#0a0a0f]">
      <div className="pattern-bg" />
      <div className="relative z-10">
        <Header />
        <main>
          <Hero />
          <Features />
          <Pricing />
          <FAQ />
          <ContactForm />
        </main>
        <Footer />
      </div>
    </div>
  )
}
