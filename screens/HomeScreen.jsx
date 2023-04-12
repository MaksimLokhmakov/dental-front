import React from "react";
import { SectionList, View, Text, Image } from "react-native";
import styled from "styled-components/native";
import Swipeable from "react-native-swipeable-row";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";

// ? Импорт компонентов
import { Appointment, SectionTitle, ModalButtons } from "../components/index";
import { appointmentsApi } from "../utils/api";
import MagazinImage from "../assets/MagazinImage.png";

export default function HomeScreen({ navigation, route }) {
  const [data, setData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [modalData, setModalData] = React.useState("");

  const fetchAppointments = () => {
    setIsLoading(true);
    appointmentsApi
      .get()
      .then(({ data }) => {
        setData(data.data);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  };

  const removeAppointment = () => {
    const result = data.filter((group) => {
      group.data = group.data.filter((item) => item._id !== modalData);
      if (group.data.length !== 0) {
        return group;
      }
    });
    setData(result);
    setModalVisible(false);
    appointmentsApi.delete(modalData).then(() => console.log("OK"));
  };

  // TODO: при добавлении приема переходить на экран приемов, отправляя запрос на получение всех приемов данного пациента
  // TODO: ДОБАВИТЬ СОРТИРОВКУ ПРИЕМОВ ПО ДАТЕ И ВРЕМЕНИ

  React.useEffect(fetchAppointments, []);
  React.useEffect(() => {
    navigation.addListener("focus", () => {
      fetchAppointments();
    });
  }, [navigation]);

  return (
    <Container>
      {data.length > 0 ? (
        <SectionList
          sections={data}
          keyExtractor={(item, index) => index}
          onRefresh={fetchAppointments}
          refreshing={isLoading}
          renderItem={({ item }) => {
            return (
              <Swipeable
                key={item._id}
                rightButtonWidth={80}
                rightButtons={[
                  <SwipeViewButton
                    onPress={() =>
                      navigation.navigate("ReductAppointment", {
                        ...item,
                      })
                    }
                    style={{ backgroundColor: "#b4c1cb" }}
                  >
                    <FontAwesome5 name="pen" size={20} color="#ffffff" />
                  </SwipeViewButton>,
                  <SwipeViewButton
                    onPress={() => {
                      setModalData(item._id);
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
                  {...item}
                  active={data[0].data[0]._id === item._id && true}
                />
              </Swipeable>
            );
          }}
          renderSectionHeader={({ section: { title } }) => (
            <SectionTitle>{title}</SectionTitle>
          )}
        />
      ) : (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Image
            style={{ width: 300, height: 250, position: "reletive", top: -120 }}
            source={MagazinImage}
          />
          <Text
            style={{
              position: "absolute",
              top: 330,
              fontWeight: "bold",
              fontSize: 18,
              width: 250,
              textAlign: "center",
            }}
          >
            Журнал приёмов пуст, добавьте запись в журнал.
          </Text>
        </View>
      )}

      <ModalButtons
        modalVisible={modalVisible}
        secondButtonActiviti={removeAppointment}
        setModalVisible={setModalVisible}
      />
    </Container>
  );
}

// ! Основной контейнер

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
