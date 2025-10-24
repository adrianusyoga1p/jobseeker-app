# Nuxt Base Project

Nuxt Base Project is a web application built with Nuxt 4 and Tailwind CSS 4. This README provides setup instructions and an overview of the project structure.

## Requirements

- Node.js version 20 or higher
- PNPM package manager

## Features

- **Tailwind CSS v4**: Utility-first CSS framework for rapid UI development.
- **@nuxt/ui**: Modern UI components for Nuxt 4.
- **Internationalization (i18n) with @nuxtjs/i18n**: Multi-language support (default: en & id) with browser language auto-detection.
- **State Management with Pinia**: Uses Pinia (and persisted state plugin) for modern state management and localStorage persistence.
- **Axios for HTTP Client**: API client integrated with axios for backend communication.
- **Day.js for Date Formatting**: Lightweight and modern date formatting utility.
- **ESLint & Husky**: Codebase integrated with ESLint (antfu config) and Husky for pre-commit linting.

## Setup

Make sure to install the dependencies:

```bash
pnpm install
```

If you don't have an .env file, create a copy from the example (e.g., .env.example) and set it up.

```bash
cp .env.example .env
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
pnpm run dev
```

## Production

Build the application for production:

```bash
pnpm run build
```

Locally preview production build:

```bash
pnpm run preview
```

Run project in PM2:

```bash
pm2 run ecosystem.config.cjs
```

## Docker

You can run this project using Docker and Docker Compose.

### Build and Run with Docker Compose

1. Build the image:
   ```bash
   docker compose build
   ```
2. Start the container:
   ```bash
   docker compose up
   ```
3. The app will be available at `http://localhost:3000` by default.

## Documentation

For more information on how to work with Nuxt, check out the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction).

For deployment options, refer to the [deployment documentation](https://nuxt.com/docs/getting-started/deployment).

## Project Structure

```
.
├── .git/
├── .husky/
├── .nuxt/
├── .vscode/
├── node_modules/
├── app/
│   ├── api/
│   ├── assets/
│   ├── components/
│   ├── composables/
│   ├── config/
│   ├── i18n/
│   ├── layouts/
│   ├── middleware/
│   ├── pages/
│   ├── plugins/
│   ├── stores/
│   ├── types/
│   ├── app.vue
│   └── error.vue
├── public/
├── server/
├── .gitignore
├── .nvmrc
├── ecosystem.config.cjs
├── eslint.config.mjs
├── nuxt.config.ts
├── package.json
├── pnpm-lock.yaml
├── docker-compose.yml
├── Dockerfile
├── .dockerignore
├── README.md
└── tsconfig.json
```

- `.git/`: Git repository directory
- `.husky/`: Husky configuration directory
- `.nuxt/`: Nuxt build directory (generated, not version controlled)
- `.vscode/`: VS Code editor configuration
- `node_modules/`: Node.js modules directory
- `app/`: Main source directory
  - `api/`: API request repository
  - `assets/`: Static assets
  - `components/`: Vue components
  - `composables/`: Composable functions
  - `config/`: Configuration files
  - `i18n/`: Internationalization files and configurations
  - `layouts/`: Layout components
  - `middleware/`: Route middleware
  - `pages/`: Vue components for each route
  - `plugins/`: Plugin definition
  - `stores/`: State management (e.g., Pinia stores)
  - `types/`: Type definition
  - `app.vue`: The main app component
  - `error.vue`: Error page handler
- `public/`: Publicly accessible static files
- `server/`: Server-side code / Nitro routes and API handlers
- `.gitignore`: Git ignore file
- `.nvmrc`: NVM version file (use it with `nvm use`)
- `ecosystem.config.cjs`: PM2 run script
- `eslint.config.mjs`: ESLint configuration
- `nuxt.config.ts`: Nuxt configuration file
- `package.json`: Project dependencies and scripts
- `pnpm-lock.yaml`: PNPM lock file
- `docker-compose.yml`: Docker Compose configuration
- `Dockerfile`: Docker build instructions
- `.dockerignore`: Docker ignore file
- `README.md`: This README file
- `tsconfig.json`: TypeScript configuration
