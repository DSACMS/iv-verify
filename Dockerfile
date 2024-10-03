FROM node:22-alpine

WORKDIR /app

COPY package.json package-lock.json /app/

# Install dependencies
RUN npm install

# Copy the entire codebase to the working directory
COPY . /app/

EXPOSE 3000

CMD ["npm", "start"]