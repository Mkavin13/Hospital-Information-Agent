# Build stage
FROM maven:3.8.6-eclipse-temurin-17 AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

# Run stage
FROM eclipse-temurin:17-jre-jammy
WORKDIR /app
COPY --from=build /app/target/agent-0.0.1-SNAPSHOT.jar agent.jar
EXPOSE 8081
ENTRYPOINT ["java", "-jar", "agent.jar"]
