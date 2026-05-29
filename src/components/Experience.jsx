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

const timeline = [
  {
    icon: '💼',
    company: 'Infosys · Bolingbrook, Illinois',
    role: 'SAP S/4HANA Procurement & IS Retail Lead',
    period: '2022 — Present · SAP Services',
    desc: 'Leading end-to-end SAP IS Retail and Procurement engagements for major US retail clients. Delivered AI-powered markdown optimisation (3.2% margin recovery), touchless invoice processing at 92%+ match rate, and returns fraud detection saving 1.4% net sales. Key contributor to the Ulta Beauty digital transformation on SAP BTP — reimagining store operations and real-time inventory across hundreds of stores.',
    tags: ['SAP IS Retail', 'S/4HANA Cloud', 'SAP Joule', 'BTP', 'AI Core'],
    delay: 'd1',
  },
  {
    icon: '🔗',
    company: 'Infosys · SAP Services',
    role: 'SAP S/4HANA Consultant — Supply Chain & Procurement',
    period: '2019 — 2022 · 3 Years',
    desc: 'Designed and delivered SCM and Procurement solutions for global clients — SAP Ariba sourcing, supplier risk management (6 weeks off onboarding), and SuccessFactors HR integrations lifting internal fill rates from 17% to 31%. Managed rollouts across North America and Europe, working cross-functionally with client leads and solution architects.',
    tags: ['SAP Ariba', 'SuccessFactors', 'Source-to-Pay', 'SAP IBP'],
    delay: 'd2',
  },
  {
    icon: '🎓',
    company: 'KIIT University · Bhubaneswar, India',
    role: 'Bachelor of Technology — Computer Science',
    period: 'Graduated · Kalinga Institute of Industrial Technology',
    desc: 'Engineering foundation at one of India\'s premier technical institutes. Built the systems-thinking and analytical rigour that underpins every SAP engagement today.',
    tags: ['Computer Science', 'Engineering', 'KIIT University'],
    delay: 'd3',
  },
]

export default function Experience() {
  const stickyRef = useReveal()

  return (
    <section id="exp" style={{ padding: '120px 0', background: 'var(--bg)', position: 'relative', overflow: 'hidden' }}>
      <div className="orb" style={{ width: 600, height: 600, bottom: -200, left: -200, background: 'rgba(94,92,230,0.06)' }} />

      <div className="wrap">
        <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: 64, position: 'relative', zIndex: 1 }}>
          <div ref={stickyRef} className="rv exp-sticky" style={{ position: 'sticky', top: 100, alignSelf: 'start' }}>
            <div className="eyebrow">Experience</div>
            <h2 className="ttl">Career<br />Timeline</h2>
            <p className="sub">6+ years building enterprise SAP solutions for global retailers and Fortune 500 companies.</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 0, position: 'relative' }}>
            {/* vertical line */}
            <div style={{
              position: 'absolute', left: 19, top: 8, bottom: 8, width: 1,
              background: 'linear-gradient(to bottom,var(--blue),var(--border) 80%,transparent)',
            }} />

            {timeline.map((item, idx) => (
              <TLItem key={idx} item={item} />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media(max-width:900px){
          #exp .wrap > div { grid-template-columns: 1fr !important; }
          .exp-sticky { position: static !important; }
        }
      `}</style>
    </section>
  )
}

function TLItem({ item }) {
  const ref = useReveal()
  return (
    <div ref={ref} className={`rv ${item.delay}`} style={{ display: 'flex', gap: 24, paddingBottom: 40, position: 'relative' }}>
      <div style={{
        width: 38, height: 38, borderRadius: '50%', flexShrink: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16,
        position: 'relative', zIndex: 1, border: '1px solid var(--border)', background: 'var(--bg-4)',
        transition: 'all .3s',
      }}>{item.icon}</div>
      <div style={{ paddingTop: 6 }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--blue)', marginBottom: 4 }}>{item.company}</div>
        <div style={{ fontSize: 16, fontWeight: 700, letterSpacing: '-.02em', color: 'var(--t1)', marginBottom: 4 }}>{item.role}</div>
        <div style={{ fontSize: 12, color: 'var(--t3)', marginBottom: 10 }}>{item.period}</div>
        <div style={{ fontSize: 13.5, color: 'var(--t2)', lineHeight: 1.7 }}>{item.desc}</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 12 }}>
          {item.tags.map(t => (
            <span key={t} style={{ fontSize: 11, fontWeight: 600, padding: '3px 9px', borderRadius: 20, background: 'rgba(41,151,255,.1)', color: 'var(--blue)' }}>{t}</span>
          ))}
        </div>
      </div>
    </div>
  )
}
