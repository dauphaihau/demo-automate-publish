# Automated npm Publishing Example

This repository demonstrates various methods to automate publishing packages to npm.

## Features

- ✅ Automated version bumping (patch, minor, major)
- ✅ Pre-publish validation (tests, build)
- ✅ Multiple automation methods (scripts, CI/CD)
- ✅ Git tag creation
- ✅ Dry-run support

## Setup

1. Install dependencies:
```bash
npm install
```

2. Build the package:
```bash
npm run build
```

3. Run tests:
```bash
npm test
```

## Publishing Methods

### Method 1: Using npm Scripts

The simplest way to publish with automatic version bumping:

```bash
# Publish a patch version (1.0.0 -> 1.0.1)
npm run publish:patch

# Publish a minor version (1.0.0 -> 1.1.0)
npm run publish:minor

# Publish a major version (1.0.0 -> 2.0.0)
npm run publish:major

# Dry-run (test without publishing)
npm run publish:dry-run
```

### Method 2: Using Shell Script

The bash script provides more control and better error handling:

```bash
# Make script executable (first time only)
chmod +x scripts/publish.sh

# Publish patch version
./scripts/publish.sh patch

# Publish minor version
./scripts/publish.sh minor

# Publish major version
./scripts/publish.sh major

# Dry-run
./scripts/publish.sh patch --dry-run
```

### Method 3: Using Node.js Script

Cross-platform Node.js version of the publish script:

```bash
# Publish patch version
node scripts/publish.js patch

# Publish minor version
node scripts/publish.js minor

# Publish major version
node scripts/publish.js major

# Dry-run
node scripts/publish.js patch --dry-run
```

### Method 4: GitHub Actions (CI/CD)

Automated publishing via GitHub Actions:

1. **Set up npm token:**
   - Go to your GitHub repository settings
   - Navigate to Secrets and variables → Actions
   - Add a new secret named `NPM_TOKEN` with your npm access token
   - **Note:** Token is required for CI/CD automation, even for public packages

2. **Trigger publishing:**
   - **Manual trigger:** Go to Actions → "Publish to npm" → Run workflow
   - **Release trigger:** Create a new GitHub release to automatically publish

## Pre-publish Checks

All methods automatically run:
- ✅ Tests (`npm test`)
- ✅ Build (`npm run build`)
- ✅ Git status check (ensures clean working directory)

## Version Bumping

The scripts use semantic versioning:
- **Patch** (1.0.0 → 1.0.1): Bug fixes
- **Minor** (1.0.0 → 1.1.0): New features (backward compatible)
- **Major** (1.0.0 → 2.0.0): Breaking changes

## Git Integration

After publishing, the scripts will:
1. Commit the version bump to `package.json`
2. Create a git tag (e.g., `v1.0.1`)
3. Remind you to push: `git push && git push --tags`

## Package Configuration

The `package.json` includes:
- `prepublishOnly`: Automatically runs build and tests before publishing
- `files`: Specifies which files to include in the published package
- Version bump scripts for each type

## Best Practices

1. **Always test before publishing:**
   ```bash
   npm run publish:dry-run
   ```

2. **Use semantic versioning:**
   - Patch for bug fixes
   - Minor for new features
   - Major for breaking changes

3. **Keep a clean git history:**
   - Commit all changes before publishing
   - Use conventional commit messages

4. **Set up CI/CD:**
   - Use GitHub Actions for automated publishing
   - Require tests to pass before publishing

## Authentication Requirements

### For Manual/Local Publishing

For **public packages**, you can use `npm login` (username/password):
```bash
npm login
```

**No token required** for manual publishing of public packages.

### For CI/CD (GitHub Actions)

**Token is required** for automated publishing, regardless of package scope (public or private):
- Create an npm access token at: https://www.npmjs.com/settings/YOUR_USERNAME/tokens
- Add it as `NPM_TOKEN` secret in GitHub repository settings
- The workflow uses this token for authentication

**Why token for CI/CD?**
- Security: Tokens can be scoped and revoked
- Automation: No interactive login possible in CI environments
- Best practice: Recommended by npm for all automated publishing

## Troubleshooting

### Not logged into npm
```bash
npm login
```

### Uncommitted changes
Commit or stash your changes before publishing:
```bash
git add .
git commit -m "Your commit message"
```

### Publishing fails
- Check npm registry: `npm config get registry`
- Verify package name is available
- Check npm permissions for the package

## License

MIT

