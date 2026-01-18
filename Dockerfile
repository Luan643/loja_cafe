FROM mongo:6.0

RUN apt-get update && apt-get install -y curl && \
    curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y nodejs && \
    apt-get clean

WORKDIR /app/back

COPY ./back /app/back
COPY ./front /app/front

RUN mkdir -p /data/db
RUN npm install

EXPOSE 3000 27017
CMD mongod --bind_ip_all & npm start