FROM node:18.17-alpine3.17
RUN addgroup react && adduser -S -G react react
USER react
WORKDIR /app/
COPY --chown=react package*.json .
RUN npm install
COPY --chown=react . .
EXPOSE 5173
CMD [ "npm", "run", "dev" ]
