import React from "react";
import DaumPostcode from "react-daum-postcode";
import { console } from "next/dist/compiled/@edge-runtime/primitives/console";
import { useSelector, useDispatch } from "react-redux";

const Postcode = ({ address_static, get_data }) => {
  const handleComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }
    get_data(fullAddress);
  };

  const postCodeStyle = {
    display: "block",
    position: "relative",
    top: "20%",
    width: "400px",
    height: "400px",
    padding: "7px",
    zIndex: 100,
  };

  return (
    <>
      <DaumPostcode
        style={postCodeStyle}
        autoClose
        onComplete={handleComplete}
      />
    </>
  );
};

export default Postcode;
