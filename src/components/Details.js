import React from "react";
// import { AppContext } from "../Context";
import { Button } from "react-bootstrap";

const Details = (room) => {
//   const { rooms, roomLength, editMode, cancelEdit, updateRoom, deleteRoom } =
//     useContext(AppContext);

   const saveBtn = () => {
    alert("Room booked!")
  };

  return (
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
        {/* {rooms.map(({ id, title, price, description }) => { */}
          return  (
            <tr key={room.id}>
              <td>{room.title}</td>
              <td>{room.price}</td>
              <td>{room.description}</td>
              <td>
                <Button
                  variant="primary"
                  onClick={() => saveBtn()}
                >
                  Book a room
                </Button>
              </td>
            </tr>
          );
        {/* })} */}
      </tbody>
    </table>
  );
};

export default Details;
