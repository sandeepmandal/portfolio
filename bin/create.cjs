#!/usr/bin/env node

'use strict'

const { execSync, spawnSync } = require('child_process')
const fs = require('fs')
const path = require('path')

const REPO = 'sandeepmandal/portfolio'
const CYAN = '\x1b[36m'
const GREEN = '\x1b[32m'
const YELLOW = '\x1b[33m'
const DIM = '\x1b[2m'
const RESET = '\x1b[0m'
const BOLD = '\x1b[1m'

const log = (msg) => console.log(msg)
const info = (msg) => log(`${CYAN}${msg}${RESET}`)
const success = (msg) => log(`${GREEN}${msg}${RESET}`)
const warn = (msg) => log(`${YELLOW}${msg}${RESET}`)
const dim = (msg) => log(`${DIM}${msg}${RESET}`)

const projectName = process.argv[2]

if (!projectName || projectName === '--help' || projectName === '-h') {
  log('')
  log(`${BOLD}  create-portfolio${RESET}`)
  log('')
  log(`  Scaffold a copy of Sandeep Mandal's portfolio template.`)
  log('')
  log(`  ${CYAN}Usage:${RESET}`)
  log(`    npx github:${REPO} ${DIM}<project-name>${RESET}`)
  log('')
  log(`  ${CYAN}Example:${RESET}`)
  log(`    npx github:${REPO} my-portfolio`)
  log('')
  process.exit(projectName ? 0 : 1)
}

const targetDir = path.resolve(process.cwd(), projectName)

if (fs.existsSync(targetDir)) {
  warn(`\n  ✗ Directory "${projectName}" already exists. Choose a different name.\n`)
  process.exit(1)
}

log('')
info(`  ◆ Creating portfolio in ./${projectName}/`)
log('')

// Check for git
const hasGit = spawnSync('git', ['--version'], { stdio: 'ignore' }).status === 0
if (!hasGit) {
  warn('  git is required but was not found. Please install git and retry.')
  process.exit(1)
}

// Try degit first (no git history, clean copy)
let scaffolded = false

try {
  dim('  → Downloading template...')
  execSync(`npx --yes degit ${REPO} "${projectName}"`, { stdio: 'pipe' })
  scaffolded = true
} catch {
  // Fallback: git clone + remove .git
  try {
    dim('  → Cloning repository...')
    execSync(`git clone --depth 1 https://github.com/${REPO}.git "${projectName}"`, { stdio: 'pipe' })
    fs.rmSync(path.join(targetDir, '.git'), { recursive: true, force: true })
    scaffolded = true
  } catch (err) {
    warn(`  ✗ Failed to download template: ${err.message}`)
    process.exit(1)
  }
}

if (!scaffolded) {
  warn('  ✗ Could not scaffold project.')
  process.exit(1)
}

// Remove bin dir from the scaffolded copy (not needed in user's project)
const binDir = path.join(targetDir, 'bin')
if (fs.existsSync(binDir)) {
  fs.rmSync(binDir, { recursive: true, force: true })
}

// Install dependencies
dim('  → Installing dependencies...')
try {
  execSync('npm install', { cwd: targetDir, stdio: 'pipe' })
} catch {
  warn('\n  ⚠ npm install failed — run it manually inside the project folder.')
}

// Print success banner
log('')
success('  ✓ Portfolio scaffolded successfully!')
log('')
log(`${BOLD}  Next steps:${RESET}`)
log('')
log(`    ${CYAN}cd ${projectName}${RESET}`)
log(`    ${CYAN}npm run dev${RESET}`)
log('')
log(`${BOLD}  Personalise your portfolio:${RESET}`)
log('')

const files = [
  ['src/components/Hero.jsx',           'Name, headline, typewriter words, KPI numbers'],
  ['src/components/About.jsx',          'Bio, photo, role, company, skill chips'],
  ['src/components/Experience.jsx',     'Your career timeline and education'],
  ['src/components/Skills.jsx',         'Skills, proficiency %, descriptions'],
  ['src/components/Projects.jsx',       'Project titles, descriptions, tags'],
  ['src/components/Certifications.jsx', 'Your certifications and education'],
  ['src/components/Travel.jsx',         'Countries, cities, map markers, gallery'],
  ['src/components/Blog.jsx',           'Your article titles and descriptions'],
  ['src/components/Contact.jsx',        'Topic dropdown, social links, email'],
  ['src/components/Footer.jsx',         'Name, tagline, footer links'],
  ['src/components/Navbar.jsx',         'Logo name, nav links'],
]

const maxPath = Math.max(...files.map(([f]) => f.length))
files.forEach(([file, desc]) => {
  log(`    ${DIM}${file.padEnd(maxPath + 2)}${RESET}${desc}`)
})

log('')
dim(`  Template by Sandeep Mandal — github.com/${REPO}`)
dim('  MIT License — free to use, modify, and distribute.')
log('')
