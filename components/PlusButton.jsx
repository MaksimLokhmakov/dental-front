import React from "react";
import { Ionicons } from "@expo/vector-icons";

import styled from "styled-components/native";

export default function PlusButton({ toAdd }) {
  return (
    <PlusButtonWrapper onPress={() => {toAdd()}}>
      <Ionicons name="ios-add" size={36} color="white" />
    </PlusButtonWrapper>
  );
}

const PlusButtonWrapper = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  background: #2a86ff;
  border-radius: 50px;
  position: absolute;
  right: 23px;
  bottom: 23px;
  box-shadow: 0px 4px 10px rgba(42, 134, 255, 0.4);
`;
