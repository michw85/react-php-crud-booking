import { useEffect, useState } from "react";

export const Actions = () => {
  let [rooms, setRooms] = useState([]);

    //roomLength is for showing the Data Loading message.
  let [roomLength, setRoomLength] = useState(null);
   // {mode: 'no-cors'} in php!
  useEffect(() => {
    fetch("http://php-react/all-rooms.php")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        // console.log(data);
        if (data.success) {
          setRooms(data.rooms);
          // setRooms(data.rooms.reverse());
          setRoomLength(true);
        } 
        else {
          setRoomLength(0);
        }
        // return data;
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // Inserting a new room into the database.
  const insertRoom = (newRoom) => {
    fetch("http://php-react/add-room.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newRoom),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.id) {
          setRooms([
            {
              id: data.id,
              ...newRoom,
            },
            ...rooms,
          ]);
          setRoomLength(true);
        } else {
          alert(data.msg);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Enabling the edit mode for a listed room.
  const editMode = (id) => {
    rooms = rooms.map((room) => {
      if (room.id === id) {
        room.isEditing = true;
        return room;
      }
      room.isEditing = false;
      return room;
    });
    setRooms(rooms);
  };

  // Cance the edit mode.
  const cancelEdit = (id) => {
    rooms = rooms.map((room) => {
      if (room.id === id) {
        room.isEditing = false;
        return room;
      }
      return room;
    });
    setRooms(rooms);
  };

  // Updating a room.
  const updateRoom = (roomData) => {
    fetch("http://php-react/update-room.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(roomData),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.success) {
          rooms = rooms.map((room) => {
            if (room.id === roomData.id) {
              room.isEditing = false;
              room.room_title = roomData.room_title;
              room.room_price = roomData.room_price;
              room.room_description = roomData.room_description;
              return room;
            }
            return room;
          });
          setRooms(rooms);
        } else {
          alert(data.msg);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Deleting a room.
  const deleteRoom = (theID) => {
      // filter outing the room.
    let roomDeleted = rooms.filter((room) => {
      return room.id !== theID;
    });
    fetch("http://php-react/delete-room.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: theID }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.success) {
          setRooms(roomDeleted);
          if (rooms.length === 1) {
            setRoomLength(0);
          }
        } else {
          alert(data.msg);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return {
    rooms,
    editMode,
    cancelEdit,
    updateRoom,
    insertRoom,
    deleteRoom,
    roomLength,
  };
};