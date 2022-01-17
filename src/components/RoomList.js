import { useContext, useState } from "react";
import { AppContext } from "../Context";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const RoomList = () => {
  const { rooms, roomLength, editMode, cancelEdit, updateRoom, deleteRoom } =
    useContext(AppContext);

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
    // navigate.push(`details/${id}`)
    // console.log(id);
  };

  // Search room
  const [value, setValue] = useState("");

  const filteredRooms = rooms.filter((room) => {
    return room.title.toLowerCase().includes(value.toLocaleLowerCase());
  });

  return !roomLength ? (
    <p>{roomLength === null ? "Loading..." : "Please insert some rooms."}</p>
  ) : (
    <>
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
          {filteredRooms.map(({ id, title, price, description, isEditing }) => {
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
                  <Button
                    variant="primary"
                    className="btn green-btn"
                    onClick={() => saveBtn()}
                  >
                    Save
                  </Button>
                  <Button
                    variant="secondary"
                    className="btn default-btn"
                    onClick={() => cancelEdit(id)}
                  >
                    Cancel
                  </Button>
                </td>
              </tr>
            ) : (
              <tr key={id}>
                <td>{title}</td>
                <td>{price}</td>
                <td>
                  <Link to={`/details/${id}`}>
                    {/* <Link to={{
                pathname: `details/${id}`,
                state: {
                  description: title
                }
                }}> */}
                    <Button
                      variant="success"
                      className="btn"
                      // onClick={() =>detailPage(id)}
                    >
                      More
                    </Button>
                  </Link>
                </td>
                <td>
                  <Button
                    variant="warning"
                    className="btn default-btn"
                    onClick={() => enableEdit(id, title, price, description)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    className="btn red-btn"
                    onClick={() => deleteConfirm(id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <form className="searchForm">
        <input
          type="text"
          placeholder="room search"
          className="seqrchInput"
          onChange={(event) => setValue(event.target.value)}
        ></input>
        <input type="submit" value="Search" />
      </form>
    </>
  );
};

export default RoomList;
