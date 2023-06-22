# Start with a base image
FROM openjdk:17-oracle

# Set the working directory in the container
WORKDIR /app

# Copy the Spring Boot application JAR file into the container
COPY target/spring-boot-ecommerce-0.0.1-SNAPSHOT.jar /app

# Expose the port on which the application will run
EXPOSE 8080

# Set the command to run the application
CMD ["java", "-jar", "spring-boot-ecommerce-0.0.1-SNAPSHOT.jar"]