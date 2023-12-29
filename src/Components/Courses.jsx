import React, { useState, useEffect } from "react";
import GenerateReportButton from "../Components/GenerateCReportButton";
import { checkConflict } from "../Components/helpers/localstorage.js";
import RenderConflectAlert from "../Components/conflectAlert";

function Courses() {
  const [isConflect, setIsConflect] = useState(false);

  const handleConflect = () => {
    setIsConflect(!isConflect);
    setTimeout(() => {
      setIsConflect(false);
    }, 3500);
  };

  const saveDataToLocalStorage = (data) => {
    localStorage.setItem("courseData", JSON.stringify(data));
  };

  const loadDataFromLocalStorage = () => {
    const storedData = localStorage.getItem("courseData");
    return storedData ? JSON.parse(storedData) : [];
  };

  useEffect(() => {
    setCourseData(loadDataFromLocalStorage());
  }, []);

  const [courseData, setCourseData] = useState([]);
  const [course, setCourse] = useState({
    courseCode: "",
    name: "",
    units: "",
  });
  const [selectedRow, setSelectedRow] = useState(null);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "units" && /^\d{0,2}$|^15$/.test(value)) {
      setCourse({ ...course, [name]: value });
    } else if (name !== "units") {
      setCourse({ ...course, [name]: value });
    }
  };

  const handleAddCourse = () => {
    if (checkConflict("courseData", course)) {
      if (course.courseCode && course.name && course.units) {
        const newCourse = {
          ...course,
          id: courseData.length + 1,
        };
        setCourseData((prevData) => {
          const updatedData = [...prevData, newCourse];
          saveDataToLocalStorage(updatedData);
          return updatedData;
        });

        saveDataToLocalStorage([...courseData, newCourse]); // Saving to local storage

        // Clearing input fields after adding the course
        setCourse({
          courseCode: "",
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
      const courseToEdit = courseData.find((item) => item.id === selectedRow);
      if (courseToEdit) {
        setCourse({
          courseCode: courseToEdit.courseCode,
          name: courseToEdit.name,
          units: courseToEdit.units,
        });
      }
    }
  };

  const handleUpdate = () => {
    if (selectedRow !== null) {
      const updatedCourseData = courseData.map((item) => {
        if (item.id === selectedRow) {
          return { ...course, id: selectedRow };
        }
        return item;
      });
      setCourseData(updatedCourseData);
      setCourse({
        courseCode: "",
        name: "",
        units: "",
      });
      setSelectedRow(null);
    }
  };

  const handleDelete = () => {
    if (selectedRow !== null) {
      const updatedCourseData = courseData.filter(
        (item) => item.id !== selectedRow
      );
      setCourseData(updatedCourseData);
      saveDataToLocalStorage(updatedCourseData); // Save updated data after deletion
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
            Courses
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
                htmlFor="courseCode"
                style={{
                  width: "100px",
                  textAlign: "right",
                  marginRight: "10px",
                }}
              >
                Course Code
              </label>
              <input
                type="text"
                id="courseCode"
                name="courseCode"
                value={course.courseCode}
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
                Course Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={course.name}
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
                htmlFor="units"
                style={{
                  width: "100px",
                  textAlign: "right",
                  marginRight: "10px",
                }}
              >
                Units
              </label>
              <input
                type="number"
                id="units"
                name="units"
                value={course.units}
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
              onClick={handleAddCourse}
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
              Add Course
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
            <GenerateReportButton />
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
                    Course Code
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
                    Course Name
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
                    Units
                  </th>
                </tr>
              </thead>
              <tbody>
                {courseData.map((course) => (
                  <tr
                    key={course.id}
                    onClick={() => handleRowClick(course.id)}
                    style={{
                      cursor: "pointer",
                      background:
                        selectedRow === course.id ? "#b3d9ff" : "inherit",
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
                      {course.id}
                    </td>
                    <td
                      style={{
                        borderBottom: "1px solid #ccc",
                        padding: "15px 30px",
                        cursor: "pointer",
                        transition: "background-color 0.3s ease",
                      }}
                    >
                      {course.courseCode}
                    </td>
                    <td
                      style={{
                        borderBottom: "1px solid #ccc",
                        padding: "15px 30px",
                        cursor: "pointer",
                        transition: "background-color 0.3s ease",
                      }}
                    >
                      {course.name}
                    </td>
                    <td
                      style={{
                        borderBottom: "1px solid #ccc",
                        padding: "15px 30px",
                        cursor: "pointer",
                        transition: "background-color 0.3s ease",
                      }}
                    >
                      {course.units}
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
export default Courses;
