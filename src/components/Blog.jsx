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

const posts = [
  {
    bg: 'linear-gradient(135deg,#0a0a1a,#1a1a3a)', e: '🤖', cat: 'AI + SAP Retail',
    meta: 'May 2026 · 6 min read',
    title: '6 Years in SAP Retail: What\'s Actually Working with AI in 2026',
    desc: 'After 90 days running one AI use case per week — demand forecasting with Joule, markdown optimisation on AI Core, and returns fraud detection. Here\'s what shipped and what didn\'t.',
    delay: 'd1',
  },
  {
    bg: 'linear-gradient(135deg,#0d1f0d,#1a3a1a)', e: '⚙️', cat: 'SAP · Enterprise AI',
    meta: 'May 2026 · 5 min read',
    title: '3 SAP Functions Where AI Shipped Real Cases — and the Trade-offs No One Talks About',
    desc: 'Finance at 92% touchless, Ariba saving 6 weeks onboarding, SuccessFactors at 31% internal fill. The wins are real — but each rewrites a workflow downstream.',
    delay: 'd2',
  },
  {
    bg: 'linear-gradient(135deg,#1a1a0d,#3a3010)', e: '🌍', cat: 'Travel',
    meta: 'Coming Soon · Travel Stories',
    title: 'The World Through an SAP Consultant\'s Eyes',
    desc: '25+ countries, client sites on 4 continents, and the realisation that the best ERP conversations happen at dinner in cities you never expected to love.',
    delay: 'd3',
  },
]

function BlogCard({ p }) {
  const ref = useReveal()
  const [hov, setHov] = useState(false)

  return (
    <div ref={ref} className={`gc blog-card rv ${p.delay}`}
      style={{ overflow: 'hidden', cursor: 'pointer' }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      <div style={{
        aspectRatio: '16/9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 40,
        position: 'relative', overflow: 'hidden',
        background: p.bg,
        transform: hov ? 'scale(1.04)' : 'scale(1)', transition: 'transform .5s var(--ease)',
      }}>
        <span>{p.e}</span>
        <span style={{
          position: 'absolute', top: 10, left: 10, fontSize: 10, fontWeight: 700,
          letterSpacing: '.08em', textTransform: 'uppercase',
          padding: '3px 9px', borderRadius: 980, background: 'rgba(0,0,0,.6)',
          backdropFilter: 'blur(8px)', color: 'var(--blue)',
        }}>{p.cat}</span>
      </div>
      <div style={{ padding: 20 }}>
        <div style={{ fontSize: 11.5, color: 'var(--t3)', marginBottom: 8 }}>{p.meta}</div>
        <h3 style={{ fontSize: 16, fontWeight: 700, letterSpacing: '-.02em', lineHeight: 1.4, marginBottom: 8 }}>{p.title}</h3>
        <p style={{ fontSize: 13, color: 'var(--t2)', lineHeight: 1.65 }}>{p.desc}</p>
      </div>
    </div>
  )
}

export default function Blog() {
  const hdRef = useReveal()

  return (
    <section id="blog" style={{ padding: '120px 0', background: 'var(--bg-2)', position: 'relative', overflow: 'hidden' }}>
      <div className="wrap">
        <div ref={hdRef} className="rv">
          <div className="eyebrow">Stories</div>
          <h2 className="ttl">Latest Writing</h2>
          <p className="sub">Real observations from 6 years in SAP retail — and the world beyond.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))', gap: 16, marginTop: 48 }}>
          {posts.map(p => <BlogCard key={p.title} p={p} />)}
        </div>
      </div>
    </section>
  )
}
