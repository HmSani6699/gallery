import React from "react";

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

const Main = () => {
  return (
    <div className="max-w-6xl mx-auto mt-6 bg-white rounded-md">
      {/* Main container start */}
      <div>
        {/* Header div start */}
        <div className="flex items-center justify-between px-2">
          <h2 className="text-2xl font-bold ">Gallery Master</h2>
          <button className="text-red-600 font-semibold ">Delete Image</button>
        </div>
        {/* Header div end */}
      </div>
      {/* Main container end */}
    </div>
  );
};

export default Main;
