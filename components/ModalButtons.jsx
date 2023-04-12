import React from "react";
import { View, Modal } from "react-native";
import styled from "styled-components";
import { FontAwesome5, MaterialIcons, Ionicons } from "@expo/vector-icons";

const ModalButtons = ({
  modalVisible,
  thirdButtonActiviti = false,
  secondButtonActiviti = false,
  setModalVisible,
}) => {
  return (
    <Modal animationType="slide" transparent={false} visible={modalVisible}>
      <View
        style={{
          position: "absolute",
          width: "100%",
          bottom: 10,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View>
          {thirdButtonActiviti && (
            <ReductModelButton onPress={() => thirdButtonActiviti()}>
              <FontAwesome5
                style={{ marginRight: 5 }}
                name="pen"
                size={14}
                color="#ffffff"
              />
              <ModalButtonText>Изменить</ModalButtonText>
            </ReductModelButton>
          )}
          <DeleteModelButton
            style={!thirdButtonActiviti && { marginBottom: 2 }}
            onPress={() => secondButtonActiviti()}
          >
            <MaterialIcons
              style={{ marginRight: 5 }}
              name="delete"
              size={18}
              color="#ffffff"
            />
            <ModalButtonText> Удалить</ModalButtonText>
          </DeleteModelButton>

          <CloseModelButton
            activeOpacity={0.5}
            onPress={() => setModalVisible(!modalVisible)}
          >
            <Ionicons
              style={{ marginRight: 5 }}
              name="close"
              size={20}
              color="#ffffff"
            />
            <ModalButtonText> Скрыть</ModalButtonText>
          </CloseModelButton>
        </View>
      </View>
    </Modal>
  );
};

const ModalButtonText = styled.Text`
  font-size: 16px;
  font-weight: 500;
  color: #ffffff;
`;

const DeleteModelButton = styled.TouchableOpacity`
  width: 360px;
  height: 50px;
  border-radius: 14px;
  background-color: #f85a5a;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
`;

const ReductModelButton = styled.TouchableOpacity`
  width: 360px;
  height: 50px;
  border-radius: 14px;
  background-color: #b4c1cb;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-bottom: 1px;
`;

const CloseModelButton = styled.TouchableOpacity`
  width: 360px;
  height: 50px;
  border-radius: 14px;
  background-color: #313030;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export default ModalButtons;
