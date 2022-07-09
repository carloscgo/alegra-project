FROM nginx:alpine

# Copy dependency-related files
COPY ./dist/ /usr/share/nginx/html/
COPY ./docker-conf/nginx.conf /etc/nginx/conf.d/default.conf

RUN ls -l /usr/share/nginx/html/

# Expose ports 80, which the dev server will be bound to
EXPOSE 80
