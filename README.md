# Subscription Tracker

A Node.js backend application to manage user subscriptions, built with Express and MongoDB.

## Features

- User registration and authentication
- Subscription CRUD operations
- Email notifications (using Nodemailer)
- Workflow automation (reminders, renewals)
- Jade (Pug) templating for views

## Getting Started

### Prerequisites

- Node.js (v14+)
- MongoDB instance (local or cloud)
- [HTTPie](https://httpie.io/) for API testing (optional)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/YOUR_USERNAME/YOUR_REPO.git
   cd YOUR_REPO
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Create a `.env` file in the root directory.
   - Add your configuration (example):
     ```
     MONGODB_URI=mongodb://localhost:27017/subscription_tracker
     JWT_SECRET=your_jwt_secret
     EMAIL_USER=your_email@example.com
     EMAIL_PASS=your_email_password
     ```

4. Start the server:
   ```bash
   npm start
   ```
   The server will run on `http://localhost:3000` by default.

### API Usage

Test endpoints using HTTPie:

- **Register:**  
  `http POST :3000/api/auth/register email="user@example.com" password="yourpassword"`

- **Login:**  
  `http POST :3000/api/auth/login email="user@example.com" password="yourpassword"`

- **Get Subscriptions:**  
  `http GET :3000/api/subscription Authorization:"Bearer <token>"`

- **Create Subscription:**  
  `http POST :3000/api/subscription Authorization:"Bearer <token>" name="Netflix" price=15.99 renewalDate="2024-07-01"`

### Folder Structure
├── app.js

├── config/

├── controllers/

├── database/

├── middlewares/

├── models/

├── routes/

├── utils/

├── views/

├── package.json

├── .gitignore

└── README.md


## **Step 6: Commit and Push .gitignore and README.md**

```bash
git add .gitignore README.md
git commit -m "Add .gitignore and README"
git push
```

---
