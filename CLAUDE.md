# English Learning Platform Development Guide

## Project Overview

### Objective

Create a free, high-quality English learning platform providing structured practice across Vocabulary, Grammar, Reading, and Writing skills for all proficiency levels. The platform democratizes English learning through accessible, academic-quality content with interactive, self-paced exercises.

### Success Metrics

- Flawless UI design layout containing all the features fully functional.

## Target Audience

- English learners (Beginner, Intermediate, Advanced levels)
- Self-motivated learners seeking free resources
- Students and professionals improving specific skills

## Design System & UI/UX Guidelines

It's mandatory to follow this:

### Design Philosophy

- **Professional Minimalism**: Clean, sophisticated interface with purposeful whitespace. Ensure the entire website looks visually appealing and user-friendly
- **Educational Focus**: Distraction-free learning environment building trust
- **Accessibility First**: WCAG 2.1 AA compliance mandatory
- **Mobile-First**: Responsive design for all screen sizes. Optimized for desktop, tablet and mobile.
- **Styles**: Use Tailwind with Shadcn components.

### Component Design Principles

- **One Component per File**: Each UI component should live in its own file for clarity, reusability, and maintainability.
- **Use shadcn Components:**: Leverage shadcn/ui as the foundation. Install only what you need.
- **Encapsulation**: Keep styles, logic, and accessibility concerns within the component file whenever possible.
- **Consistency**: Follow the same folder and naming conventions across all components.
- **Extensibility**: Create small, composable components that can be combined to build complex UIs.

## Considerations

- Include as many additional elements that improve the overall design, only when it's necessary
- Use Context7 to check up-to-date docs when needed for implementing new libraries or frameworks or adding features using them.

## Plan to follow

1. First think through the problem, read the codebase for relevant files, and write a plan to tasks/todo.md. Follow this name to create the file: phaseNumber-currentDate-todo.md (P1_2025-05-08_todo.md)
2. The plan should have a list of todo items that you can check off as you complete them
3. Before you begin working, check in with me and I will verify the plan.
4. Always ask me if there's any clarifying questions before proceeding.
5. Then, begin working on the todo items, marking them as complete as you go.
6. Please every step of the way just give me a high level explanation of what changes you made
7. Make every task and code change you do as simple as possible. I want to avoid making any massive or complex changes. Every change should impact as little code as possible. Everything is about simplicity.
8. Finally, add a review section to the [todo.md](http://todo.md/) file with a summary of the changes you made and any other relevant information.

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
        2. Create cards for the following topics (Vocabulary, Grammar, Reading, Writing).Each card should include an icon representation (use Lucide library already installed), short description (1-2 sentences). Each card must have a button with the text "Learn"
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
