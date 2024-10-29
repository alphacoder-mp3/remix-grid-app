# Contributing to Quiz Builder

First off, thank you for considering contributing to Quiz Builder! It's people like you that make Quiz Builder such a great tool. This document provides guidelines and steps for contributing.

## 📝 Code of Conduct

By participating in this project, you agree to abide by our Code of Conduct. Please read [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) before proceeding.

## 🚀 Getting Started

1. **Fork the Repository**

   ```bash
   # Clone your fork
   git clone https://github.com/alphacoder-mp3/quiz-builder.git

   # Navigate to the directory
   cd quiz-builder

   # Add upstream remote
   git remote add upstream https://github.com/original/quiz-builder.git
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Create a Branch**
   ```bash
   # Format: feature/feature-name or fix/bug-name
   git checkout -b feature/new-component
   ```

## 💻 Development Guidelines

### TypeScript Standards

- Strict type checking is enabled
- No `any` types unless absolutely necessary
- Use interface over type when possible
- Document complex types

```typescript
// Good
interface ComponentProps {
  /** Position on the grid */
  position: GridPosition;
  /** Component-specific configuration */
  config: ComponentConfig;
}

// Avoid
type Props = any;
```

### Component Structure

```typescript
// components/QuizComponent/index.tsx
import styles from './styles.module.css';
import type { ComponentProps } from './types';

export const QuizComponent = ({ position, config }: ComponentProps) => {
  // Implementation
};

// Explicit export
export type { ComponentProps };
```

### CSS Guidelines

- Use Tailwind CSS utility classes
- Custom CSS modules for complex components
- Follow BEM naming convention for custom classes
- Maintain responsive design principles

```tsx
// Good
const Component = () => (
  <div className="grid grid-cols-12 gap-4 p-4">
    <div className="col-span-4 md:col-span-3">{/* Content */}</div>
  </div>
);

// Avoid inline styles
const BadComponent = () => (
  <div style={{ display: 'grid', gap: '1rem' }}>{/* Content */}</div>
);
```

### Testing Requirements

1. **Unit Tests (Jest + React Testing Library)**

   ```typescript
   describe('QuizComponent', () => {
     it('renders correctly with props', () => {
       render(<QuizComponent {...mockProps} />);
       expect(screen.getByRole('button')).toBeInTheDocument();
     });
   });
   ```

2. **Integration Tests**

   - Test component interactions
   - Verify state management
   - Check API interactions

3. **E2E Tests (Cypress)**
   - Cover critical user paths
   - Test responsive behavior
   - Verify accessibility

### Accessibility Standards

- All interactive elements must be keyboard accessible
- Proper ARIA attributes required
- Color contrast must meet WCAG 2.1 standards
- Screen reader friendly content structure

```typescript
// Good
const AccessibleButton = () => (
  <button
    aria-label="Submit quiz"
    onClick={handleSubmit}
    className="px-4 py-2 bg-blue-500 text-white rounded focus:ring-2"
  >
    Submit
  </button>
);
```

## 📝 Pull Request Process

1. **Update Documentation**

   - Add JSDoc comments for new functions
   - Update README if needed
   - Add to CHANGELOG.md

2. **Code Quality**

   - Run `npm run lint` and fix any issues
   - Ensure all tests pass
   - Meet coverage thresholds

3. **PR Template**

   ```markdown
   ## Description

   [Description of changes]

   ## Type of Change

   - [ ] Bug fix
   - [ ] New feature
   - [ ] Breaking change
   - [ ] Documentation update

   ## Testing

   - [ ] Unit tests added/updated
   - [ ] Integration tests added/updated
   - [ ] E2E tests added/updated

   ## Screenshots (if applicable)

   [Add screenshots]
   ```

4. **Review Process**
   - Two approvals required
   - All CI checks must pass
   - No merge conflicts

## 🐛 Bug Reports

1. **Use the Issue Template**

   ```markdown
   **Description:**
   [Clear description of the bug]

   **Steps to Reproduce:**

   1. [Step 1]
   2. [Step 2]
   3. [Step 3]

   **Expected Behavior:**
   [What should happen]

   **Actual Behavior:**
   [What actually happens]

   **Environment:**

   - Browser:
   - OS:
   - Device:
   ```

2. **Include Relevant Information**
   - Console errors
   - Screenshots
   - Steps to reproduce
   - Environment details

## 🎯 Feature Requests

1. **Use the Feature Request Template**

   ```markdown
   **Problem Statement:**
   [Describe the problem this feature solves]

   **Proposed Solution:**
   [Describe your solution]

   **Alternatives Considered:**
   [Other solutions you've considered]

   **Additional Context:**
   [Any other context or screenshots]
   ```

2. **Discussion Process**
   - Feature discussion in issues
   - Technical approach review
   - Implementation plan

## 📦 Release P
