import { education } from '@/data/education'
import { experience } from '@/data/experience'
import { profile } from '@/data/profile'
import { getProjects } from '@/data/projects'
import { skillCategories } from '@/data/skills'
import { getSocial } from '@/data/socials'
import {
  terminalCommands,
  terminalContent,
  type TerminalCommandId,
} from '@/data/terminal'
import { SECTION_IDS } from '@/constants/sectionIds'
import { scrollToSectionId } from '@/lib/scroll'
import type Lenis from 'lenis'

export type TerminalAction =
  | { type: 'output'; lines: string[] }
  | { type: 'clear' }
  | { type: 'exit' }
  | { type: 'contact' }

function padCommand(id: string): string {
  return id.padEnd(12, ' ')
}

function formatHelp(): string[] {
  return [
    'Available commands:',
    '',
    ...terminalCommands.map(
      (cmd) => `  ${padCommand(cmd.id)}${cmd.description}`,
    ),
  ]
}

function formatAbout(): string[] {
  return [
    profile.name,
    profile.title,
    profile.focusLine,
    '',
    profile.about.introduction,
    '',
    profile.tagline,
  ]
}

function formatSkills(): string[] {
  const lines: string[] = ['Technologies', '']
  for (const category of skillCategories) {
    lines.push(`${category.category}:`)
    lines.push(`  ${category.skills.join(' · ')}`)
    lines.push('')
  }
  return lines
}

function formatProjects(): string[] {
  const items = getProjects()
  const lines: string[] = ['Projects', '']
  items.forEach((project, index) => {
    const badge = project.featured ? ' [Featured]' : ''
    lines.push(`${index + 1}. ${project.title}${badge}`)
    lines.push(`   ${project.tagline}`)
    lines.push(`   Stack: ${project.techStack.join(', ')}`)
    if (project.liveUrl) lines.push(`   Live: ${project.liveUrl}`)
    if (project.githubUrl) lines.push(`   GitHub: ${project.githubUrl}`)
    lines.push('')
  })
  return lines
}

function formatExperience(): string[] {
  const lines: string[] = ['Experience', '']
  for (const item of experience) {
    lines.push(`${item.role} — ${item.company}`)
    lines.push(`${item.duration} · ${item.location}`)
    lines.push(item.summary)
    lines.push('')
    for (const achievement of item.achievements) {
      lines.push(`  • ${achievement}`)
    }
    lines.push('')
    lines.push(`Tech: ${item.technologies.join(', ')}`)
    lines.push('')
  }
  return lines
}

function formatEducation(): string[] {
  const lines: string[] = ['Education', '']
  for (const item of education) {
    lines.push(item.degree)
    lines.push(item.college)
    lines.push(item.duration)
    if (item.cgpa) lines.push(`CGPA: ${item.cgpa}`)
    if (item.coursework.length > 0) {
      lines.push(`Coursework: ${item.coursework.join(', ')}`)
    }
    for (const achievement of item.achievements) {
      lines.push(`  • ${achievement}`)
    }
    lines.push('')
  }
  return lines
}

function downloadResume(): void {
  const anchor = document.createElement('a')
  anchor.href = profile.resumeUrl
  anchor.download = 'Meet-Phulwani-Resume.pdf'
  anchor.rel = 'noopener noreferrer'
  document.body.appendChild(anchor)
  anchor.click()
  anchor.remove()
}

function openExternal(url: string): void {
  window.open(url, '_blank', 'noopener,noreferrer')
}

const COMMAND_IDS = new Set<string>(terminalCommands.map((c) => c.id))

function isCommandId(value: string): value is TerminalCommandId {
  return COMMAND_IDS.has(value)
}

/**
 * Executes a terminal command and returns the resulting action.
 * Side effects (open links / download) run immediately where appropriate.
 */
export function runTerminalCommand(raw: string): TerminalAction {
  const trimmed = raw.trim()
  if (!trimmed) return { type: 'output', lines: [] }

  const [name] = trimmed.toLowerCase().split(/\s+/)
  if (!name || !isCommandId(name)) {
    return { type: 'output', lines: [terminalContent.unknown(name ?? trimmed)] }
  }

  switch (name) {
    case 'help':
      return { type: 'output', lines: formatHelp() }
    case 'about':
      return { type: 'output', lines: formatAbout() }
    case 'skills':
      return { type: 'output', lines: formatSkills() }
    case 'projects':
      return { type: 'output', lines: formatProjects() }
    case 'experience':
      return { type: 'output', lines: formatExperience() }
    case 'education':
      return { type: 'output', lines: formatEducation() }
    case 'resume':
      downloadResume()
      return { type: 'output', lines: [terminalContent.resumeStarted] }
    case 'github':
      openExternal(getSocial('github').href)
      return { type: 'output', lines: [terminalContent.githubOpened] }
    case 'linkedin':
      openExternal(getSocial('linkedin').href)
      return { type: 'output', lines: [terminalContent.linkedinOpened] }
    case 'contact':
      return { type: 'contact' }
    case 'clear':
      return { type: 'clear' }
    case 'exit':
      return { type: 'exit' }
    default:
      return { type: 'output', lines: [terminalContent.unknown(name)] }
  }
}

/** Scrolls to contact after the terminal has closed. */
export function scrollToContact(lenis: Lenis | null): void {
  void scrollToSectionId(SECTION_IDS.contact, lenis)
}
