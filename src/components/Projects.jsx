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

const projects = [
  {
    span: 'ben-1',
    thumb: 'linear-gradient(135deg,#1a0a20,#3d1060)',
    emoji: '💄',
    type: 'Retail · BTP',
    title: 'Ulta Beauty — Digital Store Transformation',
    desc: 'Part of the Infosys SAP team that helped Ulta Beauty reimagine store operations on SAP BTP. Delivered real-time inventory tracking, automated invoice reconciliation, and empowered store staff with streamlined digital workflows across hundreds of US locations.',
    tags: ['SAP BTP', 'IS Retail', 'Infosys'],
    delay: 'd1',
  },
  {
    span: 'ben-2',
    thumb: 'linear-gradient(135deg,#0a1a0a,#143a14)',
    emoji: '📊',
    type: 'AI · Retail',
    title: 'AI Markdown Optimisation',
    desc: 'ML model on SAP Gen AI Hub + CAR, trained on 4 seasons of sell-through data. Delivered 3.2% margin recovery vs rules-based baseline for a major apparel client.',
    tags: ['AI Core', 'SAP CAR'],
    delay: 'd2',
  },
  {
    span: 'ben-3',
    thumb: 'linear-gradient(135deg,#0a0d1a,#101840)',
    emoji: '⚡',
    type: 'Procurement · AI',
    title: 'Touchless Invoice Processing — 92% Match',
    desc: 'SAP Joule + Intelligent Document Processing for 3-way invoice matching. Cut manual processing queues by 80% and improved AP cycle time significantly.',
    tags: ['SAP Joule', 'IDP', 'Ariba'],
    delay: 'd3',
  },
  {
    span: 'ben-4',
    thumb: 'linear-gradient(135deg,#1a0a08,#3a1810)',
    emoji: '🛡️',
    type: 'Retail · Fraud',
    title: 'Returns Fraud Detection Classifier',
    desc: 'ML classifier detecting "wardrobing" patterns (wear-once-return). Saved one retail client an estimated 1.4% of net sales in Q1 alone using SAP AI Core.',
    tags: ['AI Core', 'S/4HANA Retail'],
    delay: 'd4',
  },
]

function ProjectCard({ p }) {
  const ref = useReveal()
  return (
    <div ref={ref} className={`gc proj-card ${p.span} rv ${p.delay}`} style={{ overflow: 'hidden', cursor: 'pointer' }}>
      <div style={{
        width: '100%', aspectRatio: '16/9', position: 'relative', overflow: 'hidden',
        display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 52,
        background: p.thumb, transition: 'transform .5s var(--ease)',
      }}>
        <span>{p.emoji}</span>
        <span style={{
          position: 'absolute', top: 12, right: 12,
          fontSize: 10, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase',
          padding: '4px 10px', borderRadius: 980, background: 'rgba(0,0,0,.55)', backdropFilter: 'blur(8px)', color: 'var(--t2)',
        }}>{p.type}</span>
      </div>
      <div style={{ padding: 22 }}>
        <h3 style={{ fontSize: 18, fontWeight: 700, letterSpacing: '-.03em', marginBottom: 8 }}>{p.title}</h3>
        <p style={{ fontSize: 13, color: 'var(--t2)', lineHeight: 1.65, marginBottom: 16 }}>{p.desc}</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
          {p.tags.map(t => (
            <span key={t} style={{ fontSize: 11, fontWeight: 600, padding: '3px 9px', borderRadius: 20, background: 'rgba(41,151,255,.1)', color: 'var(--blue)' }}>{t}</span>
          ))}
          <a href="#" style={{
            marginLeft: 'auto', width: 30, height: 30, borderRadius: '50%', flexShrink: 0,
            background: 'var(--glass)', border: '1px solid var(--border)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, transition: 'all .25s',
          }}>→</a>
        </div>
      </div>
    </div>
  )
}

export default function Projects() {
  const hdRef = useReveal()

  return (
    <section id="projects" style={{ padding: '120px 0', background: 'var(--bg)', position: 'relative', overflow: 'hidden' }}>
      <div className="wrap">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 44, flexWrap: 'wrap', gap: 16 }}>
          <div ref={hdRef} className="rv">
            <div className="eyebrow">Work</div>
            <h2 className="ttl">Selected Projects</h2>
          </div>
          <a className="btn btn-s rv" href="#">View All →</a>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12,1fr)', gap: 14 }}>
          {projects.map(p => <ProjectCard key={p.title} p={p} />)}
        </div>
      </div>

      <style>{`
        .ben-1 { grid-column: span 7; }
        .ben-2 { grid-column: span 5; }
        .ben-3 { grid-column: span 6; }
        .ben-4 { grid-column: span 6; }
        .proj-card:hover .proj-thumb { transform: scale(1.03); }
        .proj-card:hover .proj-arrow { background: var(--blue); border-color: var(--blue); }
        @media(max-width:900px){
          .ben-1,.ben-2,.ben-3,.ben-4 { grid-column: span 12 !important; }
        }
      `}</style>
    </section>
  )
}
