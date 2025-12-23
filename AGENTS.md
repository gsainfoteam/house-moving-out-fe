# House Moving Out FE

## Environment & Tooling

- Use Bun (not npm or Yarn) for installs, scripts, and lockfile updates.
- Run lint/format tasks with Bun.
- `es-toolkit` is available; prefer it when helpful.

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
