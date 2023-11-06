import { Checkbox } from "@nextui-org/react";
import { forwardRef, useEffect, useState } from "react";
import "./item.css";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

const Item = forwardRef(
  (
    {
      id,
      index,
      deleteImg,
      setDeleteImg,
      withOpacity,
      isDragging,
      style,
      ...props
    },
    ref
  ) => {
    const [hoverd, setHovered] = useState(false);
    const [seleted, setSeleted] = useState(deleteImg?.includes(id));

    useEffect(() => {
      setSeleted(deleteImg?.includes(id));
    }, [deleteImg, id]);

    // Delete image function
    const handleDeletedImages = () => {
      const updatedDeletedImg = [...deleteImg];
      const isCurrentlySelected = updatedDeletedImg?.includes(id);

      if (isCurrentlySelected) {
        updatedDeletedImg?.splice(updatedDeletedImg?.indexOf(id), 1);
      } else {
        updatedDeletedImg?.push(id);
      }

      setDeleteImg(updatedDeletedImg);
      setSeleted(!isCurrentlySelected);
      if (seleted) {
        toast.error("Images unselected!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        toast.success(" Images select successful !", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    };

    // Inline style
    const inlineStyle = {
      opacity: withOpacity ? "0.5" : "1",
      transformOrigin: "0% 0%",
      height: `${index === 0 ? "300px" : "140px"}`,
      width: `${index === 0 ? "300px" : "140px"}`,
      borderRadius: "12px",
      gridColumn: `${index === 0 ? "1 / span 2" : ""}`,
      gridRow: `${index === 0 ? "1 / span 2" : ""}`,
      cursor: isDragging ? "grabbing" : "grab",
      backgroundColor: "#ffffff",
      display: "flex",
      justifyContent: "center",
      touchAction: "none",
      alignItems: "center",
      border: "1px solid #b6b6b6c2",
      boxShadow: isDragging
        ? "rgb(63 63 68 / 5%) 0px 2px 0px 2px, rgb(34 33 81 / 15%) 0px 2px 3px 2px"
        : "rgb(63 63 68 / 5%) 0px 0px 0px 1px, rgb(34 33 81 / 15%) 0px 1px 3px 0px",
      transform: isDragging ? "scale(1.05)" : "scale(1)",
      ...style,
    };

    return (
      <>
        <div
          ref={ref}
          {...props}
          style={inlineStyle}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className={`relative hidden md:flex ${
            seleted ? "border-2 border-red-500" : ""
          }`}
        >
          <img className={`rounded-[12px]`} src={id} alt="" />
          <Checkbox
            isSelected={seleted}
            name={name}
            id={id}
            className={`absolute top-2 left-2 ${seleted ? "selectedImg" : ""} ${
              hoverd ? "" : "md:hidden"
            } border-2 border-[gary] rounded ${
              seleted ? "bg-[#0000ffd6] text-white" : "bg-white"
            } h-[18px] w-[18px] z-50`}
            onValueChange={handleDeletedImages}
          />

          {hoverd && (
            <>
              <div
                className={`absolute  rounded-[10px] inset-0  bg-[#363636ae] pointer-events-none z-10`}
              ></div>
            </>
          )}
          {seleted && (
            <>
              <div
                className={`absolute  rounded-[10px] inset-0  bg-[#cecece84] pointer-events-none z-10`}
              ></div>
            </>
          )}
        </div>
      </>
    );
  }
);

export default Item;
