FROM node:20-alpine
WORKDIR /app
# COPY ./package.json ./yarn.lock ./backend/
RUN yarn install
COPY ./ ./backend/
EXPOSE 3001
CMD ["yarn", "dev"]