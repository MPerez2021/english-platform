# English Learning Platform Development Guide

## Project Overview

### Objective

Create a free, high-quality English learning platform providing structured practice across Vocabulary, Grammar, Reading, and Writing skills for all proficiency levels. The platform democratizes English learning through accessible, academic-quality content with interactive, self-paced exercises.

### Success Metrics

- Flawless UI design layout containing all the features fully functional.

## 🎨 Design System & UI/UX Guidelines

### Design Philosophy (MANDATORY)

- **Professional Minimalism**: Clean, sophisticated interface with purposeful whitespace. Avoid visual noise overusing colors.
- **Educational Focus**: Distraction-free learning environment building trust
- **Accessibility First**: WCAG 2.1 AA compliance mandatory
- **Mobile-First**: Responsive design for all screen sizes
- **Styles**: Use Tailwind with Shadcn components only

### Component Design Principles

- **One Component per File**: Each UI component lives in its own file
- **shadcn/ui Foundation**: Leverage existing components, install only what's needed
- **Encapsulation**: Keep styles, logic, and accessibility within component files
- **Consistency**: Follow same folder and naming conventions
- **Extensibility**: Create small, composable components

### Design Decision Rules

- ✅ Add elements only when they improve UX/functionality
- ✅ Use Context7 MCP for up-to-date library documentation
- ❌ Never add decorative elements without purpose
- ❌ Never deviate from established design patterns

## 🛠️ Claude Code Development Guidelines

### 📋 Task Decision Matrix

#### When to Use TodoWrite Tool

- ✅ **Multi-step tasks (3+ steps)**: Complex features, multiple file changes, new components
- ✅ **Unclear scope**: When task complexity is unknown initially
- ✅ **User provides multiple requirements**: "Add navbar, hero section, and footer"
- ✅ **Cross-component changes**: Updates affecting layout, theme, or shared components

#### When to Skip TodoWrite Tool

- ❌ **Single file edits**: Fix typo, update single component prop, simple style change
- ❌ **Clear, simple tasks**: "Change button color to blue", "Add missing import"
- ❌ **Quick fixes**: Lint errors, missing semicolons, formatting issues

### 🔄 Core Development Workflow

#### 1. Analysis & Planning

```md
📖 Read Request → 🔍 Analyze Codebase → 🤔 Assess Complexity → 📝 Plan or Execute
```

**Decision Points:**

- **Simple task?** → Execute directly
- **Complex task?** → Create TodoWrite plan
- **Unclear scope?** → Ask clarifying questions

#### 2. Implementation Approach

- **One task in progress** at any time
- **Mark in_progress BEFORE starting** work
- **Complete immediately** after finishing (no batching)
- **Test changes** before marking complete

#### 3. Quality Verification

- **Run verification commands** after each component
- **Test responsive design** across breakpoints
- **Verify accessibility** requirements
- **Check dark/light theme** consistency

### 📝 Practical Examples

#### Example 1: Simple Task (No TodoWrite)

**User Request:** "Change the hero button color to blue"
**Action:** Direct Edit tool usage - single file change

#### Example 2: Complex Task (Use TodoWrite)

**User Request:** "Add a new features section with cards, icons, and animations"
**Action:** Create TodoWrite plan with subtasks:

1. Design feature section layout
2. Create feature card component
3. Add icons and animations
4. Implement responsive design
5. Test across breakpoints

#### Example 3: Multi-Component Task (Use TodoWrite)

**User Request:** "Update the entire navbar to support mobile menu"
**Action:** TodoWrite plan for:

1. Analyze current navbar structure
2. Create mobile menu component
3. Update navbar responsive behavior
4. Add menu toggle functionality
5. Test mobile experience

## MCP Tools

### Context7 MCP

**Primary Use**: Fetch up-to-date documentation and code examples for any library or framework.

**When to Use**:

- Implementing new libraries or frameworks
- Adding features using external dependencies
- Need current documentation and best practices
- Working with Next.js, Tailwind CSS, Shadcn/ui, Radix-UI, or any other library

**How to Use**:

1. First call `resolve-library-id` with the library name to get the Context7-compatible ID
2. Then call `get-library-docs` with the library ID to fetch documentation
3. Specify topics for focused documentation (e.g., 'hooks', 'routing', 'components')
4. Use higher token limits for comprehensive context

**Best Practices**:

- Always resolve library ID first unless user provides exact format
- Use specific topics to get relevant documentation
- Check documentation before implementing new features
- Prefer official library documentation over assumptions

### Playwright MCP

**Primary Use**: Visual testing and validation of frontend changes in real browsers.

**When to Use**:

- After making significant UI modifications
- Testing responsive design implementations
- Validating cross-browser compatibility
- Checking visual regressions
- Ensuring accessibility standards are met

**How to Use**:

- Run visual tests after completing UI components
- Test across different viewport sizes
- Validate dark/light theme implementations
- Check mobile responsiveness
- Test interactive elements and animations

**Best Practices**:

- Test immediately after major UI changes
- Include multiple viewport sizes in tests
- Document any visual differences found
- Re-test after fixes are applied

## ✅ Quality Standards & Verification

### 🔍 Mandatory Component Checklist

**Every component MUST pass this checklist before marking tasks complete:**

#### TypeScript Requirements

- [ ] **Props interface defined** with proper types and JSDoc comments
- [ ] **No `any` types** - all variables properly typed
- [ ] **Event handlers typed** - onClick, onChange, etc.
- [ ] **Ref types specified** - forwardRef implementations

#### Responsive Design Requirements

- [ ] **Mobile (320px-639px)** - Content readable, buttons accessible
- [ ] **Tablet (640px-1023px)** - Layout adapts properly
- [ ] **Desktop (1024px+)** - Optimal spacing and layout
- [ ] **Test in DevTools** - Verify all breakpoints manually

#### Accessibility Requirements

- [ ] **Semantic HTML** - Use proper heading hierarchy (h1, h2, h3)
- [ ] **ARIA labels** - screen reader friendly descriptions
- [ ] **Keyboard navigation** - Tab order logical, focus visible
- [ ] **Color contrast** - WCAG 2.1 AA compliant (4.5:1 minimum)
- [ ] **Alt text** - All images have descriptive alt attributes

#### Theme Support Requirements

- [ ] **Dark mode variables** - Use dark style withing global CSS
- [ ] **Light mode tested** - All elements visible and styled
- [ ] **Dark mode tested** - Consistent appearance across themes
- [ ] **Smooth transitions** - Theme switching animations (if any)

#### Error Handling & Edge Cases

- [ ] **Loading states** - Skeleton loaders or spinners where needed
- [ ] **Empty states** - Graceful handling of no data
- [ ] **Error boundaries** - Prevent crashes from component errors
- [ ] **Form validation** - Clear error messages for user inputs

### 🚀 Performance Requirements

- [ ] **Bundle size impact** - New components shouldn't significantly increase bundle
- [ ] **Image optimization** - Use Next.js Image component with proper sizing
- [ ] **Lazy loading** - Implement for below-the-fold content
- [ ] **No console errors** - Clean console in development and production

### Development Commands

#### Essential Commands

- **Development**: `npm run dev --turbopack`
- **Build**: `npm run build --turbopack`
- **Lint**: `npm run lint`
- **Type Check**: `tsc --noEmit` (add this script to package.json if missing)

#### Post-Implementation Verification

Always run these commands after completing tasks:

1. `npm run lint` - Code quality check
2. `npm run build` - Production build verification
3. `npm run dev` - Start development application
4. Type check validation
5. Manual testing across breakpoints

### Manual Testing Checklist

Test all components across official Tailwind CSS breakpoints:

- [ ] **Mobile** (below 640px): 375px, 414px, 360px
- [ ] **Small (sm)** (640px and above): Test navigation and layout
- [ ] **Medium (md)** (768px and above): Tablet view optimization
- [ ] **Large (lg)** (1024px and above): Desktop layout
- [ ] **Extra Large (xl)** (1280px and above): Large desktop
- [ ] **2X Large (2xl)** (1536px and above): Ultra-wide displays
- [ ] **Dark/light theme switching** - Smooth transitions, consistent colors
- [ ] **Keyboard navigation** - Tab order, focus states, accessibility (Tab, Enter, Space, Arrow keys)
- [ ] **Screen reader compatibility** - Proper ARIA labels and structure

## Technical Stack Requirements

### Frontend Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind (version 4.0) CSS + Shadcn/ui components + Lucid Icons
- **TypeScript**: Mandatory for type safety

### Backend & Database

- **Database**: Supabase (PostgreSQL)
- **API**: Supabase client + Next.js API routes
- **File Storage**: Supabase Storage for media assets
- **Authentication**: Supabase Auth (Future phase to implement)

### Performance Requirements

- Page load: <3 seconds on 3G connection
- Scalability: 1,000+ concurrent users
- Availability: 99.9% uptime target
- Mobile-first responsive design

## SOLID Principles Implementation

### Single Responsibility Principle (SRP)

- Each component handles one specific functionality
- Separate components for exercise types, progress tracking, user authentication
- Service classes dedicated to single operations (ExerciseService, UserProgressService)

### Open/Closed Principle (OCP)

- Exercise system extensible for new question types without modifying existing code
- Plugin architecture for different exercise formats
- Abstract base classes for exercise types allowing new implementations

### Liskov Substitution Principle (LSP)

- All exercise types implement common interface
- Question components interchangeable regardless of type
- Consistent behavior across all skill category implementations

### Interface Segregation Principle (ISP)

- Separate interfaces for different user roles (learner, admin)
- Specific interfaces for exercise types, progress tracking, content management
- Avoid forcing components to depend on unused methods

### Dependency Inversion Principle (DIP)

- High-level modules depend on abstractions, not concrete implementations
- Database layer abstracted through repository pattern
- Service layer interfaces allow for easy testing and switching implementations

## Recommended Folder Structure

```
src/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Route groups for authentication
│   │   ├── login/
│   │   └── register/
│   ├── exercises/
│   │   ├── [skill]/
│   │   │   └── [difficulty]/
│   │   │       └── [id]/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/                   # Reusable UI components
│   ├── ui/                      # Shadcn/ui base components
│   ├── exercises/               # Exercise-specific components
│   │   ├── common/              # Shared exercise components
│   │   ├── vocabulary/          # Vocabulary exercise components
│   │   ├── grammar/             # Grammar exercise components
│   │   ├── reading/             # Reading exercise components
│   │   └── writing/             # Writing exercise components
│   ├── layout/                  # Layout components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── Navigation.tsx
│   │   └── Sidebar.tsx
│   └── common/                  # Common components
│       ├── LoadingSpinner.tsx
│       ├── ErrorBoundary.tsx
│       └── ProgressIndicator.tsx
├── lib/                         # Utility libraries and configurations
│   ├── supabase/               # Database client and configurations
│   │   ├── client.ts
│   │   ├── server.ts
│   │   └── types.ts
│   ├── validations/            # Form validation schemas (Zod)
│   ├── constants/              # Application constants
│   ├── utils.ts                # Utility functions
│   └── types.ts                # Global TypeScript types
├── services/                   # Business logic layer
│   ├── exercises/              # Exercise-related services
│   │   ├── ExerciseService.ts
│   │   ├── QuestionService.ts
│   │   └── ProgressService.ts
│   ├── auth/                   # Authentication services
│   │   └── AuthService.ts
│   ├── content/                # Content management services
│   │   └── ContentService.ts
│   └── interfaces/             # Service interfaces
├── repositories/               # Data access layer
│   ├── ExerciseRepository.ts
│   ├── UserRepository.ts
│   ├── ProgressRepository.ts
│   └── interfaces/             # Repository interfaces
├── hooks/                      # Custom React hooks
│   ├── useExercise.ts
│   ├── useProgress.ts
│   ├── useAuth.ts
│   └── useLocalStorage.ts
├── context/                    # React Context providers
│   ├── AuthContext.tsx
│   ├── ExerciseContext.tsx
│   └── ThemeContext.tsx
├── styles/                     # Global styles and theme
│   └── globals.css
```

## Development Phases

### Phase 1: Core Learning Platform (MVP)

Only created the necessary folders for this stage.

**Features**:

1. Build the landing page
    1. Create a navbar with the name of the page, all sections mentioned below, a button to change appearance (light or dark mode). The logo and sections names must be placed on the left side and the dark-light button mode on the right.
    2. Create a Hero Section with this elements
        1. Title
        2. Subtitle
        3. CTA Button: "Start your Journey Today"
        4. Use a high-quality image or illustration placed alongside the text (not as background)
    3. Create Topics Covered Section with this elements
        1. Headline
        2. Create cards for the following topics (Vocabulary, Grammar, Reading, Writing).Each card should include an icon representation (use Lucide library already installed), short description (1-2 sentences). Each card must have a CTA with the text "Learn"
    4. Create How it Works Section. Include this elements
        1. Headline
        2. Horizontal cards showing the steps to get started. The path must include Choose Topic-> Choose Level -> Interactive Lessons -> Practice Exercises
    5. Create Benefits section. Include this elements
        1. Headline
        2. Create cards with icons and short explanations.

### Phase 2: Exercises core layout design

### Phase 3: Database implementation for exercises

### Phase 4: User Accounts & Progress Tracking

<!-- **Features**:

- User authentication system
- Persistent progress tracking
- Learning recommendations
- Discord community integration -->

### Phase 5: Premium Features & Monetization

<!-- **Features**:

- Advanced analytics and reports
- AI-driven personalized learning paths
- Expert feedback on writing exercises
- Priority access to new content -->

## Content Strategy

### Content Organization Matrix

| Skill | Beginner | Intermediate | Advanced |
|-------|----------|--------------|----------|
| **Vocabulary** | Basic words (500 most common) | Contextual usage | Academic/Professional terms |
| **Grammar** | Simple tenses, articles | Complex sentences | Advanced structures |
| **Reading** | Short paragraphs | Articles, stories | Academic texts |
| **Writing** | Sentence formation | Paragraphs | Essays, reports |

### Exercise Types Implementation

#### Vocabulary Exercises

- Multiple Choice (word meanings)
- Fill in the Blanks (context usage)
- Image Association (visual vocabulary)
- Sentence Creation (using new words)

#### Grammar Exercises

- Error Correction (identify and fix mistakes)
- Sentence Transformation (change tense/voice)
- Multiple Choice (rule application)
- Gap Filling (grammar in context)

#### Reading Exercises

- Comprehension Questions (understanding passages)
- True/False (detail verification)
- Summary Creation (main idea identification)
- Vocabulary in Context (word meaning from passage)

#### Writing Exercises

- Guided Writing (step-by-step prompts)
- Sentence Combining (building complex sentences)
- Paragraph Structure (organization exercises)
- Creative Prompts (open-ended writing tasks)

## 🚨 Troubleshooting & Common Issues

### 🔧 Development Environment Issues

#### Build Failures

**Problem:** `npm run build` fails with TypeScript errors
**Solutions:**

1. Run `npm run lint` first to catch syntax errors
2. Check for missing type definitions: `npm install @types/node @types/react`
3. Verify all imports have proper file extensions
4. Ensure all components export default properly

**Problem:** Tailwind styles not applying
**Solutions:**

1. Check documentation using Context7
2. Ensure class names are complete strings (not dynamic)

#### Component Issues

**Problem:** Component not updating on prop changes
**Solutions:**

1. Check if component is properly receiving props
2. Verify props are not being mutated directly
3. Use React DevTools to inspect prop flow
4. Ensure useEffect dependencies include all used props

**Problem:** Dark/Light theme not switching properly
**Solutions:**

1. Verify `next-themes` provider wraps entire app
2. Check CSS custom properties are defined for both themes
3. Use `theme` and `setTheme` from `useTheme` hook properly
4. Ensure theme-dependent classes use Tailwind's dark: prefix

### 🎨 Design System Issues

#### Responsive Design Problems

**Problem:** Layout breaks on mobile devices
**Solutions:**

1. Use `mobile-first` approach - define mobile styles first
2. Check for fixed widths that don't scale
3. Use Tailwind responsive prefixes correctly (`sm:`, `md:`, `lg:`, `xl:`)

**Problem:** Components don't match design system
**Solutions:**

1. Use only approved Shadcn components
2. Follow established spacing scale (Tailwind spacing)
3. Check color palette matches theme variables
4. Verify font sizes follow type scale

### ⚡ Performance Issues

#### Slow Loading Times

**Problem:** Page loads slowly
**Solutions:**

1. Implement lazy loading for below-fold content
2. Optimize images using Next.js Image component
3. Check bundle size with `npm run analyze`
4. Remove unused dependencies and imports

#### Memory Leaks

**Problem:** Performance degrades over time
**Solutions:**

1. Clean up useEffect subscriptions with return functions
2. Remove event listeners in component cleanup
3. Avoid creating new objects/functions in render
4. Use React.memo for expensive computations

### 🛠️ Quick Fixes Checklist

#### Before Asking for Help

- [ ] Clear browser cache and hard refresh
- [ ] Restart development server
- [ ] Check browser console for errors
- [ ] Verify all dependencies are installed
- [ ] Run linting and type check commands
- [ ] Test in different browsers
- [ ] Check responsive design at different breakpoints

#### Common Command Solutions

```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Run full project verification
npm run lint && npm run build

# Type check without building
tsc --noEmit
```

### When to Ask for Clarification

#### Always Ask When

- Requirements are ambiguous or conflicting
- Design specifications are unclear
- Technical approach has multiple valid options
- Scope of changes is larger than expected
- Dependencies or integrations are unclear

#### Example Clarification Questions

- "Should the mobile menu overlay the content or push it down?"
- "Which breakpoint should the sidebar collapse at?"
- "Do you want the animation to be subtle or prominent?"
- "Should this component be reusable across other pages?"

## Development Best Practices

### Code Quality Standards

- **TypeScript**: Strict mode enabled, comprehensive type definitions
- **ESLint/Prettier**: Enforced code formatting and quality rules
- **Component Architecture**: Reusable, composable UI components

### Performance Optimization

- **Code Splitting**: Route-based and component-based lazy loading
- **Image Optimization**: Next.js Image component with proper sizing
- **Bundle Analysis**: Regular bundle size monitoring and optimization
- **Caching Strategy**: Implement proper caching for static content and API responses
- **Database Optimization**: Query optimization and proper indexing

### Security Considerations

- **Input Validation**: Server-side validation for all user inputs
- **Authentication**: Secure authentication flow with proper session management
- **Data Sanitization**: Prevent XSS and injection attacks
- **HTTPS**: Enforce secure connections across the platform
- **Environment Variables**: Secure handling of sensitive configuration

### Database Best Practices

- **Normalized Structure**: Proper normalization to reduce redundancy
- **Indexing Strategy**: Indexes on frequently queried columns
- **Data Integrity**: Foreign key constraints and proper relationships
- **Migration System**: Version-controlled database schema changes
- **Backup Strategy**: Regular automated backups with point-in-time recovery

<!-- ## Deployment & DevOps

### Deployment Pipeline

- **Docker Containerization**: Consistent deployment environments
- **Netlify Integration**: Automated deployments from Git
- **Environment Management**: Separate staging and production environments
- **Database Migrations**: Automated schema updates during deployment
- **Health Monitoring**: Application performance and error tracking

### Monitoring & Analytics

- **Application Performance**: Real-time performance monitoring
- **User Analytics**: Google Analytics 4 for user behavior insights
- **Error Tracking**: Comprehensive error logging and alerting
- **Database Performance**: Query performance monitoring
- **Uptime Monitoring**: Service availability tracking

## Launch Strategy

### Pre-Launch Preparation

- **Beta Testing**: 50-100 early user feedback collection
- **Content Library**: Minimum viable content across all skill levels
- **Performance Testing**: Load testing and optimization
- **SEO Optimization**: Meta tags, sitemap, content optimization

### Post-Launch Activities

- **User Feedback Collection**: Regular surveys and feedback analysis
- **Content Expansion**: Data-driven content addition based on usage patterns
- **Community Building**: Discord server management and engagement
- **Continuous Optimization**: Performance improvements based on real user data -->

## Risk Mitigation

### Technical Risks

- **Database Performance**: Query optimization and caching implementation
- **Scalability**: Horizontal scaling preparation and load balancing
- **Mobile Experience**: Comprehensive mobile testing across devices
- **Content Management**: Scalable content creation and review processes

### Content Risks

- **Academic Accuracy**: Expert review process for educational content
- **Quality Consistency**: Standardized content creation guidelines
- **Copyright Compliance**: Original content creation and proper attribution

### Business Risks

- **User Acquisition**: SEO-focused content strategy and community building
- **Monetization Balance**: Careful premium feature selection maintaining free value
- **Competition Differentiation**: Focus on academic quality and accessibility
