import { useEffect, useRef } from 'react'

function useReveal(threshold = 0.1) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) el.classList.add('on') }, { threshold, rootMargin: '0px 0px -30px 0px' })
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return ref
}

const chips = ['SAP S/4HANA', 'IS Retail', 'Procurement', 'SAP Joule', 'AI Core', 'SAP BTP', 'SAP IBP', 'SAP Ariba', 'SCM', 'SuccessFactors', 'Travel', 'Photography']

export default function About() {
  const leftRef = useReveal()
  const rightRef = useReveal()

  return (
    <section id="about" style={{ padding: '120px 0', background: 'var(--bg-2)', position: 'relative', overflow: 'hidden' }}>
      <div className="orb" style={{ width: 500, height: 500, top: -100, right: -150, background: 'rgba(41,151,255,0.06)' }} />

      <div className="wrap">
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,420px) 1fr', gap: 80, alignItems: 'center', position: 'relative', zIndex: 1 }}>

          {/* Photo card */}
          <div ref={leftRef} className="rvl" style={{ position: 'relative' }}>
            <div style={{
              aspectRatio: '4/5', borderRadius: 'var(--r-lg)',
              background: 'var(--bg-4)', border: '1px solid var(--border)',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              gap: 10, color: 'var(--t3)', overflow: 'hidden', position: 'relative',
            }}>
              <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" opacity=".25">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
              </svg>
              <p style={{ fontSize: 12, color: 'var(--t3)' }}>Sandeep Mandal</p>
            </div>

            {/* Gradient border on hover */}
            <div style={{
              position: 'absolute', inset: -1, borderRadius: 'calc(var(--r-lg) + 1px)',
              background: 'linear-gradient(135deg,rgba(41,151,255,0.4),rgba(94,92,230,0.2))',
              WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              WebkitMaskComposite: 'xor', maskComposite: 'exclude', padding: 1, pointerEvents: 'none',
            }} />

            {/* Float card */}
            <div style={{
              position: 'absolute', right: -24, bottom: 36,
              background: 'rgba(10,10,16,0.8)', backdropFilter: 'blur(24px)',
              border: '1px solid var(--border)', borderRadius: 14, padding: '16px 20px',
            }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--blue)', letterSpacing: '.06em', textTransform: 'uppercase' }}>Current Role</div>
              <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: '-.04em', color: 'var(--t1)', marginTop: 2 }}>IS Retail Lead</div>
              <div style={{ fontSize: 11, color: 'var(--t3)', marginTop: 1 }}>Infosys · Illinois, USA</div>
            </div>
          </div>

          {/* Text */}
          <div ref={rightRef} className="rvr">
            <div className="eyebrow">About Me</div>
            <h2 style={{ fontSize: 'clamp(30px,3.5vw,46px)', fontWeight: 800, letterSpacing: '-.04em', lineHeight: 1.12, marginBottom: 20 }}>
              Turning retail complexity into<br />
              <span style={{ color: 'var(--blue)' }}>intelligent</span> systems.
            </h2>
            <p style={{ fontSize: 15, color: 'var(--t2)', lineHeight: 1.8, marginBottom: 16 }}>
              I'm <strong style={{ color: 'var(--t1)' }}>Sandeep Kumar Mandal</strong> — SAP S/4HANA Procurement &amp; IS Retail Lead at Infosys, based in Bolingbrook, Illinois. With 6+ years specialising in retail ERP, I help global brands reimagine their SAP landscape using S/4HANA, AI Core, and BTP.
            </p>
            <p style={{ fontSize: 15, color: 'var(--t2)', lineHeight: 1.8, marginBottom: 16 }}>
              I've shipped AI demand forecasting with Joule, 3.2% margin recovery through markdown optimisation, and 92%+ touchless invoice matching. A KIIT Bhubaneswar alumnus with 500+ connections and an obsession with what comes next — in SAP and in the world.
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, margin: '24px 0' }}>
              {chips.map(c => (
                <span key={c} style={{
                  padding: '5px 13px', borderRadius: 980, fontSize: 12.5, fontWeight: 500, color: 'var(--t2)',
                  background: 'var(--card)', border: '1px solid var(--border)', transition: 'all .2s', cursor: 'default'
                }}
                  onMouseEnter={e => { e.target.style.borderColor = 'var(--blue)'; e.target.style.color = 'var(--blue)'; e.target.style.background = 'rgba(41,151,255,.07)' }}
                  onMouseLeave={e => { e.target.style.borderColor = 'var(--border)'; e.target.style.color = 'var(--t2)'; e.target.style.background = 'var(--card)' }}
                >{c}</span>
              ))}
            </div>

            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <a className="btn btn-p" href="#contact">Work With Me</a>
              <a className="btn btn-s" href="#">Download CV ↓</a>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media(max-width:900px){
          #about .wrap > div { grid-template-columns: 1fr !important; }
          #about .float-card { right: 0 !important; }
        }
      `}</style>
    </section>
  )
}
