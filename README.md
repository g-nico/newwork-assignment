# newwork-assignment

### How to start:
1. In the terminal, navigate to `/hrapp-BE`
2. Run `mvn clean package -DskipTests` to build the jar file for the backend
3. Navigate to the location of the docker-compose.yml file
4. Run `docker-compose up -d` to start the both apps and the database
5. Go to `http://localhost:3000/` to login

Login credentials: 
- manager: username: charlie, password: password3
- employee: username: alice, password: password1
- employee: username: bob, password: password2

### Alternatively, you can run them independently:
1. Comment out the docker services for frontend and backend in the docker-compose.yml file
2. Run `docker-compose up -d` to start just the database
3. in the /hrapp-BE directory, run `mvn spring-boot:run` to start the backend
4. in the /hrapp-FE directory, run `npm install` and `npm start` to start the frontend
5. Go to `http://localhost:3000/` to login

### About the architecture:
I'd say I created a pretty classic 3-tier architecture, with a React frontend, a Spring Boot backend and a PostgreSQL database.
I leaned a bit more towards backend because I'm more confortable with java.

### What I would improve with more time:
- I would complete the authentication functionalities, such as register and logout
- I would have written tests
- I would have added a section for viewing absences and more constraints and validations for dates (e.g. the combination start date - end date should be unique, etc)
- I would have added some loading cues to FE review section, since it takes 3-4 seconds for the API to respond
- I would have moved all mapper logic to services, instead of mappers being used sometimes in services sometimes in controllers
