// import { StatusBar } from "expo-status-bar";
import React from "react";
import { FlatList, TextInput } from "react-native";
import styled from "styled-components/native";
import Swipeable from "react-native-swipeable-row";
import { FontAwesome5, MaterialIcons, Ionicons } from "@expo/vector-icons";

// ? Импорт компонентов
import { Appointment, PlusButton, ModalButtons } from "../components/index";
import { patientsApi, appointmentsApi } from "../utils/api";

export default function HomeScreen({ navigation }) {
  const [data, setData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [modalData, setModalData] = React.useState("");
  const [visibleSearch, setVisibleSearch] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState("");

  const fetchPatients = () => {
    setIsLoading(true);
    patientsApi
      .get()
      .then(({ data }) => {
        setData(data.data);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  };

  const removePatient = () => {
    patientsApi
      .show(modalData)
      .then(({ data }) =>
        data.data.appointments.forEach((item) => {
          appointmentsApi
            .delete(item._id)
            .then(() => console.log("delete"))
            .catch(() => console.log("err"));
        })
      )
      .catch(() => console.log("delete"));

    const result = data.filter((patient) => patient._id !== modalData);
    setData(result);
    patientsApi.delete(modalData).catch(() => console.log(err));
    setModalVisible(false);
  };

  React.useEffect(fetchPatients, []);
  React.useEffect(() => {
    navigation.addListener("focus", () => {
      fetchPatients();
    });
  }, [navigation]);

  return (
    <Container>
      {visibleSearch && (
        <SerachInputWrapper>
          <SerachInput
            placeholder="Поиск..."
            value={searchValue}
            onChangeText={(text) => setSearchValue(text)}
          />
        </SerachInputWrapper>
      )}
      <FlatList
        data={data.filter((item) => item.fullName.includes(searchValue))}
        keyExtractor={(item, index) => index}
        onRefresh={fetchPatients}
        refreshing={isLoading}
        renderItem={({ item }) => {
          const patient = {
            ...item,
          };
          const itemPatient = {
            patient,
            diagnosis: item.phoneNumber,
          };
          item = {
            patient,
          };
          return (
            <Swipeable
              key={item.patient._id}
              rightButtonWidth={80}
              rightButtons={[
                <SwipeViewButton
                  onPress={() => navigation.navigate("ReductPatient", { item })}
                  style={{ backgroundColor: "#b4c1cb" }}
                >
                  <FontAwesome5 name="pen" size={20} color="#ffffff" />
                </SwipeViewButton>,
                <SwipeViewButton
                  onPress={() => {
                    setModalData(item.patient._id);
                    setModalVisible(true);
                  }}
                  style={{ backgroundColor: "#f85a5a" }}
                >
                  <MaterialIcons name="delete" size={24} color="#ffffff" />
                </SwipeViewButton>,
              ]}
            >
              <Appointment
                onPatient={() => navigation.navigate("Patient", { item })}
                {...itemPatient}
              />
            </Swipeable>
          );
        }}
      />8

      <IconWrapper
        onPress={() => {
          setVisibleSearch(!visibleSearch);
          setSearchValue("");
        }}
      >
        {!visibleSearch ? (
          <FontAwesome5
            style={{ position: "reletive" }}
            name="search"
            size={26}
            color="#2a86ff"
          />
        ) : (
          <Ionicons
            style={{ position: "reletive", top: 5, right: -5 }}
            name="close"
            size={34}
            color="#2a86ff"
          />
        )}
      </IconWrapper>

      <PlusButton toAdd={() => navigation.navigate("AddPatient")} />

      <ModalButtons
        modalVisible={modalVisible}
        secondButtonActiviti={removePatient}
        setModalVisible={setModalVisible}
      />
    </Container>
  );
}

// ! Основной контейнер

const IconWrapper = styled.TouchableOpacity`
  position: absolute;
  bottom: 100;
  right: 15;
  box-shadow: 0px 4px 10px rgba(42, 134, 255, 0.623);
`;

const SerachInputWrapper = styled.View`
  position: relative;
  background-color: #2a86ff63;
  top: -1;
  left: 0;
  height: 40;
  width: 100%;
  border-radius: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 4px 10px rgba(42, 134, 255, 0.4);
  margin-bottom: 15px;
`;

const SerachInput = styled.TextInput`
  width: 96%;
  height: 30px;
  font-size: 18px;
  line-height: 21px;
  color: #303030;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12;
  background-color: #fff;
  padding: 5px 10px;
`;

const Container = styled.View`
  flex: 1;
  background-color: #fff;
`;

const SwipeViewButton = styled.TouchableOpacity`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
`;
