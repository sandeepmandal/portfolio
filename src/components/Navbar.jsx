import { useState, useEffect } from 'react'

const navLinks = ['about', 'exp', 'skills', 'projects', 'certs', 'travel']
const navLabels = { about: 'About', exp: 'Experience', skills: 'Skills', projects: 'Projects', certs: 'Certs', travel: 'Travel' }

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [theme, setTheme] = useState('dark')
  const [mobOpen, setMobOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    document.body.setAttribute('data-theme', next)
  }

  const closeMob = () => setMobOpen(false)

  return (
    <>
      <nav
        id="nav"
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 800,
          height: 60, display: 'flex', alignItems: 'center',
          padding: '0 max(20px, calc((100vw - 1160px)/2 + 20px))',
          transition: 'background .5s, border-color .5s',
          ...(scrolled ? {
            background: 'rgba(5,5,7,0.78)',
            backdropFilter: 'blur(28px) saturate(200%)',
            WebkitBackdropFilter: 'blur(28px) saturate(200%)',
            borderBottom: '1px solid var(--border)',
          } : {})
        }}
      >
        <a href="#hero" className="nav-logo" style={{ marginRight: 'auto' }}>Sandeep Mandal</a>

        <div className="nav-links" style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
          {navLinks.map(id => (
            <a key={id} href={`#${id}`}
              style={{ fontSize: 13, fontWeight: 500, color: 'var(--t2)', transition: 'color .2s', letterSpacing: '.01em' }}
              onMouseEnter={e => e.target.style.color = 'var(--t1)'}
              onMouseLeave={e => e.target.style.color = 'var(--t2)'}
            >
              {navLabels[id]}
            </a>
          ))}
          <button
            onClick={toggleTheme}
            style={{
              width: 32, height: 32, borderRadius: '50%', border: '1px solid var(--border)',
              background: 'transparent', cursor: 'pointer', fontSize: 13,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'border-color .2s, transform .2s', marginLeft: 6,
              color: 'var(--t1)'
            }}
          >
            {theme === 'dark' ? '🌙' : '☀️'}
          </button>
          <a href="#contact"
            style={{
              fontSize: 12.5, fontWeight: 600, padding: '6px 15px', borderRadius: 980,
              background: 'var(--blue)', color: '#fff', transition: 'filter .2s, transform .2s',
            }}
          >
            Let's Talk
          </a>
        </div>

        <button
          onClick={() => setMobOpen(true)}
          style={{ display: 'none', background: 'none', border: 'none', color: 'var(--t1)', fontSize: 20, cursor: 'pointer', marginLeft: 12 }}
          className="mob-burger"
        >
          ☰
        </button>
      </nav>

      {/* Mobile menu */}
      {mobOpen && (
        <div
          style={{
            position: 'fixed', inset: 0, zIndex: 790,
            background: 'rgba(5,5,7,0.96)', backdropFilter: 'blur(32px)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 28,
          }}
        >
          <button onClick={closeMob}
            style={{ position: 'absolute', top: 20, right: 20, background: 'none', border: 'none', color: 'var(--t2)', fontSize: 24, cursor: 'pointer' }}
          >✕</button>
          {[...navLinks, 'contact'].map(id => (
            <a key={id} href={`#${id}`} onClick={closeMob}
              style={{ fontSize: 26, fontWeight: 700, color: 'var(--t1)', transition: 'color .2s' }}
            >
              {navLabels[id] || 'Contact'}
            </a>
          ))}
        </div>
      )}

      <style>{`
        @media(max-width:600px){
          .nav-links { display: none !important; }
          .mob-burger { display: block !important; }
        }
        .nav-logo {
          font-size: 15px; font-weight: 800; letter-spacing: -0.6px;
          background: linear-gradient(110deg,#fff 40%,var(--blue));
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }
      `}</style>
    </>
  )
}
