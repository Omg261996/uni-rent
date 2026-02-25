import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Dashboard() {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/items/")
      .then(res => res.json())
      .then(data => setItems(data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Available Items</h2>
<button onClick={() => navigate("/add-item")}>Add Item</button>
<button onClick={() => navigate("/my-items")}>
  My Items
</button>

      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        {items.map(item => (
          <div
            key={item.id}
            onClick={() => navigate(`/item/${item.id}`)}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              width: "200px",
              borderRadius: "10px",
              cursor: "pointer"
            }}
          >
            <img
              src={`http://127.0.0.1:8000${item.image}`}
              alt=""
              style={{ width: "100%", height: "150px", objectFit: "cover" }}
            />
            <h3>{item.title}</h3>
            <p>₹{item.price_per_day}/day</p>
            <p>Owner: {item.owner.username}</p>
          </div>
        
        ))}
      </div>
    </div>
  );
}

export default Dashboard;

