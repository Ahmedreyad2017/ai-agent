# AI Agent with Vogent Integration

This project is an AI-powered application that integrates with Vogent and consists of two main components:

- **Backend**: Built using Node.js and Express.js
- **Frontend**: Developed with Next.js
- **Database**: PostegreSQL


## 🌐 Live Demo

Access the deployed application here:  
👉 [AI Agent App](https://ai-agent-3xn1-ndp4zvpim-ahmed-reyads-projects.vercel.app/)

---

## 📦 Project Structure

```
/backend  
└── src/  
    ├── config/         # Configuration files (e.g., env, DB, server setup)  
    ├── constants/      # Global constants used across the application  
    ├── controllers/    # Express route handlers and business logic entrypoints  
    ├── enums/          # Enumerated types for consistent value sets  
    ├── middleware/     # Express middleware (e.g., auth, logging)  
    ├── models/         # Database models/schemas (e.g., Mongoose)  
    ├── queues/         # Message queue consumers/producers  
    ├── repositories/   # Data access layer (database abstraction)  
    ├── routes/         # API route definitions  
    ├── services/       # Business logic and service layers  
    ├── types/          # TypeScript type definitions and interfaces  
    └── utils/          # Utility/helper functions
/frontend
└── src/  
    └── app/  
        ├── layout.tsx        # Root layout component  
        ├── page.tsx          # Root page (e.g., homepage)  
        ├── components/       # Reusable React components  
        ├── styles/           # CSS, Sass, or other styling files  
        ├── hooks/            # Custom React hooks  
        ├── utils/            # Utility/helper functions  
        ├── services/         # API calls and business logic services  
        ├── types/            # TypeScript type definitions and interfaces    
        └── constants/        # Global constants used throughout the app 
```

## 🐳 Run with Docker

### Prerequisites

- Docker and Docker Compose installed

### Run the project

```bash
docker-compose up --build
```


## Future Work
- Authenticate all endpoints from the backend (integration not fully implemented)
- Recordings are not working because of unauthorized access from vogent
- UI polishing