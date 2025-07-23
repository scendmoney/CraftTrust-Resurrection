# CraftTrust - Detailed Technical Stack Analysis

## Frontend Technology Deep Dive

### Core Framework & Runtime
- **Next.js 14.0.3**: React-based framework with server-side rendering, automatic code splitting, and optimized performance
- **React 18.2.0**: Component-based UI library with hooks, concurrent features, and modern development patterns
- **TypeScript 4.7.4**: Static type checking providing compile-time error detection and enhanced developer experience

### UI/UX Libraries
- **Material-UI (MUI) 5.14.11**: Comprehensive React component library implementing Google's Material Design
  - `@mui/material`: Core components (buttons, forms, navigation)
  - `@mui/icons-material`: 2000+ SVG icons following Material Design
  - `@mui/lab`: Experimental components and advanced features
  - `@mui/x-date-pickers`: Advanced date/time picker components
- **Emotion 11.11.0**: CSS-in-JS library for styled components with excellent performance
- **React Hook Form 7.47.0**: Performant forms with minimal re-renders and validation

### State Management & Data Fetching
- **Apollo Client 3.6.9**: Comprehensive GraphQL client with caching, error handling, and real-time subscriptions
- **GraphQL 16.5.0**: Query language and runtime for APIs providing efficient data fetching
- **Apollo Upload Client 17.0.0**: File upload support for GraphQL mutations

### Authentication & Security
- **Magic SDK 20.1.1**: Passwordless authentication using magic links and wallet integration
- **Magic Extensions**:
  - `@magic-ext/auth`: Extended authentication features
  - `@magic-ext/hedera`: Hedera blockchain integration for crypto transactions

### Blockchain & Crypto Integration
- **Hashgraph SDK 2.43.0**: Official Hedera Hashgraph SDK for distributed ledger interactions
- **QR Code Functionality**: `qrcode.react` and `@yudiel/react-qr-scanner` for crypto wallet interactions

### Development Tools & Quality
- **ESLint Configuration**: Custom rules with Next.js, React, and TypeScript presets
- **Prettier 2.7.1**: Code formatting with consistent style enforcement
- **Husky 8.0.1**: Git hooks for pre-commit quality checks

### Analytics & Monitoring
- **Sentry 7.105.0**: Error tracking, performance monitoring, and release health
- **Mixpanel**: User behavior analytics and funnel tracking
- **Customer.io**: Marketing automation and user journey analytics
- **Hotjar**: User session recording and heatmap analysis

### Communication & Notifications
- **Twilio Conversations 2.5.0**: Chat functionality and SMS communications
- **React Toastify 9.0.5**: Toast notifications with customizable styling

### Enhanced UI Components
- **React Avatar Editor 13.0.0**: Image cropping and editing for profile pictures
- **React Dropzone 14.2.2**: Drag and drop file upload interface
- **React Infinite Scroll**: Pagination with infinite scrolling for large datasets
- **React Zoom Pan Pinch**: Advanced image manipulation controls

## Backend Technology Deep Dive

### Core Framework
- **NestJS**: TypeScript-first Node.js framework with decorators, dependency injection, and modular architecture
- **Express**: Fast, unopinionated web framework for Node.js handling HTTP requests
- **TypeORM**: Object-relational mapping with active record pattern and migration support

### Database & Persistence
- **PostgreSQL**: Advanced open-source relational database with JSON support and full-text search
- **Database Migrations**: Version-controlled schema changes with rollback capability
- **Connection Pooling**: Optimized database connection management for scalability

### API Architecture
- **GraphQL**: Type-safe API with introspection, subscriptions, and efficient data fetching
- **Apollo Server Express**: GraphQL server with middleware support and schema stitching
- **Swagger/OpenAPI**: REST API documentation with interactive testing interface

### File Handling & Storage
- **GraphQL Upload**: File upload support with 1GB limit and multiple file handling
- **Static Asset Serving**: Express static file serving with optimized caching headers
- **EJS Template Engine**: Server-side rendering for emails and reports

### Security & Authentication
- **Cookie Parser**: Secure cookie handling with HTTP-only and same-site protection
- **CORS Configuration**: Cross-origin resource sharing with credential support
- **Input Validation**: Class-validator with custom validation decorators
- **SQL Injection Protection**: TypeORM parameterized queries and ORM protection

### Monitoring & Logging
- **Custom Logging Interceptor**: Structured logging with request/response tracking
- **Sentry Integration**: Error tracking with environment-specific configuration
- **Performance Monitoring**: Response time tracking and bottleneck identification

### Background Processing
- **Cron Jobs**: Scheduled tasks for data processing and maintenance
- **Queue System**: Asynchronous job processing for heavy operations
- **Event Subscribers**: Real-time event handling and notifications

## Database Architecture

### Entity Relationship Model
```sql
-- Core entities with complex relationships
Users (multi-role with inheritance)
├── Facilities (one-to-many)
├── Orders (many-to-many through order_products)
├── Surveys (one-to-many)
├── Transactions (one-to-many)
└── Assets (one-to-many for profile images, documents)

Products
├── Order_Products (junction table with quantities)
├── Surveys (product feedback)
├── Lab Results (embedded JSON)
└── Terpene Profiles (embedded arrays)

Facilities
├── Licenses (embedded compliance data)
├── Employees (many-to-many users)
├── Products (inventory management)
└── Facility_Relationships (self-referencing)
```

### Data Encryption & Security
- **Field-Level Encryption**: Sensitive data encrypted using AES-256
- **Wallet Address Protection**: Crypto addresses encrypted at rest
- **PII Anonymization**: Personal data handling with privacy controls
- **Audit Trails**: Comprehensive change tracking for compliance

## Integration Architecture

### External Service Dependencies
1. **Magic SDK**: Authentication and wallet management
2. **Hedera Hashgraph**: Blockchain transactions and smart contracts
3. **Twilio**: SMS verification and chat functionality
4. **Google Maps**: Facility location and verification
5. **Sentry**: Error monitoring and performance tracking
6. **Customer.io**: Marketing automation and user analytics
7. **Mixpanel**: Product analytics and user behavior tracking

### API Design Patterns
- **GraphQL Federation**: Modular schema composition
- **Subscription Support**: Real-time updates using WebSockets
- **Error Handling**: Standardized error responses with error codes
- **Rate Limiting**: API throttling to prevent abuse
- **Versioning Strategy**: Schema evolution without breaking changes

## Development & Deployment

### Environment Configuration
```javascript
// Environment-specific configurations
LOCAL: {
  GRAPHQL_URL: "https://backend.dev.crafttrust.com/graphql",
  BACKEND_URL: "https://backend.dev.crafttrust.com",
  SITE_URL: "http://localhost:3000"
}
DEV: {
  GRAPHQL_URL: "https://backend.dev.crafttrust.com/graphql", 
  SITE_URL: "https://frontend.dev.crafttrust.com"
}
PROD: {
  GRAPHQL_URL: "https://backend.crafttrust.com/graphql",
  SITE_URL: "https://crafttrust.com"
}
```

### Build & Deployment Pipeline
- **Docker Containerization**: Multi-stage builds for production optimization
- **Environment Variables**: Secure configuration management
- **Static Asset Optimization**: Automatic compression and caching
- **Database Migrations**: Automated schema updates during deployment

### Performance Optimization
- **Bundle Splitting**: Automatic code splitting by routes and components
- **Image Optimization**: Next.js automatic image compression and lazy loading
- **Caching Strategy**: Multi-layer caching (browser, CDN, application, database)
- **Database Indexing**: Optimized queries with compound indexes

This technical stack provides enterprise-grade reliability, security, and scalability for cannabis industry operations while maintaining compliance with regulatory requirements.