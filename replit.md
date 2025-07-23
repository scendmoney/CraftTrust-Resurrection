# CraftTrust - Project Documentation

## Project Overview
CraftTrust is an enterprise-grade cannabis industry platform providing comprehensive supply chain management, compliance tracking, and marketplace functionality. The platform serves cultivators, distributors, retailers, and end consumers through a sophisticated multi-role authentication system built on Next.js frontend with NestJS backend.

## Current Status
- ✅ Application successfully running on localhost:3000
- ✅ Next.js 14.0.3 development server active
- ✅ Fixed missing "dev" script in package.json
- ✅ Environment configuration working (LOCAL environment)
- ✅ Database connection established
- 🔄 LSP diagnostics showing some TypeScript issues in backend files

## Recent Changes
**2025-01-23**
- Fixed critical workflow issue by adding missing "dev" script to package.json
- Successfully resurrected the CraftTrust application from failed state
- Identified and documented comprehensive architecture spanning cannabis industry compliance
- Created detailed technical documentation covering full-stack implementation
- Application now running stable on Next.js with GraphQL integration

## Architecture Summary
**Frontend**: Next.js 14 + React 18 + TypeScript + Material-UI + Apollo Client
**Backend**: NestJS + TypeORM + PostgreSQL + GraphQL + Magic SDK
**Integration**: Hedera blockchain, Twilio, Sentry, Google Maps, Customer.io
**Security**: Role-based access control, field-level encryption, compliance tracking

## User Preferences
- Direct communication style with technical depth when requested
- Focus on comprehensive solutions over incremental updates
- Preference for complete architectural documentation
- Interest in cannabis industry domain expertise

## Key Features
- Multi-role user management (Admin, Cultivator, Buyer, Client, Employee)
- Seed-to-sale cannabis tracking and compliance
- Blockchain integration for transaction verification
- Real-time inventory and order management
- Comprehensive regulatory reporting
- Passwordless authentication with Magic SDK
- Advanced analytics and business intelligence

## Development Environment
- Node.js 20.x runtime
- TypeScript strict mode enabled
- Environment-specific configurations via env-cmd
- GraphQL API with type generation
- PostgreSQL database with TypeORM
- Docker containerization support

## External Dependencies
- Magic SDK for authentication and wallet functionality
- Hedera Hashgraph for blockchain transactions
- Twilio for SMS and communication features
- Google Maps for facility location services
- Sentry for monitoring and error tracking
- Customer.io for marketing automation

## Next Steps
- Address LSP TypeScript diagnostics in backend files
- Complete API key configuration for external services
- Validate all user role workflows are functioning
- Test compliance reporting and regulatory features
- Verify blockchain integration functionality