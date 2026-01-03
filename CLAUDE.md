# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Deck Assistant is a monorepo containing a full-stack application for creating AI-generated presentation decks. The backend uses NestJS with Google Gemini AI integration, and the frontend is built with React, Vite, and Tailwind CSS.

## Development Commands

### Backend API (`deck-assistant.api`)

```bash
cd deck-assistant.api
npm install                 # Install dependencies
npm run start:dev           # Development with watch mode
npm run build               # Compile TypeScript
npm run test                # Run unit tests
npm run test:watch          # Run tests in watch mode
npm run test:e2e            # Run e2e tests
npm run test:cov            # Test coverage report
npm run lint                # Run ESLint with auto-fix
npm run format              # Format with Prettier
```

### Frontend Client (`deck-assistant.client`)

```bash
cd deck-assistant.client
npm install                 # Install dependencies
npm run dev                 # Start development server (Vite)
npm run build               # TypeScript compile + Vite build
npm run preview             # Preview production build
npm run lint                # Run ESLint
```

### Environment Setup

The API requires a `.env` file in `deck-assistant.api/` with:
```
GEMINI_API_KEY=your_api_key_here
```

## Architecture

### Monorepo Structure

```
deck-assistant/
├── deck-assistant.api/       # NestJS backend
└── deck-assistant.client/    # React frontend
```

### Backend Architecture (NestJS Layered)

The API follows NestJS module pattern with layered architecture:

**Controller → Service → Repository → JSON Storage**

Key modules:
- **AI Module** (`src/ai/`) - Gemini AI integration for deck generation
  - `POST /ai/generate-deck` - Generates structured deck content using Gemini 2.0 Flash
  - Uses schema enforcement to ensure consistent JSON output
  - Prompt construction from user input (company info, problem, solution, etc.)

- **Decks Module** (`src/decks/`) - CRUD operations for decks and slides
  - Controllers handle HTTP requests (`decks.controller.ts`)
  - Services contain business logic (`decks.service.ts`)
  - Repositories manage data access (`decks.repository.ts`, `slides.repository.ts`)
  - Models define data structures (`deck.ts`, `slides.ts`)
  - DTOs validate request payloads (`create-deck-dto.ts`, `create-slides-dto.ts`)

**Data Storage:** File-based JSON storage (`decks.json`, `slides.json`) - suitable for prototype, not production scale.

**API Configuration:**
- Port: 3000 (default)
- CORS: Enabled for `http://localhost:5173` (frontend dev server)

### Frontend Architecture (React + Vite)

Component-based architecture with client-side routing:

**Key Components:**
- `Dashboard.tsx` - Lists all decks, entry point at `/`
- `CreateDeckForm.tsx` - Deck generation form with Zod validation at `/create-deck`
  - Collects: company name, industry, problem, solution, business model, financials, team info
- `DeckViewer.tsx` - Slide presentation interface at `/deck-viewer`
  - Navigation controls (prev/next)
  - Full-screen slide display
- `Slide.tsx` - Individual slide renderer
  - Supports text blocks: heading, subheading, paragraph, bullet
  - Background colors and gradients
  - Speaker notes

**Services:**
- `api-client.ts` - Axios instance configured with `baseURL: http://localhost:3000`

**Styling:** Tailwind CSS 4.0 with Vite plugin

### Data Flow

1. User fills CreateDeckForm → submits to `/ai/generate-deck`
2. AI Service constructs prompt → calls Gemini API with schema
3. Structured JSON response (8 slides) returned
4. Client saves deck metadata via `POST /decks`
5. Client saves slides via `POST /decks/:deckId`
6. User navigates to DeckViewer to present

### Data Models

**Deck:**
- UUID, title, company info, industry, problem statement, solution, business model, financials, team info

**Slides (nested structure):**
- Each slide has: id, title, type, content (textBlocks array, image object, notes), background (color, gradient)
- Image object has: shortQuery, fullDescription, originalUrl, storedPath, selectedAt
- Text blocks have: id, text, type (heading/subheading/paragraph/bullet)

## Key Patterns

- **Dependency Injection:** NestJS controllers/services use constructor injection
- **Repository Pattern:** Data access abstraction layer separates business logic from storage
- **DTO Pattern:** Request validation and transformation using class-validator decorators
- **Schema Enforcement:** Gemini AI uses strict schema to ensure consistent output structure
- **Form Validation:** React Hook Form + Zod for type-safe client-side validation

## Important Notes

- The API uses file-based JSON storage (not database) - suitable for prototyping
- No authentication/authorization layer currently implemented
- CORS is hardcoded for development (`localhost:5173`)
- Image upload/storage functionality is defined in schema but not yet implemented
- The API is stateless - each request is independent

## API Endpoints Reference

**AI Controller (`/ai`):**
- `POST /generate-deck` - Generate deck content with Gemini AI

**Decks Controller (`/decks`):**
- `GET /` - Get all decks
- `GET /:id` - Get specific deck
- `POST /` - Create new deck
- `GET /:deckId/slides` - Get all slides for deck
- `GET /:deckId/slides/:slideId` - Get specific slide
- `POST /:deckId` - Create slides for deck
