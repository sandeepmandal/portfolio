export default function Footer() {
  return (
    <footer style={{ background: 'var(--bg-2)', borderTop: '1px solid var(--border)', padding: '48px 0 32px' }}>
      <div className="wrap">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 32 }}>
          <div>
            <span style={{
              fontSize: 18, fontWeight: 800, letterSpacing: '-0.6px', display: 'block', marginBottom: 8,
              background: 'linear-gradient(110deg,#fff 40%,var(--blue))',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>Sandeep Mandal</span>
            <p style={{ fontSize: 13, color: 'var(--t3)', maxWidth: 240, lineHeight: 1.65 }}>
              SAP S/4HANA Procurement &amp; IS Retail Lead at Infosys. Building smarter retail, exploring the world.
            </p>
          </div>

          <div style={{ display: 'flex', gap: 48, flexWrap: 'wrap' }}>
            <FootCol title="Work" links={[
              { label: 'Projects', href: '#projects' },
              { label: 'Experience', href: '#exp' },
              { label: 'Skills', href: '#skills' },
              { label: 'Resume', href: '#' },
            ]} />
            <FootCol title="Personal" links={[
              { label: 'Travel', href: '#travel' },
              { label: 'Blog', href: '#blog' },
              { label: 'About', href: '#about' },
            ]} />
            <FootCol title="Connect" links={[
              { label: 'LinkedIn', href: 'https://linkedin.com/in/mandalsandeep' },
              { label: 'Email', href: 'mailto:sandeep.m05@icloud.com' },
              { label: 'Contact Form', href: '#contact' },
            ]} />
          </div>
        </div>

        <div style={{
          borderTop: '1px solid var(--border)', marginTop: 36, paddingTop: 22,
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8,
        }}>
          <p style={{ fontSize: 12, color: 'var(--t3)' }}>© 2026 Sandeep Mandal · Bolingbrook, Illinois</p>
          <p style={{ fontSize: 12, color: 'var(--t3)' }}>Designed to Apple standards · Built with React</p>
        </div>
      </div>
    </footer>
  )
}

function FootCol({ title, links }) {
  return (
    <div>
      <h4 style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--t3)', marginBottom: 14 }}>{title}</h4>
      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
        {links.map(l => (
          <li key={l.label}>
            <a href={l.href}
              style={{ fontSize: 13.5, color: 'var(--t2)', transition: 'color .2s' }}
              onMouseEnter={e => e.target.style.color = 'var(--t1)'}
              onMouseLeave={e => e.target.style.color = 'var(--t2)'}
            >{l.label}</a>
          </li>
        ))}
      </ul>
    </div>
  )
}
