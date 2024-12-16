# Customer Management and Feedback

## Project Description

This project is designed to manage customer information and collect feedback efficiently. It provides a user-friendly interface for managing customer data and analyzing feedback to improve services.

## Features

- Customer information management
- Customer feedback collection
- Responsive UI using Tailwind CSS
- MongoDB database integration
- Unit testing with Mocha

## Prerequisites

- Node.js (v20 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn

## Installation

To install the project, follow these steps:

1. Clone the repository:

    ```bash
    git clone https://github.com/gauravmahto/customer-management-and-feedback.git
    ```

2. Navigate to the project directory:

    ```bash
    cd customer-management-and-feedback
    ```

3. Install the dependencies:

    ```bash
    npm install
    ```

## Setup

1. Create a `.env` file in the root directory and add the following environment variables:

    ```properties
    PORT=3000
    MONGODB_URI=mongodb://localhost:27017/customer_management
    TEST_MONGODB_URI=mongodb://localhost:27017/customer_management_test
    NODE_ENV=development
    ```

## Usage

To start the application, run:

```bash
npm start
```

Open your browser and navigate to `http://localhost:3000` to access the application.

## Running Tests

To run the tests, use the following command:

```bash
npm test
```

Ensure that the server is running and the database is properly configured before running the tests.

## Contributing

We welcome contributions! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch:

    ```bash
    git checkout -b feature-branch
    ```

3. Make your changes and commit them:

    ```bash
    git commit -m "Description of your changes"
    ```

4. Push to the branch:

    ```bash
    git push origin feature-branch
    ```

5. Create a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
