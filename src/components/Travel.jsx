import { useEffect, useRef, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

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

function useCountUp(target) {
  const [val, setVal] = useState(0)
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        obs.unobserve(el)
        const step = target / (1400 / 28)
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
  }, [target])
  return [val, ref]
}

const places = [
  { n: 'Paris', c: [48.8566, 2.3522], e: '🗼' },
  { n: 'Tokyo', c: [35.6762, 139.65], e: '🏯' },
  { n: 'New York', c: [40.7128, -74.006], e: '🗽' },
  { n: 'Dubai', c: [25.2048, 55.2708], e: '🌆' },
  { n: 'Sydney', c: [-33.8688, 151.2093], e: '🦘' },
  { n: 'Nairobi', c: [-1.2921, 36.8219], e: '🦁' },
  { n: 'Istanbul', c: [41.0082, 28.9784], e: '🕌' },
  { n: 'Mumbai', c: [19.076, 72.8777], e: '🇮🇳' },
  { n: 'London', c: [51.5074, -0.1278], e: '🎡' },
  { n: 'Singapore', c: [1.3521, 103.8198], e: '🌴' },
  { n: 'Bali', c: [-8.3405, 115.092], e: '🏝️' },
  { n: 'Rome', c: [41.9028, 12.4964], e: '🏛️' },
]

const gallery = [
  { bg: 'linear-gradient(135deg,#0d1f3c,#1a3a5c)', e: '🗼', cap: 'Paris, France' },
  { bg: 'linear-gradient(135deg,#1a0d0d,#3a2010)', e: '🏯', cap: 'Tokyo, Japan' },
  { bg: 'linear-gradient(135deg,#0d2020,#1a3a30)', e: '🦁', cap: 'Maasai Mara, Kenya' },
  { bg: 'linear-gradient(135deg,#200d1a,#3a1a2a)', e: '🕌', cap: 'Istanbul, Turkey' },
  { bg: 'linear-gradient(135deg,#1a1a0d,#3a3010)', e: '🗽', cap: 'New York, USA' },
  { bg: 'linear-gradient(135deg,#0d1a1a,#1a3030)', e: '🏝️', cap: 'Bali, Indonesia' },
]

function TravelStat({ icon, n, label, delay }) {
  const [val, ref] = useCountUp(n)
  return (
    <div ref={ref} className={`gc tstat rv ${delay}`} style={{ padding: '28px 20px', textAlign: 'center' }}>
      <div style={{ fontSize: 26, marginBottom: 10 }}>{icon}</div>
      <span style={{
        fontSize: 38, fontWeight: 900, letterSpacing: '-.05em', display: 'block',
        background: 'linear-gradient(135deg,var(--blue),var(--indigo))',
        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
      }}>{val.toLocaleString()}</span>
      <span style={{ fontSize: 11, color: 'var(--t3)', letterSpacing: '.08em', textTransform: 'uppercase', marginTop: 4, display: 'block' }}>{label}</span>
    </div>
  )
}

export default function Travel() {
  const hdRef = useReveal()
  const mapRef = useReveal()

  return (
    <section id="travel" style={{ padding: '120px 0', background: 'var(--bg)', position: 'relative', overflow: 'hidden' }}>
      <div className="orb" style={{ width: 500, height: 500, top: -100, right: -100, background: 'rgba(255,159,10,.05)', animationDuration: '16s' }} />

      <div className="wrap">
        <div ref={hdRef} className="rv" style={{ textAlign: 'center', maxWidth: 600, margin: '0 auto 56px' }}>
          <div className="eyebrow">Personal</div>
          <h2 className="ttl">Where I've Been</h2>
          <p className="sub" style={{ margin: '0 auto' }}>The world is my second office. Every trip is a story — here are some of them.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14, marginBottom: 44 }}>
          <TravelStat icon="🌍" n={25} label="Countries" delay="d1" />
          <TravelStat icon="✈️" n={120} label="Flights Taken" delay="d2" />
          <TravelStat icon="📍" n={68} label="Cities Explored" delay="d3" />
          <TravelStat icon="📸" n={4800} label="Photos Taken" delay="d4" />
        </div>

        <div ref={mapRef} className="rv" style={{ borderRadius: 'var(--r-lg)', overflow: 'hidden', border: '1px solid var(--border)', height: 400, position: 'relative', marginBottom: 44 }}>
          <MapContainer
            center={[20, 10]} zoom={2}
            style={{ width: '100%', height: '100%' }}
            zoomControl={false} attributionControl={false} scrollWheelZoom={false}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" maxZoom={6} minZoom={1} />
            {places.map(p => (
              <Marker key={p.n} position={p.c}
                icon={L.divIcon({
                  html: `<div style="font-size:16px;filter:drop-shadow(0 2px 6px rgba(0,0,0,.6))">${p.e}</div>`,
                  className: '', iconAnchor: [10, 10],
                })}
              >
                <Popup><strong>{p.n}</strong></Popup>
              </Marker>
            ))}
          </MapContainer>
          <div style={{
            position: 'absolute', bottom: 14, left: 14, zIndex: 999,
            background: 'rgba(8,8,12,0.82)', backdropFilter: 'blur(16px)',
            border: '1px solid var(--border)', borderRadius: 'var(--r-sm)', padding: '12px 16px', pointerEvents: 'none',
          }}>
            <strong style={{ fontSize: 14, fontWeight: 700, display: 'block', marginBottom: 2 }}>25 Countries &amp; Counting</strong>
            <p style={{ fontSize: 12, color: 'var(--t2)' }}>Visited spots highlighted on map</p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(200px,1fr))', gap: 10 }}>
          {gallery.map((g, i) => (
            <GalItem key={i} g={g} i={i} />
          ))}
        </div>
      </div>

      <style>{`
        @media(max-width:900px){
          #travel .tstats { grid-template-columns: repeat(2,1fr) !important; }
        }
        .gal-item:nth-child(3n+1) { grid-row: span 2; }
      `}</style>
    </section>
  )
}

function GalItem({ g, i }) {
  const [hov, setHov] = useState(false)
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        borderRadius: 'var(--r-sm)', overflow: 'hidden', aspectRatio: '4/3',
        display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28,
        position: 'relative', cursor: 'pointer', border: '1px solid var(--border)',
        background: g.bg, transition: 'transform .3s var(--ease)',
        transform: hov ? 'scale(1.025)' : 'scale(1)',
      }}
    >
      <span>{g.e}</span>
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        padding: '24px 10px 10px',
        background: 'linear-gradient(to top,rgba(0,0,0,.72),transparent)',
        fontSize: 11.5, fontWeight: 600, color: '#fff',
        opacity: hov ? 1 : 0, transform: hov ? 'none' : 'translateY(4px)',
        transition: 'all .3s',
      }}>{g.cap}</div>
    </div>
  )
}
