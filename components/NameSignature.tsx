import React, { useState } from "react";

export default function NameSignature() {
  const [fName, setFName] = useState("saad");
  const [lName, setLName] = useState("usmani");

  return (
    <div className="w-full flex justify-end mt-16 mb-4">
      <h1 className="text-[#6487B1] text-2xl font-bold hover:cursor-grab qahiri-regular">
      <span> created by
        </span>
        <span>
          id="ur-fname"
          onMouseEnter={() => setFName("سعد")}
          onMouseLeave={() => setFName("saad")}
          {fName} {" "}
        </span>
        <span
          className="text-[#005B96]"
          id="ur-lname"
          onMouseEnter={() => setLName("عثمانی")}
          onMouseLeave={() => setLName("usmani")}
        >
          {lName}
        </span>
      </h1>
    </div>
  );
}