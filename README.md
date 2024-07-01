# Leads Directory

Welcome to **Leads Directory**! This is a Node.js application that allows you to manage leads. 

- **Owner**: Juan Plasencia
- **Production URL**: [https://leads-directory.onrender.com/](https://leads-directory.onrender.com/)

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)

## Installation

To get started with Contacts Store, follow these steps:

1. Clone the repository:
    ```bash
    git clone https://github.com/Juarpla/leads-directory.git
    ```
2. Navigate to the project directory:
    ```bash
    cd leads-directory
    ```
3. Install the dependencies:
    ```bash
    npm install
    ```

## Usage

To start the application, use the following command:
```bash
npm start
```

The application will run on [http://localhost:8080](http://localhost:8080) by default.


## API Endpoints

Here are the available API endpoints:

- **GET** `/leads` - Retrieve all leads.
- **GET** `/leads/:id` - Retrieve a lead by ID.
- **POST** `/leads` - Register a new lead.
- **PUT** `/leads/:id` - Modify a lead by ID.
- **DELETE** `/leads/:id` - Delete a lead by ID.


## Documentation

You can find the API documentation at the following URL:
[https://leads-directory.onrender.com/api-docs](https://leads-directory.onrender.com/api-docs)

### API documented example uses (.rest)

Also, it is possible to find .rest files to test the different end points with documented examples, in this path `/docs/api`:

- **development** `/docs/api/development.rest` - with local host and development environment.
- **production** `/docs/api/production.rest` - with render.com and production environment.

### Swagger Setup

We use Swagger for API documentation. To view the Swagger UI locally, follow these steps:

1. Ensure your application is running.
2. Open your browser and navigate to [http://localhost:8080/api-docs](http://localhost:8080/api-docs).
