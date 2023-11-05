import { forwardRef, useEffect, useState } from "react";

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

    const handleDeletedImages = () => {
      const updadeDeleteImg = [...deleteImg];
      const isCurrentSelected = updadeDeleteImg?.includes(id);
      if (isCurrentSelected) {
        updadeDeleteImg?.splice(updadeDeleteImg?.indexOf(id), 1);
      } else {
        updadeDeleteImg?.push(id);
      }

      setDeleteImg(updadeDeleteImg);
      setSeleted(!isCurrentSelected);
    };

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
          style={inlineStyle}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className={`relative hidden md:flex ${
            seleted ? "border-2 border-red-500" : ""
          }`}
        >
          <img className="rounded-[12px]" src={id} alt="" />
        </div>
      </>
    );
  }
);

export default Item;
