# JAIXO STUDIO — Full-Stack Architecture (React + Java Spring Boot + MySQL)

Enterprise full-stack creative design studio platform combining a high-performance **React + TypeScript + Vite** frontend with a robust, layered **Java 21 + Spring Boot 3 + Spring Data JPA + Spring Security + MySQL** backend.

---

## Architecture Overview

```
JAIXO STUDIO using JAVA/
├── backend/                               # Spring Boot 3 + Java 21 REST API
│   ├── pom.xml                            # Maven dependencies & plugins
│   ├── mvnw / mvnw.cmd                    # Self-contained Maven Wrapper
│   ├── uploads/                           # High-res uploaded images storage
│   └── src/main/
│       ├── java/com/jaixostudio/backend/
│       │   ├── JaixoStudioBackendApplication.java
│       │   ├── config/                    # CORS, MVC & Database Initializer
│       │   ├── security/                  # JWT Token & Spring Security Filter Chain
│       │   ├── entity/                    # JPA Entities (MySQL persistence)
│       │   ├── repository/                # Spring Data JPA Repositories
│       │   ├── service/                   # Business Logic Layer
│       │   ├── controller/                # REST API Endpoints
│       │   ├── dto/                       # Request & Response Data Transfer Objects
│       │   └── exception/                 # Centralized Global Exception Handler
│       └── resources/
│           ├── application.properties     # MySQL DB & Server configuration
│           └── data/                      # Initial verified catalog seed data
│
├── src/                                   # Preserved React 19 + TypeScript Frontend
│   ├── components/                        # Navbar, Footer, Modals & Icons
│   ├── context/StudioDataContext.tsx      # Dual-mode Context (Backend sync + Offline fallback)
│   ├── services/api.ts                    # Strongly-typed REST client
│   ├── pages/                             # Home, Services, Portfolio, Pricing, About, Contact, Admin
│   ├── data/                              # Static client fallback datasets
│   └── types/                             # TypeScript interfaces & types
│
├── public/                                # Static images, portfolio assets, favicons
├── vite.config.ts                         # Vite config with proxy to Spring Boot (port 8082)
└── package.json                           # Frontend scripts & dependencies
```

---

## Technology Stack

- **Frontend**: React 19, TypeScript, Vite 8, Tailwind CSS, Lucide Icons
- **Backend**: Java 21 (Eclipse Adoptium OpenJDK), Spring Boot 3.3.4, Spring Web, Spring Data JPA, Spring Security 6, JJWT 0.12.6, Maven 3.9.6
- **Database**: MySQL 8.0 Community Server (Database: `jaixo_studio`)
- **Authentication**: Stateless JSON Web Token (JWT) + BCrypt password hashing

---

## Major Java Classes and Responsibilities

### 1. Security & Authentication (`com.jaixostudio.backend.security`)
- **`JwtTokenProvider`**: Generates HMAC-SHA256 signed JWT tokens upon admin login, validates token signatures, and extracts the authenticated username.
- **`JwtAuthenticationFilter`**: Intercepts all incoming HTTP requests (`OncePerRequestFilter`), extracts the `Authorization: Bearer <token>` header, validates the signature, and establishes the Spring Security `SecurityContextHolder`.
- **`CustomUserDetailsService`**: Implements Spring Security's `UserDetailsService` to verify administrator credentials against the MySQL database.
- **`SecurityConfig`**: Defines CORS rules, disables CSRF for stateless REST, permits public read access to portfolios/services/pricing/contact submission, and enforces `ROLE_ADMIN` protection for mutations.

### 2. Entities (`com.jaixostudio.backend.entity`)
- **`Project`**: JPA entity mapping to `projects` table; persists 55+ showcase design artworks, deliverables, categories, display order, and image paths.
- **`ServiceEntity`**: Maps to `services` table; models creative service offerings, starting rates, turnaround times, and packages.
- **`PricingCategory`**: Maps to `pricing_categories` table; stores structured pricing tiers and addons.
- **`SiteConfigEntity`**: Maps to `site_config` table; stores studio identity, headline, phone, email, and social media links.
- **`ContactEnquiry`**: Maps to `contact_enquiries` table; stores client project inquiries, budgets, and review status.
- **`AdminUser`**: Maps to `admin_users` table; stores hashed administrator credentials.

### 3. Services (`com.jaixostudio.backend.service`)
- **`AuthService`**: Handles login requests, supports both studio passcode (`jaixo2026`) and admin credentials, and issues signed JWT tokens.
- **`ProjectService`**: Handles portfolio CRUD, category filtering, search queries, homepage featured toggling, and reordering (`moveProject`).
- **`ServiceAndPricingService`**: Manages service pricing updates and granular tier price modifications.
- **`ContactEnquiryService`**: Manages customer project inquiry submissions and administrative review status.
- **`SiteConfigService`**: Manages global branding and contact information.
- **`FileStorageService`**: Validates uploaded image MIME types (JPG, PNG, WEBP, SVG) and saves assets to disk with unique identifiers.

### 4. Controllers (`com.jaixostudio.backend.controller`)
- **`AuthController`** (`/api/auth`): Login and token validation endpoints.
- **`ProjectController`** (`/api/projects`): Public GET and protected POST/PUT/DELETE/reorder endpoints for portfolio works.
- **`ServicePricingController`** (`/api/services`, `/api/pricing`): Public catalog retrieval and protected price update endpoints.
- **`ContactEnquiryController`** (`/api/enquiries`): Public enquiry submission and protected admin inquiry management.
- **`SiteConfigController`** (`/api/config`): Studio metadata and branding configuration.
- **`FileUploadController`** (`/api/uploads`): Multipart image upload endpoint.

### 5. Config & Exception Handling
- **`DataInitializer`**: Seeds the admin user (`admin` / `jaixo2026`), 55 genuine showcase designs, services, and pricing on first boot if MySQL tables are empty.
- **`WebMvcConfig`**: Serves uploaded images from `./uploads` via HTTP path `/uploads/**`.
- **`GlobalExceptionHandler`**: Intercepts validation errors, missing resources, and authorization failures, returning unified `ApiResponse` JSON objects.

---

## REST API Reference

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `POST` | `/api/auth/login` | Public | Admin login (returns JWT token) |
| `GET` | `/api/auth/verify` | Admin | Validates JWT token |
| `GET` | `/api/projects` | Public | List all portfolio projects (supports filter/search) |
| `POST` | `/api/projects` | Admin | Create a new project |
| `PUT` | `/api/projects/{id}` | Admin | Update project details |
| `DELETE` | `/api/projects/{id}` | Admin | Delete a project |
| `POST` | `/api/projects/{id}/move` | Admin | Reorder project up/down |
| `POST` | `/api/projects/{id}/toggle-featured` | Admin | Toggle homepage featured badge |
| `GET` | `/api/services` | Public | Get creative services catalog |
| `PUT` | `/api/services/{id}/price` | Admin | Update service starting price |
| `GET` | `/api/pricing` | Public | Get structured pricing tiers |
| `PUT` | `/api/pricing/package-price` | Admin | Update tier price |
| `GET` | `/api/config` | Public | Get studio branding and contact metadata |
| `PUT` | `/api/config` | Admin | Update studio configuration |
| `POST` | `/api/enquiries` | Public | Submit client project inquiry |
| `GET` | `/api/enquiries` | Admin | List all submitted client inquiries |
| `PUT` | `/api/enquiries/{id}/status` | Admin | Update inquiry status (New / In Review / Responded) |
| `DELETE` | `/api/enquiries/{id}` | Admin | Delete an inquiry |
| `POST` | `/api/uploads` | Admin | Upload image file (returns URL `/uploads/...`) |

---

## Setup and Execution Instructions

### Prerequisites
1. **Java 21 JDK**: Installed and verified (`java -version`).
2. **MySQL Server 8.0**: Running locally on port `3306`.
3. **Node.js (v18+)**: Installed (`node -v`).

### 1. Database Configuration
Verify your MySQL credentials in `backend/src/main/resources/application.properties`:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/jaixo_studio?createDatabaseIfNotExist=true&useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC&characterEncoding=UTF-8
spring.datasource.username=root
spring.datasource.password=jai.ias.1
server.port=8082
```

### 2. Running the Java Spring Boot Backend
Open a terminal in the project directory:
```powershell
cd backend
.\mvnw.cmd spring-boot:run
```
*(On Linux/macOS use `./mvnw spring-boot:run`)*

The backend will:
1. Automatically create the `jaixo_studio` database if it doesn't exist.
2. Initialize Hibernate schema tables.
3. Auto-seed the default administrator (`admin` / `jaixo2026`) and 55 genuine portfolio artworks.
4. Start Tomcat on port `8082`.

### 3. Running the React Frontend
Open a second terminal in the project root:
```powershell
npm run dev
```

Visit the website at: **`http://localhost:5175/`** (or configured Vite port).

### 4. Admin Portal Access
- Open the Admin Portal by clicking the Lock icon in the navbar or the console link in the footer.
- Enter passcode: **`jaixo2026`** (or username `admin` and password `jaixo2026`).
- The portal will authenticate against Spring Boot, save the JWT token, and display the live indicator:
  `Java Spring Boot & MySQL Connected (Port 8082)`.

### 5. Independent Development Mode
The frontend is built to be resilient:
- If the backend is running, the frontend automatically syncs all updates directly with MySQL.
- If the backend is stopped or offline, the frontend falls back smoothly to local storage and static defaults, allowing full UI styling, prototyping, and layout development without any errors or blocking dependencies.
