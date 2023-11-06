import { useCallback, useState } from "react";

// Card import start //
import image1 from "../../public/images/image-1.webp";
import image2 from "../../public/images/image-2.webp";
import image3 from "../../public/images/image-3.webp";
import image4 from "../../public/images/image-4.webp";
import image5 from "../../public/images/image-5.webp";
import image6 from "../../public/images/image-6.webp";
import image7 from "../../public/images/image-7.webp";
import image8 from "../../public/images/image-8.webp";
import image9 from "../../public/images/image-9.webp";
import image10 from "../../public/images/image-10.jpeg";
import image11 from "../../public/images/image-11.jpeg";
import success from "../../public/images/success.svg";
import gallery from "../../public/images/gallery.svg";
// Card import end //

// React Dnd kit import start //
import {
  DndContext,
  DragOverlay,
  MouseSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import Card from "./Card/Card";
import Item from "../Component/Item";
import Swal from "sweetalert2";
import { ToastContainer } from "react-toastify";

const Main = () => {
  const images = [
    image1,
    image2,
    image3,
    image4,
    image5,
    image6,
    image7,
    image8,
    image9,
    image10,
    image11,
  ];

  const [items, setItems] = useState(images);
  const [deleteImg, setDeleteImg] = useState([]);
  const [activeId, setActiveId] = useState([]);

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  // Drag start function
  const handleDragStart = useCallback((e) => {
    setActiveId(e.active.id);
  }, []);

  // Drag end function
  const handleDragEnd = useCallback((e) => {
    const { active, over } = e;
    if (active.id !== over?.id) {
      setItems((items) => {
        const oldIndex = items.indexOf(active?.id);
        const newIndex = items.indexOf(over?.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
    setActiveId(null);
  }, []);

  // Drag Cancle function
  const handleDragCancel = useCallback(() => {
    setActiveId(null);
  }, []);

  // Delete images function
  const handleDeleteImage = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't to Delelte all images!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const filteredImages = items.filter(
          (item) => !deleteImg.includes(item)
        );
        setDeleteImg([]);
        setItems(filteredImages);
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  };

  return (
    <div className="max-w-5xl lg:mx-auto m-3 lg:mt-6 bg-white rounded-md">
      {/* Main container start */}
      <div>
        {/* Header div start */}
        <div className="flex items-center justify-between px-5 pt-3.5">
          {deleteImg.length === 0 ? (
            <h2 className="text-2xl font-bold">Gallery Master</h2>
          ) : (
            <div className="flex gap-2 items-center">
              <img
                className="border-2 mt-1 border-[gray] rounded bg-[#0000ffd6]"
                src={success}
                alt=""
              />
              <h2 className="text-2xl font-bold">
                Select Images: {deleteImg.length}
              </h2>
            </div>
          )}
          <button
            onClick={handleDeleteImage}
            className="text-red-600 font-semibold "
          >
            Delete{" "}
          </button>
        </div>
        <div className="border-[1.5px] mt-5"></div>
        {/* Header div end */}

        {/* Callery containers start */}
        <div>
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDragCancel={handleDragCancel}
          >
            <SortableContext items={items} strategy={rectSortingStrategy}>
              {items?.length !== 0 ? (
                <div>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mx-auto gap-5 p-[37px] lg:px-[110px] lg:py-7">
                    {items.map((id, index) => {
                      return (
                        <Card
                          key={index}
                          deleteImg={deleteImg}
                          setDeleteImg={setDeleteImg}
                          index={index}
                          id={id}
                        />
                      );
                    })}
                    <div className="w-[144px] flex flex-col gap-2 rounded-[10px] cursor-pointer border-2 border-dashed border-slate-300 justify-center items-center h-[144px] bg-slate-100">
                      <img className="w-8 h-8" src={gallery} alt="" />
                      <h4>Add Images</h4>
                    </div>
                  </div>
                </div>
              ) : (
                <h2>Reload the page</h2>
              )}
            </SortableContext>
            <DragOverlay adjustScale style={{ transformOrigin: "0 0" }}>
              {activeId ? <Item id={activeId}></Item> : null}
            </DragOverlay>
          </DndContext>
        </div>
        {/* Callery containers end */}
      </div>
      {/* Main container end */}
      <ToastContainer />
    </div>
  );
};

export default Main;
