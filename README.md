<<<<<<< HEAD
# Asset Management Backend (Spring Boot)

Quickstart:
1. Install Java 17+ and Maven.
2. Update `src/main/resources/application.properties` with your PostgreSQL credentials and DB name.
3. From the project root run:
   ```
   mvn spring-boot:run
   ```
4. Open Swagger UI at: http://localhost:8080/swagger-ui.html

Provided endpoints (examples):
- POST /api/auth/login  -> {username, password} returns JWT token
- POST /api/auth/register -> create user (roles must be provided in JSON as array)
- CRUD for assets: /api/assets
- Assign asset: POST /api/assets/{id}/assign/{userId}
- Return asset: POST /api/assets/{id}/return
- Asset history: GET /api/assets/{id}/history
- Maintenance endpoints: /api/maintenance

Notes:
- JWT secret in properties is for demo only — change for production.
- Passwords are encoded with BCrypt.
- Swagger / OpenAPI is enabled via springdoc.
=======
# Asset Management Pro (Frontend)

This is a professional React + Vite frontend scaffold for the Asset Management project.
It includes:
- React 18 + Vite
- Zustand for global state (auth, assets)
- Storybook setup for components
- Admin & Employee pages (dashboard, asset management, history, my assets)
- API integration configured for `http://localhost:8081/api`

## Quick start

1. Download and unzip this project.
2. Install dependencies:
   ```
   npm install
   ```
3. Run the dev server:
   ```
   npm run dev
   ```
4. Run Storybook:
   ```
   npm run storybook
   ```

## Backend endpoints expected
Auth controller:
- PUT  /api/auth/update/{id}
- POST /api/auth/register
- POST /api/auth/login
- DELETE /api/auth/delete/username/{username}
- DELETE /api/auth/delete/id/{id}

User controller:
- GET  /api/users
- POST /api/users
- GET  /api/users/{id}
- DELETE /api/users/{id}

Asset controller:
- GET  /api/assets
- POST /api/assets
- PUT  /api/assets/{id}
- DELETE /api/assets/{id}

Asset history controller:
- GET  /api/asset-history
- POST /api/asset-history

Adjust `src/api.js` if your backend root differs.
>>>>>>> dba2de35 (Initial commit)
