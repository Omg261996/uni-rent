import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ItemDetail() {
  const { id } = useParams();
  const [item, setItem] = useState(null);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/items/${id}/`)
      .then(res => res.json())
      .then(data => setItem(data));
  }, [id]);

  if (!item) return <h2>Loading...</h2>;

  return (
    <div style={{ padding: "40px" }}>
      <h1>{item.title}</h1>

      <img
        src={`http://127.0.0.1:8000${item.image}`}
        alt=""
        style={{ width: "300px", borderRadius: "10px" }}
      />

      <h3>₹{item.price_per_day}/day</h3>
      <p>{item.description}</p>

      <hr />

      <h2>Owner Details</h2>
      <p>Name: {item.owner.username}</p>
      <p>Branch: {item.owner.branch}</p>
      <p>Year: {item.owner.year}</p>
      <p>Phone: {item.owner.phone}</p>
    </div>
  );
}

export default ItemDetail;
