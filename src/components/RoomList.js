import { useContext, useState } from "react";
import { AppContext } from "../Context";


const RoomList = () => {
  const {
    rooms,
    roomLength,
    editMode,
    cancelEdit,
    updateRoom,
    deleteRoom,
  } = useContext(AppContext);

  // Storing rooms new data when they editing their info.
  const [newData, setNewData] = useState({});

  const saveBtn = () => {
    updateRoom(newData);
  };

  const updateNewData = (e, field) => {
    setNewData({
      ...newData,
      [field]: e.target.value,
    });
  };

  const enableEdit = (id, title, price, description) => {
    setNewData({ id, title, price, description });
    editMode(id);
  };

  const deleteConfirm = (id) => {
    if (window.confirm("Are you sure?")) {
      deleteRoom(id);
    }
  };

  const detailPage = (id) => {
    
  }

  return !roomLength ? (
    <p>{roomLength === null ? "Loading..." : "Please insert some rooms."}</p>
  ) : (
    <table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Price</th>
          <th>Description</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {rooms.map(({ id, title, price, description, isEditing }) => {
          return isEditing === true ? (
            <tr key={id}>
              <td>
                <input
                  type="text"
                  defaultValue={title}
                  onChange={(e) => updateNewData(e, "title")}
                />
              </td>
              <td>
                <input
                  type="text"
                  defaultValue={price}
                  onChange={(e) => updateNewData(e, "price")}
                />
              </td>
              <td>
                <input
                  type="text"
                  defaultValue={description}
                  onChange={(e) => updateNewData(e, "description")}
                />
              </td>
              <td>
                <button className="btn green-btn" onClick={() => saveBtn()}>
                  Save
                </button>
                <button
                  className="btn default-btn"
                  onClick={() => cancelEdit(id)}
                >
                  Cancel
                </button>
              </td>
            </tr>
          ) : (
            <tr key={id}>
              <td>{title}</td>
              <td>{price}</td>
              <td>
                <button
                  className="btn"
                  onClick={() => detailPage(id)}
                >
                  More
                </button></td>
              <td>
                <button
                  className="btn default-btn"
                  onClick={() => enableEdit(id, title, price, description)}
                >
                  Edit
                </button>
                <button
                  className="btn red-btn"
                  onClick={() => deleteConfirm(id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default RoomList;