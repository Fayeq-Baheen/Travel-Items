import { useState } from "react";

export default function App() {
  const [items, setItems] = useState([]);

  function handleAddItem(item) {
    setItems([...items, item]);
  }

  function handleDeleteItem(id) {
    setItems(items.filter((item) => item.id !== id));
  }

  function handleIsChecked(id) {
    setItems(
      items.map((item) => {
        if (item.id === id) {
          item.packed = !item.packed;
        }
        return item;
      }),
    );
  }

  return (
    <div className="app">
      <Logo />
      <Form onHandleAddItem={handleAddItem} items={items} />
      <PackingList
        items={items}
        onHandleDeleteItem={handleDeleteItem}
        onHandleIsChecked={handleIsChecked}
      />
    </div>
  );
}

function Logo() {
  return <h1>🏝️ Far Away 🧳</h1>;
}

function Form({ onHandleAddItem, items }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleAddItem(e) {
    e.preventDefault();

    if (!description) return;

    const newItem = {
      id: items.length + 1,
      description,
      quantity,
      packed: false,
    };
    onHandleAddItem(newItem);

    setDescription("");
    setQuantity(1);
  }

  return (
    <form
      className="add-form"
      onSubmit={(e) => {
        handleAddItem(e);
      }}
    >
      <h3>What do you need for your 😍 trip?</h3>
      <select
        value={quantity}
        onChange={(q) => setQuantity(Number(q.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(d) => setDescription(d.target.value)}
      />
      <button>Add</button>
    </form>
  );
}

function PackingList({ items, onHandleDeleteItem, onHandleIsChecked }) {
  return (
    <div className="list">
      <ul>
        {items?.map((item) => (
          <li key={item.id}>
            <input
              type="checkbox"
              onChange={() => onHandleIsChecked(item.id)}
            />
            <span style={item.packed ? { textDecoration: "line-through" } : {}}>
              {item.quantity} {item.description}
            </span>
            <button
              onClick={() => {
                onHandleDeleteItem(item.id);
              }}
            >
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
