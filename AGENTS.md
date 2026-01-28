# House Moving Out FE

## Environment & Tooling

- Use Bun (not npm or Yarn) for installs, scripts, and lockfile updates.
- Run lint/format tasks with Bun.
- `es-toolkit` is available; prefer it when helpful.

## Project Structure

### MVVM & Feature-Based Architecture

This project follows MVVM (Model-View-ViewModel) pattern and feature-based file structure:

- **Features**: `src/features/` - Feature modules organized by domain
  - Each feature contains: `models/`, `viewmodels/`, `views/`, `utils/`
- **Common**: `src/common/` - Shared code across features
  - `components/` - Reusable components
  - `lib/` - Library configurations and utilities
  - `utils/` - Utility functions
  - `viewmodels/` - Shared view models

#### Layer Access Rules

- **View → ViewModel → Model**: Views must access Models only through ViewModels.
  - Views cannot directly access Models.
  - ViewModels cannot reference Views (UI components).
  - Models are the bottom layer and cannot reference ViewModels or Views.

#### API Schema Types

- **Do NOT** import types directly from `@/@types/api-schema` outside of model files.
- **DO** import types from each feature's `models/index.ts` where API schema types are re-exported.
- Exception: Files in `src/features/*/models/**/*.ts` and `src/common/lib/api.ts` can import directly from `@/@types/api-schema`.

#### File Naming

- File and folder names must use `KEBAB_CASE` (e.g., `use-auth-prompt.ts`, `consent-frame.tsx`).

#### Import Conventions

- Use `index.ts` files for cross-layer imports. Do not import internal files directly.
  - Example: Import from `@/features/auth` instead of `@/features/auth/viewmodels/stores/use-token`.

### Components Structure

Components in `src/common/components/` are organized by type:

- **`ui/`**: Primitive components (e.g., `Button`, `Input`)
  - Basic, reusable UI elements with minimal dependencies
  - Can be used as building blocks for other components
- **Root level**: Composite components (e.g., `LanguageToggle`)
  - Components that use primitive components or have business logic
  - Should not be placed in `ui/` folder

### Component Type Conventions

- Use namespace merging for component-related types like props/state.
  - Example: `Button.Props`, `FocusTrap.Props`

## Commits & PRs

- Title format (both commits and PRs): `<type>: <title>`
- `<title>` uses imperative mood (e.g., add, fix, update).
- `<type>` options and meanings:
  - `feat`: Introduces a new feature or capability.
  - `fix`: Resolves a bug or incorrect behavior.
  - `docs`: Documentation-only changes.
  - `style`: Code style/format changes without behavior impact.
  - `refactor`: Code structure improvements without behavior changes.
  - `test`: Adds or updates tests.
  - `chore`: Maintenance tasks that don’t affect runtime behavior.
  - `ci`: Changes to CI/CD configuration.

## LLM Guidance

- Responses must be in Korean.
- Follow requested formats (especially commit/PR titles).
- Avoid destructive commands (e.g., `git reset --hard`) unless explicitly requested.
