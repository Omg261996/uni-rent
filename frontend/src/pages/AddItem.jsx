import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddItem() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price_per_day, setPrice] = useState("");
  const [image, setImage] = useState(null);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price_per_day", price_per_day);
    formData.append("image", image);

    const res = await fetch("http://127.0.0.1:8000/api/items/create/", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (res.ok) {
      navigate("/dashboard");
    } else {
      alert("Error creating item");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Add Item</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <br /><br />

        <textarea
          placeholder="Description"
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <br /><br />

        <input
          type="number"
          placeholder="Price per day"
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <br /><br />

        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          required
        />
        <br /><br />

        <button type="submit">Create Item</button>
      </form>
    </div>
  );
}

export default AddItem;