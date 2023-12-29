import React, { useState, useEffect } from "react";
import GenerateTReportButton from "./GenerateTReportButton";
import RenderConflectAlert from "./conflectAlert";
import { checkConflict } from "./helpers/localstorage";

export default function Tutors() {
  const [isConflect, setIsConflect] = useState(false);

  const handleConflect = () => {
    setIsConflect(!isConflect);
    setTimeout(() => {
      setIsConflect(false);
    }, 3500);
  };
  const saveDataToLocalStorage = (data) => {
    localStorage.setItem("tutorData", JSON.stringify(data));
  };

  const loadDataFromLocalStorage = () => {
    const storedData = localStorage.getItem("tutorData");
    return storedData ? JSON.parse(storedData) : [];
  };

  useEffect(() => {
    setTutorData(loadDataFromLocalStorage());
  }, []);

  const [tutorData, setTutorData] = useState([]);
  const [tutor, setTutor] = useState({
    tutorPhone: "",
    name: "",
    units: "",
  });
  const [selectedRow, setSelectedRow] = useState(null);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "units" && /^(?!0)\d{0,3}$|^1000$/.test(value)) {
      setTutor({ ...tutor, [name]: value });
    } else if (name !== "units") {
      setTutor({ ...tutor, [name]: value });
    }
  };

  const handleAddTutor = () => {
    if (checkConflict("tutorData", tutor)) {
      if (tutor.tutorPhone && tutor.name && tutor.units) {
        const newTutor = {
          ...tutor,
          id: tutorData.length + 1,
        };
        setTutorData((prevData) => {
          const updatedData = [...prevData, newTutor];
          saveDataToLocalStorage(updatedData);
          return updatedData;
        });

        saveDataToLocalStorage([...tutorData, newTutor]); // Saving to local storage

        // Clearing input fields after adding the course
        setTutor({
          tutorPhone: "",
          name: "",
          units: "",
        });
      }
    } else {
      handleConflect();
    }
  };

  const handleEdit = () => {
    if (selectedRow !== null) {
      const tutorToEdit = tutorData.find((item) => item.id === selectedRow);
      if (tutorToEdit) {
        setTutor({
          tutorPhone: tutorToEdit.tutorPhone,
          name: tutorToEdit.name,
          units: tutorToEdit.units,
        });
      }
    }
  };

  const handleUpdate = () => {
    if (selectedRow !== null) {
      const updatedTutorData = tutorData.map((item) => {
        if (item.id === selectedRow) {
          return { ...tutor, id: selectedRow };
        }
        return item;
      });
      setTutorData(updatedTutorData);
      setTutor({
        tutorPhone: "",
        name: "",
        units: "",
      });
      setSelectedRow(null);
    }
  };

  const handleDelete = () => {
    if (selectedRow !== null) {
      const updatedTutorData = tutorData.filter(
        (item) => item.id !== selectedRow
      );
      setTutorData(updatedTutorData);
      saveDataToLocalStorage(updatedTutorData); // Save updated data after deletion
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
      <div className="tutors-container" style={{ padding: "40px" }}>
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
            Tutors
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
                htmlFor="tutorPhone"
                style={{
                  width: "100px",
                  textAlign: "right",
                  marginRight: "10px",
                }}
              >
                Phone no.
              </label>
              <input
                type="text"
                id="tutorPhone"
                name="tutorPhone"
                value={tutor.tutorPhone}
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
                htmlFor="name"
                style={{
                  width: "100px",
                  textAlign: "right",
                  marginRight: "10px",
                }}
              >
                Tutor Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={tutor.name}
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
                htmlFor="Course_Id"
                style={{
                  width: "100px",
                  textAlign: "right",
                  marginRight: "10px",
                }}
              >
                Course_Id
              </label>
              <input
                type="number"
                id="Course_Id"
                name="units"
                value={tutor.units}
                onChange={handleInputChange}
                max="15"
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
              onClick={handleAddTutor}
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
              Add Tutor
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
            <GenerateTReportButton />
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
                    Phone Number
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
                    Tutor Name
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
                    Course_Id
                  </th>
                </tr>
              </thead>
              <tbody>
                {tutorData.map((tutor) => (
                  <tr
                    key={tutor.id}
                    onClick={() => handleRowClick(tutor.id)}
                    style={{
                      cursor: "pointer",
                      background:
                        selectedRow === tutor.id ? "#b3d9ff" : "inherit",
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
                      {tutor.id}
                    </td>
                    <td
                      style={{
                        borderBottom: "1px solid #ccc",
                        padding: "15px 30px",
                        cursor: "pointer",
                        transition: "background-color 0.3s ease",
                      }}
                    >
                      {tutor.tutorPhone}
                    </td>
                    <td
                      style={{
                        borderBottom: "1px solid #ccc",
                        padding: "15px 30px",
                        cursor: "pointer",
                        transition: "background-color 0.3s ease",
                      }}
                    >
                      {tutor.name}
                    </td>
                    <td
                      style={{
                        borderBottom: "1px solid #ccc",
                        padding: "15px 30px",
                        cursor: "pointer",
                        transition: "background-color 0.3s ease",
                      }}
                    >
                      {tutor.units}
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
