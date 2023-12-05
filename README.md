Getting Started
Step 1: Create .env file
In the root directory of your project, create a file named .env and add the following code:

PORT=5000
NODE_ENV = development
DATABASE_URL=your_database_url_here
BCRYPT_SALT_ROUNDS=12

Step 2: Install Dependencies
Run the following command to install project dependencies:

npm install
Step 3: Run the Project
Production Mode

npm run start:prod
Development Mode

npm run start:dev
Build the project:

npm run build
Run linting:

npm run lint
Fix linting issues:

npm run lint:fix
Run Prettier:

npm run prettier
Fix Prettier formatting:

npm run prettier:fix