import React, { useState, useEffect } from 'react';
import List from "./components/List";

import './App.css';

const getLocalStorage = () => {
  let list = localStorage.getItem("list");
  if (list) {
    return (list = JSON.parse(localStorage.getItem("list")));
  } else {
    return [];
  }
};

const App = () => {
  const [name, setName] = useState("");
  const [list, setList] = useState(getLocalStorage());
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);

  useEffect(() => {
    if (showPopup) {
      setTimeout(() => {
        setShowPopup(false);
      }, 5000);
    }
  }, [showPopup]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      // Handle empty input
    } else if (name && isEditing) {
      setList(
        list.map((item) => {
          if (item.id === editId) {
            return { ...item, title: name };
          }
          return item;
        })
      );
      setName("");
      setEditId(null);
      setIsEditing(false);
      setShowPopup(true);
    } else {
      const newItem = { id: new Date().getTime().toString(), title: name };
      setList([...list, newItem]);
      setName("");
      setShowPopup(true);
    }
  };

  const removeItem = (id) => {
    setList(list.filter((item) => item.id !== id));
    setShowPopup(true);
  };

  const editItem = (id) => {
    const editItem = list.find((item) => item.id === id);
    setIsEditing(true);
    setEditId(id);
    setName(editItem.title);
    setShowPopup(true);
  };

  const clearList = ({msg}) => {
    setList([]);
    localStorage.removeItem('list');
    localStorage.clear();
    setShowPopup(true);
  };

  return (
    <section className='section-center'>
      <div className='big-board'>
        <form onSubmit={handleSubmit}>
          <h1 style={{ marginBottom: "1.5rem", fontFamily: "Impact, Haettenschweiler, 'Arial Narrow Bold sanserif", textAlign: "center" }}>
            What's the plan for this week?
          </h1>
          <div className='mb-3 form'>
            <input
              type='text'
              className='form-control'
              placeholder='You can write here'
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
            <button type='submit' className='btn btn-success'>
              {isEditing ? "Edit" : "Submit"}
            </button>
          </div>
        </form>
        {list.length > 0 && (
          <div className='baba' style={{ marginTop: "2rem" }}>
            <List items={list} removeItem={removeItem} editItem={editItem} />
            <div className='text-center'>
              <button className='btn btn-warning' onClick={clearList}>
                Clear Items
              </button>
            </div>
          </div>
        )}

        {showPopup && (
          <div className="popup">
            <h2>Success!</h2>
            <p>Your changes have been saved.</p>
            
          </div>
        )}
      </div>
    </section>
  );
};

export default App;

//another one  //count

// import React, { useState } from 'react';

// function Counter() {
//   // Declare a state variable called "count" and initialize it to 0
//   const [count, setCount] = useState(0);

//   // Function to increment the count
//   const increment = () => {
//     setCount(count + 1);
//   };

//   // Function to decrement the count
//   const decrement = () => {
//     setCount(count - 1);
//   };

//   return (
//     <div>
//       <h1>Counter</h1>
//       <p>Count: {count}</p>
//       <button onClick={increment}>Increment</button>
//       <button onClick={decrement}>Decrement</button>
//     </div>
//   );
// }

// export default Counter;

