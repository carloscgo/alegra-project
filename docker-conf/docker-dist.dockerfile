FROM nginx:1.21-alpine

# Install node with npm and yarn
RUN apk add --no-cache --repository https://dl-cdn.alpinelinux.org/alpine/v3.15/main \
    libuv \
    nodejs=16.14.2-r0 \
    npm=8.1.3-r0
RUN apk add --no-cache --repository https://dl-cdn.alpinelinux.org/alpine/v3.15/community \
    yarn=1.22.17-r0

# Copy dependency-related files
COPY ../package.json ./
COPY ../yarn.lock ./

# Install project dependencies
RUN yarn install

# Build for production.
RUN yarn build

# Copy dependency-related files
RUN cp -R ./dist/ /usr/share/nginx/html/
COPY ./docker-conf/nginx.conf /etc/nginx/conf.d/default.conf

RUN ls -l /usr/share/nginx/html/

# Expose ports 80, which the dev server will be bound to
EXPOSE 80
