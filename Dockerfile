# ================================================================================
# Compile files first
FROM node:8.6.0 AS build

RUN mkdir /app
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build
RUN ls -al build

# ================================================================================
# Add files to nginx alpine

FROM nginx:1.15.1-alpine

COPY --from=build /app/build /usr/share/nginx/html
COPY --from=build /app/nginx /nginx


CMD /nginx/run-nginx
