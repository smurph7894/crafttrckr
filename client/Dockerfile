# Use Node.js image as the base image
FROM node:lts-alpine as builder

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package.json package-lock.json .

# Install dependencies
RUN npm install

# Copy the rest of the application files to the working directory
COPY . .

# Build the React app for production
RUN npm run build

FROM nginx:1.19.0
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html/ui

EXPOSE 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]
