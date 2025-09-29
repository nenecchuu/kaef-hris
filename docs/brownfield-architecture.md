# KAEF HRIS Brownfield Architecture Document

## Introduction

This document captures the CURRENT STATE of the KAEF HRIS codebase (originally "Luminakra Sample App"), including technical debt, workarounds, and real-world patterns. It serves as a reference for AI agents working on HRIS enhancements for Kimia Farma.

### Document Scope

Comprehensive documentation of entire system to support HRIS development

### Change Log

| Date       | Version | Description                 | Author    |
| ---------- | ------- | --------------------------- | --------- |
| 2025-09-29 | 1.0     | Initial brownfield analysis | BMad Core |

## Quick Reference - Key Files and Entry Points

### Critical Files for Understanding the System

- **Main Entry**: `resources/root.tsx` (React SPA entry point)
- **Laravel Entry**: `public/index.php` (Laravel backend entry)
- **Configuration**: `config/app.php`, `.env.example`
- **Core Business Logic**: `app/Http/Controllers/`, `app/Services/`
- **API Definitions**: `routes/api.php` (REST API routes)
- **Database Models**: `app/Models/` (Eloquent models)
- **Frontend Components**: `resources/app/` (React/TypeScript modules)
- **Migrations**: `database/migrations/` (Database schema)

### Key Algorithms and Complex Logic

- **Authentication**: `app/Http/Controllers/AuthenticationController.php` - Multi-factor auth with Google2FA
- **User Management**: `app/Http/Controllers/UserController.php` - RBAC system
- **Audit Trail**: `app/Http/Controllers/AuditTrailController.php` - Activity logging
- **Password Management**: `app/Services/PasswordService.php` - Complex password rules

## High Level Architecture

### Technical Summary

**Architecture Pattern**: Laravel API + React SPA (Single Page Application)
**Authentication**: Laravel Passport (OAuth2) + Sanctum for SPA
**Authorization**: Role-Based Access Control (RBAC) with custom middleware
**Database**: PostgreSQL with Eloquent ORM
**Frontend State**: TanStack Query for server state management

### Actual Tech Stack (from package.json/composer.json)

| Category        | Technology           | Version | Notes                                    |
| --------------- | -------------------- | ------- | ---------------------------------------- |
| Backend Runtime | PHP                  | ^8.0.2  | Laravel framework base                   |
| Framework       | Laravel              | ^9.19   | With Vite for frontend build            |
| Frontend        | React                | ^18.3.1 | With TypeScript                          |
| Build Tool      | Vite                 | ^5.4.8  | Laravel Vite plugin integration          |
| Database        | PostgreSQL           | Default | Configurable via .env                    |
| Authentication  | Laravel Passport     | ^12.3   | OAuth2 + custom MFA implementation      |
| Session Auth    | Laravel Sanctum      | ^2.14.1 | SPA authentication                       |
| State Mgmt      | TanStack Query       | ^5.59.8 | Server state + React Query Devtools     |
| UI Components   | Radix UI             | Various | Accessible component library             |
| Styling         | TailwindCSS          | ^3.4.13 | Utility-first CSS                        |
| Router          | React Router         | ^6.27.0 | Client-side routing                      |
| Validation      | Zod                  | ^3.23.8 | TypeScript-first schema validation       |
| Date Handling   | date-fns             | ^2.29.3 | Date utilities                           |
| Code Quality    | ESLint + Prettier    | Latest  | TypeScript ESLint config                 |
| PDF Generation  | Laravel DomPDF       | ^3.0    | Server-side PDF export                   |
| Excel Export    | Maatwebsite Excel    | ^3.1    | Excel file handling                      |
| QR/Barcode      | Milon Barcode        | ^11.0   | For MFA and document generation          |
| Testing         | PHPUnit              | ^9.5.10 | Backend testing framework                |

### Repository Structure Reality Check

- **Type**: Monorepo (Laravel + React in single repository)
- **Package Manager**: npm (frontend) + Composer (backend)
- **Build System**: Vite with Laravel plugin
- **Notable**: React app directly embedded in Laravel resources, not separate repos

## Source Tree and Module Organization

### Project Structure (Actual)

```text
kaef-hris/
├── app/
│   ├── Console/Commands/     # Custom Artisan commands
│   ├── Http/Controllers/     # API controllers (REST endpoints)
│   ├── Http/Requests/        # Form request validation
│   ├── Http/Resources/       # API response transformers
│   ├── Models/               # Eloquent models (11 core models)
│   ├── Services/             # Business logic services
│   ├── Repositories/         # Data access layer
│   ├── Helpers/              # Utility functions
│   └── Notifications/        # Email/notification templates
├── resources/
│   ├── app/                  # React application modules
│   │   ├── auth/             # Authentication pages & components
│   │   ├── user/             # User management modules
│   │   ├── audit-trail/      # Activity logging UI
│   │   ├── password-complexity/ # Password policy management
│   │   └── home/             # Dashboard/landing pages
│   ├── root.tsx              # React application entry point
│   ├── index.blade.php       # Main SPA template
│   └── css/app.css           # TailwindCSS entry
├── database/
│   └── migrations/           # Database schema (15 migration files)
├── routes/
│   ├── api.php              # REST API routes (primary)
│   └── web.php              # SPA fallback routes + OAuth
├── config/                  # Laravel configuration
├── tests/                   # PHPUnit test suites
└── docker/                  # Docker setup for development
```

### Key Modules and Their Purpose

- **User Management**: `app/Http/Controllers/UserController.php` - CRUD, RBAC, team lead hierarchy
- **Authentication**: `app/Http/Controllers/AuthenticationController.php` - Login, MFA, password reset
- **Audit Trail**: `app/Http/Controllers/AuditTrailController.php` - Activity logging and export
- **Organization**: `app/Models/Division.php`, `app/Models/JobPosition.php` - Org structure
- **Password Policy**: `app/Http/Controllers/SettingPasswordComplexityController.php` - Password rules
- **API Resources**: `app/Http/Resources/` - Consistent API response formatting
- **Frontend Modules**: `resources/app/` - Feature-based React module organization

## Data Models and APIs

### Data Models

Core entities with relationships:

- **User Model**: See `app/Models/User.php` - Central entity with team hierarchy, roles, MFA
- **Division Model**: See `app/Models/Division.php` - Organizational divisions
- **JobPosition Model**: See `app/Models/JobPosition.php` - Job positions/titles
- **Role/Permission Models**: See `app/Models/Role.php`, `app/Models/Permission.php` - RBAC system
- **AuditTrail Model**: See `app/Models/AuditTrail.php` - Activity logging
- **MasterApplication Model**: See `app/Models/MasterApplication.php` - Application access control

### API Specifications

- **REST API**: `routes/api.php` - All API endpoints with auth middleware
- **Authentication Endpoints**: `/api/sign-in`, `/api/forgot-password`, `/api/verify-mfa`
- **User Management**: `/api/users/*` - CRUD operations with filtering
- **Audit Trail**: `/api/audit-trails` with export functionality
- **Options**: `/api/options/*` - Dropdown data for forms
- **Documentation**: Available at `/docs` (Scribe-generated)

### Key Database Schema Features

- **Soft Deletes**: Users, audit trails maintain history
- **Team Hierarchy**: Users can have team leads and division heads
- **RBAC**: Many-to-many relationships for roles and permissions
- **MFA Support**: Built-in 2FA fields in users table
- **Audit Trail**: Comprehensive activity logging
- **Password History**: Password reuse prevention

## Technical Debt and Known Issues

### Critical Technical Debt

1. **Mixed Authentication**: Uses both Passport (OAuth) and Sanctum (SPA) - could be simplified
2. **Frontend Module Organization**: Inconsistent patterns between different modules
3. **Password Service**: Complex password rules implementation could be refactored
4. **API Versioning**: No versioning strategy in place (`/api/v1` in .env but not implemented)

### Workarounds and Gotchas

- **Database Port**: .env.example shows port 1433 (SQL Server) but connection is PostgreSQL - mismatch
- **Session Domain**: Cross-domain session sharing configured but may not be needed
- **Attendance Config**: Attendance working hours in .env but no attendance module found yet
- **MFA Implementation**: Custom Google2FA integration, not Laravel's built-in 2FA

### Areas Needing Attention for HRIS

- **Employee Data**: Current User model has basic fields but needs HRIS-specific fields
- **Payroll Integration**: No payroll models or controllers exist yet
- **Leave Management**: No leave/vacation tracking implementation
- **Performance Reviews**: No performance management system
- **Recruitment**: No hiring/recruitment workflow

## Integration Points and External Dependencies

### External Services

| Service        | Purpose            | Integration Type | Key Files                              |
| -------------- | ------------------ | ---------------- | -------------------------------------- |
| Google2FA      | Multi-factor auth  | Package          | `AuthenticationController.php`         |
| DomPDF         | PDF generation     | Package          | Available for reports                  |
| Maatwebsite    | Excel export       | Package          | `AuditTrailController.php` uses it     |
| Barcode        | QR/barcode gen     | Package          | Available for MFA QR codes             |

### Internal Integration Points

- **API-SPA Communication**: REST API with JSON responses, Sanctum tokens
- **React Router Integration**: Client-side routing with Laravel fallback routes
- **Build Integration**: Vite builds React app, Laravel serves it
- **Database**: Eloquent ORM with PostgreSQL
- **File Storage**: Configurable (public disk by default, S3 ready)

## Development and Deployment

### Local Development Setup

1. **Backend Setup**:
   ```bash
   composer install
   php artisan key:generate
   php artisan passport:keys
   ```

2. **Frontend Setup**:
   ```bash
   npm install
   npm run dev  # Runs Vite + TypeScript compiler concurrently
   ```

3. **Database Setup**: Configure PostgreSQL, run migrations
4. **Environment**: Copy `.env.example` to `.env` and configure

### Build and Deployment Process

- **Development**: `npm run dev` (Vite dev server + TypeScript watch)
- **Production Build**: `npm run build` (TypeScript compile + Vite build)
- **Docker Support**: `dockerfile` and `docker-compose.yml` available
- **Code Quality**: ESLint, Prettier, PHP Pint (Laravel's code formatter)

### Environment Configuration

- **Development**: Local PostgreSQL, Vite dev server
- **Production**: Docker containers with nginx, production .env template provided
- **Testing**: PHPUnit configured, but limited test coverage currently

## Testing Reality

### Current Test Coverage

- **Backend Tests**: PHPUnit configured in `phpunit.xml`
- **Frontend Tests**: No test setup found (missing Jest/Vitest)
- **Integration Tests**: Minimal coverage
- **E2E Tests**: None implemented
- **Manual Testing**: Primary QA method currently

### Running Tests

```bash
php artisan test        # Run PHPUnit tests
npm run lint           # ESLint check
npm run lint:fix       # Auto-fix ESLint issues
./vendor/bin/pint      # Format PHP code
```

## HRIS Enhancement Recommendations

### Immediate HRIS Development Priorities

1. **Employee Profile Enhancement**:
   - Add employment status, start date, salary fields to User model
   - Create Employee model extending User for HRIS-specific data

2. **Payroll Module**:
   - Create Payroll, PayrollItem, Salary models
   - Add payroll processing controllers and services

3. **Leave Management**:
   - Create LeaveType, LeaveRequest, LeaveBalance models
   - Implement leave approval workflow

4. **Attendance System**:
   - Create Attendance, Shift, TimeLog models
   - Build check-in/check-out functionality

5. **Performance Management**:
   - Create PerformanceReview, Goal, Evaluation models
   - Add review cycle management

### Integration Considerations

- **Leverage Existing RBAC**: Use current role/permission system for HRIS modules
- **Extend Audit Trail**: Use existing audit system for HRIS activities
- **Utilize Current UI Components**: Radix UI + TailwindCSS for consistency
- **Follow API Patterns**: Use existing request/resource patterns for new endpoints
- **Database Integration**: Extend current migration pattern for HRIS tables

## Appendix - Useful Commands and Scripts

### Frequently Used Commands

```bash
# Development
npm run dev              # Start development server
php artisan serve        # Start Laravel dev server
php artisan migrate      # Run database migrations

# Code Quality
npm run lint:fix         # Fix JavaScript linting issues
./vendor/bin/pint        # Format PHP code

# Database
php artisan migrate:fresh --seed  # Reset database with seeders
php artisan tinker                 # Laravel REPL

# API Documentation
php artisan scribe:generate        # Generate API documentation

# Production
npm run build            # Build for production
docker-compose up -d     # Start Docker containers
```

### Debugging and Troubleshooting

- **Logs**: Check `storage/logs/laravel.log` for application logs
- **API Documentation**: Visit `/docs` for Scribe-generated API docs
- **React DevTools**: TanStack Query DevTools included in development
- **Database**: Use `php artisan tinker` for database debugging
- **Vite Issues**: Check browser console for build errors

### Development Guidelines for HRIS Enhancement

1. **Follow Existing Patterns**: Use repository pattern, form requests, API resources
2. **Maintain Test Coverage**: Add tests for new HRIS functionality
3. **Update Documentation**: Keep API documentation current with Scribe
4. **Security First**: Use existing authentication/authorization patterns
5. **Database Design**: Follow Laravel migration conventions, use relationships properly
6. **Frontend Consistency**: Follow existing module structure in `resources/app/`
7. **API Design**: Maintain REST conventions established in existing controllers

This document provides the foundation for building the KAEF HRIS system on the existing Laravel/React infrastructure.