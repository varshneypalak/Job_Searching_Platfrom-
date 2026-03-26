# Job.Com — Job Searching Platform

## Technical Documentation

---

## 1. Project Overview

### 1.1 Project Title

**Job.Com** — A Full-Stack Job Searching and Recruitment Platform

### 1.2 Objective and Problem Statement

The Indian job market lacks a unified, lightweight platform where job seekers can discover opportunities and employers can post vacancies and manage applications — all within a single interface. Existing platforms are either bloated with features irrelevant to entry-level hiring or lack role-based access control.

**Objective:** To design and develop a responsive, role-based web application that enables:
- Job Seekers to search, filter, and apply for jobs with resume uploads.
- Employers to post job listings, review applications, and manage their postings.

### 1.3 Key Features

| Feature | Description |
|---|---|
| Role-Based Authentication | Separate flows for Job Seekers and Employers using JWT |
| Job CRUD Operations | Employers can create, read, update, and delete job listings |
| Application System | Job Seekers submit applications with resume upload (Cloudinary) |
| Search and Filter | Real-time search by title/city/country with category filtering |
| Dark Mode | Persistent light/dark theme toggle using CSS custom properties |
| Loading States | Spinner indicators on all data-fetching pages |
| Empty States | Contextual messages when no data is available |
| Password Visibility Toggle | Eye icon to show/hide password on auth forms |
| Responsive Design | Mobile-first layout adapting to all screen sizes |
| SOLID Architecture | Backend follows Service-Controller-Validator separation |

### 1.4 Target Users

- **Job Seekers:** Individuals searching for employment across various IT categories.
- **Employers:** Companies or recruiters posting job openings and reviewing applicants.

---

## 2. Tech Stack

### 2.1 Frontend Technologies

| Technology | Version | Purpose |
|---|---|---|
| React | 18.3.1 | UI component library |
| Vite | 5.3.4 | Build tool and dev server |
| React Router DOM | 6.25.0 | Client-side routing |
| Axios | 1.7.2 | HTTP client for API calls |
| React Hot Toast | 2.4.1 | Toast notification system |
| React Icons | 4.12.0 | Icon library (FontAwesome, Feather, etc.) |

### 2.2 Backend Technologies

| Technology | Version | Purpose |
|---|---|---|
| Node.js | 22.x | JavaScript runtime |
| Express.js | 4.19.2 | Web framework |
| Mongoose | 8.5.1 | MongoDB ODM |
| JSON Web Token | 9.0.2 | Authentication tokens |
| Bcrypt | 5.1.1 | Password hashing |
| Cloudinary | 1.41.3 | Cloud-based file storage (resumes) |
| Express File Upload | 1.5.1 | Multipart file handling |
| Validator | 13.12.0 | Input validation (email format) |
| Cookie Parser | 1.4.6 | HTTP cookie parsing |
| CORS | 2.8.5 | Cross-Origin Resource Sharing |
| Dotenv | 16.4.5 | Environment variable management |

### 2.3 Database

| Technology | Purpose |
|---|---|
| MongoDB Atlas | Cloud-hosted NoSQL database |
| Mongoose ODM | Schema definition, validation, and query building |

### 2.4 Authentication and Security

- **JWT (JSON Web Tokens):** Stateless authentication stored in HTTP-only cookies.
- **Bcrypt:** Password hashing with salt rounds of 10.
- **HTTP-Only Cookies:** Prevents XSS attacks on token storage.
- **Role-Based Authorization:** Middleware restricts endpoints by user role.
- **Input Validation:** Server-side validators on all mutation endpoints.
- **CORS Policy:** Restricts API access to the configured frontend origin.

### 2.5 Deployment Tools/Services

| Service | Purpose |
|---|---|
| MongoDB Atlas | Database hosting (free M0 tier) |
| Cloudinary | Resume/image file hosting |
| Render.com | Backend deployment (recommended) |
| Vercel | Frontend deployment (recommended) |
| GitHub | Version control and CI/CD source |

---

## 3. System Architecture

### 3.1 High-Level Architecture

The application follows a **three-tier client-server architecture**:

```
┌─────────────────────────────────────────────────────────┐
│                      CLIENT TIER                        │
│  React SPA (Vite) ─ Components, Hooks, API Layer        │
│  Port: 5173                                             │
└──────────────────────┬──────────────────────────────────┘
                       │ HTTP (Axios, withCredentials)
                       │ REST API calls + JWT Cookie
                       ▼
┌─────────────────────────────────────────────────────────┐
│                    APPLICATION TIER                      │
│  Express.js Server                                      │
│  ┌─────────┐  ┌────────────┐  ┌──────────┐             │
│  │ Routes  │→ │ Validators │→ │Controllers│             │
│  └─────────┘  └────────────┘  └─────┬─────┘             │
│       ↑                             │                   │
│  ┌────┴─────┐                 ┌─────▼─────┐             │
│  │Middleware │                 │ Services  │             │
│  │(Auth,CORS│                 │(Business  │             │
│  │ Error)   │                 │  Logic)   │             │
│  └──────────┘                 └─────┬─────┘             │
│  Port: 4004                         │                   │
└─────────────────────────────────────┼───────────────────┘
                                      │
                       ┌──────────────┼──────────────┐
                       ▼                             ▼
              ┌─────────────────┐          ┌─────────────────┐
              │  MongoDB Atlas  │          │   Cloudinary     │
              │  (Data Store)   │          │  (File Storage)  │
              │  3 Collections: │          │  Resume uploads  │
              │  users, jobs,   │          │                  │
              │  applications   │          │                  │
              └─────────────────┘          └─────────────────┘
```

### 3.2 Client-Server Interaction

1. **Authentication Flow:** Client sends credentials → Server validates → Returns JWT in HTTP-only cookie → All subsequent requests include cookie automatically.
2. **Data Flow:** React hooks call the API service layer → Axios sends requests with credentials → Express routes through middleware chain (CORS → Auth → Authorize → Validate → Controller → Service → Database) → JSON response returned.
3. **File Upload Flow:** Client sends multipart form data → Express File Upload parses to temp file → Upload Service sends to Cloudinary → Cloudinary URL stored in MongoDB.

---

## 4. Folder Structure

### 4.1 Backend Structure

```
backend/
├── config/
│   └── config.env              # Environment variables (DB URL, JWT secret, etc.)
├── controllers/
│   ├── userController.js       # HTTP handlers for user endpoints
│   ├── jobController.js        # HTTP handlers for job endpoints
│   └── applicationController.js # HTTP handlers for application endpoints
├── database/
│   └── dbConnection.js         # MongoDB Atlas connection setup
├── middlewares/
│   ├── auth.js                 # JWT verification middleware
│   ├── authorize.js            # Role-based access control middleware
│   ├── catchAsyncError.js      # Async error wrapper (eliminates try-catch)
│   └── error.js                # Global error handler + ErrorHandler class
├── models/
│   ├── userSchema.js           # User schema with password hashing + JWT generation
│   ├── jobSchema.js            # Job listing schema
│   └── applicationSchema.js    # Job application schema with resume reference
├── routes/
│   ├── userRoutes.js           # /api/v1/user/* route definitions
│   ├── jobRoutes.js            # /api/v1/job/* route definitions
│   └── applicationRoutes.js    # /api/v1/application/* route definitions
├── services/
│   ├── userService.js          # User business logic (create, verify credentials)
│   ├── jobService.js           # Job CRUD business logic
│   ├── applicationService.js   # Application business logic
│   └── uploadService.js        # Cloudinary file upload abstraction
├── validators/
│   ├── userValidator.js        # Registration/login input validation
│   ├── jobValidator.js         # Job posting input validation
│   └── applicationValidator.js # Application submission validation
├── utils/
│   └── jwtToken.js             # JWT token generation + cookie setting utility
├── app.js                      # Express app configuration and middleware wiring
├── server.js                   # Server startup with Cloudinary config
└── package.json
```

### 4.2 Frontend Structure

```
frontend/src/
├── api/
│   └── index.js                # Centralized Axios HTTP client (all API calls)
├── components/
│   ├── Application/            # Application form + My Applications page
│   ├── Auth/                   # Login + Register pages
│   ├── Home/                   # Hero, HowItWorks, Categories, CTA Banner
│   ├── Job/                    # Jobs listing, Job Details, Post Job, My Jobs
│   ├── Layout/                 # Navbar + Footer (persistent layout)
│   └── NotFound/               # 404 page
├── constants/
│   └── index.js                # API base URL, job categories, static data
├── hooks/
│   ├── useAuth.js              # Authentication state + login/register/logout
│   ├── useJobs.js              # Job data fetching (all jobs, single job, my jobs)
│   ├── useApplications.js      # Application data fetching
│   └── useTheme.js             # Dark/light theme toggle with localStorage
├── styles/
│   └── global.css              # CSS custom properties (design tokens) + resets
├── ui/
│   ├── Button.jsx / .css       # Reusable Button (primary, secondary, danger, etc.)
│   ├── Input.jsx / .css        # Reusable Input with icon + password toggle
│   ├── Select.jsx / .css       # Reusable Select dropdown
│   ├── Card.jsx / .css         # Reusable Card container
│   ├── Modal.jsx / .css        # Reusable Modal overlay
│   ├── SectionTitle.jsx / .css # Reusable section heading with underline
│   └── index.js                # Barrel export for all UI components
├── App.jsx                     # Root component with routing
└── main.jsx                    # React entry point with Context Provider
```

---

## 5. Backend Details

### 5.1 API Structure

#### User Routes (`/api/v1/user`)

| Method | Endpoint | Middleware | Description |
|---|---|---|---|
| POST | `/register` | validateRegister | Create new user account |
| POST | `/login` | validateLogin | Authenticate and return JWT |
| GET | `/logout` | isAuthenticated | Clear JWT cookie |
| GET | `/getuser` | isAuthenticated | Get current user profile |

#### Job Routes (`/api/v1/job`)

| Method | Endpoint | Middleware | Description |
|---|---|---|---|
| GET | `/getall` | — | List all active (non-expired) jobs |
| POST | `/post` | isAuthenticated, authorize("Employer"), validatePostJob | Create new job listing |
| GET | `/getmyjobs` | isAuthenticated, authorize("Employer") | List employer's own jobs |
| PUT | `/update/:id` | isAuthenticated, authorize("Employer") | Update a job listing |
| DELETE | `/delete/:id` | isAuthenticated, authorize("Employer") | Delete a job listing |
| GET | `/:id` | isAuthenticated | Get single job details |

#### Application Routes (`/api/v1/application`)

| Method | Endpoint | Middleware | Description |
|---|---|---|---|
| POST | `/post` | isAuthenticated, authorize("Job Seeker"), validatePostApplication | Submit application with resume |
| GET | `/employer/getall` | isAuthenticated, authorize("Employer") | List applications received |
| GET | `/jobseeker/getall` | isAuthenticated, authorize("Job Seeker") | List applications submitted |
| DELETE | `/delete/:id` | isAuthenticated, authorize("Job Seeker") | Withdraw an application |

### 5.2 Middleware Chain

Each request passes through a layered middleware pipeline:

```
Request → CORS → Cookie Parser → Body Parser → File Upload Parser
        → Route Match → isAuthenticated → authorize(role) → validator → Controller
        → errorMiddleware (if error thrown at any stage)
```

- **isAuthenticated:** Extracts JWT from cookie, verifies signature, attaches `req.user`.
- **authorize(...roles):** Checks if `req.user.role` is in the allowed roles array. Follows the Open/Closed Principle — new roles are added by passing them as arguments, not by modifying the middleware.
- **catchAsyncErrors:** Wraps async controller functions to automatically forward errors to the error middleware, eliminating repetitive try-catch blocks.
- **errorMiddleware:** Centralizes error response formatting. Handles CastError, duplicate key (11000), JWT errors, and custom ErrorHandler instances.

### 5.3 Database Schema

#### User Collection

| Field | Type | Constraints |
|---|---|---|
| name | String | Required, 3–30 characters |
| email | String | Required, valid email (validator.js) |
| phone | Number | Required |
| password | String | Required, 8–32 characters, `select: false` |
| role | String | Required, enum: ["Job Seeker", "Employer"] |
| createdAt | Date | Default: Date.now |

**Pre-save Hook:** Hashes password with bcrypt (salt rounds: 10) before saving.
**Instance Methods:** `comparePassword(plain)` for login verification, `getJWTToken()` for token generation.

#### Job Collection

| Field | Type | Constraints |
|---|---|---|
| title | String | Required, 3–30 characters |
| description | String | Required, 30–700 characters |
| category | String | Required |
| country | String | Required |
| city | String | Required |
| location | String | Required, min 5 characters |
| fixedSalary | Number | Optional (mutually exclusive with range) |
| salaryFrom | Number | Optional |
| salaryTo | Number | Optional |
| expired | Boolean | Default: false |
| jobPostedOn | Date | Default: Date.now |
| postedBy | ObjectId | Required, references User |

#### Application Collection

| Field | Type | Constraints |
|---|---|---|
| name | String | Required, 3–30 characters |
| email | String | Required, valid email |
| coverLetter | String | Required |
| phone | Number | Required |
| address | String | Required |
| resume.public_id | String | Required (Cloudinary ID) |
| resume.url | String | Required (Cloudinary URL) |
| applicantID.user | ObjectId | Required, references User |
| applicantID.role | String | Enum: ["Job Seeker"] |
| employerID.user | ObjectId | Required, references User |
| employerID.role | String | Enum: ["Employer"] |

### 5.4 Service Layer (Business Logic)

The backend follows a **Controller → Service → Model** pattern:

- **Controllers** handle HTTP request/response only. No database queries or business logic.
- **Services** contain all business logic and database operations. This enables:
  - Unit testing services independently of HTTP layer.
  - Swapping data sources without modifying controllers.
- **uploadService.js** abstracts Cloudinary — can be replaced with AWS S3 by modifying only this file (Dependency Inversion Principle).

Key business logic in services:
- `userService.verifyCredentials()`: Returns specific error messages — "No account found" vs "Incorrect password" vs "Wrong role".
- `jobService.findAllActiveJobs()`: Filters by `expired: false`.
- `applicationService.createApplication()`: Orchestrates file upload → job lookup → application creation in a single transaction.

---

## 6. Frontend Details

### 6.1 Component Structure

The frontend follows an **Atomic Design** pattern:

- **Atoms (`ui/`):** Button, Input, Select, Card, Modal, SectionTitle — reusable, stateless, styled via props.
- **Organisms (`components/`):** Page-level components composed of atoms and business logic.
- **Pages:** Home, Jobs, JobDetails, PostJob, MyJobs, Application, MyApplications, Login, Register, NotFound.
- **Layout:** Navbar and Footer render persistently around all routes.

### 6.2 State Management

State is managed through **React Context API + Custom Hooks**:

| Hook | State | Purpose |
|---|---|---|
| Context (main.jsx) | isAuthorized, user | Global auth state shared across all components |
| useAuth | — | Wraps Context + provides login/register/logout actions |
| useJobs | jobs, loading | Fetches all active jobs on mount |
| useJobDetail(id) | job, loading, error | Fetches single job by ID |
| useMyJobs | myJobs, loading | Fetches employer's own jobs + CRUD helpers |
| useApplications(role) | applications, loading | Fetches applications based on user role |
| useTheme | theme | Manages dark/light mode with localStorage persistence |

### 6.3 API Integration

All HTTP calls are centralized in `api/index.js` using a pre-configured Axios instance:

```javascript
const http = axios.create({ baseURL: API_BASE, withCredentials: true });
```

- `withCredentials: true` ensures JWT cookies are sent with every request.
- Each entity (User, Job, Application) has dedicated exported functions.
- Custom hooks consume these API functions and manage loading/error states.

### 6.4 Routing

| Path | Component | Access |
|---|---|---|
| `/` | Home | Authenticated only |
| `/login` | Login | Public |
| `/register` | Register | Public |
| `/job/getall` | Jobs | Authenticated |
| `/job/:id` | JobDetails | Authenticated |
| `/job/post` | PostJob | Employer only |
| `/job/me` | MyJobs | Employer only |
| `/application/:id` | Application | Job Seeker only |
| `/applications/me` | MyApplications | Authenticated |
| `*` | NotFound | Public |

Route protection is handled at the component level using `<Navigate>` for redirects.

---

## 7. Authentication Flow

### 7.1 Registration Flow

```
1. User fills registration form (name, email, phone, password, role)
2. Frontend validates fields are non-empty
3. POST /api/v1/user/register
4. validateRegister middleware checks required fields
5. userService.createUser() checks for duplicate email
6. User model pre-save hook hashes password with bcrypt
7. User document created in MongoDB
8. sendToken() generates JWT, sets HTTP-only cookie (expires in 1 day)
9. Response: { success: true, user, message, token }
10. Frontend sets isAuthorized = true → redirects to Home
```

### 7.2 Login Flow

```
1. User enters email, password, role
2. POST /api/v1/user/login
3. validateLogin middleware checks required fields
4. userService.verifyCredentials():
   a. Finds user by email (with password field selected)
   b. If not found → "No account found with this email"
   c. Compares password with bcrypt → "Incorrect password"
   d. Checks role match → "This email is registered as X, not Y"
5. sendToken() generates JWT cookie
6. Frontend sets isAuthorized = true → redirects to Home
```

### 7.3 Session Persistence

```
1. On every page load, App.jsx useEffect calls GET /api/v1/user/getuser
2. isAuthenticated middleware reads JWT from cookie
3. Verifies token signature with JWT_SECRET_KEY
4. Finds user by decoded ID, attaches to req.user
5. Returns user object → Frontend sets isAuthorized = true
6. If cookie missing/expired → isAuthorized = false → redirect to Login
```

### 7.4 Logout Flow

```
1. GET /api/v1/user/logout
2. Server sets cookie "token" to empty string with immediate expiry
3. Frontend sets isAuthorized = false → redirects to Login
```

---

## 8. Key Features Implementation

### 8.1 Role-Based Access Control

The `authorize` middleware implements the Open/Closed Principle:

```javascript
export const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.user.role)) {
      return next(new ErrorHandler(`${req.user.role} is not allowed`, 403));
    }
    next();
  };
};
```

Usage in routes: `authorize("Employer")` or `authorize("Job Seeker")`. Adding a new role (e.g., "Admin") requires zero changes to the middleware — just pass it as an argument.

### 8.2 Resume Upload with Cloudinary

```
1. Job Seeker selects resume file (PNG/JPEG/WebP)
2. express-fileupload saves to /tmp/ as temp file
3. applicationValidator checks file exists and format is valid
4. applicationService calls uploadService.uploadFile(tempFilePath)
5. uploadService sends file to Cloudinary API
6. Cloudinary returns { public_id, secure_url }
7. URL stored in Application document's resume field
8. Employer views resume via Cloudinary URL in the browser
```

### 8.3 Search and Filter (Jobs Page)

Client-side filtering implemented in the Jobs component:

```javascript
const filtered = jobs.filter((job) => {
  const matchSearch = !search ||
    job.title?.toLowerCase().includes(search.toLowerCase()) ||
    job.country?.toLowerCase().includes(search.toLowerCase());
  const matchCategory = !category || job.category === category;
  return matchSearch && matchCategory;
});
```

- Search input filters by title, city, or country (case-insensitive).
- Category dropdown filters by exact match from predefined categories.
- Results count updates dynamically.

### 8.4 Dark Mode

Implemented using CSS Custom Properties and a `useTheme` hook:

1. `global.css` defines `:root` (light) and `[data-theme="dark"]` variable overrides.
2. `useTheme` hook reads/writes `localStorage("theme")` and sets `data-theme` attribute on `<html>`.
3. All component CSS files use `var(--surface)`, `var(--text-primary)`, etc.
4. Theme-invariant colors use `var(--always-white)` for text on dark backgrounds (navbar, buttons, hero).
5. Toggle button in Navbar (moon/sun icon) calls `toggleTheme()`.

### 8.5 Password Visibility Toggle

The Input component detects `type="password"` and renders an eye icon:

```javascript
const [showPassword, setShowPassword] = useState(false);
const isPassword = type === "password";
// Renders FiEye / FiEyeOff toggle that switches type between "password" and "text"
```

---

## 9. Challenges and Solutions

### 9.1 CORS and Cookie Issues

**Challenge:** JWT stored in HTTP-only cookies was not being sent cross-origin between frontend (port 5173) and backend (port 4004).

**Solution:** Configured CORS with `credentials: true` on the backend and `withCredentials: true` on all Axios requests. Ensured `FRONTEND_URL` in config.env has no trailing slash (CORS does exact string matching).

### 9.2 Infinite Re-render Loop

**Challenge:** Calling `useNavigate()` during component render (for auth redirects) caused infinite re-renders and "page unresponsive" errors.

**Solution:** Replaced all `navigateTo("/path"); return null;` patterns with React Router's declarative `<Navigate to="/path" />` component, which is the correct way to redirect during render.

### 9.3 Dark Mode Variable Conflicts

**Challenge:** Overriding `--white` to a dark color in dark mode caused text on permanently dark backgrounds (navbar, hero, buttons) to become invisible.

**Solution:** Introduced `--always-white` and `--btn-primary-text` variables that remain `#ffffff` in both themes, used exclusively for text on colored/dark backgrounds.

### 9.4 MongoDB Atlas IP Whitelisting

**Challenge:** Backend could not connect to MongoDB Atlas from development environment.

**Solution:** Added `0.0.0.0/0` (allow all) to Atlas Network Access whitelist. For production, this should be restricted to the deployment server's IP.

### 9.5 Password Special Characters in Connection String

**Challenge:** MongoDB connection string broke when password contained `@` character.

**Solution:** URL-encoded the `@` as `%40` in the `MONGO_URL` environment variable.

---

## 10. Future Enhancements

| Enhancement | Description | Priority |
|---|---|---|
| Email Notifications | Notify employers when applications are received | High |
| Forgot Password | Password reset via email with time-limited tokens | High |
| User Profile Page | View and edit personal details, change password | High |
| Bookmark/Save Jobs | Job Seekers can save jobs for later review | Medium |
| Application Status Tracking | Pending → Reviewed → Accepted/Rejected workflow | Medium |
| Pagination | Server-side pagination for jobs and applications | Medium |
| Admin Dashboard | Platform admin to manage users, jobs, and reports | Medium |
| Advanced Search | Full-text search with salary range filters | Low |
| Resume PDF Support | Accept and render PDF resumes (not just images) | Low |
| Real-time Notifications | WebSocket-based live updates for new applications | Low |

---

## 11. Conclusion

Job.Com is a full-stack MERN application that demonstrates a production-grade approach to building role-based web platforms. The project implements:

- **SOLID design principles** in the backend through separated services, validators, and middleware layers — making the codebase maintainable and extensible.
- **Component-driven architecture** in the frontend with reusable UI atoms, custom hooks for state management, and a centralized API layer.
- **Security best practices** including bcrypt password hashing, JWT in HTTP-only cookies, role-based authorization, and server-side input validation.
- **Modern UX patterns** including dark mode, loading spinners, empty states, search/filter, and password visibility toggles.

The application successfully connects Job Seekers with Employers through a clean, responsive interface while maintaining clear separation of concerns across all layers of the stack.

---

## Appendix A: Environment Variables

| Variable | Description | Example |
|---|---|---|
| PORT | Backend server port | 4004 |
| MONGO_URL | MongoDB Atlas connection string | mongodb+srv://user:pass@cluster.mongodb.net/ |
| JWT_SECRET_KEY | Secret for signing JWT tokens | supersecretkey123 |
| JWT_EXPIRES | Token expiration duration | 1d |
| COOKIE_EXPIRE | Cookie expiration in days | 10 |
| FRONTEND_URL | Allowed CORS origin | http://localhost:5173 |
| CLOUDINARY_CLIENT_NAME | Cloudinary cloud name | my_cloud |
| CLOUDINARY_CLIENT_API | Cloudinary API key | 123456789 |
| CLOUDINARY_CLIENT_SECRET | Cloudinary API secret | abc_secret |

## Appendix B: How to Run

```bash
# Clone the repository
git clone <repository-url>

# Backend setup
cd Job-Searching-Platform/backend
npm install
# Configure config/config.env with your values
npm run dev

# Frontend setup (new terminal)
cd Job-Searching-Platform/frontend
npm install
npm run dev

# Open http://localhost:5173 in browser
```
