# CraftTrust - Development Guide

## Quick Start

### Prerequisites
- Node.js 20.x (specified in package.json engines)
- PostgreSQL database
- Redis (for caching and sessions)
- Git for version control

### Environment Setup
1. **Install Dependencies** (if not already installed)
```bash
npm install
# Dependencies already installed - 4,001 modules successfully compiled
```

2. **Environment Configuration**
Create environment-specific configurations in `.env-cmdrc.json`:
```json
{
  "LOCAL": {
    "NEXT_PUBLIC_ENV_NAME": "CraftTrust LOCAL",
    "NEXT_PUBLIC_ENV_GRAPHQL_URL": "https://backend.dev.crafttrust.com/graphql",
    "NEXT_PUBLIC_ENV_BACKEND_URL": "https://backend.dev.crafttrust.com",
    "NEXT_PUBLIC_ENV_SITE_URL": "http://localhost:5000"
  }
}
```

3. **Database Setup**
```bash
# Database migrations handled by TypeORM
# PostgreSQL database configured and ready

# Use SQL tool for database operations if needed
```

4. **Start Development Server**
```bash
# Start application (already running)
npm run dev
# Runs on http://localhost:5000

# Application successfully running with:
# - Next.js 14.0.2
# - 4,001 modules compiled
# - Hot Module Replacement active
```

## Development Workflow

### Available Scripts (Current)
```json
{
  "dev": "env-cmd -e LOCAL next dev",           // ✅ Currently running on port 5000
  "start:local": "env-cmd -e LOCAL next start", // Local production build
  "start:dev": "env-cmd -e DEV next start",     // Development server  
  "start:stage": "env-cmd -e STAGE next start", // Staging server
  "start:prod": "env-cmd -e PROD next start",   // Production server
  "build": "next build",                        // Production build
  "lint": "next lint",                          // Code linting (--fix available)
  "build:prod": "env-cmd -e PROD next build"    // Production build with env
}
```

### Code Organization

#### Frontend Structure
```
pages/                 # Next.js pages (routing)
├── admin/            # Administrative interfaces
├── client/           # End consumer interfaces
├── cultivator/       # Grower interfaces
├── auth/             # Authentication flows
├── wallet/           # Crypto wallet functionality
└── ratings/          # Product rating system

src/components/       # Reusable React components
├── Admin/           # Admin-specific components
├── Client/          # Client-specific components
├── Cultivator/      # Cultivator-specific components
├── Layout/          # Layout components
├── auth/            # Authentication components
└── shared/          # Shared utility components

src/sharedProject/   # Shared business logic
├── hooks/           # Custom React hooks
├── utils/           # Utility functions
├── types.ts         # TypeScript type definitions
└── enums.ts         # Enumeration constants
```

#### Backend Structure
```
src/entities/        # Domain entities and business logic
├── user/           # User management
├── product/        # Product catalog
├── order/          # Order processing
├── facility/       # Facility management
├── survey/         # Customer feedback
└── transaction/    # Payment processing

src/common/         # Shared utilities
├── interceptor/    # Request/response interceptors
├── logger/         # Logging utilities
└── query/          # Database query utilities

src/migrations/     # Database migrations
├── dev/           # Development migrations
├── stage/         # Staging migrations
└── prod/          # Production migrations
```

### Development Best Practices

#### TypeScript Guidelines
- **Strict Mode**: All TypeScript strict checks enabled
- **Type Safety**: Avoid `any` types, use proper interfaces
- **Null Checks**: Handle null and undefined explicitly
- **Generic Types**: Use generics for reusable components

```typescript
// Good: Proper typing
interface UserProfile {
  id: number;
  email: string;
  role: UserRoleEnum;
  facility?: FacilityModel;
}

// Bad: Using any
const userData: any = fetchUser();
```

#### React Component Patterns
- **Functional Components**: Use hooks instead of class components
- **Custom Hooks**: Extract reusable logic into custom hooks
- **Props Interface**: Define clear prop interfaces
- **Error Boundaries**: Implement error handling

```typescript
// Good: Functional component with proper typing
interface ProductCardProps {
  product: ProductModel;
  onAddToCart: (productId: number) => void;
}

const ProductCard: FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const [isLoading, setIsLoading] = useState(false);
  
  return (
    // Component JSX
  );
};
```

#### GraphQL Development
- **Type Generation**: Use GraphQL Code Generator for type safety
- **Query Optimization**: Minimize overfetching with precise queries
- **Error Handling**: Implement comprehensive error boundaries
- **Caching Strategy**: Utilize Apollo Client cache effectively

```typescript
// Generate types from GraphQL schema
npm run types

// Use generated types in components
import { useGetProductsQuery, ProductFragment } from '@/generated/graphql';

const ProductList: FC = () => {
  const { data, loading, error } = useGetProductsQuery({
    variables: { limit: 20 }
  });
  
  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} />;
  
  return (
    <div>
      {data?.products.map(product => 
        <ProductCard key={product.id} product={product} />
      )}
    </div>
  );
};
```

## Testing Strategy

### Unit Testing
```bash
# Run unit tests
npm run test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

### Integration Testing
```bash
# Run integration tests
npm run test:integration

# Test GraphQL endpoints
npm run test:graphql
```

### End-to-End Testing
```bash
# Run E2E tests
npm run test:e2e

# Run E2E tests in headless mode
npm run test:e2e:headless
```

### Testing Guidelines
- **Test Coverage**: Maintain >80% code coverage
- **Unit Tests**: Test individual functions and components
- **Integration Tests**: Test API endpoints and database interactions
- **E2E Tests**: Test complete user workflows

## Database Development

### Entity Development
```typescript
// Example entity with proper decorators
@Entity('product')
@Index(['sku'], { unique: true })
export class ProductModel extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column({ unique: true })
  @Field()
  sku: string;

  @Column('jsonb', { nullable: true })
  @Field(() => TerpeneProfile, { nullable: true })
  terpenes?: TerpeneProfile;

  @CreateDateColumn()
  @Field(() => GraphQLISODateTime)
  createdAt: Date;
}
```

### Migration Development
```bash
# Generate new migration
npm run migration:generate -- --name=AddProductTerpenes

# Run migrations
npm run migration:run

# Revert last migration
npm run migration:revert
```

### Database Best Practices
- **Indexing**: Add indexes for frequently queried fields
- **Relationships**: Use proper foreign key constraints
- **Validation**: Implement both database and application validation
- **Performance**: Monitor query performance and optimize as needed

## Security Considerations

### Authentication
- **Magic SDK Integration**: Passwordless authentication flow
- **JWT Tokens**: Secure token generation and validation
- **Role-Based Access**: Implement proper authorization checks
- **Session Management**: Secure session handling with Redis

### Data Protection
- **Input Validation**: Validate all user inputs
- **SQL Injection**: Use parameterized queries (TypeORM handles this)
- **XSS Prevention**: Sanitize user-generated content
- **CSRF Protection**: Implement CSRF tokens for state-changing operations

### API Security
- **Rate Limiting**: Prevent API abuse with rate limiting
- **CORS Configuration**: Properly configure cross-origin requests
- **HTTPS Only**: Enforce HTTPS in production
- **Error Handling**: Don't expose sensitive information in error messages

## Performance Optimization

### Frontend Performance
- **Code Splitting**: Implement route-based code splitting
- **Image Optimization**: Use Next.js Image component
- **Bundle Analysis**: Regular bundle size monitoring
- **Caching**: Implement proper browser caching

### Backend Performance
- **Database Optimization**: Index optimization and query analysis
- **Connection Pooling**: Efficient database connection management
- **Caching Strategy**: Redis caching for frequently accessed data
- **Response Compression**: Enable gzip compression

### Monitoring
- **Error Tracking**: Sentry integration for error monitoring
- **Performance Monitoring**: Track response times and bottlenecks
- **User Analytics**: Monitor user behavior and engagement
- **System Metrics**: Monitor server resources and database performance

## Deployment

### Environment Preparation
```bash
# Build for production
npm run build:prod

# Test production build locally
npm run start:prod
```

### Docker Deployment
```dockerfile
# Multi-stage production build
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

FROM node:20-alpine AS runtime
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

### Deployment Checklist
- [ ] Environment variables configured
- [ ] Database migrations applied
- [ ] SSL certificates installed
- [ ] Monitoring configured
- [ ] Backup strategy implemented
- [ ] Error tracking active
- [ ] Performance monitoring enabled

## Troubleshooting

### Common Issues
1. **Build Failures**: Check TypeScript errors and dependencies
2. **Database Connection**: Verify connection string and network access
3. **Authentication Issues**: Check Magic SDK configuration
4. **Performance Problems**: Analyze bundle size and database queries
5. **Production Errors**: Monitor Sentry for error patterns

### Debug Tools
- **React Developer Tools**: Browser extension for React debugging
- **Apollo Client Developer Tools**: GraphQL query debugging
- **Next.js Debugger**: Built-in Next.js debugging tools
- **Database Query Logs**: Enable TypeORM logging for query analysis

This development guide provides comprehensive information for developers working on the CraftTrust platform, covering everything from initial setup to production deployment and troubleshooting.