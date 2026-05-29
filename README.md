# Sandeep Mandal — Portfolio

> Apple-dark personal portfolio template built with React 19, Vite, Framer Motion, and Leaflet. Particle canvas hero, scroll-reveal animations, interactive travel map, light/dark theme toggle.

**Live:** [sandeepmandal.dev](https://sandeepmandal.dev) &nbsp;·&nbsp; **LinkedIn:** [mandalsandeep](https://linkedin.com/in/mandalsandeep)

---

## Use This Template

You can scaffold your own copy of this portfolio in **one command** — no npm account, no publish step required:

```bash
npx github:sandeepmandal/portfolio my-portfolio
```

This will:
1. Download the template (no git history)
2. Run `npm install` automatically
3. Print exactly which files to edit to make it yours

Then:

```bash
cd my-portfolio
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) and start customising.

---

### Alternative: GitHub Template

Click **[Use this template](https://github.com/sandeepmandal/portfolio/generate)** on the repo page to create your own GitHub repository from this template in one click.

---

### Alternative: degit (fastest, no npx overhead)

```bash
npx degit sandeepmandal/portfolio my-portfolio
cd my-portfolio
npm install
npm run dev
```

---

## What to Personalise

After scaffolding, edit these files:

| File | What to change |
|------|---------------|
| `src/components/Navbar.jsx` | Logo name, nav links |
| `src/components/Hero.jsx` | Name, headline, typewriter words, KPI numbers |
| `src/components/About.jsx` | Bio, role, company, photo, skill chips |
| `src/components/Experience.jsx` | Career timeline and education |
| `src/components/Skills.jsx` | Skill names, proficiency %, descriptions |
| `src/components/Projects.jsx` | Project titles, descriptions, tags, colours |
| `src/components/Certifications.jsx` | Your certs and degrees |
| `src/components/Travel.jsx` | Countries, cities, map markers, gallery |
| `src/components/Blog.jsx` | Article titles, descriptions, categories |
| `src/components/Contact.jsx` | Topic dropdown, email, social links |
| `src/components/Footer.jsx` | Name, tagline, footer links |

---

## Tech Stack

| Tool | Version | Purpose |
|------|---------|---------|
| [React](https://react.dev) | 19 | UI framework |
| [Vite](https://vitejs.dev) | 8 | Build tool & dev server |
| [Framer Motion](https://www.framer.com/motion/) | 12 | Animation |
| [Tailwind CSS](https://tailwindcss.com) | 3 | Utility-first styling |
| [react-leaflet](https://react-leaflet.js.org) | 5 | Interactive map |

---

## Sections

| # | Section | Highlights |
|---|---------|-----------|
| 1 | **Hero** | Particle canvas (90 particles, mouse-repel), typewriter, count-up KPIs |
| 2 | **About** | Bio, skill chips, floating role card, 3D tilt on hover |
| 3 | **Experience** | Vertical timeline with animated dots and skill tags |
| 4 | **Skills** | Scroll-triggered animated progress bars, glow cards |
| 5 | **Projects** | 12-column bento grid layout |
| 6 | **Certifications** | Cert cards with issuer, year, and verified badge |
| 7 | **Travel** | Count-up stats, Leaflet map with emoji markers, photo gallery |
| 8 | **Blog** | Article cards with category badges |
| 9 | **Contact** | Topic dropdown form, social icons, send animation |

---

## Design System

```css
--bg:     #050507   /* near-black background      */
--blue:   #2997ff   /* Apple blue accent           */
--indigo: #5e5ce6   /* secondary accent            */
--green:  #32d74b   /* success / live indicator    */
--t1:     #f2f2f5   /* primary text                */
--t2:     #8e8e96   /* secondary text              */
```

**Effects:** cursor spotlight, noise grain overlay, glassmorphism glow cards (gradient border mask trick), custom lagging cursor ring, IntersectionObserver scroll-reveal, light/dark theme toggle via `data-theme` attribute.

---

## Local Development

```bash
# Install
npm install

# Dev server (hot reload)
npm run dev

# Production build
npm run build

# Preview production build locally
npx serve dist
```

---

## Project Structure

```
src/
├── components/
│   ├── Navbar.jsx          # Fixed nav, theme toggle, mobile menu
│   ├── Hero.jsx            # Particle canvas, typewriter, count-up KPIs
│   ├── About.jsx           # Bio, chips, floating role card
│   ├── Experience.jsx      # Career timeline
│   ├── Skills.jsx          # Animated skill bars
│   ├── Projects.jsx        # Bento grid
│   ├── Certifications.jsx  # Cert + education cards
│   ├── Travel.jsx          # Leaflet map + gallery
│   ├── Blog.jsx            # Article cards
│   ├── Contact.jsx         # Form + socials
│   └── Footer.jsx          # Links + copyright
├── App.jsx                 # Root — cursor/spotlight, section order
├── index.css               # CSS token system, animations, global styles
└── main.jsx                # React entry point
bin/
└── create.cjs              # npx scaffold CLI
```

---

## License

MIT © 2026 [Sandeep Kumar Mandal](https://github.com/sandeepmandal)

Free to use, fork, and build upon. Attribution appreciated but not required.
