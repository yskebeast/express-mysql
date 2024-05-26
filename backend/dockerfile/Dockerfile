FROM node:20-alpine
WORKDIR /app
COPY ./backend/package.json ./backend/yarn.lock ./backend/
RUN yarn install
COPY ./ ./backend/
EXPOSE 3001
CMD ["yarn", "dev"]