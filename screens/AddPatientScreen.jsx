import React from "react";
import styled from "styled-components/native";
import { Alert } from "react-native";

import AddButton from "../components/AddButton";

import { patientsApi } from "../utils/api";

export default function AddPatientScreen({ navigation, route }) {
  const [phoneInputValue, setPhoneInputValue] = React.useState("");
  const [nameInputValue, setNameInputValue] = React.useState("");

  const phoneInputForm = (text) => {
    if (
      phoneInputValue.length < text.length
        ? Number.isInteger(Number(text[text.length - 1]))
        : true
    ) {
      if (phoneInputValue.length === 0) setPhoneInputValue("+" + text);
      else if (phoneInputValue.length === 3 && phoneInputValue < text)
        setPhoneInputValue(text + "(");
      else if (phoneInputValue.length === 6 && phoneInputValue < text)
        setPhoneInputValue(text + ")");
      else if (
        (phoneInputValue.length === 10 || phoneInputValue.length === 13) &&
        phoneInputValue < text
      )
        setPhoneInputValue(text + "-");
      else {
        setPhoneInputValue(text);
      }
    }
  };

  const toAddPatient = () => {
    const newPatient = {
      fullName: nameInputValue,
      phoneNumber: phoneInputValue,
    };
    return newPatient;
  };

  const fieldNames = {
    fullName: '"Имя пациента"',
    phoneNumber: '"Номер телефона"',
  };

  const onSubmit = () => {
    patientsApi
      .add(toAddPatient())
      .then(() => {
        navigation.navigate("Patients", { value: nameInputValue });
      })
      .catch((e) => {
        if (e.response.data && e.response.data.data) {
          e.response.data.data.forEach((err) => {
            const fieldName = err.param;
            Alert.alert(
              "",
              `Ошибка. Неверно введено поле ${fieldNames[fieldName]}.`
            );
          });
        }
      });
  };

  return (
    <AddPatientConteiner>
      <Form>
        <InputWrapper>
          <InputHeader>Имя пациента</InputHeader>
          <Input
            value={nameInputValue}
            maxLength={25}
            onChangeText={(text) => setNameInputValue(text)}
            autoFocus={true}
          ></Input>
          <BorderBottomLine />
        </InputWrapper>
        <InputWrapper>
          <InputHeader>Номер телефона</InputHeader>
          <Input
            value={phoneInputValue}
            maxLength={17}
            onChangeText={(text) => phoneInputForm(text)}
            placeholder="111 (11) 111-11-11"
          ></Input>
          <BorderBottomLine />
        </InputWrapper>
      </Form>
      <AddButton toAddPatient={onSubmit} />
    </AddPatientConteiner>
  );
}

const Form = styled.View`
  width: 100%;
  height: auto;
`;

const AddPatientConteiner = styled.View`
  width: 100%;
  height: 100%;
  background: #fff;
  padding: 25px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const BorderBottomLine = styled.View`
  border-radius: 10px;
  width: 100%;
  height: 1px;
  background: #bebebe;
`;

const InputWrapper = styled.View`
  width: 100%;
  height: auto;
  margin-bottom: 10px;
`;

const InputHeader = styled.Text`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  font-size: 14px;
  line-height: 17px;
  color: #a0a2a4;
  margin-bottom: 10px;
`;

const Input = styled.TextInput`
  position: relative;
  left: -1px;
  width: 100%;
  height: 30px;
  font-size: 18px;
  line-height: 21px;
  color: #303030;
  padding-bottom: 10px;
  border: 1px solid #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
`;
