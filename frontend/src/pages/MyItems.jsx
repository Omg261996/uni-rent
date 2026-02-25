import { useEffect, useState } from "react";

function MyItems() {
  const [items, setItems] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/items/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => {
        // Filter items owned by logged in user
        const myItems = data.filter(
          item => item.owner.email === JSON.parse(atob(token.split('.')[1])).email
        );
        setItems(myItems);
      });
  }, []);

  const handleDelete = async (id) => {
    const res = await fetch(
      `http://127.0.0.1:8000/api/items/delete/${id}/`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (res.ok) {
      setItems(items.filter(item => item.id !== id));
    } else {
      alert("Not allowed");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>My Items</h2>

      {items.map(item => (
        <div key={item.id} style={{ marginBottom: "15px" }}>
          <h3>{item.title}</h3>
          <button onClick={() => handleDelete(item.id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default MyItems;