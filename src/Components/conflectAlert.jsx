export default function RenderConflectAlert({isConflect, handleConflect}) {
  return (
    <>
      {isConflect && (
        <div className=" z-50 max-w-[400px] font-semibold bg-red-500 text-white p-4  absolute top-6 right-6 rounded-lg flex justify-between flex-row-reverse items-start">
          <button
            onClick={() => handleConflect}
            className=" relative -top-4  -right-2 text-xl"
          >
            x
          </button>
          <p className="w-[95%] ">
            Can't add due to conflects, check if the hall is available first.
          </p>
        </div>
      )}
    </>
  );
}
