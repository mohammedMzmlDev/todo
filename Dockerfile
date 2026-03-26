# Local docker seve code below
#FROM node:22-alpine 

#WORKDIR /app 

#COPY package*.json ./ 

#RUN npm install 

#COPY . . 

#EXPOSE 5173 

#CMD ["npm", "run", "dev", "--", "--host"]

# Production Docker file code

# 1️⃣ Build stage
FROM node:22-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

# 2️⃣ Production stage (lightweight)
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD [ "nginx", "-g", "daemon off;" ]