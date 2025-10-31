# Vue 3 Bar Chart Plugin - GitHub Package Update Guide

This guide explains how to maintain and update the `@elcoruco/vue3-bars-chart-plugin` package on GitHub Packages and npm.

## Prerequisites

Before you can publish updates, ensure you have:

1. **GitHub Account**: Access to the repository
2. **npm Account**: Linked to your GitHub account
3. **Local Development Environment**: Node.js and npm installed
4. **Repository Access**: Push permissions to the GitHub repository

## Initial Setup (One-time)

### 1. Configure npm for GitHub Packages

Create or update your `.npmrc` file in your home directory:

```bash
# For publishing to GitHub Packages
@elcoruco:registry=https://npm.pkg.github.com

# For authentication (use your GitHub personal access token)
//npm.pkg.github.com/:_authToken=YOUR_GITHUB_TOKEN
```

### 2. Generate GitHub Personal Access Token

1. Go to GitHub Settings → Developer settings → Personal access tokens
2. Click "Generate new token (classic)"
3. Select scopes:
   - `write:packages` (to publish packages)
   - `read:packages` (to download packages)
   - `delete:packages` (optional, to delete packages)
4. Copy the token and add it to your `.npmrc` file

### 3. Configure package.json for GitHub Packages

Ensure your `package.json` includes the correct registry:

```json
{
  "name": "@elcoruco/vue3-bars-chart-plugin",
  "publishConfig": {
    "registry": "https://npm.pkg.github.com"
  }
}
```

## Development Workflow

### 1. Clone and Setup

```bash
# Clone the repository
git clone https://github.com/elcoruco/barchart-vue3-plugin.git
cd barchart-vue3-plugin

# Install dependencies
npm install
```

### 2. Make Changes

Edit the source files in the `src/` directory:
- `src/BarchartPlugin.js` - Main plugin file
- `src/BarchartView.vue` - Vue component

### 3. Build the Plugin

```bash
# Build the distribution files
npm run build
```

This uses Rollup to create the built files in the `dist/` directory.

### 4. Test Locally (Optional)

To test your changes locally before publishing:

```bash
# Link the package locally
npm link

# In a test project
cd /path/to/test-project
npm link @elcoruco/vue3-bars-chart-plugin
```

## Publishing Updates

### 1. Version Management

Update the version in `package.json` following [Semantic Versioning](https://semver.org/):

```bash
# For patch releases (bug fixes)
npm version patch

# For minor releases (new features, backward compatible)
npm version minor

# For major releases (breaking changes)
npm version major
```

This automatically:
- Updates `package.json` version
- Creates a git commit
- Creates a git tag

### 2. Update Documentation

Before publishing, ensure documentation is up to date:

- Update `README.md` with any new features or changes
- Update `USAGE.md` if there are API changes
- Update changelog (if you maintain one)

### 3. Build and Publish

```bash
# Build the distribution files
npm run build

# Publish to GitHub Packages
npm publish

# Also publish to npm registry (optional)
npm publish --registry https://registry.npmjs.org/
```

### 4. Push Changes to GitHub

```bash
# Push commits and tags
git push origin main
git push --tags
```

## GitHub Actions (Automated Publishing)

Create `.github/workflows/publish.yml` for automated publishing:

```yaml
name: Publish Package

on:
  push:
    tags:
      - 'v*'

jobs:
  publish:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      packages: write
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          registry-url: 'https://npm.pkg.github.com'
          scope: '@elcoruco'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build package
        run: npm run build
      
      - name: Publish to GitHub Packages
        run: npm publish
        env:
          NODE_AUTH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

## Release Process

### 1. Complete Release Checklist

- [ ] All changes tested locally
- [ ] Documentation updated
- [ ] Version bumped appropriately
- [ ] Build successful
- [ ] No linting errors

### 2. Create Release on GitHub

1. Go to your repository on GitHub
2. Click "Releases" → "Create a new release"
3. Choose the tag created by `npm version`
4. Add release notes describing changes
5. Publish the release

### 3. Verify Publication

Check that the package was published:

```bash
# Check GitHub Packages
npm view @elcoruco/vue3-bars-chart-plugin --registry https://npm.pkg.github.com

# Check npm registry (if publishing there too)
npm view @elcoruco/vue3-bars-chart-plugin
```

## Managing Versions

### Current Package Information

```json
{
  "name": "@elcoruco/vue3-bars-chart-plugin",
  "version": "1.2.2",
  "main": "./dist/BarchartPlugin.js"
}
```

### Version History Best Practices

1. **Keep a CHANGELOG.md**:
```markdown
# Changelog

## [1.2.3] - 2024-01-15
### Added
- New tooltip customization options

### Fixed
- Axis label positioning issues

## [1.2.2] - 2024-01-10
### Fixed
- Build configuration improvements
```

2. **Use Conventional Commits**:
```bash
git commit -m "feat: add custom tooltip function support"
git commit -m "fix: resolve axis scaling issue"
git commit -m "docs: update usage examples"
```

## Troubleshooting

### Common Issues

1. **Authentication Failed**:
   - Verify your GitHub token has correct permissions
   - Check `.npmrc` configuration
   - Ensure token is not expired

2. **Package Not Found**:
   - Verify package name and scope in `package.json`
   - Check registry URL is correct
   - Ensure you have access to the repository

3. **Build Errors**:
   - Run `npm install` to update dependencies
   - Check Rollup configuration in `rollup.config.js`
   - Verify all imports are correct

4. **Version Conflicts**:
   - Use `npm version` to properly bump versions
   - Don't manually edit version in `package.json`
   - Ensure tags are pushed to GitHub

### Useful Commands

```bash
# Check current package info
npm view @elcoruco/vue3-bars-chart-plugin

# Check what will be published
npm pack --dry-run

# List all versions
npm view @elcoruco/vue3-bars-chart-plugin versions --json

# Unpublish a version (within 72 hours)
npm unpublish @elcoruco/vue3-bars-chart-plugin@1.2.3
```

## Security Considerations

1. **Never commit tokens**: Keep `.npmrc` with tokens out of version control
2. **Use scoped packages**: Reduces risk of typosquatting
3. **Regular dependency updates**: Keep D3.js and Vue dependencies updated
4. **Code review**: Review all changes before publishing

## Support and Maintenance

- **Issues**: Track bugs and feature requests in GitHub Issues
- **Discussions**: Use GitHub Discussions for questions
- **Security**: Report security issues privately
- **Contributing**: Maintain clear contribution guidelines

## Resources

- [npm Documentation](https://docs.npmjs.com/)
- [GitHub Packages Documentation](https://docs.github.com/en/packages)
- [Semantic Versioning](https://semver.org/)
- [Conventional Commits](https://www.conventionalcommits.org/)