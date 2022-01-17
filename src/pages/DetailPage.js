import React from "react";
import { useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import { Actions } from "../Actions";

// Page with More information
export const DetailPage = (props) => {

  const Id = useParams();

  const { rooms } = Actions();

  const room = rooms.find((item) => (item.id = Id));

// # for booking room
  const saveBtn = () => {
    alert("Room booked!");
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
        {/* <tr key={room.id}>
          <td>{room.title}</td>
          <td>{room.price}</td>
          <td>{room.description}</td>
          <td>
            <Button variant="primary" onClick={() => saveBtn()}>
              Book a room
            </Button>
          </td>
        </tr> */}
        {rooms.map(({ id, title, price, description, isEditing }) => {
          return (
            <tr key={id}>
              <td>{title}</td>
              <td>{price}</td>
              <td>{description}</td>
              <td>
                <Button variant="primary" onClick={() => saveBtn()}>
                  Book a room
                </Button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
