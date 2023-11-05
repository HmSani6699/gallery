import { useState } from "react";

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
// Card import end //

// React Dnd kit import start //
import { DndContext, DragOverlay } from "@dnd-kit/core";
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";
import Card from "./Card/Card";
import Item from "../Component/Item";

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

  return (
    <div className="max-w-5xl mx-auto mt-6 bg-white rounded-md">
      {/* Main container start */}
      <div>
        {/* Header div start */}
        <div className="flex items-center justify-between px-5 pt-3.5">
          <h2 className="text-2xl font-bold">Gallery Master</h2>
          <button className="text-red-600 font-semibold ">Delete Image</button>
        </div>
        <div className="border-[1.5px] mt-5"></div>
        {/* Header div end */}

        {/* Callery containers start */}
        <div>
          <DndContext>
            <SortableContext items={items} strategy={rectSortingStrategy}>
              {items?.length !== 0 ? (
                <div>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mx-auto gap-5 px-[110px] py-7">
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
                      <img className="w-8 h-8" src={image1} alt="" />
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
    </div>
  );
};

export default Main;
