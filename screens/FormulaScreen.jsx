import React from "react";
import { Image } from "react-native";
import styled from "styled-components/native";

import FormulaImage from "../assets/FormulaImage.jpg";

const FormulaScreen = ({ route }) => {
  let activeTooths = [];

  route.params.appointments.forEach((item) => {
    activeTooths = [...activeTooths, item.dentNumber];
  });

  const tooths = [
    { number: 11, top: 65, left: 155 },
    { number: 12, top: 75, left: 120 },
    { number: 13, top: 95, left: 85 },
    { number: 14, top: 125, left: 60 },
    { number: 15, top: 160, left: 40 },
    { number: 16, top: 195, left: 30 },
    { number: 17, top: 235, left: 20 },
    { number: 18, top: 270, left: 13 },

    { number: 21, top: 65, left: 195 },
    { number: 22, top: 75, left: 230 },
    { number: 23, top: 95, left: 270 },
    { number: 24, top: 125, left: 295 },
    { number: 25, top: 160, left: 315 },
    { number: 26, top: 195, left: 325 },
    { number: 27, top: 235, left: 335 },
    { number: 28, top: 270, left: 340 },

    { number: 41, top: 517, left: 165 },
    { number: 42, top: 515, left: 135 },
    { number: 43, top: 505, left: 105 },
    { number: 44, top: 485, left: 75 },
    { number: 45, top: 450, left: 50 },
    { number: 46, top: 415, left: 30 },
    { number: 47, top: 375, left: 20 },
    { number: 48, top: 330, left: 13 },

    { number: 31, top: 517, left: 195 },
    { number: 32, top: 515, left: 225 },
    { number: 33, top: 505, left: 255 },
    { number: 34, top: 485, left: 280 },
    { number: 35, top: 450, left: 303 },
    { number: 36, top: 415, left: 318 },
    { number: 37, top: 375, left: 333 },
    { number: 38, top: 330, left: 340 },
  ];

  const checkActiveTooth = (tooth) => {
    let bool = 0;
    activeTooths.forEach((item) => {
      if (item === tooth) bool = 1;
    });
    return bool;
  };

  return (
    <Container>
      <Image source={FormulaImage} />
      {tooths.map((tooth, index) => (
        <ToothNumber
          key={index}
          style={
            checkActiveTooth(tooth.number)
              ? { top: tooth.top, left: tooth.left, color: "#FF5A5A" }
              : { top: tooth.top, left: tooth.left }
          }
        >
          {tooth.number}
        </ToothNumber>
      ))}
    </Container>
  );
};
export default FormulaScreen;

const ToothNumber = styled.Text`
  position: absolute;
  top: 0;
  left: 0;
  font-size: 18px;
  font-weight: 600;
  line-height: 21px;
  color: #303030;
`;

const Container = styled.View`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
`;
