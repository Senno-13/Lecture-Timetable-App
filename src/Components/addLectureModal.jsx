import { useEffect, useState } from "react";
import { Input } from "./ui/input";
import Modal from "./ui/modal";
import Select from "./ui/select";

export default function AddLectureModal({
  handleToggleModal,
  handleSetLectureList,
  handleConflect,
}) {
  const [newLecture, setNewLecture] = useState({
    title: "",
    instructor: "",
    date: new Date(),
    time: new Date().getTime(),
    hall: "",
    course: "",
    note: "",
  });

  const [formSelectData, setFormSelectData] = useState({
    rooms: [],
    tutors: [],
    courses: [],
  });

  const handleInputChange = (key, value) => {
    if (key === "tutors") {
      // Handle tutor selection separately to update formSelectData
      setFormSelectData({
        ...formSelectData,
        tutors: value,
      });
    } else {
      setNewLecture({
        ...newLecture,
        [key]: value,
      });
    }
  };

  useEffect(() => {
    const roomsString = localStorage.getItem("roomData");
    const tutorsString = localStorage.getItem("tutorData");
    const coursesString = localStorage.getItem("courseData");
    const rooms = JSON.parse(roomsString);
    const tutors = JSON.parse(tutorsString);
    const courses = JSON.parse(coursesString);
    setFormSelectData({
      rooms,
      courses,
      tutors,
    });
  }, []);

  const convertTimeToMinutes = (time) => {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
  };

  const checkAvailability = (lectures, newLecture) => {
    if (lectures.length === 0) return false;
  
    const newLectureTimeInMinutes = convertTimeToMinutes(newLecture.time);
  
    for (const lecture of lectures) {
      console.log(
        lecture.time,
        newLecture.time,
        Math.abs(
          convertTimeToMinutes(lecture.time) - newLectureTimeInMinutes
        ),
        "<==="
      );
  
      if (lecture.hall.toLowerCase() === newLecture.hall.toLowerCase()) {
        if (lecture.date === newLecture.date) {
          // Use Math.abs to get the absolute difference between times
          if (
            Math.abs(
              convertTimeToMinutes(lecture.time) - newLectureTimeInMinutes
            ) < 120 // 2 hours in minutes
          ) {
            return true; // Conflict within 2 hours
          }
        }
      } else {
        return false;
      }
    }
  
    return false; // No conflicts found
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    // Retrieve lectures from localStorage
    const lectures = JSON.parse(localStorage.getItem("lectures")) || [];

    // Add the new lecture to the array

    if (checkAvailability(lectures, newLecture)) {
      return handleConflect();
    } else {
      const newLectureData = { ...newLecture };
      lectures.push(newLectureData);
      localStorage.setItem("lectures", JSON.stringify(lectures));
      handleSetLectureList(newLectureData);
      // Reset the form after saving
      setNewLecture({
        title: "",
        instructor: "",
        date: new Date(),
        time: new Date().getTime(),
        hall: "",
        instruments: "",
      });
      handleToggleModal();
    }
  };

  return (
    <Modal handleCloseShiftModal={handleToggleModal}>
      <div className="bg-white p-6 min-w-[350px] min-h-[250px] w-[50%] h-[70%] rounded-xl">
        <div className="flex justify-between items-center">
          <p className="font-medium text-xl">New lecture</p>
          <button
            onClick={() => handleToggleModal()}
            className="font-bold text-lg "
          >
            x
          </button>
        </div>
        <form
          onSubmit={handleSubmit}
          className="space-y-2 mt-4 flex flex-col  items-center"
        >
          <div className="flex gap-2 w-full">
            <Input
              onChange={(e) => handleInputChange(e.target.name, e.target.value)}
              name="title"
              value={newLecture.title}
              placeholder="Lecture title"
              required
            />
            <Select
              options={formSelectData.tutors}
              handleChange={handleInputChange}
              name="Select a Tutor"
              fieldKey="instructor"
            />
          </div>
          <div className="flex gap-2 w-full">
            <Input
              onChange={(e) => handleInputChange(e.target.name, e.target.value)}
              name="date"
              value={newLecture.date}
              placeholder="Date"
              type="date"
              required
            />
            <Input
              onChange={(e) => handleInputChange(e.target.name, e.target.value)}
              name="time"
              value={newLecture.time}
              placeholder="Date"
              type="time"
              required
            />
          </div>
          <div className="flex gap-2 w-full">
            <Select
              options={formSelectData.rooms}
              handleChange={handleInputChange}
              name="Select a Room"
              fieldKey="hall"
            />
            <Select
              options={formSelectData.courses}
              handleChange={handleInputChange}
              name="Select a Course"
              fieldKey="course"
            />
          </div>
          <textarea
            onChange={(e) => handleInputChange("note", e.target.value)}
            className=" max-h-[100px] h-24 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="Notes.."
            maxLength={200}
          />
          <button className="relative top-2 bg-[#0A0B0C]  text-white py-2 px-8 rounded-xl text-base">
            Submit
          </button>
        </form>
      </div>
    </Modal>
  );
}
