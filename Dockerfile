# Build stage
FROM node:lts AS build
RUN npm install --global yarn@1

ARG BYTEBIN_URL="data/"
ENV VITE_BYTEBIN_URL="${BYTEBIN_URL}"

WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . ./
RUN yarn build

# Run stage
FROM nginx:alpine
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]
EXPOSE 80/tcp
