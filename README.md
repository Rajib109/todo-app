# 📝 Full-Stack Todo App  

A simple yet powerful Todo application built with **React (Vite)** for the frontend and **Node.js + Express + MongoDB** for the backend.  
Includes CRUD operations with **search, sorting, filtering, and pagination**.  

---

## 🚀 Features  
- ✅ Add, update, and delete todos  
- ✅ Mark todos as completed  
- ✅ Search todos (case-insensitive)  
- ✅ Filter by status: All / Active / Completed  
- ✅ Pagination & sorting support  
- ✅ Standardized API responses  
- ✅ Clean folder structure for scalability  

---

## 🛠️ Tech Stack  
**Frontend**  
- React (Vite)  
- Axios  
- Tailwind CSS  

**Backend**  
- Node.js + Express  
- MongoDB + Mongoose  
- dotenv, cors, morgan, express-async-handler  

---

## 📂 Folder Structure  

📂 Folder Structure

Frontend (/frontend)
```
 ├── components/        # UI components (TodoList, TodoItem, Filters, Pagination, etc.)
 ├── App.jsx            # Root component
 ├── main.jsx           # Entry point
 └── ...
```

📂 Backend (/backend)
```
 ├── controllers/      # Request handlers (todoController.js)
 ├── models/           # Mongoose models (Todo.js)
 ├── routes/          # Express routes (todoRoutes.js)
 ├── middlewares/     # Custom middlewares (errorMiddleware.js)
 ├── config/         # Configuration files (db.js)
 ├── utils/          # Utility functions (response.js)
 ├── .env            # Environment variables
 ├── server.js       # Entry point
 └── ...
 ```

 ⚙️ Installation & Setup
1️⃣ Clone the repo
```bash
git clone https://github.com/your-username/todo-app.git
cd todo-app
```
2️⃣ Install dependencies
```bash
# Frontend
cd frontend
npm install

# Backend
cd ../backend
npm install
```
3️⃣ Set up environment variables
```bash
cp .env.example .env
MONGO_URI=your_mongo_connection_string
PORT=5000
```
4️⃣ Start the development servers
```bash
# Frontend
cd frontend
npm run dev

# Backend
cd ../backend
npm run start

📡 API Endpoints
Base URL → http://localhost:5000/api/todos
Method	Endpoint	Description
GET	/	Get all todos (with filters)
POST	/	Create new todo
PUT	/:id	Update todo by ID
DELETE	/:id	Delete todo by ID

Example: GET with filters
GET /api/todos?page=1&limit=5&sort=createdAt&order=desc&search=react
```
🎯 Future Improvements

🔐 User authentication (JWT)

📅 Due dates & priority levels

📱 Responsive PWA (installable mobile app)

✅ Unit & integration tests

🖼️ Screenshots (Optional)

👉 Add a few screenshots of your app once deployed.

📜 License

This project is open-source and available under the MIT License