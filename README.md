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
