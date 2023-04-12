import React from "react";
import styled from "styled-components/native";
import DateTimePicker from "@react-native-community/datetimepicker";
import AddButton from "../components/AddButton";

import { appointmentsApi } from "../utils/api";

export default function ReductAppointmentScreen({ navigation, route }) {
  const item = route.params;

  const fieldNames = {
    dentNumber: '"Номер зуба"',
    diagnosis: '"Диагноз"',
    price: '"Цена"',
    date: '"Дата"',
    time: '"Время"',
  };

  const onSubmit = () => {
    appointmentsApi
      .update(item._id, appointmentData)
      .then(() => {
        if (item.patientScreen)
          navigation.navigate("Patient", {
            item: {
              ...appointmentData,
            },
          });
        else navigation.navigate("Home");
      })
      .catch((e) => {
        if (e.response.data && e.response.data.data) {
          e.response.data.data.forEach((err) => {
            const fieldName = err.param;
            alert(`Ошибка. Неверно введено поле ${fieldNames[fieldName]}.`);
          });
        }
      });
  };

  const [date, setDate] = React.useState(new Date(Date.parse(item.fullDate)));
  const [time, setTime] = React.useState(new Date(Date.parse(item.fullTime)));

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
  };

  const reductDay = (currentDate) => {
    let day = currentDate.getDate();
    if (currentDate.getDate() < 10) day = "0" + currentDate.getDate();

    return day;
  };

  const formatedDate = (currentDate) => {
    const month = Number(currentDate.getMonth()) + 1;
    if (month < 10) {
      return (
        reductDay(currentDate) +
        "-" +
        "0" +
        month +
        "-" +
        currentDate.getFullYear()
      );
    } else {
      return (
        reductDay(currentDate) + "-" + month + "-" + currentDate.getFullYear()
      );
    }
  };

  const onChangeTime = (event, selectedTime) => {
    const currentTime = selectedTime || date;
    setTime(currentTime);
  };

  const [handleChangeInput, setHandleChangeInput] = React.useState({
    patient: item.patient._id,
    dentNumber: item.dentNumber + "",
    diagnosis: item.diagnosis,
    price: item.price + "",
  });

  let appointmentData = {
    ...handleChangeInput,
    date: formatedDate(date),
    time: `${
      time.getMinutes() === 0
        ? time.getHours() + ":" + time.getMinutes() + "0"
        : time.getHours() + ":" + time.getMinutes()
    }`,
    fullDate: date,
    fullTime: time,
  };

  return (
    <AddPatientConteiner>
      <Form>
        <InputWrapper>
          <InputHeader>Номер зуба</InputHeader>
          <Input
            value={handleChangeInput.dentNumber}
            enablesReturnKeyAutomatically={true}
            maxLength={2}
            onChangeText={(text) =>
              setHandleChangeInput({
                ...handleChangeInput,
                dentNumber: text,
              })
            }
            placeholder="N. 1 - 42"
          ></Input>
          <BorderBottomLine />
        </InputWrapper>
        <InputWrapper>
          <InputHeader>Диагноз</InputHeader>
          <Input
            value={handleChangeInput.diagnosis}
            maxLength={15}
            onChangeText={(text) => {
              setHandleChangeInput({ ...handleChangeInput, diagnosis: text });
            }}
          ></Input>
          <BorderBottomLine />
        </InputWrapper>
        <InputWrapper>
          <InputHeader>Цена</InputHeader>
          <Input
            value={handleChangeInput.price}
            maxLength={5}
            onChangeText={(text) => {
              handleChangeInput.price.length < text.length
                ? Number.isInteger(Number(text[text.length - 1])) &&
                  setHandleChangeInput({
                    ...handleChangeInput,
                    price: text,
                  })
                : setHandleChangeInput({
                    ...handleChangeInput,
                    price: text,
                  });
            }}
          ></Input>
          <BorderBottomLine />
        </InputWrapper>

        <DateTimeUnputsWrapper>
          <InputWrapper style={{ width: "40%", position: "reletive" }}>
            <InputHeader>Дата</InputHeader>
            <Input editable={false}>{formatedDate(date)}</Input>
            <DateTimePicker
              style={{
                position: "absolute",
                top: 20,
                left: -10.5,
                width: "100%",
                opacity: 0.011,
                zIndex: 1000,
              }}
              testID="datePicker"
              minimumDate={new Date()}
              value={date}
              mode="date"
              is24Hour={true}
              onChange={onChangeDate}
              locale="ru"
            />
            <BorderBottomLine />
          </InputWrapper>
          <InputWrapper style={{ width: "40%", position: "reletive" }}>
            <InputHeader>Время</InputHeader>
            <Input editable={false}>
              {time.getMinutes() === 0
                ? time.getHours() + ":" + time.getMinutes() + "0"
                : time.getHours() + ":" + time.getMinutes()}
            </Input>
            <DateTimePicker
              style={{
                position: "absolute",
                top: 20,
                left: -11.5,
                width: "100%",
                opacity: 0.011,
                zIndex: 1000,
              }}
              minuteInterval={10}
              testID="timePicker"
              value={time}
              mode="time"
              is24Hour={true}
              display="default"
              onChange={onChangeTime}
              locale="ru"
            />
            <BorderBottomLine />
          </InputWrapper>
        </DateTimeUnputsWrapper>
      </Form>
      <AddButton toAddPatient={onSubmit} reduct={true} />
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

const DateTimeUnputsWrapper = styled.View`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
