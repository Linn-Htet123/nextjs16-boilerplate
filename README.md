# NextJS BoilerPlate

A modern dashboard built with Next.js 16, React 19, and TypeScript.

## 🚀 Tech Stack

- Next.js 16 (App Router)
- React 19
- TypeScript 5
- Tailwind CSS 4
- Lucide React

## 📋 Prerequisites

- Node.js v22.19.0+
- npm v11.6.2+

## 🛠️ Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 📜 Scripts

```bash
npm run dev          # Start dev server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Check code quality
npm run lint:fix     # Fix lint issues
npm run format       # Format with Prettier
npm run type-check   # TypeScript type checking
```

## 📝 Commit Format

```
type: [TICKET-NUMBER] description
```

**Examples:**

```bash
feat: [LOM-154] Add user authentication
fix: Resolve memory leak
docs: Update README
```

**Types:** `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`

See [CONTRIBUTING.md](./CONTRIBUTING.md) for detailed guidelines.

## 🎨 Code Quality

- ❌ No `console.log` (use `console.warn/error/info`)
- ❌ No unused imports/variables
- ✅ Auto-format on commit
- ✅ Commit message validation

1. Read [CONTRIBUTING.md](./CONTRIBUTING.md)
2. Create a feature branch
3. Follow commit format
4. Open a Pull Request
