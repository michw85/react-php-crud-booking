import { useState, useContext } from "react";
import { AppContext } from "../Context";
const Form = () => {
  const { insertRoom } = useContext(AppContext);
  const [newRoom, setNewRoom] = useState({});

  // Storing the Insert Room Form Data.
  const addNewRoom = (e, field) => {
    setNewRoom({
      ...newRoom,
      [field]: e.target.value,
    });
  };

  // Inserting a new room into the Database.
  const submitRoom = (e) => {
    e.preventDefault();
    insertRoom(newRoom);
    e.target.reset();
  };

  return (
    <form className="insertForm" onSubmit={submitRoom}>
      <h2>Insert Room</h2>
      <label htmlFor="_title">Title</label>
      <input
        type="text"
        id="_title"
        onChange={(e) => addNewRoom(e, "title")}
        placeholder="Enter title"
        autoComplete="off"
        required
      />
      <label htmlFor="_price">Price</label>
      <input
        type="text"
        id="_price"
        onChange={(e) => addNewRoom(e, "price")}
        placeholder="Enter price"
        autoComplete="off"
        required
      />
      <label htmlFor="_description">Description</label>
      <input
        type="text"
        id="_description"
        onChange={(e) => addNewRoom(e, "description")}
        placeholder="Enter description"
        autoComplete="off"
        required
      />
      <input type="submit" value="Insert" />
    </form>
  );
};

export default Form;