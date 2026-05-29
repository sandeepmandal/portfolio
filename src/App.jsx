import { useEffect, useRef } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Experience from './components/Experience'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Certifications from './components/Certifications'
import Travel from './components/Travel'
import Blog from './components/Blog'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  const curRef = useRef(null)
  const ringRef = useRef(null)
  const ringPos = useRef({ x: -9999, y: -9999, tx: -9999, ty: -9999 })

  useEffect(() => {
    const spot = document.getElementById('spotlight')
    const cur = curRef.current
    const ring = ringRef.current

    const onMove = (e) => {
      if (spot) {
        spot.style.setProperty('--mx', e.clientX + 'px')
        spot.style.setProperty('--my', e.clientY + 'px')
      }
      if (cur) {
        cur.style.left = e.clientX + 'px'
        cur.style.top = e.clientY + 'px'
      }
      ringPos.current.tx = e.clientX
      ringPos.current.ty = e.clientY
      if (ringPos.current.x === -9999) {
        ringPos.current.x = e.clientX
        ringPos.current.y = e.clientY
      }
    }

    document.addEventListener('mousemove', onMove)

    let raf
    const animate = () => {
      const p = ringPos.current
      if (p.tx !== -9999) {
        p.x += (p.tx - p.x) * 0.1
        p.y += (p.ty - p.y) * 0.1
        if (ring) {
          ring.style.left = p.x + 'px'
          ring.style.top = p.y + 'px'
        }
      }
      raf = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      document.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      <div id="spotlight" />
      <div className="cur" ref={curRef} />
      <div className="cur-ring" ref={ringRef} />
      <Navbar />
      <Hero />
      <About />
      <Experience />
      <Skills />
      <Projects />
      <Certifications />
      <Travel />
      <Blog />
      <Contact />
      <Footer />
    </>
  )
}
