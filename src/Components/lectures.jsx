import React, { useEffect, useState } from "react";
import AddNewLecture from "./addNewLecture";
import Lecture from "./lecture";
import ExportExcelL from './ExportExcelL';

export default function Lectures() {
  const [lectureList, setLectureList] = useState([]);

  const handleSetLectureList = (data) => {
    setLectureList((prevList) => [...prevList, data]);
  };

  const handleDeleteLecture = (lecture) => {
    console.log(lecture, lectureList.filter(l => l.title !== lecture.titl))
    setLectureList(lectureList.filter(l => l.title !== lecture.title))
  }

  useEffect(() => {
    const lecturesString = localStorage.getItem("lectures");
    const lectureListData = JSON.parse(String(lecturesString));
    if (lectureListData) {
      setLectureList(lectureListData);
    }
  }, []);

  return (
    <div className="w-[70%] m-4">
      <header className="flex justify-between w-full">
        <h1 className="font-medium text-2xl">Lectures</h1>
        <AddNewLecture handleSetLectureList={handleSetLectureList} />
      </header>
      <div className=" w-full gap-2 grid grid-cols-[repeat(auto-fill,minmax(30%,1fr))]">
        {lectureList.map((lecture, index) => (
          <Lecture handleDeleteLecture={handleDeleteLecture} key={index} lectureData={lecture} />
        ))}
      </div>
      
        <div style={{ marginLeft: '39px' }}>
  <ExportExcelL lectureList={lectureList} />
</div> 
    </div>
  );
}
