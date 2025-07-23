# CraftTrust - Full-Stack Architecture Overview

## Executive Summary

CraftTrust is an enterprise-grade cannabis industry platform that provides comprehensive supply chain management, compliance tracking, and marketplace functionality. The platform serves multiple stakeholders including cultivators, buyers, administrators, and end consumers through a sophisticated multi-role authentication system.

## Technology Stack

### Frontend Architecture
- **Framework**: Next.js 14.0.3 with React 18.2.0
- **Language**: TypeScript 4.7.4
- **Styling**: Material-UI (MUI) 5.14.11 + Emotion
- **State Management**: Apollo Client 3.6.9 with GraphQL
- **Authentication**: Magic SDK with wallet integration
- **Date Handling**: Date-fns with timezone support
- **Build Tool**: Next.js with custom webpack configuration

### Backend Architecture
- **Framework**: NestJS with Express
- **Language**: TypeScript with strict configuration
- **Database**: PostgreSQL with TypeORM
- **API**: GraphQL with Apollo Server Express
- **Authentication**: Magic SDK + JWT + Session management
- **File Handling**: GraphQL Upload with 1GB file limit
- **Documentation**: Swagger/OpenAPI integration

### Infrastructure & DevOps
- **Containerization**: Docker with multi-stage builds
- **Environment Management**: env-cmd with environment-specific configs
- **Monitoring**: Sentry error tracking and performance monitoring
- **Analytics**: Customer.io + Mixpanel integration
- **Maps**: Google Maps API integration
- **Communication**: Twilio for SMS and chat functionality

## Core Domain Models

### User Management
- **Multi-role system**: Admin, Cultivator, Buyer, Client, Employee
- **Authentication**: Magic SDK with wallet integration
- **Profile management**: Role-specific dashboards and permissions
- **Security**: Encrypted data storage with field-level encryption

### Product & Inventory
- **Product catalog**: Cannabis products with detailed specifications
- **Inventory tracking**: Real-time stock management
- **Lab testing**: Integration with testing results and compliance
- **Terpene profiles**: Detailed chemical composition tracking

### Order Management
- **Multi-party transactions**: Cultivator to buyer relationships
- **Order lifecycle**: From placement to fulfillment
- **Payment processing**: Integrated payment workflows
- **Compliance tracking**: Regulatory requirement management

### Facility Management
- **License tracking**: State license and compliance management
- **Facility relationships**: Multi-facility operations support
- **Employee management**: Role-based access within facilities
- **Geo-location**: GPS-based facility verification

## Application Architecture Layers

### Presentation Layer (Frontend)
```
pages/
├── admin/          # Administrative interfaces
├── client/         # End consumer interfaces  
├── cultivator/     # Grower/producer interfaces
├── auth/           # Authentication flows
├── wallet/         # Crypto wallet functionality
└── ratings/        # Product rating and survey system
```

### Business Logic Layer (Backend)
```
src/entities/
├── user/           # User management and authentication
├── product/        # Product catalog and inventory
├── order/          # Order processing and fulfillment
├── facility/       # Facility and license management
├── survey/         # Customer feedback and ratings
├── transaction/    # Payment and blockchain transactions
└── notification/   # Communication and alerts
```

### Data Access Layer
- **TypeORM**: Object-relational mapping with PostgreSQL
- **GraphQL Resolvers**: Type-safe API endpoints
- **Database Migrations**: Version-controlled schema changes
- **Embedded Documents**: Complex data structures within entities

### Integration Layer
- **Magic SDK**: Passwordless authentication and wallet management
- **Hedera**: Blockchain integration for transaction verification
- **Twilio**: SMS communications and chat functionality
- **Customer.io**: Marketing automation and user journey tracking
- **Sentry**: Error monitoring and performance tracking

## Security Architecture

### Authentication & Authorization
- **Magic Link Authentication**: Passwordless login system
- **Role-Based Access Control (RBAC)**: Granular permission system
- **JWT Tokens**: Stateless authentication for API access
- **Session Management**: Secure session handling with cookies

### Data Protection
- **Field-Level Encryption**: Sensitive data encrypted at rest
- **HTTPS/TLS**: All communications encrypted in transit
- **Input Validation**: Comprehensive validation using class-validator
- **SQL Injection Protection**: TypeORM parameterized queries

### Compliance Features
- **Audit Trails**: Comprehensive logging of all user actions
- **Data Retention**: Configurable data lifecycle management
- **Privacy Controls**: GDPR/CCPA compliance features
- **Regulatory Reporting**: Automated compliance report generation

## Performance & Scalability

### Frontend Optimization
- **Code Splitting**: Automatic route-based code splitting
- **Image Optimization**: Next.js automatic image optimization
- **Caching Strategy**: Apollo Client cache management
- **Bundle Analysis**: Webpack bundle optimization

### Backend Optimization
- **Connection Pooling**: PostgreSQL connection optimization
- **Query Optimization**: Database query performance monitoring
- **Caching Layer**: Redis integration for session and data caching
- **File Upload Handling**: Efficient large file processing

### Monitoring & Analytics
- **Real-time Monitoring**: Sentry performance tracking
- **User Analytics**: Mixpanel event tracking
- **Business Intelligence**: Custom analytics dashboards
- **Error Tracking**: Comprehensive error logging and alerting

## Development Workflow

### Environment Management
- **LOCAL**: Development environment with local database
- **DEV**: Development server with shared resources
- **STAGE**: Pre-production testing environment
- **PROD**: Production environment with full security

### Code Quality
- **TypeScript**: Strict type checking across the stack
- **ESLint**: Code quality and consistency enforcement
- **Prettier**: Automatic code formatting
- **Husky**: Pre-commit hooks for quality gates

### Testing Strategy
- **Unit Testing**: Component and service level testing
- **Integration Testing**: API endpoint testing
- **E2E Testing**: Full user journey testing
- **Performance Testing**: Load and stress testing protocols

This architecture provides a robust foundation for cannabis industry compliance while maintaining scalability and security at enterprise levels.