# 🥟 Dreckly

![Dreckly Cover](.github/readme.webp)

**Dreckly** is a Cornish-first food delivery platform, built to support local takeaways and food producers across **Cornwall, UK**.

> Think of it like "we'll get there dreckly"—but your food won't wait that long.

Built with [Nx](https://nx.dev) for a scalable, full-stack monorepo experience.

## Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn** package manager
- **Git**

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/JamesHusband/Dreckly.git
   cd drecktly
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

### Development

1. **Start the development server**

   ```bash
   npx nx serve @dreckly/dreckly
   ```

   The app will be available at `http://localhost:3000`

2. **Run tests**

   ```bash
   # Run all tests
   npx nx test

   # Run tests for specific project
   npx nx test @dreckly/dreckly
   ```

3. **Run linting**

   ```bash
   # Lint all projects
   npx nx lint

   # Lint specific project
   npx nx lint @dreckly/dreckly
   ```

4. **Build for production**
   ```bash
   npx nx build @dreckly/dreckly
   ```

### Available Commands

- `npx nx serve @dreckly/dreckly` - Start development server
- `npx nx build @dreckly/dreckly` - Build for production
- `npx nx test` - Run all tests
- `npx nx lint` - Run linting
- `npx nx e2e @dreckly/dreckly-e2e` - Run end-to-end tests

### Project Structure

```
drecktly/
├── apps/
│   ├── dreckly/          # Main Next.js application
│   └── dreckly-e2e/      # End-to-end tests
├── libs/
│   ├── feature/          # Feature libraries
│   │   ├── cart/         # Shopping cart functionality
│   │   ├── home/         # Home page components
│   │   ├── layout/       # Layout components
│   │   ├── menu/         # Menu components
│   │   └── restaurants/  # Restaurant components
│   ├── ui-kit/           # Reusable UI components
│   ├── state/            # State management
│   ├── types/            # TypeScript type definitions
│   └── utils/            # Utility functions
```

---
