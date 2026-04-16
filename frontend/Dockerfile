# Use Node
FROM node:18

# Create app directory
WORKDIR /app

# Copy files
COPY package*.json ./

# Install deps
RUN npm install

# Copy rest
COPY . .

# Expose port
EXPOSE 5173

# Run app
CMD ["npm", "run", "dev", "--", "--host"]