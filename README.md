# Sandeep Mandal — Portfolio

Personal portfolio website for **Sandeep Kumar Mandal**, SAP S/4HANA Procurement & IS Retail Lead at Infosys, based in Bolingbrook, Illinois.

Live site: [sandeepmandal.dev](https://sandeepmandal.dev) &nbsp;·&nbsp; [LinkedIn](https://linkedin.com/in/mandalsandeep)

---

## Overview

An Apple-inspired dark portfolio built with React and Vite. Features a particle canvas hero, smooth scroll-reveal animations, an interactive Leaflet travel map, and a full light/dark theme toggle — all without any UI component library.

---

## Sections

| Section | Description |
|---------|-------------|
| **Hero** | Particle canvas background, animated headline, typewriter effect cycling SAP specialisations, count-up KPIs |
| **About** | Bio, skill chips, floating role card |
| **Experience** | Career timeline — IS Retail Lead, Consultant, KIIT B.Tech |
| **Skills** | 6 SAP skill cards with scroll-triggered animated progress bars |
| **Projects** | Bento grid — Ulta Beauty BTP, AI Markdown Optimisation, Invoice Processing, Fraud Detection |
| **Certifications** | SAP Business AI (2025), S/4HANA Cloud (2025), KIIT B.Tech |
| **Travel** | Count-up stats, interactive Leaflet map with 12 country markers, photo gallery |
| **Blog** | 3 articles on SAP AI, enterprise ERP, and travel |
| **Contact** | Topic dropdown, contact form, social links |

---

## Tech Stack

| Tool | Purpose |
|------|---------|
| [React 19](https://react.dev) | UI framework |
| [Vite](https://vitejs.dev) | Build tool & dev server |
| [Framer Motion](https://www.framer.com/motion/) | Animation library |
| [Tailwind CSS v3](https://tailwindcss.com) | Utility-first styling |
| [react-leaflet](https://react-leaflet.js.org) | Interactive travel map |

---

## Design System

- **Background:** `#050507` (near-black Apple dark)
- **Accent:** `#2997ff` (Apple blue), `#5e5ce6` (indigo), `#32d74b` (green)
- **Typography:** Inter, system-ui stack
- **Cards:** Glassmorphism with gradient border mask trick
- **Cursor:** Custom dot + lagging ring, cursor spotlight radial gradient
- **Animations:** IntersectionObserver scroll-reveal, CSS keyframes, canvas particle system

---

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npx serve dist
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Project Structure

```
src/
├── components/
│   ├── Navbar.jsx          # Fixed nav, theme toggle, mobile menu
│   ├── Hero.jsx            # Particle canvas, typewriter, count-up KPIs
│   ├── About.jsx           # Bio, chips, float card
│   ├── Experience.jsx      # Timeline — Infosys career + KIIT
│   ├── Skills.jsx          # SAP skill cards with animated bars
│   ├── Projects.jsx        # Bento grid layout
│   ├── Certifications.jsx  # SAP certs + education
│   ├── Travel.jsx          # Leaflet map + gallery
│   ├── Blog.jsx            # Article cards
│   ├── Contact.jsx         # Form + socials
│   └── Footer.jsx          # Links + copyright
├── App.jsx                 # Root — cursor/spotlight effects, section order
├── index.css               # CSS token system, global styles, animations
└── main.jsx                # React entry point
```

---

## License

MIT © 2026 [Sandeep Kumar Mandal](https://github.com/sandeepmandal)
