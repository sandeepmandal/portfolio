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

const skills = [
  {
    icon: '🛍️', iconBg: 'rgba(41,151,255,.12)',
    title: 'SAP IS Retail & S/4HANA',
    desc: '6+ years leading retail ERP — merchandise management, store operations, POS integrations for global fashion and beauty brands.',
    pct: 96,
    pills: ['IS Retail', 'S/4HANA Cloud', 'POSDM'],
    delay: 'd1',
  },
  {
    icon: '🤖', iconBg: 'rgba(94,92,230,.12)',
    title: 'SAP AI & Joule',
    desc: 'Deploying real AI in production — demand forecasting with IBP + Joule, markdown optimisation on AI Core, and returns fraud classifiers.',
    pct: 90,
    pills: ['SAP Joule', 'AI Core', 'Gen AI Hub'],
    delay: 'd2',
  },
  {
    icon: '🔗', iconBg: 'rgba(50,215,75,.1)',
    title: 'Procurement & Ariba',
    desc: 'End-to-end Source-to-Pay — SAP Ariba sourcing, supplier risk management, and Intelligent Document Processing at 92%+ match rate.',
    pct: 93,
    pills: ['SAP Ariba', 'IDP', 'Supplier Risk'],
    delay: 'd3',
  },
  {
    icon: '📦', iconBg: 'rgba(255,159,10,.1)',
    title: 'Supply Chain & IBP',
    desc: 'Demand planning, S&OP, and markdown decisions using SAP IBP and CAR — real-time category-level forecasting for apparel and beauty.',
    pct: 88,
    pills: ['SAP IBP', 'SAP CAR', 'S&OP'],
    delay: 'd4',
  },
  {
    icon: '☁️', iconBg: 'rgba(255,55,95,.1)',
    title: 'SAP BTP & Integration',
    desc: 'Building extensions and APIs on SAP BTP — connecting S/4HANA with Salesforce, banking platforms, and third-party systems via CPI.',
    pct: 87,
    pills: ['SAP BTP', 'CPI', 'OData'],
    delay: 'd5',
  },
  {
    icon: '👥', iconBg: 'rgba(41,151,255,.1)',
    title: 'SuccessFactors & HR',
    desc: 'AI-powered internal mobility agents and talent acquisition — lifted client internal fill rates from 17% to 31% in a single quarter.',
    pct: 82,
    pills: ['SuccessFactors', 'Talent Mgmt', 'HR Analytics'],
    delay: 'd6',
  },
]

function SkillCard({ sk }) {
  const ref = useReveal(0.1)
  const barRef = useRef(null)

  useEffect(() => {
    const bar = barRef.current
    if (!bar) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { bar.style.width = sk.pct + '%'; obs.unobserve(bar) }
    }, { threshold: 0.3 })
    obs.observe(bar)
    return () => obs.disconnect()
  }, [sk.pct])

  return (
    <div ref={ref} className={`gc sk-card rv ${sk.delay}`} style={{ padding: 26, cursor: 'default' }}>
      <div style={{ width: 44, height: 44, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, marginBottom: 14, background: sk.iconBg }}>
        {sk.icon}
      </div>
      <h3 style={{ fontSize: 16, fontWeight: 700, letterSpacing: '-.02em', marginBottom: 8 }}>{sk.title}</h3>
      <p style={{ fontSize: 13, color: 'var(--t2)', lineHeight: 1.65, marginBottom: 16 }}>{sk.desc}</p>
      <div style={{ marginBottom: 12 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--t3)', marginBottom: 5 }}>
          <span>Proficiency</span><span>{sk.pct}%</span>
        </div>
        <div style={{ height: 3, borderRadius: 3, background: 'var(--bg-4)' }}>
          <div ref={barRef} className="sk-bar-fill" style={{ height: '100%', borderRadius: 3, background: 'linear-gradient(90deg,var(--blue),var(--indigo))', width: 0 }} />
        </div>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
        {sk.pills.map(p => (
          <span key={p} style={{ fontSize: 10.5, fontWeight: 600, padding: '3px 9px', borderRadius: 20, background: 'rgba(255,255,255,.05)', color: 'var(--t2)' }}>{p}</span>
        ))}
      </div>
    </div>
  )
}

export default function Skills() {
  const hdRef = useReveal()

  return (
    <section id="skills" style={{ padding: '120px 0', background: 'var(--bg-2)', position: 'relative', overflow: 'hidden' }}>
      <div className="wrap">
        <div ref={hdRef} className="rv" style={{ textAlign: 'center', maxWidth: 600, margin: '0 auto 56px' }}>
          <div className="eyebrow">Expertise</div>
          <h2 className="ttl">Tools &amp; Technologies</h2>
          <p className="sub" style={{ margin: '0 auto' }}>Specialist in SAP's latest retail and AI ecosystem, with deep functional and technical depth.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(270px,1fr))', gap: 14 }}>
          {skills.map(sk => <SkillCard key={sk.title} sk={sk} />)}
        </div>
      </div>
    </section>
  )
}
