/**
 * Portfolio projects — sourced from resume + real GitHub / deploy links.
 */
export type Project = {
  slug: string
  title: string
  tagline: string
  description: string
  featured: boolean
  /** Optional future screenshot path — omitted from cards until a real asset exists. */
  coverImage: string | null
  coverImageAlt: string
  imageWidth: number
  imageHeight: number
  problem: string
  solution: string
  architecture: string
  features: string[]
  techStack: string[]
  githubUrl: string | null
  liveUrl: string | null
}

export const projectsSectionContent = {
  eyebrow: 'Selected work',
  heading: 'PROJECTS',
  description:
    'Full-stack builds with clear problems, practical solutions, and production-minded stacks — including a Socket.IO realtime multiplayer app.',
  featuredBadge: 'Featured',
  labels: {
    technologies: 'Technologies',
    features: 'Key Features',
  },
} as const

export const projects: Project[] = [
  {
    slug: 'mern-ecommerce-platform',
    title: 'MERN E-Commerce Platform',
    tagline: 'Production-ready full-stack storefront with JWT auth and order APIs.',
    description:
      'A full-stack MERN e-commerce platform with JWT authentication, product catalog, cart management, and order APIs — deployed and production-ready.',
    featured: true,
    coverImage: null,
    coverImageAlt: 'MERN E-Commerce Platform preview',
    imageWidth: 1600,
    imageHeight: 1000,
    problem:
      'Building a complete commerce flow requires secure auth, reliable catalog/cart state, and clean order APIs that stay consistent across frontend and backend.',
    solution:
      'Implemented JWT authentication, product catalog, cart management, and order APIs with a responsive React UI and RESTful Node/Express services backed by MongoDB.',
    architecture:
      'React.js client for catalog, cart, and account flows; Node.js + Express REST API for auth and orders; MongoDB for product and order data; JWT for session security. Deployed at subtl.onrender.com.',
    features: [
      'JWT authentication',
      'Product catalog browsing',
      'Cart management',
      'Order APIs',
      'Responsive React UI',
      'MongoDB data layer',
    ],
    techStack: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'JWT', 'REST APIs'],
    githubUrl: 'https://github.com/meetPhulwani/Subtl_Online_store',
    liveUrl: 'https://subtl.onrender.com',
  },
  {
    slug: 'chess-multiplayer',
    title: 'Real-Time Multiplayer Chess Game',
    tagline: 'Socket.IO realtime multiplayer chess with move validation.',
    description:
      'A Socket.IO-powered realtime multiplayer chess game on the MERN stack — synchronized boards, standard chess rules, move validation, and live game-state detection.',
    featured: false,
    coverImage: null,
    coverImageAlt: 'Real-Time Multiplayer Chess Game preview',
    imageWidth: 1280,
    imageHeight: 800,
    problem:
      'Realtime multiplayer games need synchronized boards, reliable move validation, and smooth interaction without fragile client-only state.',
    solution:
      'Used Socket.IO for low-latency board sync between players, with MERN services enforcing chess rules, move validation, and dynamic game-state updates.',
    architecture:
      'React board UI; Node/Express game logic; Socket.IO channels for realtime multiplayer sync; MongoDB-ready persistence for sessions and game state.',
    features: [
      'Socket.IO realtime multiplayer',
      'Live board synchronization',
      'Move validation',
      'Game state detection',
      'Standard chess rules',
      'Scalable MERN architecture',
    ],
    techStack: ['React.js', 'Node.js', 'Express.js', 'Socket.IO', 'MongoDB'],
    githubUrl: 'https://github.com/meetPhulwani/Chess_Game',
    liveUrl: null,
  },
  {
    slug: 'inventory-management-system',
    title: 'Inventory Management System',
    tagline: 'Track products, stock levels, and inventory records with clarity.',
    description:
      'A web-based inventory management application to track products, update stock levels, and manage inventory records with CRUD APIs and a responsive admin UI.',
    featured: false,
    coverImage: null,
    coverImageAlt: 'Inventory Management System preview',
    imageWidth: 1280,
    imageHeight: 800,
    problem:
      'Manual inventory tracking creates mismatches and slow updates when product catalogs grow.',
    solution:
      'Developed CRUD-backed inventory workflows with database storage and a responsive interface to add, edit, and monitor items efficiently.',
    architecture:
      'Responsive web client with backend APIs for product and stock operations; database-backed records; GitHub-hosted source with Git version control.',
    features: [
      'Product CRUD workflows',
      'Stock level updates',
      'Inventory record management',
      'Responsive monitoring UI',
    ],
    techStack: ['JavaScript', 'Node.js', 'Express.js', 'Database', 'Git'],
    githubUrl: 'https://github.com/meetPhulwani/Inventory_Mangement',
    liveUrl: null,
  },
]

/** Unified list — featured project first, then remaining projects. */
export function getProjects(): Project[] {
  return [...projects].sort((a, b) => Number(b.featured) - Number(a.featured))
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug)
}
