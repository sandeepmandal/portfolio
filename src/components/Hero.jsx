import { useEffect, useRef, useState } from 'react'

const TW_WORDS = ['SAP S/4HANA Retail.', 'IS Retail & Procurement.', 'SAP Joule & AI Core.', 'SAP BTP Solutions.', 'Supply Chain & SCM.']

function useTypewriter(words) {
  const [text, setText] = useState('')
  const [wordIdx, setWordIdx] = useState(0)
  const [charIdx, setCharIdx] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const word = words[wordIdx]
    let timeout

    if (!deleting) {
      if (charIdx < word.length) {
        timeout = setTimeout(() => setText(word.slice(0, charIdx + 1)), 95)
        return () => clearTimeout(timeout)
      } else {
        timeout = setTimeout(() => setDeleting(true), 1800)
        return () => clearTimeout(timeout)
      }
    } else {
      if (charIdx > 0) {
        timeout = setTimeout(() => {
          setText(word.slice(0, charIdx - 1))
          setCharIdx(c => c - 1)
        }, 55)
        return () => clearTimeout(timeout)
      } else {
        setDeleting(false)
        setWordIdx(i => (i + 1) % words.length)
      }
    }
  }, [charIdx, deleting, wordIdx, words])

  useEffect(() => {
    if (!deleting) setCharIdx(c => c + 1)
  }, [text, deleting])

  return text
}

function useCountUp(target, duration = 1400) {
  const [val, setVal] = useState(0)
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        obs.unobserve(el)
        const step = target / (duration / 28)
        let current = 0
        const tm = setInterval(() => {
          current = Math.min(current + step, target)
          setVal(Math.floor(current))
          if (current >= target) clearInterval(tm)
        }, 28)
      }
    }, { threshold: 0.5 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [target, duration])

  return [val, ref]
}

function KPI({ n, label }) {
  const [val, ref] = useCountUp(n)
  return (
    <div ref={ref} style={{ padding: '0 40px', textAlign: 'center', position: 'relative' }}>
      <span style={{
        fontSize: 'clamp(32px,4vw,48px)', fontWeight: 900, letterSpacing: '-0.05em',
        background: 'linear-gradient(135deg,#fff,var(--t2))',
        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
        display: 'block',
      }}>
        {val.toLocaleString()}
        {n === 6 ? '+' : n === 40 ? '' : n === 25 ? '' : ''}
      </span>
      <span style={{ fontSize: 11, color: 'var(--t3)', letterSpacing: '.08em', textTransform: 'uppercase', marginTop: 4, display: 'block' }}>
        {label}
      </span>
    </div>
  )
}

export default function Hero() {
  const canvasRef = useRef(null)
  const tw = useTypewriter(TW_WORDS)

  useEffect(() => {
    const c = canvasRef.current
    if (!c) return
    const ctx = c.getContext('2d')
    let W, H, P = [], raf
    let mx = -9999, my = -9999

    function resize() { W = c.width = c.offsetWidth; H = c.height = c.offsetHeight }
    resize()
    window.addEventListener('resize', resize)
    document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY })

    class Particle {
      constructor() { this.reset() }
      reset() {
        this.x = Math.random() * W; this.y = Math.random() * H
        this.vx = (Math.random() - .5) * .35; this.vy = (Math.random() - .5) * .35
        this.r = Math.random() * 1.8 + .4; this.a = Math.random() * .45 + .08
        this.c = ['#2997ff', '#5e5ce6', '#32d74b'][Math.random() * 3 | 0]
      }
      tick() {
        const dx = this.x - mx, dy = this.y - my, d = Math.hypot(dx, dy)
        if (d < 90) { this.x += dx / d * .9; this.y += dy / d * .9 }
        this.x += this.vx; this.y += this.vy
        if (this.x < 0 || this.x > W) this.vx *= -1
        if (this.y < 0 || this.y > H) this.vy *= -1
      }
      draw() {
        ctx.beginPath(); ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2)
        ctx.fillStyle = this.c; ctx.globalAlpha = this.a; ctx.fill(); ctx.globalAlpha = 1
      }
    }

    for (let i = 0; i < 90; i++) P.push(new Particle())

    function frame() {
      ctx.clearRect(0, 0, W, H)
      for (let i = 0; i < P.length; i++) {
        for (let j = i + 1; j < P.length; j++) {
          const d = Math.hypot(P[i].x - P[j].x, P[i].y - P[j].y)
          if (d < 130) {
            ctx.beginPath(); ctx.moveTo(P[i].x, P[i].y); ctx.lineTo(P[j].x, P[j].y)
            ctx.strokeStyle = `rgba(41,151,255,${(1 - d / 130) * .09})`; ctx.lineWidth = .6; ctx.stroke()
          }
        }
        P[i].tick(); P[i].draw()
      }
      raf = requestAnimationFrame(frame)
    }
    frame()

    return () => { window.removeEventListener('resize', resize); cancelAnimationFrame(raf) }
  }, [])

  return (
    <section id="hero" style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      textAlign: 'center', position: 'relative', overflow: 'hidden',
      padding: '140px 24px 100px', background: 'var(--bg)',
    }}>
      <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }} />

      <div className="orb" style={{ width: 700, height: 700, top: -200, left: -150, background: 'rgba(41,151,255,0.09)', animationDuration: '14s' }} />
      <div className="orb" style={{ width: 500, height: 500, bottom: -100, right: -100, background: 'rgba(94,92,230,0.08)', animationDuration: '18s', animationDirection: 'alternate-reverse' }} />
      <div className="orb" style={{ width: 300, height: 300, top: '40%', left: '60%', background: 'rgba(50,215,75,0.05)', animationDuration: '10s' }} />

      <div style={{ position: 'relative', zIndex: 2, maxWidth: 860 }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 9,
          padding: '5px 12px 5px 6px', borderRadius: 980,
          background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)',
          backdropFilter: 'blur(16px)', fontSize: 12, fontWeight: 600, color: 'var(--t2)',
          letterSpacing: '.04em', marginBottom: 32,
          animation: 'dropIn .7s .15s both',
        }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--green)', animation: 'blink 1.8s infinite', flexShrink: 0 }} />
          <span style={{ background: 'var(--blue)', color: '#fff', fontSize: 10, fontWeight: 700, padding: '3px 9px', borderRadius: 980, letterSpacing: '.06em' }}>Infosys</span>
          SAP S/4HANA Procurement &amp; IS Retail Lead
        </div>

        <h1 style={{
          fontSize: 'clamp(52px,9vw,108px)', fontWeight: 900,
          letterSpacing: '-0.055em', lineHeight: .92, marginBottom: 28,
          animation: 'riseIn .9s .3s both',
        }}>
          Where<br />
          <span className="grad">Enterprise AI</span><br />
          meets Retail.
        </h1>

        <p style={{
          fontSize: 'clamp(16px,2vw,20px)', color: 'var(--t2)', lineHeight: 1.65,
          maxWidth: 560, margin: '0 auto 40px',
          animation: 'riseIn .9s .5s both',
        }}>
          Delivering S/4HANA transformations at scale.<br />
          Specialising in <span style={{ color: 'var(--blue)', fontWeight: 600, borderRight: '2px solid var(--blue)', whiteSpace: 'nowrap', overflow: 'hidden', display: 'inline-block' }}>{tw}</span>
        </p>

        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', animation: 'riseIn .9s .65s both' }}>
          <a className="btn btn-p" href="#projects">View My Work →</a>
          <a className="btn btn-s" href="#contact">Get in Touch</a>
        </div>

        <div style={{
          display: 'flex', gap: 0, justifyContent: 'center', flexWrap: 'wrap',
          marginTop: 72, paddingTop: 40, borderTop: '1px solid var(--border)',
          animation: 'riseIn .9s .8s both',
        }}>
          <KPI n={6} label="Years at Infosys" />
          <KPI n={40} label="Projects Delivered" />
          <KPI n={25} label="Countries Visited" />
          <KPI n={2} label="SAP Certifications" />
        </div>
      </div>

      <div style={{
        position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, zIndex: 2,
        animation: 'riseIn .9s 1.1s both',
      }}>
        <span style={{ fontSize: 10, color: 'var(--t3)', letterSpacing: '.1em', textTransform: 'uppercase' }}>Scroll</span>
        <div style={{ width: 1, height: 44, background: 'linear-gradient(to bottom,var(--blue),transparent)', animation: 'scrollPulse 2s ease-in-out infinite' }} />
      </div>

      <style>{`
        .hero-kpi-sep + .hero-kpi-sep::before { content:''; position:absolute; left:0; top:50%; transform:translateY(-50%); width:1px; height:36px; background:var(--border); }
      `}</style>
    </section>
  )
}
