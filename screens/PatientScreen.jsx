import React from "react";
import { Text, FlatList, Linking } from "react-native";
import styled from "styled-components";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";

import {
  MainButton,
  PlusButton,
  Badge,
  ModalButtons,
} from "../components/index";

import { patientsApi, appointmentsApi } from "../utils/api";

export default function PatientScreen({ route, navigation }) {
  const { item } = route.params;

  const [patient, setPatient] = React.useState(item.patient);
  const [appointments, setAppointments] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [modalData, setModalData] = React.useState({});

  const fetchPatientAppointments = () => {
    setIsLoading(true);
    patientsApi
      .show(patient && patient._id)
      .then(({ data }) => {
        setAppointments(data.data.appointments);
        setIsLoading(false);
      })
      .catch(() => {
        console.log("err");
        setIsLoading(false);
      });
  };

  React.useEffect(() => {
    fetchPatientAppointments();
  }, []);

  React.useEffect(() => {
    navigation.addListener("focus", () => {
      fetchPatientAppointments();
    });
  }, [navigation]);

  React.useEffect(() => {
    setPatient(route.params.item.patient ? route.params.item.patient : patient);
  }, [route.params && route.params.item && route.params.item.patient]);

  const reductAppointment = () => {
    let item = { patient: patient };
    if (!(modalData === patient)) {
      navigation.navigate("ReductAppointment", {
        ...modalData,
        patientScreen: true,
      });
    } else {
      navigation.navigate("ReductPatient", {
        item: { ...item, patientScreen: true },
      });
    }
    setModalVisible(false);
  };

  const removeAppointment = () => {
    setAppointments((prev) =>
      prev.filter((item) => item._id !== modalData._id)
    );
    setModalVisible(false);
    appointmentsApi.delete(modalData._id).then(() => console.log("OK"));
  };

  return (
    <Container>
      <PatientInfo>
        <MoreButton
          style={{ top: 10, right: 10 }}
          onPress={() => {
            setModalData(patient);
            setModalVisible(true);
          }}
        >
          <MaterialIcons name="more-vert" size={24} color="#A3A3A3" />
        </MoreButton>
        <FullName>{patient.fullName}</FullName>
        <PhoneNumber>{patient.phoneNumber}</PhoneNumber>

        <PatientButtons>
          <FormulaButtonView>
            <MainButton
              onFormulaNavigate={() =>
                navigation.navigate("Formula", { appointments })
              }
            >
              Формула зубов
            </MainButton>
          </FormulaButtonView>

          <PhoneButtonView>
            <MainButton
              color="#84d269"
              onPhoneCall={() => {
                Linking.openURL(`tel:${patient.phoneNumber}`);
              }}
            >
              <FontAwesome5 name="phone-alt" size={18} color="#fff" />
            </MainButton>
          </PhoneButtonView>
        </PatientButtons>
      </PatientInfo>

      {appointments.length !== 0 && (
        <PatientAppointments>
          <FlatList
            style={{ paddingTop: 20 }}
            data={appointments}
            keyExtractor={(item, index) => index}
            onRefresh={fetchPatientAppointments}
            refreshing={isLoading}
            renderItem={({ item, index }) => (
              <AppointmantCard
                key={item._id}
                style={
                  index === appointments.length - 1 && { marginBottom: 45 }
                }
              >
                <MoreButton
                  onPress={() => {
                    console.log(item);
                    setModalData(item);
                    setModalVisible(true);
                  }}
                >
                  <MaterialIcons name="more-vert" size={24} color="#A3A3A3" />
                </MoreButton>

                <Tooth>
                  <FontAwesome5 name="tooth" size={15} color="#A3A3A3" />
                  <AppointmantText>
                    Зуб:{" "}
                    <Text style={{ fontWeight: "600" }}>{item.dentNumber}</Text>
                  </AppointmantText>
                </Tooth>

                <Diagnosis>
                  <FontAwesome5
                    name="clipboard-list"
                    size={16}
                    color="#A3A3A3"
                  />
                  <AppointmantText>
                    Диагноз:{" "}
                    <Text style={{ fontWeight: "600" }}>{item.diagnosis}</Text>
                  </AppointmantText>
                </Diagnosis>

                <AppointmentViews>
                  <Badge
                    active="active"
                    data={item.date + " "}
                    time={item.time}
                  ></Badge>
                  <Badge
                    price={item.price}
                    colors={{
                      background: "rgba(132, 210, 105, 0.29)",
                      text: "#61BB42",
                    }}
                  ></Badge>
                </AppointmentViews>
              </AppointmantCard>
            )}
          />
        </PatientAppointments>
      )}

      <PlusButton
        toAdd={() => navigation.navigate("AddAppointment", { ...patient })}
      />
      <ModalButtons
        thirdButtonActiviti={reductAppointment}
        secondButtonActiviti={removeAppointment}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </Container>
  );
}

// * ИНФОРМАЦИЯ О ПРИЕМАХ
const PatientAppointments = styled.View`
  margin-top: 175px;
  overflow: scroll;
`;

const MoreButton = styled.TouchableOpacity`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
  right: 15px;
  top: 15px;
  z-index: 1;
`;

// * КАТОЧКА ПРИЕМА
const AppointmantCard = styled.View`
  width: 333px;
  height: 145px;
  background-color: #fff;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.03);
  border-radius: 10px;
  padding: 20px;
  margin-top: 10px;
  margin-bottom: 20px;
`;

const Tooth = styled.View`
  flex-direction: row;
  align-items: center;
`;
const AppointmantText = styled.Text`
  font-size: 16px;
  color: #000000;
  margin-left: 10px;
`;

const Diagnosis = styled.View`
  margin-top: 15px;
  flex-direction: row;
  align-items: center;
`;

const AppointmentViews = styled.View`
  margin-top: 20px;
  flex-direction: row;
  justify-content: space-between;
`;

// * ИНФОРМАЦИЯ О ПРИЕМАХ КОНЕЦ

const PatientButtons = styled.View`
  flex: 1;
  flex-direction: row;
`;
const FormulaButtonView = styled.View`
  flex: 1;
`;
const PhoneButtonView = styled.View`
  width: 45px;
  margin-left: 10px;
`;

// * ОСНОВНОЙ КОНТЕЙНЕР
const Container = styled.View`
  flex: 1;
  background-color: #f8fafd;
  align-items: center;
  justify-content: flex-start;
`;

// * ИНФОРМАЦИЯ О ПАЦИЕНТЕ
const PatientInfo = styled.View`
  position: absolute;
  z-index: 1000;
  padding: 25px;
  background-color: #fff;
  width: 100%;
  height: 175px;
  box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.03);
`;

const FullName = styled.Text`
  margin-bottom: 3px;
  font-weight: 700;
  font-size: 28px;
  color: #000000;
`;

const PhoneNumber = styled.Text`
  margin-bottom: 20px;
  font-size: 16px;
  color: #8b979f;
`;

const PatientData = styled.View`
  padding: 25px;
`;
