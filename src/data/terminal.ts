/**
 * Copy and command metadata for the hidden portfolio terminal easter egg.
 */
export const terminalContent = {
  title: 'Meet Portfolio Terminal',
  status: '● Connected',
  welcome: [
    '------------------------------------------------',
    '',
    "Welcome to Meet's Portfolio Terminal",
    '',
    'Type "help" to see available commands.',
    '',
    '------------------------------------------------',
  ],
  prompt: '>',
  unknown: (cmd: string) =>
    `Command not found: ${cmd}. Type "help" for available commands.`,
  resumeStarted: 'Opening resume download…',
  githubOpened: 'Opening GitHub…',
  linkedinOpened: 'Opening LinkedIn…',
  contactScrolling: 'Scrolling to Contact…',
  exitMessage: 'Closing terminal…',
} as const

export type TerminalCommandId =
  | 'help'
  | 'about'
  | 'skills'
  | 'projects'
  | 'experience'
  | 'education'
  | 'resume'
  | 'github'
  | 'linkedin'
  | 'contact'
  | 'clear'
  | 'exit'

export type TerminalCommandDef = {
  id: TerminalCommandId
  description: string
}

export const terminalCommands: TerminalCommandDef[] = [
  { id: 'help', description: 'Lists every available command.' },
  { id: 'about', description: 'Displays a short introduction.' },
  { id: 'skills', description: 'Displays technologies.' },
  { id: 'projects', description: 'Lists all projects.' },
  { id: 'experience', description: 'Shows internship information.' },
  { id: 'education', description: 'Shows education.' },
  { id: 'resume', description: 'Downloads the resume.' },
  { id: 'github', description: 'Opens GitHub.' },
  { id: 'linkedin', description: 'Opens LinkedIn.' },
  { id: 'contact', description: 'Scrolls to Contact section.' },
  { id: 'clear', description: 'Clears terminal.' },
  { id: 'exit', description: 'Closes terminal.' },
]
