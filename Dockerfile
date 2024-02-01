# Stage 1: Compile and Build angular codebase

# Use official node image as the base image
FROM node:18.19.0 as build
ARG CONFIGURATION='stage'

# Set the working directory
WORKDIR /usr/local/app

# Add the source code to app
COPY ./ /usr/local/app/

# Install all the dependencies
RUN npm install 
RUN npm install -g @angular/cli

# Generate the build of the application
#RUN npm run build 
RUN ng build --base-href '/dashboard/'
#RUN ng run build --prod

# Stage 2: Serve app with nginx server

# Use official nginx image as the base image
FROM nginx:latest

# Copy the build output to replace the default nginx contents.
COPY --from=build /usr/local/app/dist/dashboard /usr/share/nginx/html/dashboard

# Expose port 80
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

