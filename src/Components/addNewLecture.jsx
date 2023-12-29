import React, { useState } from "react";
import AddLectureModal from "./addLectureModal";
import RenderConflectAlert from "./conflectAlert";

export default function AddNewLecture({ handleSetLectureList }) {
  const [open, setOpen] = useState(false);
  const [isConflect, setIsConflect] = useState(false);

  const handleConflect = () => {
    setIsConflect(!isConflect);
    setTimeout(() => {
      setIsConflect(false);
    }, 3500);
  };

  function renderModal() {
    if (open)
      return (
        <AddLectureModal
          isConflect={isConflect}
          handleConflect={handleConflect}
          handleSetLectureList={handleSetLectureList}
          handleToggleModal={() => setOpen(!open)}
        />
      );
  }

  return (
    <>
      {renderModal()}
      <RenderConflectAlert
        isConflect={isConflect}
        handleConflect={handleConflect}
      />
      <button
        onClick={() => setOpen(true)}
        className="font-medium p-2 text-lg hover:opacity-90 realteive hover:-mt-1 hover:mb-1 ease-in-out duration-75 hover:pb-2 underline"
      >
        +Add new
      </button>
    </>
  );
}
