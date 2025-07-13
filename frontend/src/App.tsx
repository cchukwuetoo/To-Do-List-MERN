import { useEffect, useState } from 'react';
import ToDoItem from './ToDoItem';


const API_BASE = 'http://localhost:3000/api/todo';

interface ToDoItemData {
  _id: string;
  toDo: string;
}

function App () {
  const [items, setItems] = useState<ToDoItemData[]>([]);
  const [input, setInput] = useState<string>('');

  useEffect(() => {
    getToDo();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  }

  const getToDo = async () => {
    try {
      const response = await fetch(API_BASE + '/get');
      const data = await response.json();
      setItems(data);
    } catch (err) {
      console.error('Error fetching todos:', err);
    }
  }

  const addItem = async () => {
    if (!input.trim()) return; // Don't add empty items

    try {
      const response = await fetch(API_BASE + '/add-to-do', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          toDo: input 
        })
      });

      const data = await response.json();
      
      if (data.success) {
        console.log('Todo added:', data);
        await getToDo(); // Refresh the list
        setInput(''); // Clear input
      } else {
        console.error('Error adding todo:', data.message);
      }
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  }


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addItem();
  }


  return (
    <div className='container'>
      <div className='heading'>
        <h1>To Do List</h1>
      </div>
      <div className='form'>
        <form onSubmit={handleSubmit}>
          <input 
            type='text' 
            value={input}
            onChange={handleChange}
            placeholder="Add a new todo..."
          />
          <button type="submit">
            <span>ADD</span>
          </button>
        </form>
      </div>
      <div className='todolist'>
        {items.map((item) => {
          const { _id, toDo } = item;
          return (
            <ToDoItem 
              toDo={toDo} 
              key={_id} 
              id={_id} 
              getToDo={getToDo} 
            />
          );
        })}
      </div>
    </div>
  )
}


export default App;
