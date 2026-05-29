import { useEffect, useRef } from 'react'

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

const certs = [
  {
    icon: '🏅', iconBg: 'rgba(41,151,255,.12)',
    issuer: 'SAP · 2025',
    title: 'SAP Certified Associate — Positioning SAP Business AI Solutions as part of SAP Business Suite',
    desc: 'Validates expertise in positioning and scoping SAP Business AI solutions for enterprise clients across the SAP Business Suite ecosystem.',
    badge: '✓ Credly Verified',
    badgeStyle: {},
    delay: 'd1',
  },
  {
    icon: '🏅', iconBg: 'rgba(94,92,230,.12)',
    issuer: 'SAP · 2025',
    title: 'SAP Certified Associate — Implementation Consultant, S/4HANA Cloud Public Edition',
    desc: 'Certifies proficiency in implementing SAP S/4HANA Cloud Public Edition using SAP Activate methodology for cloud-first deployments.',
    badge: '✓ Credly Verified',
    badgeStyle: {},
    delay: 'd2',
  },
  {
    icon: '🎓', iconBg: 'rgba(50,215,75,.1)',
    issuer: 'KIIT · Bhubaneswar, India',
    title: 'B.Tech — Computer Science & Engineering',
    desc: 'Engineering graduate from Kalinga Institute of Industrial Technology — one of India\'s premier technical institutes. Foundation in CS and systems thinking.',
    badge: '✓ KIIT University',
    badgeStyle: { color: 'var(--blue)', background: 'rgba(41,151,255,.1)' },
    delay: 'd3',
  },
]

function CertCard({ c }) {
  const ref = useReveal()
  return (
    <div ref={ref} className={`gc cert-card rv ${c.delay}`} style={{ padding: 26 }}>
      <div style={{ width: 48, height: 48, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, marginBottom: 16, background: c.iconBg }}>{c.icon}</div>
      <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--blue)', marginBottom: 6 }}>{c.issuer}</div>
      <h3 style={{ fontSize: 15, fontWeight: 700, letterSpacing: '-.02em', lineHeight: 1.35, marginBottom: 8 }}>{c.title}</h3>
      <p style={{ fontSize: 13, color: 'var(--t2)', lineHeight: 1.6, marginBottom: 14 }}>{c.desc}</p>
      <span style={{
        display: 'inline-flex', alignItems: 'center', gap: 6,
        fontSize: 11, fontWeight: 600, color: 'var(--green)',
        padding: '3px 10px', borderRadius: 20, background: 'rgba(50,215,75,.1)',
        ...c.badgeStyle,
      }}>{c.badge}</span>
    </div>
  )
}

export default function Certifications() {
  const hdRef = useReveal()

  return (
    <section id="certs" style={{ padding: '100px 0', background: 'var(--bg-2)', position: 'relative', overflow: 'hidden' }}>
      <div className="wrap">
        <div ref={hdRef} className="rv" style={{ textAlign: 'center', maxWidth: 580, margin: '0 auto' }}>
          <div className="eyebrow">Credentials</div>
          <h2 className="ttl">Certifications &amp; Education</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 14, marginTop: 48 }}>
          {certs.map(c => <CertCard key={c.title} c={c} />)}
        </div>
      </div>
    </section>
  )
}
