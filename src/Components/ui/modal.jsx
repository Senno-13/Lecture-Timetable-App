import { useCallback, useRef, useEffect } from "react";

export default function Modal({ children, handleCloseShiftModal }) {
  const overlay = useRef(null);
  const wrapper = useRef(null);

  const onDismiss = useCallback(() => {
    handleCloseShiftModal();
  }, [handleCloseShiftModal]);

  const onClick = useCallback(
    (e) => {
      if (e.target === overlay.current || e.target === wrapper.current) {
        if (onDismiss) onDismiss();
      }
    },
    [onDismiss, overlay, wrapper]
  );

  const onKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape") onDismiss();
    },
    [onDismiss]
  );

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onKeyDown]);

  return (
    <div
      ref={overlay}
      className="fixed left-0 right-0 px-4 sm:px-0 top-0 bottom-0 bg-black/70 z-40 flex justify-center items-center h-full w-full"
      onClick={onClick}
    >
      <div
        ref={wrapper}
        className="w-full sm:w-1/2 h-[85vh] sm:h-[80%] flex justify-center items-center"
      >
        {children}
      </div>
    </div>
  );
}
