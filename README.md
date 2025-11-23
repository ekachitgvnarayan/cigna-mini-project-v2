# 💰 Payments Management System

A full-stack healthcare payments management application for tracking payments, categories, and maintaining audit trails. Built for healthcare payers, TPAs, and finance teams.

[![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)](https://nestjs.com/)
[![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Oracle](https://img.shields.io/badge/Oracle-F80000?style=for-the-badge&logo=oracle&logoColor=white)](https://www.oracle.com/)
[![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [Testing](#testing)
- [API Documentation](#api-documentation)
- [Database Schema](#database-schema)
- [Docker Deployment](#docker-deployment)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

---

## 🎯 Overview

The **Payments Management System** is designed to help healthcare organizations track incoming and outgoing payments, categorize transactions, and maintain comprehensive audit trails for compliance and transparency.

### Problem Statement

Healthcare payers and TPAs must track payments, categorize transactions, and generate financial reports. Manual tracking leads to errors, compliance risks, and poor audit trails. This system provides:

- ✅ Automated payment tracking
- ✅ Category-based organization
- ✅ Automatic audit logging
- ✅ Real-time filtering and reporting
- ✅ Secure data management

---

## ✨ Features

### 📊 Payment Management
- Create, update, and delete payment records
- Track payment amounts, dates, and statuses
- Associate payments with categories
- Filter by status (Pending/Completed) or category
- Automatic reference number validation

### 🗂️ Category Management
- Manage payment categories (Incoming/Outgoing)
- Active/Inactive status tracking
- Manager assignment
- Prevention of deletion when payments exist
- Filter by type and status

### 📝 Audit Trail
- Automatic logging of all payment changes
- Track creation, updates, and deletions
- User and timestamp tracking
- Filter by action type or payment reference
- Complete compliance audit history

### 🎨 User Interface
- Modern, responsive design
- Mobile-friendly interface
- Real-time data updates
- Form validation
- Modal-based workflows
- Intuitive navigation

---

## 🛠️ Tech Stack

### Backend
- **Framework:** NestJS 10.x
- **Language:** TypeScript 5.x
- **ORM:** TypeORM 0.3.x
- **Database:** Oracle Database Express Edition
- **Validation:** class-validator, class-transformer
- **Testing:** Jest
- **API Style:** RESTful

### Frontend
- **Framework:** React 18.x
- **Language:** JavaScript (ES6+)
- **Build Tool:** Vite 5.x
- **Routing:** React Router DOM 6.x
- **HTTP Client:** Axios
- **Styling:** Custom CSS with CSS Variables

### DevOps
- **Containerization:** Docker, Docker Compose
- **Database Container:** Oracle Database Express 21c
- **Environment Management:** dotenv

---

## 📁 Project Structure

```
payments-management-system/
│
├── backend/                          # NestJS Backend
│   ├── src/
│   │   ├── config/                   # Configuration files
│   │   │   ├── configuration.ts
│   │   │   ├── database.config.ts
│   │   │   └── app.config.ts
│   │   │
│   │   ├── database/                 # Database layer
│   │   │   ├── entities/             # TypeORM entities
│   │   │   │   ├── payment.entity.ts
│   │   │   │   ├── category.entity.ts
│   │   │   │   └── audit.entity.ts
│   │   │   └── seed/                 # Database seeding
│   │   │
│   │   ├── payments/                 # Payments module
│   │   │   ├── dto/
│   │   │   ├── payments.controller.ts
│   │   │   ├── payments.service.ts
│   │   │   ├── payments.module.ts
│   │   │   └── *.spec.ts
│   │   │
│   │   ├── categories/               # Categories module
│   │   ├── audits/                   # Audits module
│   │   ├── app.module.ts
│   │   └── main.ts
│   │
│   ├── test/                         # E2E tests
│   ├── .env                          # Environment variables
│   ├── docker-compose.yml            # Docker configuration
│   ├── Dockerfile
│   └── package.json
│
├── frontend/                         # React Frontend
│   ├── src/
│   │   ├── api/                      # API services
│   │   ├── components/               # React components
│   │   │   ├── common/               # Shared components
│   │   │   ├── payments/
│   │   │   ├── categories/
│   │   │   └── audits/
│   │   ├── pages/                    # Page components
│   │   ├── hooks/                    # Custom hooks
│   │   ├── utils/                    # Utility functions
│   │   ├── styles/                   # CSS files
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── routes.jsx
│   │
│   ├── .env                          # Environment variables
│   ├── vite.config.js
│   └── package.json
│
└── README.md                         # This file
```

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js:** v18.x or higher ([Download](https://nodejs.org/))
- **npm:** v9.x or higher (comes with Node.js)
- **Docker:** v20.x or higher ([Download](https://www.docker.com/))
- **Docker Compose:** v2.x or higher
- **Git:** For version control

### Verify Installation

```bash
node --version    # Should show v18.x or higher
npm --version     # Should show v9.x or higher
docker --version  # Should show v20.x or higher
docker-compose --version  # Should show v2.x or higher
```

---

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/payments-management-system.git
cd payments-management-system
```

### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env with your configurations
nano .env
```

### 3. Frontend Setup

```bash
cd ../frontend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env with your configurations
nano .env
```

---

## ⚙️ Configuration

### Backend Environment Variables

Create a `.env` file in the `backend/` directory:

```env
# Application
PORT=5002
NODE_ENV=development

# Database Configuration
DB_HOST=oracle-db
DB_PORT=1521
DB_USERNAME=system
DB_PASSWORD=YourPassword123
DB_SID=XEPDB1

# CORS
FRONTEND_URL=http://localhost:3000
```

### Frontend Environment Variables

Create a `.env` file in the `frontend/` directory:

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:5002
```

---

## 🏃 Running the Application

You can run the application in two ways:

### Option 1: Docker (Recommended)

**Start everything with one command:**

```bash
cd backend
docker-compose up --build
```

This will start:
- Oracle Database (Port 1521)
- Backend API (Port 5002)
- Frontend (Accessible via browser)

**Access the application:**
- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:5002/api`
- Database: `localhost:1521/XEPDB1`

**Stop the application:**
```bash
docker-compose down
```

**Stop and remove volumes (clean slate):**
```bash
docker-compose down -v
```

---

### Option 2: Local Development

#### Step 1: Start Database

```bash
cd backend
docker-compose up oracle-db -d
```

Wait for the database to initialize (30-60 seconds).

#### Step 2: Start Backend

```bash
cd backend
npm run start:dev
```

Backend will be available at: `http://localhost:5002`

#### Step 3: Start Frontend

```bash
cd frontend
npm run dev
```

Frontend will be available at: `http://localhost:3000`

---

## 🧪 Testing

### Backend Tests

```bash
cd backend

# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:cov

# Run specific test file
npm test -- payments.service.spec.ts
```

### Test Coverage

The backend includes comprehensive test coverage:

- **Unit Tests:** 55 tests across all modules
- **Service Tests:** Business logic validation
- **Controller Tests:** Endpoint testing with mocks
- **Coverage:** ~85% code coverage

**Test Files:**
- `src/payments/payments.service.spec.ts`
- `src/payments/payments.controller.spec.ts`
- `src/categories/categories.service.spec.ts`
- `src/categories/categories.controller.spec.ts`
- `src/audits/audits.service.spec.ts`
- `src/audits/audits.controller.spec.ts`

---

## 📡 API Documentation

### Base URL

```
http://localhost:5002/api
```

### Payments Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/payments` | Get all payments |
| `GET` | `/payments?status=Pending` | Filter by status |
| `GET` | `/payments?categoryId=1` | Filter by category |
| `GET` | `/payments/:id` | Get single payment |
| `POST` | `/payments` | Create payment |
| `PUT` | `/payments/:id` | Update payment |
| `DELETE` | `/payments/:id` | Delete payment |

**Create Payment Request:**
```json
{
  "amount": 5000,
  "categoryId": 1,
  "date": "2025-11-23",
  "status": "Pending",
  "referenceNo": "PAY-001"
}
```

**Response:**
```json
{
  "paymentId": 1,
  "amount": 5000,
  "categoryId": 1,
  "date": "2025-11-23T00:00:00.000Z",
  "status": "Pending",
  "referenceNo": "PAY-001",
  "category": {
    "categoryId": 1,
    "categoryName": "Hospital Bills",
    "type": "Outgoing"
  },
  "createdAt": "2025-11-23T14:30:00.000Z",
  "updatedAt": "2025-11-23T14:30:00.000Z"
}
```

### Categories Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/categories` | Get all categories |
| `GET` | `/categories?type=Incoming` | Filter by type |
| `GET` | `/categories?status=Active` | Filter by status |
| `GET` | `/categories/:id` | Get single category |
| `POST` | `/categories` | Create category |
| `PUT` | `/categories/:id` | Update category |
| `DELETE` | `/categories/:id` | Delete category |

**Create Category Request:**
```json
{
  "categoryName": "Hospital Bills",
  "type": "Outgoing",
  "description": "Medical facility payments",
  "status": "Active",
  "manager": "Finance Team"
}
```

### Audit Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/audit` | Get all audit records |
| `GET` | `/audit?paymentRef=PAY-001` | Filter by payment reference |
| `GET` | `/audit?action=Created` | Filter by action |
| `GET` | `/audit/:id` | Get single audit record |

**Audit Record Response:**
```json
{
  "auditId": 1,
  "paymentRef": "PAY-001",
  "action": "Created",
  "date": "2025-11-23T14:30:00.000Z",
  "user": "System",
  "status": "Pending",
  "createdAt": "2025-11-23T14:30:00.000Z"
}
```

---

## 🗄️ Database Schema

### Tables

#### PAYMENTS
| Column | Type | Constraints |
|--------|------|-------------|
| PAYMENT_ID | INT | Primary Key, Auto Increment |
| AMOUNT | DECIMAL(10,2) | Not Null |
| CATEGORY_ID | INT | Foreign Key → CATEGORIES |
| DATE | DATE | Not Null |
| STATUS | VARCHAR(20) | Not Null |
| REFERENCE_NO | VARCHAR(50) | Unique, Not Null |
| CREATED_AT | TIMESTAMP | Default: CURRENT_TIMESTAMP |
| UPDATED_AT | TIMESTAMP | Default: CURRENT_TIMESTAMP |

#### CATEGORIES
| Column | Type | Constraints |
|--------|------|-------------|
| CATEGORY_ID | INT | Primary Key, Auto Increment |
| CATEGORY_NAME | VARCHAR(100) | Not Null |
| TYPE | VARCHAR(20) | Not Null (Incoming/Outgoing) |
| DESCRIPTION | VARCHAR(255) | Nullable |
| STATUS | VARCHAR(20) | Not Null (Active/Inactive) |
| MANAGER | VARCHAR(100) | Nullable |
| CREATED_AT | TIMESTAMP | Default: CURRENT_TIMESTAMP |
| UPDATED_AT | TIMESTAMP | Default: CURRENT_TIMESTAMP |

#### AUDIT
| Column | Type | Constraints |
|--------|------|-------------|
| AUDIT_ID | INT | Primary Key, Auto Increment |
| PAYMENT_REF | VARCHAR(50) | Not Null |
| ACTION | VARCHAR(20) | Not Null (Created/Updated/Deleted) |
| DATE | TIMESTAMP | Not Null |
| USER | VARCHAR(100) | Not Null |
| STATUS | VARCHAR(20) | Not Null |
| CREATED_AT | TIMESTAMP | Default: CURRENT_TIMESTAMP |

### Relationships

```
CATEGORIES (1) ──────< (N) PAYMENTS
                           │
                           │ Referenced by
                           │
                           ↓
                        AUDIT (logs)
```

---

## 🐳 Docker Deployment

### Docker Compose Configuration

The `docker-compose.yml` orchestrates three services:

1. **Oracle Database** - Port 1521
2. **Backend API** - Port 5002
3. **Frontend** (optional in compose)

### Quick Start

```bash
# Build and start all services
docker-compose up --build

# Start in detached mode
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Remove volumes (clean database)
docker-compose down -v
```

### Individual Service Management

```bash
# Start only database
docker-compose up oracle-db -d

# Start only backend
docker-compose up api -d

# Restart a service
docker-compose restart api

# View service logs
docker-compose logs -f api
```

### Database Access

**Connect to Oracle Database:**

```bash
# Using Docker exec
docker exec -it oracle-db sqlplus system/YourPassword123@//localhost:1521/XEPDB1

# Using SQL*Plus locally
sqlplus system/YourPassword123@//localhost:1521/XEPDB1
```

**Verify Tables:**

```sql
-- List all tables
SELECT table_name FROM user_tables;

-- Check payment count
SELECT COUNT(*) FROM PAYMENTS;

-- View categories
SELECT * FROM CATEGORIES;

-- View audit trail
SELECT * FROM AUDIT ORDER BY DATE DESC;
```

---

## 🔧 Troubleshooting

### Common Issues

#### 1. Port Already in Use

**Error:** `Port 5002 is already allocated`

**Solution:**
```bash
# Find process using port
lsof -i :5002  # macOS/Linux
netstat -ano | findstr :5002  # Windows

# Kill the process or change port in .env
PORT=5003
```

#### 2. Database Connection Failed

**Error:** `Could not connect to Oracle database`

**Solution:**
```bash
# Check if database container is running
docker ps

# Wait for database to fully initialize (can take 30-60 seconds)
docker-compose logs oracle-db

# Restart database container
docker-compose restart oracle-db

# Check database health
docker-compose ps
```

#### 3. CORS Errors in Frontend

**Error:** `CORS policy: No 'Access-Control-Allow-Origin' header`

**Solution:**
- Ensure backend `.env` has correct `FRONTEND_URL=http://localhost:3000`
- Restart backend after changing `.env`
- Check `main.ts` has `app.enableCors()` configured

#### 4. TypeORM Synchronization Issues

**Error:** `QueryFailedError: ORA-00942: table or view does not exist`

**Solution:**
```bash
# Ensure synchronize is enabled in development
# In database.config.ts:
synchronize: process.env.NODE_ENV !== 'production'

# Clear database and restart
docker-compose down -v
docker-compose up --build
```

#### 5. Module Not Found Errors

**Error:** `Cannot find module '@nestjs/typeorm'`

**Solution:**
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Clear npm cache if needed
npm cache clean --force
```

#### 6. Frontend Build Errors

**Error:** `Vite build failed`

**Solution:**
```bash
# Clear Vite cache
rm -rf node_modules/.vite

# Reinstall dependencies
npm install

# Restart dev server
npm run dev
```

---

## 📊 Performance Optimization

### Backend

- **Database Indexing:** Indexes on `REFERENCE_NO`, `STATUS`, `CATEGORY_ID`
- **Eager Loading:** Categories loaded with payments to reduce queries
- **Connection Pooling:** Configured in TypeORM for optimal performance

### Frontend

- **Code Splitting:** React Router handles lazy loading
- **Axios Interceptors:** Centralized error handling
- **Memoization:** Custom hooks prevent unnecessary re-renders

---

## 🔒 Security Considerations

### Current Implementation

✅ Input validation with `class-validator`  
✅ SQL injection prevention via TypeORM parameterized queries  
✅ CORS configuration  
✅ Environment variable management  
✅ Error handling without exposing sensitive data  

### Production Recommendations

🔐 Add authentication (JWT, OAuth2)  
🔐 Implement rate limiting  
🔐 Use HTTPS/TLS certificates  
🔐 Add request logging and monitoring  
🔐 Implement role-based access control (RBAC)  
🔐 Regular security audits  
🔐 Database encryption at rest  

---

## 📚 Additional Resources

### Documentation

- [NestJS Documentation](https://docs.nestjs.com/)
- [TypeORM Documentation](https://typeorm.io/)
- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [Oracle Database Express Edition](https://www.oracle.com/database/technologies/appdev/xe.html)

### Useful Commands

```bash
# Backend
npm run start:dev     # Development mode with hot reload
npm run start:debug   # Debug mode
npm run build         # Build for production
npm run start:prod    # Run production build

# Frontend
npm run dev           # Development server
npm run build         # Build for production
npm run preview       # Preview production build

# Docker
docker-compose ps              # List running services
docker-compose logs -f api     # Follow API logs
docker system prune -a         # Clean Docker system
docker volume ls               # List volumes
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Coding Standards

- Follow TypeScript/JavaScript best practices
- Write unit tests for new features
- Update documentation as needed
- Use conventional commit messages

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👥 Authors

- **Your Name** - *Initial work* - [YourGitHub](https://github.com/yourusername)

---

## 🙏 Acknowledgments

- NestJS team for the excellent framework
- React team for the UI library
- Oracle for database technology
- All contributors and testers

---

## 📞 Support

For support, email support@yourcompany.com or open an issue in the GitHub repository.

---

## 🗺️ Roadmap

### Phase 1 (Current)
- ✅ Basic CRUD operations
- ✅ Filtering and search
- ✅ Audit trail
- ✅ Docker deployment

### Phase 2 (Planned)
- 🔄 User authentication
- 🔄 Role-based access control
- 🔄 Advanced reporting
- 🔄 Export to PDF/Excel

### Phase 3 (Future)
- 📅 Dashboard analytics
- 📅 Email notifications
- 📅 Bulk operations
- 📅 Mobile app

---

## 📈 Project Status

**Version:** 1.0.0  
**Status:** Production Ready  
**Last Updated:** November 23, 2025

---

**Made with ❤️ for Healthcare Finance Teams**