To run this docker file

# docker-compose up --build

# npx tsc
# npm start

## Folder Structure
pos-cpq-system/
│── user-service/  # User Microservice
│   ├── bin/          
│   ├── src/
│   │   ├── config/ormconfig.ts
│   │   ├── controllers/userController.ts
│   │   ├── middlewares/auth.ts, validation.ts
│   │   ├── models/User.ts
│   │   ├── routes/userRoutes.ts
│   │   ├── services/
│   │   ├── validations/userSchema.ts
│   │   ├── utils/logger.ts
│   │   ├── app.ts
│   │   ├── server.ts
│   ├── package.json
│   ├── .env
│   ├── .gitignore
│   ├── DockerFile
│   ├── tsconfig.json
│
│── product-service/         # Product Microservice
│   ├── src/
│   │   ├── config/mongodb.ts
│   │   ├── controllers/productController.ts
│   │   ├── middlewares/
│   │   ├── models/Product.ts
│   │   ├── routes/productRoutes.ts
│   │   ├── services/
│   │   ├── utils/
│   │   ├── app.ts
│   │   ├── server.ts
│   ├── package.json
│   ├── .env
│   ├── .gitignore
│   ├── DockerFile
│   ├── tsconfig.json
│
│── gateway/                 # API Gateway (Optional)
│   ├── src/
│   │   ├── app.ts
│   ├── package.json
│   ├── .env
│   ├── .gitignore
│   ├── DockerFile
│   ├── tsconfig.json
│
│── docker-compose.yml       # (If Using Docker)
│── README.md
