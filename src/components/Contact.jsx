import { useEffect, useRef, useState } from 'react'

function useReveal() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) el.classList.add('on') }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return ref
}

const topics = [
  'SAP S/4HANA Consulting',
  'IS Retail / Procurement Project',
  'SAP BTP Development',
  'AI & SAP Joule Implementation',
  'Speaking / Collaboration',
  'Just Saying Hi',
]

const socials = [
  { href: 'https://linkedin.com/in/mandalsandeep', label: 'LinkedIn', txt: 'in' },
  { href: '#', label: 'GitHub', txt: '⌥' },
  { href: 'mailto:sandeep.m05@icloud.com', label: 'Email', txt: '✉' },
  { href: '#', label: 'X / Twitter', txt: '𝕏' },
]

export default function Contact() {
  const hdRef = useReveal()
  const formRef = useReveal()
  const socRef = useReveal()
  const [sent, setSent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(true)
    setTimeout(() => setSent(false), 3200)
  }

  return (
    <section id="contact" style={{ padding: '140px 0', background: 'var(--bg)', position: 'relative', overflow: 'hidden' }}>
      <div className="orb" style={{ width: 700, height: 700, top: '50%', left: '50%', transform: 'translate(-50%,-50%)', background: 'rgba(41,151,255,.07)', animationDuration: '20s' }} />

      <div className="wrap">
        <div style={{ maxWidth: 620, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <div ref={hdRef} className="rv">
            <div className="eyebrow" style={{ justifyContent: 'center' }}>Contact</div>
            <h2 style={{ fontSize: 'clamp(38px,5vw,64px)', fontWeight: 800, letterSpacing: '-.04em', lineHeight: 1.08, marginBottom: 16 }}>
              Let's Build<br />Something <span style={{ color: 'var(--blue)' }}>Great.</span>
            </h2>
            <p className="sub" style={{ margin: '0 auto', textAlign: 'center' }}>
              Whether it's an SAP project, a collaboration, or just a conversation — I'd love to hear from you.
            </p>
          </div>

          <form ref={formRef} className="rv d2" onSubmit={handleSubmit}
            style={{
              background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 'var(--r-lg)',
              padding: 36, textAlign: 'left', marginTop: 40, backdropFilter: 'blur(12px)',
            }}
          >
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              <Fg label="First Name"><input type="text" placeholder="John" required /></Fg>
              <Fg label="Last Name"><input type="text" placeholder="Doe" required /></Fg>
            </div>
            <Fg label="Email"><input type="email" placeholder="john@company.com" required /></Fg>
            <Fg label="Topic">
              <select>
                {topics.map(t => <option key={t}>{t}</option>)}
              </select>
            </Fg>
            <Fg label="Message"><textarea placeholder="Tell me about your project or challenge..." /></Fg>
            <button type="submit"
              style={{
                width: '100%', padding: 14, borderRadius: 980, fontSize: 14, fontWeight: 700, border: 'none', cursor: 'pointer',
                background: sent ? 'var(--green)' : 'var(--blue)', color: '#fff',
                transition: 'filter .2s, transform .2s', letterSpacing: '.01em',
              }}
            >
              {sent ? 'Message Sent ✓' : 'Send Message →'}
            </button>
          </form>

          <div ref={socRef} className="rv d3" style={{ display: 'flex', justifyContent: 'center', gap: 10, marginTop: 28 }}>
            {socials.map(s => (
              <a key={s.label} href={s.href} title={s.label}
                style={{
                  width: 42, height: 42, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: 'var(--card)', border: '1px solid var(--border)', fontSize: 16, transition: 'all .25s',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'var(--blue)'; e.currentTarget.style.borderColor = 'var(--blue)'; e.currentTarget.style.transform = 'translateY(-3px)' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'var(--card)'; e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = '' }}
              >
                {s.txt}
              </a>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .fg { display:flex;flex-direction:column;gap:5px;margin-bottom:14px; }
        .fg label { font-size:12px;font-weight:600;color:var(--t2); }
        .fg input,.fg textarea,.fg select {
          background:var(--bg-4);border:1px solid var(--border);border-radius:var(--r-sm);
          padding:11px 14px;font-family:var(--font);font-size:13.5px;color:var(--t1);
          outline:none;transition:border-color .2s,box-shadow .2s;resize:vertical;width:100%;
        }
        .fg input:focus,.fg textarea:focus,.fg select:focus {
          border-color:var(--blue);box-shadow:0 0 0 3px rgba(41,151,255,.12);
        }
        .fg textarea { min-height:110px; }
        .fg select option { background:var(--bg-4); }
        @media(max-width:600px){
          #contact form > div:first-child { grid-template-columns:1fr !important; }
        }
      `}</style>
    </section>
  )
}

function Fg({ label, children }) {
  return (
    <div className="fg">
      <label>{label}</label>
      {children}
    </div>
  )
}
