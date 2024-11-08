# Quiz Builder System

A responsive drag-and-drop quiz builder system built with Remix, TypeScript, and Tailwind CSS. This system allows administrators to create interactive quizzes through a visual grid interface while providing an engaging experience for end users.

## 🎯 Architecture Overview

### Core Components

1. **Grid System**

   - Implemented using CSS Grid with custom snap points
   - Responsive 12-column layout that adapts to different screen sizes
   - Position tracking using relative coordinates (0-11 for x, 0-n for y)

2. **State Management**

   - Client-side state managed through React's useState and useReducer
   - Server state handled via Remix loaders and actions
   - Optimistic UI updates for drag-and-drop operations

3. **Component Registry**
   - Centralized registry of available quiz components
   - Each component is a self-contained module with:
     - Component definition
     - Schema validation
     - Default configuration
     - Rendering logic for both admin and user views

### Data Flow

```
Admin Flow:
Drag → Position Calculate → Snap → Optimize UI → Save Action → DB

User Flow:
Route Load → Loader → Quiz Data → Render → Interact → Submit Action
```

## 🔨 Technical Implementation

### 1. Grid Implementation

```typescript
// Grid coordinates are normalized to a 12-column system
type GridPosition = {
  x: 0-11;  // Horizontal position
  y: number;  // Vertical position
  width: 1-12;  // Component width in columns
  height: number;  // Component height in rows
};
```

### 2. Component Architecture

- **Base Components**: Progress Bar, Timer, Question Text, Image, Options
- **HOC Pattern**: Each component is wrapped with drag-drop capabilities in admin mode
- **Responsive Design**: Components adapt to grid cell sizes using CSS Grid and Flexbox

### 3. Data Structure

```typescript
interface QuizQuestion {
  id: string;
  components: {
    id: string;
    type: ComponentType;
    position: GridPosition;
    config: ComponentConfig;
  }[];
  metadata: {
    correctAnswer: string;
    points: number;
    timeLimit?: number;
  };
}
```

## 🚀 Performance Optimizations

1. **Lazy Loading**

   - Components in the sidebar are loaded on-demand
   - Images use progressive loading with blur placeholders

2. **Drag Performance**

   - DOM updates batched during drag operations
   - Position calculations debounced
   - Virtual DOM reconciliation optimized for grid updates

3. **Network Efficiency**
   - Quiz state mutations use optimistic UI
   - Backend saves debounced and batched
   - Asset preloading for common components

## 🔒 Security Considerations

1. **Input Validation**

   - All component configurations validated server-side
   - Position bounds checked before saving
   - File uploads sanitized and size-limited

2. **Authorization**
   - Role-based access control for admin/user views
   - Session-based authentication
   - Rate limiting on quiz submissions

## ♿ Accessibility Features

1. **Keyboard Navigation**

   - Full keyboard support for drag-drop operations
   - Focus management system for components
   - ARIA labels and roles for interactive elements

2. **Screen Reader Support**

   - Semantic HTML structure
   - Live regions for dynamic content
   - Clear component descriptions

3. **Visual Considerations**
   - High contrast mode support
   - Configurable animation speeds
   - Responsive font sizing

## 🔄 State Management

### Remix Actions

```typescript
// Example action for saving quiz state
export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const quizState = JSON.parse(formData.get('state'));

  // Validation
  const validatedState = validateQuizState(quizState);

  // Optimistic UI handling
  await saveQuizState(validatedState);

  return json({ success: true });
};
```

### Loaders

```typescript
// Example loader for quiz data
export const loader: LoaderFunction = async ({ params }) => {
  const { quizId } = params;
  const quiz = await getQuiz(quizId);

  return json({
    quiz,
    components: await getQuizComponents(quiz.id),
  });
};
```

## 📱 Responsive Design Strategy

1. **Breakpoint System**

   - Mobile: < 640px (single column grid)
   - Tablet: 640px - 1024px (8 column grid)
   - Desktop: > 1024px (12 column grid)

2. **Mobile Considerations**
   - Sidebar converts to bottom drawer
   - Touch-optimized drag handles
   - Simplified component layouts

## 🔍 Testing Strategy

1. **Unit Tests**

   - Component rendering
   - State management
   - Validation logic

2. **Integration Tests**

   - Drag-drop operations
   - Quiz flow
   - Save/load operations

3. **E2E Tests**
   - Complete quiz creation flow
   - User quiz-taking experience
   - Responsive behavior

## 🚦 Error Handling

1. **Client-Side**

   - Graceful degradation for drag-drop
   - Retry mechanisms for saves
   - Clear error messaging

2. **Server-Side**
   - Validation errors
   - Database constraints
   - Rate limiting

## Future Enhancements

1. **Extended Content Types**

   - Support for lesson plans
   - Interactive forms
   - Surveys and assessments

2. **Advanced Features**

   - Component templates
   - Undo/redo system
   - Collaborative editing

3. **Performance**
   - Worker-based calculations
   - Advanced caching strategies
   - Real-time collaboration

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Run development server: `npm run dev`

## Contributing

Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## License

MIT
