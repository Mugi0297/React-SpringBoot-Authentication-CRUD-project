# 💼 Employee Management System

A full-stack **Employee Management System** built using **ReactJS (Vite)** for the frontend, **Spring Boot (Java)** for the backend, and **MySQL** for the database. The system provides role-based authentication and CRUD operations for managing employee data.

---

## 🚀 Tech Stack

### Frontend
- ReactJS (Vite)
- Bootstrap + CSS
- React Router for routing
- Axios for HTTP requests

### Backend
- Java 17+
- Spring Boot
- Spring Security with JWT
- Java Mail Sender (for Email Verification & Password Reset)
- Swagger/OpenAPI for API documentation

### Database
- MySQL

---

## 📁 Project Structure

### 🔹 Frontend: `frontend/`

frontend/
├── index.html
├── vite.config.js
└── src/
├── App.jsx
├── main.jsx
├── components/
│ ├── Auth/
│ │ ├── ForgotPassword.jsx
│ │ ├── Login.jsx
│ │ ├── Register.jsx
│ │ ├── ResetPassword.jsx
│ │ ├── VerifyEmail.jsx
│ │ ├── VerifyFailed.jsx
│ │ ├── VerifySuccess.jsx
│ ├── Dashboard/
│ │ ├── AdminDashboard.jsx
│ │ ├── EmployeeForm.jsx
│ │ ├── EmployeeList.jsx
│ │ ├── UserDashboard.jsx
│ ├── Navbar.jsx
│ ├── ProtectedRoute.jsx
├── pages/
│ ├── AdminDashboard.css
│ ├── ForgotPassword.css
│ ├── Login.css
│ ├── Register.css
│ ├── UserDashboard.css
│ ├── VerifyPage.css
├── services/
├── api.js
├── authService.js
├── employeeService.js


### 🔹 Backend: `backend/`

backend/
├── src/main/java/com/example/authcrud/
│ ├── AuthCrudApplication.java
│ ├── config/
│ │ ├── SecurityConfig.java
│ │ ├── SwaggerConfig.java
│ │ ├── WebConfig.java
│ ├── controller/
│ │ ├── AuthController.java
│ │ ├── EmployeeController.java
│ │ ├── AdminController.java
│ ├── dto/
│ │ ├── EmployeeDTO.java
│ │ ├── EmployeeRequestDTO.java
│ ├── model/
│ │ ├── User.java
│ │ ├── Employee.java
│ │ ├── PasswordResetToken.java
│ │ ├── VerificationToken.java
│ ├── repository/
│ │ ├── UserRepository.java
│ │ ├── EmployeeRepository.java
│ │ ├── PasswordResetTokenRepository.java
│ │ ├── VerificationTokenRepository.java
│ ├── security/
│ │ ├── JwtUtil.java
│ │ ├── JwtAuthenticationFilter.java
│ │ ├── CurrentUser.java
│ │ ├── UserPrincipal.java
│ ├── service/
│ │ ├── CustomUserDetailsService.java
│ │ ├── EmployeeService.java
│ │ ├── EmailService.java
│ │ └── impl/
│ │ ├── EmployeeServiceImpl.java
│ ├── mapper/
│ │ ├── EmployeeMapper.java
│ ├── payload/
│ │ ├── LoginRequest.java
│ │ ├── LoginResponse.java
├── src/main/resources/
│ ├── static/
│ ├── templates/
│ ├── application.properties
├── pom.xml


---

## 🔐 Features

### 1. Authentication & Authorization
- ✅ Spring Security + JWT
- ✅ Email Verification using JavaMailSender
- ✅ Password Reset via Email
- ✅ Protected Routes with React Router
- ✅ Role-Based Access (USER & ADMIN)

### 2. Employee Management (CRUD)
- 👤 **User Role**
  - Add / Edit / Delete Employees
  - Fields: Name, Department, Position, Salary
  - View Employee List in Table Format

- 🛡 **Admin Role**
  - View All Registered Users (Verified / Not Verified)
  - View All Employee Records

### 3. UI/UX
- 🔹 Responsive layout with Bootstrap
- 🔹 Protected Navigation Bar with Logout

---

## ⚙️ Setup Instructions

### 🔧 Backend Setup

1. Clone the repo:
   ```bash
   git clone <your-repo-url>
   cd backend
2. Configure MySQL in application.properties:
   spring.datasource.url=jdbc:mysql://localhost:3306/authdb
   spring.datasource.username=root
   spring.datasource.password=your_password

3. Build and run:
   mvn spring-boot:run

4. Access Swagger Docs at:
   http://localhost:8080/swagger-ui/index.html

🔧 Frontend Setup
1. Navigate to frontend:
   cd frontend

2. Install dependencies:
   npm install
   
3. Run the Vite dev server:
   npm run dev

4. Visit the app:
   http://localhost:5173
