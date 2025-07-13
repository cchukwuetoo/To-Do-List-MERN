# Todo List Application

A full-stack todo list application built with React Typescript frontend and TypeScript backend, allowing users to create, read, update, and delete todo items.

## Features

- ✅ Add new todo items
- ✅ Mark todos as complete/incomplete
- ✅ Delete todo items
- ✅ Real-time updates with backend synchronization
- ✅ Responsive design with visual feedback
- ✅ Responsive design with visual feedback
- ✅ Full TypeScript implementation for type safety
- ✅ Robust input validation with Zod
- ✅ Modular backend architecture with separate database connection

## Technology Stack

**Frontend:**
- React 18 with TypeScript
- React 18 with Hooks (useState, useEffect)
- Modern TypeScript (ES6+)
- CSS for styling

**Backend:**
- TypeScript
- Express.js
- MongoDB (assumed based on `_id` field)
- Zod for runtime validation
- CORS for cross-origin requests
- Environment variables with dotenv

## Project Structure

```
todo-app/
|────────Backend
|────controller
|     |──ToDoController.ts
|────────Connection
      |────db.ts     #Databaseconnetion
|────models
|     |──ToDoModel.ts
|────routes
|     |──ToDoRoute.ts
|────package.json
|────server.js      #Main application component
|────────frontend
├── src/
│   ├── App.tsx          # Main application component
│   ├── ToDoItem.tsx     # Individual todo item 
│   └── index.tsx
├── package.json
└── README.md
```

## API Endpoints

The application communicates with a backend API running on `http://localhost:3000/api/todo`:

- `GET /api/todo/get` - Fetch all todos
- `POST /api/todo/add-to-do` - Add a new todo(with Zod validation)
- `PUT /api/todo/update` - Update todo completion status
- `DELETE /api/todo/delete/:id` - Delete a todo

## Installation & Setup
**Prerequisites**
Node.js (v16 or higher)
MongoDB (local or cloud instance)

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd todo-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the backend server**
   ```bash
   npm run dev
   # Make sure your backend is running on http://localhost:3000
   ```

4. **Start the React application**
   ```bash
   npm start
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000` (or the port specified by Create React App)

## Usage

1. **Adding Todos:** Type in the input field and click "ADD" or press Enter
2. **Completing Todos:** Click the checkbox to mark items as complete
3. **Deleting Todos:** Click the "X" button to remove items

## Component Architecture

### App.tsx
- Main application component
- Manages global state for todos and input
- Handles API calls for fetching and adding todos
- Renders the todo list and form

### ToDoItem.tsx
- Individual todo item component
- Manages completion state
- Handles update and delete operations
- Displays todo text with interactive elements

## Key Features Implementation

**State Management:**
- Uses React Hooks (`useState`, `useEffect`) with TypeScript generics for state management
- Local state for UI interactions, API calls for data persistence

**API Integration:**
- Async/await pattern for API calls
- Error handling with try-catch blocks
- Backend: Zod validation for request data, MongoDB connection error handling
- Frontend: Try-catch blocks for API calls, user-friendly error messages
- Automatic list refresh after modifications

**User Experience:**
- Form validation (prevents empty todos)
- Visual feedback for completed items
- Responsive design elements

## Development Notes

- The app uses `fetch` API for HTTP requests
- Error handling is implemented for all API calls
- Component props are used for parent-child communication
- CSS classes are applied conditionally based on completion status

## Future Enhancements

- Add todo editing functionality
- Implement local storage backup
- Add due dates and priorities
- Include todo categories/tags
- Add user authentication

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is open source and available under the MIT License.
