FROM nginx:latest
COPY dist/ui-marketplace/ /usr/share/nginx/html
#COPY cert/*.pem /etc/nginx/cert/
COPY nginx.conf /etc/nginx/conf.d/default.conf
