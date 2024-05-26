FROM node:20-alpine
WORKDIR /app
COPY ./frontend/package.json ./frontend/yarn.lock ./frontend/
RUN yarn install
COPY ./ ./frontend/
EXPOSE 3000
CMD ["yarn", "dev"]