# Todo List Application

A full-stack todo list application built with React frontend and Node.js backend, allowing users to create, read, update, and delete todo items.

## Features

- ✅ Add new todo items
- ✅ Mark todos as complete/incomplete
- ✅ Delete todo items
- ✅ Real-time updates with backend synchronization
- ✅ Responsive design with visual feedback

## Technology Stack

**Frontend:**
- React 18 with Hooks (useState, useEffect)
- Modern JavaScript (ES6+)
- CSS for styling

**Backend:**
- Node.js
- Express.js
- MongoDB (assumed based on `_id` field)

## Project Structure

```
todo-app/
|────────Backend
|────controller
|     |──ToDoController.js
|────models
|     |──ToDoModel.js
|────routes
|     |──ToDoRoute.js
|────package.json
|────server.js
|────────frontend
├── src/
│   ├── App.js          # Main application component
│   ├── ToDoItem.js     # Individual todo item component
│   └── index.js
├── package.json
└── README.md
```

## API Endpoints

The application communicates with a backend API running on `http://localhost:3000/api/todo`:

- `GET /api/todo/get` - Fetch all todos
- `POST /api/todo/add-to-do` - Add a new todo
- `PUT /api/todo/update` - Update todo completion status
- `DELETE /api/todo/delete/:id` - Delete a todo

## Installation & Setup

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

### App.js
- Main application component
- Manages global state for todos and input
- Handles API calls for fetching and adding todos
- Renders the todo list and form

### ToDoItem.js
- Individual todo item component
- Manages completion state
- Handles update and delete operations
- Displays todo text with interactive elements

## Key Features Implementation

**State Management:**
- Uses React Hooks (`useState`, `useEffect`) for state management
- Local state for UI interactions, API calls for data persistence

**API Integration:**
- Async/await pattern for API calls
- Error handling with try-catch blocks
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