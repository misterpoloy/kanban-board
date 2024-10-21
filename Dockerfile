FROM node:16-alpine

WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies with npm
RUN npm ci

# Copy the rest of the code
COPY . .

EXPOSE 3000

CMD ["npm", "start"]
