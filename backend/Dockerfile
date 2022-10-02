FROM maven AS build
WORKDIR /app
COPY . .
# Skips building tests
RUN mvn -Dmaven.test.skip=true package

FROM eclipse-temurin:latest
COPY --from=build /app/target/*.jar /app/purdue-course-finder.jar
CMD ["java", "-Dspring.profiles.active=prod", "-jar", "/app/purdue-course-finder.jar"]