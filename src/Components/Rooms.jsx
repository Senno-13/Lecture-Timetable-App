import React, { useState, useEffect } from "react";
import GenerateRReportButton from "./GenerateRReportButton";
import RenderConflectAlert from "./conflectAlert";
import { checkConflict } from "./helpers/localstorage";

export default function Rooms() {
  const [isConflect, setIsConflect] = useState(false);

  const handleConflect = () => {
    setIsConflect(!isConflect);
    setTimeout(() => {
      setIsConflect(false);
    }, 3500);
  };
  const saveDataToLocalStorage = (data) => {
    localStorage.setItem("roomData", JSON.stringify(data));
  };

  const loadDataFromLocalStorage = () => {
    const storedData = localStorage.getItem("roomData");
    return storedData ? JSON.parse(storedData) : [];
  };

  useEffect(() => {
    setRoomData(loadDataFromLocalStorage());
  }, []);

  const [roomData, setRoomData] = useState([]);
  const [room, setRoom] = useState({
    roomNumber: "",
    name: "",
    capacity: "",
  });
  const [selectedRow, setSelectedRow] = useState(null);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (
      (name === "capacity" || name === "roomNumber") &&
      !/^\d{0,2}$|^100$/.test(value)
    ) {
      // Handle invalid input for 'capacity' and 'roomNumber'
      return;
    }

    // Handle input for all other fields
    setRoom({ ...room, [name]: value });
  };

  const handleAddRoom = () => {
    if (checkConflict("roomData", room)) {
      if (room.roomNumber && room.name && room.capacity) {
        const newRoom = {
          ...room,
          id: roomData.length + 1,
        };
        setRoomData((prevData) => {
          const updatedData = [...prevData, newRoom];
          saveDataToLocalStorage(updatedData);
          return updatedData;
        });

        saveDataToLocalStorage([...roomData, newRoom]); // Saving to local storage

        // Clearing input fields after adding the course
        setRoom({
          roomNumber: "",
          name: "",
          capacity: "",
        });
      }
    } else {
      handleConflect();
    }
  };

  const handleEdit = () => {
    if (selectedRow !== null) {
      const roomToEdit = roomData.find((item) => item.id === selectedRow);
      if (roomToEdit) {
        setRoom({
          roomNumber: roomToEdit.roomNumber,
          name: roomToEdit.name,
          capacity: roomToEdit.capacity,
        });
      }
    }
  };

  const handleUpdate = () => {
    if (selectedRow !== null) {
      const updatedRoomData = roomData.map((item) => {
        if (item.id === selectedRow) {
          return { ...room, id: selectedRow };
        }
        return item;
      });
      setRoomData(updatedRoomData);
      setRoom({
        roomNumber: "",
        name: "",
        capacity: "",
      });
      setSelectedRow(null);
    }
  };

  const handleDelete = () => {
    if (selectedRow !== null) {
      const updatedRoomData = roomData.filter(
        (item) => item.id !== selectedRow
      );
      setRoomData(updatedRoomData);
      saveDataToLocalStorage(updatedRoomData); // Save updated data after deletion
      setSelectedRow(null);
    }
  };

  const handleRowClick = (id) => {
    setSelectedRow(id);
  };

  return (
    <>
      <RenderConflectAlert
        isConflect={isConflect}
        handleConflect={handleConflect}
      />
      <div className="courses-container" style={{ padding: "40px" }}>
        <div
          style={{
            backgroundColor: "#4a4a4a",
            borderRadius: "4px",
            marginBottom: "30px",
            padding: "20px",
            width: "1000px",
          }}
        >
          <h1
            style={{
              margin: "0",
              fontWeight: "bold",
              color: "#ffffff",
              fontSize: "24px",
              textTransform: "uppercase",
              letterSpacing: "2px",
              fontFamily: "Arial, sans-serif",
            }}
          >
            Rooms
          </h1>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div
            className="left-section"
            style={{ width: "45%", paddingRight: "20px", marginTop: "20px" }}
          >
            <div
              className="input-field"
              style={{
                marginBottom: "20px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <label
                htmlFor="roomNumber"
                style={{
                  width: "100px",
                  textAlign: "right",
                  marginRight: "10px",
                }}
              >
                Room Number
              </label>
              <input
                type="number"
                id="roomNumber"
                name="roomNumber"
                value={room.roomNumber}
                onChange={handleInputChange}
                max="100"
                style={{
                  flex: 1,
                  borderRadius: "5px",
                  padding: "8px",
                  border: "1px solid #ccc",
                  width: "100%",
                  marginBottom: "10px",
                }}
              />
            </div>

            <div
              className="input-field"
              style={{
                marginBottom: "20px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <label
                htmlFor="name"
                style={{
                  width: "100px",
                  textAlign: "right",
                  marginRight: "10px",
                }}
              >
                Room Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={room.name}
                onChange={handleInputChange}
                style={{
                  flex: 1,
                  borderRadius: "5px",
                  padding: "8px",
                  border: "1px solid #ccc",
                  width: "100%",
                  marginBottom: "10px",
                }}
              />
            </div>

            <div
              className="input-field"
              style={{
                marginBottom: "20px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <label
                htmlFor="capacity"
                style={{
                  width: "100px",
                  textAlign: "right",
                  marginRight: "10px",
                }}
              >
                Capacity
              </label>
              <input
                type="number"
                id="capacity"
                name="capacity"
                value={room.capacity}
                onChange={handleInputChange}
                max="100"
                style={{
                  flex: 1,
                  borderRadius: "5px",
                  padding: "8px",
                  border: "1px solid #ccc",
                  width: "100%",
                  marginBottom: "10px",
                }}
              />
            </div>

            <button
              onClick={handleAddRoom}
              style={{
                width: "100%",
                marginBottom: "10px",
                backgroundColor: "#007bff",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                padding: "10px",
                cursor: "pointer",
              }}
            >
              Add Room
            </button>
            <div
              className="small-buttons"
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                marginTop: "-5px",
                marginBottom: "10px",
              }}
            >
              <button
                onClick={handleEdit}
                style={{
                  width: "30%",
                  backgroundColor: "#007bff",
                  color: "#fff",
                  border: "none",
                  borderRadius: "5px",
                  padding: "10px",
                  cursor: "pointer",
                }}
              >
                Edit
              </button>
              <button
                onClick={handleUpdate}
                style={{
                  width: "30%",
                  backgroundColor: "#007bff",
                  color: "#fff",
                  border: "none",
                  borderRadius: "5px",
                  padding: "10px",
                  cursor: "pointer",
                }}
              >
                Update
              </button>
              <button
                onClick={handleDelete}
                style={{
                  width: "30%",
                  backgroundColor: "#007bff",
                  color: "#fff",
                  border: "none",
                  borderRadius: "5px",
                  padding: "10px",
                  cursor: "pointer",
                }}
              >
                Delete
              </button>
            </div>

            {/* Generate Report Button (Fixed below small buttons) */}
            <GenerateRReportButton />
          </div>

          <div
            className="right-section"
            style={{ width: "55%", marginTop: "0px" }}
          >
            <table
              style={{
                width: "100%",
                borderSpacing: "0",
                borderCollapse: "collapse",
                marginTop: "20px",
              }}
            >
              <thead>
                <tr>
                  <th
                    style={{
                      backgroundColor: "#007bff",
                      color: "#fff",
                      padding: "15px 30px",
                      textAlign: "left",
                      fontWeight: "normal",
                      borderRadius: "1px",
                      paddingTop: "12px",
                      paddingBottom: "12px",
                    }}
                  >
                    ID
                  </th>
                  <th
                    style={{
                      backgroundColor: "#007bff",
                      color: "#fff",
                      padding: "15px 30px",
                      textAlign: "left",
                      fontWeight: "normal",
                      borderRadius: "1px",
                      paddingTop: "12px",
                      paddingBottom: "12px",
                    }}
                  >
                    Room Number
                  </th>
                  <th
                    style={{
                      backgroundColor: "#007bff",
                      color: "#fff",
                      padding: "15px 30px",
                      textAlign: "left",
                      fontWeight: "normal",
                      borderRadius: "1px",
                      paddingTop: "12px",
                      paddingBottom: "12px",
                      width: "20%",
                      paddingRight: "0",
                    }}
                  >
                    Room Name
                  </th>
                  <th
                    style={{
                      backgroundColor: "#007bff",
                      color: "#fff",
                      padding: "15px 30px",
                      textAlign: "left",
                      fontWeight: "normal",
                      borderRadius: "1px",
                      paddingTop: "12px",
                      paddingBottom: "12px",
                      width: "20%",
                      paddingRight: "0",
                    }}
                  >
                    Capacity
                  </th>
                </tr>
              </thead>
              <tbody>
                {roomData.map((room) => (
                  <tr
                    key={room.id}
                    onClick={() => handleRowClick(room.id)}
                    style={{
                      cursor: "pointer",
                      background:
                        selectedRow === room.id ? "#b3d9ff" : "inherit",
                    }}
                  >
                    <td
                      style={{
                        borderBottom: "1px solid #ccc",
                        padding: "15px 30px",
                        cursor: "pointer",
                        transition: "background-color 0.3s ease",
                      }}
                    >
                      {room.id}
                    </td>
                    <td
                      style={{
                        borderBottom: "1px solid #ccc",
                        padding: "15px 30px",
                        cursor: "pointer",
                        transition: "background-color 0.3s ease",
                      }}
                    >
                      {room.roomNumber}
                    </td>
                    <td
                      style={{
                        borderBottom: "1px solid #ccc",
                        padding: "15px 30px",
                        cursor: "pointer",
                        transition: "background-color 0.3s ease",
                      }}
                    >
                      {room.name}
                    </td>
                    <td
                      style={{
                        borderBottom: "1px solid #ccc",
                        padding: "15px 30px",
                        cursor: "pointer",
                        transition: "background-color 0.3s ease",
                      }}
                    >
                      {room.capacity}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
const styles = {
  container: {
    padding: "40px",
  },
  titleRect: {
    backgroundColor: "#4a4a4a",
    borderRadius: "4px",
    marginBottom: "30px",
    padding: "20px",
    width: "1000px",
  },
  title: {
    margin: "0",
    fontWeight: "bold",
    color: "#ffffff",
    fontSize: "24px",
    textTransform: "uppercase",
    letterSpacing: "2px",
    fontFamily: "Arial, sans-serif",
  },
  sections: {
    display: "flex",
    justifyContent: "space-between",
  },
  leftSection: {
    width: "45%",
    paddingRight: "20px",
    marginTop: "20px", // Aligns the beginning of the left section with the right section
  },
  inputField: {
    marginBottom: "20px",
    display: "flex",
    alignItems: "center",
  },
  label: {
    width: "100px",
    textAlign: "right",
    marginRight: "10px",
  },
  input: {
    flex: 1,
    borderRadius: "5px",
    padding: "8px",
    border: "1px solid #ccc",
    width: "100%",
    marginBottom: "10px",
  },
  button: {
    width: "100%",
    marginBottom: "10px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    padding: "10px",
    cursor: "pointer",
  },
  smallButtons: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    marginTop: "-5px",
    marginBottom: "10px",
  },
  rightSection: {
    width: "55%",
    marginTop: "0px",
  },
  table: {
    width: "100%",
    borderSpacing: "0",
    borderCollapse: "collapse",
    marginTop: "20px",
  },
  tableHead: {
    backgroundColor: "#007bff",
    color: "#fff",
    padding: "15px 30px", // Wider padding for column separation
    textAlign: "left",
    fontWeight: "normal",
    borderRadius: "1px",
    paddingTop: "12px",
    paddingBottom: "12px",
  },
  tableCell: {
    borderBottom: "1px solid #ccc",
    padding: "15px 30px", // Wider padding for column separation
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
};
