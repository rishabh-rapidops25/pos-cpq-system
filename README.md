# pos-cpq-system

### User-Service

```
└── 📁user-service
    └── 📁bin
        └── combined.log
        └── error.log
        └── info.log
    └── 📁src
        └── app.ts
        └── 📁config
            └── index.ts
        └── 📁constants
            └── index.ts
        └── 📁controllers
            └── userController.ts
        └── 📁db
            └── index.ts
        └── 📁interfaces
            └── User.interface.ts
        └── 📁middlewares
        └── 📁models
            └── Token.ts
            └── User.ts
        └── POS.md
        └── 📁repository
            └── user.repository.ts
        └── 📁routes
            └── userRoutes.ts
        └── server.ts
        └── 📁services
        └── 📁utils
            └── jwtHelper.ts
            └── passwordHelper.ts
        └── 📁validations
            └── userSchema.ts
    └── 📁uploads
    └── .env
    └── .env.example
    └── .gitignore
    └── Dockerfile
    └── package-lock.json
    └── package.json
    └── tsconfig.json
```

### Product-Service

```
└── 📁product-service
    └── 📁bin
        └── combined.log
        └── error.log
        └── info.log
    └── 📁src
        └── app.ts
        └── 📁config
            └── mongodb.ts
        └── 📁constants
            └── index.ts
        └── 📁controllers
            └── categoryController.ts
            └── componentGroupController.ts
            └── productController.ts
        └── 📁interfaces
            └── Category.interface.ts
            └── Component.interface.ts
            └── Product.interface.ts
        └── 📁middlewares
        └── 📁models
            └── Category.ts
            └── ComponentGroup.ts
            └── Product.ts
        └── 📁repositories
            └── Category.repository.ts
            └── ComponentGroup.repository.ts
        └── 📁routes
            └── categoryRoutes.ts
            └── componentGroupRoutes.ts
            └── indexRoutes.ts
            └── productRoutes.ts
        └── server.ts
        └── 📁validations
            └── categorySchema.ts
            └── componentSchema.ts
            └── productSchema.ts
    └── 📁uploads
    └── .env
    └── .env.example
    └── .gitignore
    └── Dockerfile
    └── package-lock.json
    └── package.json
    └── tsconfig.json
```

### Shared-constants

```
└── 📁shared-constants
    └── 📁src
        └── constants.ts
        └── 📁errors
            └── bad-request-error.ts
            └── custom-error.ts
            └── database-connection-error.ts
            └── duplicate-data-found.ts
            └── index.ts
            └── not-authorized-error.ts
            └── not-found-error.ts
        └── index.ts
        └── logger.ts
        └── multer.ts
        └── responseHelper.ts
        └── validation.ts
    └── .gitignore
    └── package-lock.json
    └── package.json
    └── Readme.md
    └── shared-constants-1.0.0.tgz
    └── tsconfig.json
```

### Auth-lib

```
└── 📁auth-lib
    └── 📁src
        └── authMiddleware.ts
    └── .env
    └── .env.example
    └── .gitignore
    └── auth-lib-1.0.0.tgz
    └── package-lock.json
    └── package.json
    └── README.md
    └── tsconfig.json
```

![CodeRabbit Pull Request Reviews](https://img.shields.io/coderabbit/prs/github/rishabh-rapidops25/pos-cpq-system?utm_source=oss&utm_medium=github&utm_campaign=rishabh-rapidops25%2Fpos-cpq-system&labelColor=171717&color=FF570A&link=https%3A%2F%2Fcoderabbit.ai&label=CodeRabbit+Reviews)
