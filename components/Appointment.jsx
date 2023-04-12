import React from "react";
import { View } from "react-native";
import styled from "styled-components/native";

import getAvatarColor from "../utils/getAvatarColor";

import { Badge } from "./";

const Appointment = ({
  patient,
  diagnosis,
  active,
  time,
  onPatient,
  price,
  date,
}) => {
  const item = { patient, diagnosis, time, price, date };

  const avatarColor = getAvatarColor(patient.fullName[0].toUpperCase());
  return (
    <GroupItem onPress={() => onPatient(item)}>
      <Avatar style={{ backgroundColor: avatarColor.background }}>
        <Letter style={{ color: avatarColor.color }}>
          {patient.fullName[0].toUpperCase()}
        </Letter>
      </Avatar>
      <View style={{ flex: 1 }}>
        <FullName>{patient.fullName}</FullName>
        <TextGray>{diagnosis}</TextGray>
      </View>
      {time && <Badge active={active} time={time} />}
    </GroupItem>
  );
};

Appointment.defoleProps = {
  GroupTitle: "Untitled",
  item: [],
};

// ! Элемент группы
const GroupItem = styled.TouchableOpacity`
  padding: 20px;
  flex-direction: row;
  align-items: center;
  border-bottom-width: 1px;
  border-bottom-color: #f3f3f3;
`;

const Avatar = styled.View`
  border-radius: 50px;
  width: 40px;
  height: 40px;
  margin-right: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Letter = styled.Text`
  margin-top: -1px;
  color: white;
  font-size: 20px;
  font-weight: bold;
`;

const FullName = styled.Text`
  font-weight: 600;
  font-size: 16px;
  color: #000000;
`;

const TextGray = styled.Text`
  font-size: 16px;
  color: #8b979f;
`;
// ! Конец эл-та группы

export default Appointment;
