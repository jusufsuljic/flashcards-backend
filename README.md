
## Project Setup

This guide will help you set up and run the Nest.js microservices-based application. Ensure you follow these steps to configure and launch the services effectively.

### Prerequisites

Before you begin, make sure you have the following prerequisites installed:

-   Node.js and npm (Node Package Manager)
-   MongoDB server

### Installation

1.  **Clone the Repository**: Start by cloning this repository to your local machine.
    
    bashCopy code
    
    `https://github.com/jusufsuljic/flashcards-backend.git` 
    
2.  **Configuration**:
    
    -   Update the `.env` files with your desired configuration values (if you are not able to run it on the default ones). You can specify different ports or connection strings for each service if necessary.
3.  **Install Dependencies**:
    
    -   For each service (gateway, authentication, flashcards), navigate to its respective directory using a terminal and run:
        
        bash code
        
        `cd service-directory
        npm install` 
        

### Running the Services

1.  **MongoDB Server**:
    
    -   Ensure that your MongoDB server is up and running. If needed, modify the MongoDB connection string in the `.env` file to match your server configuration.
2.  **Starting the Services**:
    
    -   For each service, run the following command within the service directory:
        
        bash code
        
        `npm run start:dev` 
        
    -   This will start the microservices, and they will be available on the specified ports.
        

### Accessing the Gateway

Once all services are initialized, the gateway methods will be accessible as per the required project specifications.

## Service Ports

-   Gateway Service: Port `8000` (Configurable in the `.env` file)
-   Authentication Service: Port `8888` (Configurable in the `.env` file)
-   Flashcards Service: Port `4200` (Configurable in the `.env` file)
-   Users Service: Port `3001` (Configurable in the `.env` file)
 