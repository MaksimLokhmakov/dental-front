import React from "react";
import styled from "styled-components";

export default function Badge({ active, time, data, price, colors }) {
  return (
    <GroupTime active={active} colors={colors}>
      <GroupTimeText active={active} colors={colors}>
        {data}
        {data && "- "}
        {time}
        {price}
        {price && " руб."}
      </GroupTimeText>
    </GroupTime>
  );
}

const GroupTime = styled.View`
  background: ${(props) =>
    props.colors
      ? props.colors.background
      : props.active
      ? "#2A86FF"
      : "#e9f5ff"};
  border-radius: 18px;
  padding: 0 15.5px;
  height: 32px;
  justify-content: center;
  align-items: center;
`;

const GroupTimeText = styled.Text`
  color: ${(props) =>
    props.colors ? props.colors.text : props.active ? "#fff" : "#4294ff"};
  font-size: 14px;
  font-weight: 800;
`;
