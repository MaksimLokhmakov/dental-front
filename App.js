import React from "react";
import { TouchableOpacity, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";

// ? SCREENS
import {
  HomeScreen,
  PatientScreen,
  AddPatientScreen,
  AddAppointmentScreen,
  PatientsScreen,
  ReductPatientScreen,
  ReductAppointmentScreen,
  FormulaScreen,
} from "./screens/index";

const Stack = createNativeStackNavigator();

// TODO: ИСПРАВИТЬ УДАЛЕНИЕ ПАЦИЕНТОВ ---- ДОБАВИТЬ УДАЛЕНИЕ ВСЕХ ПРИЕМОВ ДАННОГО ПАЦИЕНТА ПРИ ЕГО УДАЛЕНИИ

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={() => ({
          headerTitleAlign: "left",
        })}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={({ navigation }) => ({
            title: "Журнал приёмов",
            headerTitleAlign: "left",
            headerStyle: {
              backgroundColor: "#fff",
            },
            headerTitleStyle: {
              fontSize: "22px",
              fontWeight: "bold",
              color: "#2A86FF",
            },
            headerRight: () => (
              <TouchableOpacity onPress={() => navigation.navigate("Patients")}>
                <Ionicons name="people-sharp" size={22} color="black" />
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name="Patients"
          component={PatientsScreen}
          options={({ navigation }) => ({
            title: "Пациенты",
            headerStyle: {
              backgroundColor: "#fff",
            },
            headerTitleStyle: {
              fontSize: "22px",
              fontWeight: "bold",
              color: "#2A86FF",
            },
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => {
                  navigation.goBack();
                }}
              >
                <Ionicons name="chevron-back-sharp" size={24} color="#2A86FF" />
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name="Patient"
          component={PatientScreen}
          options={({ navigation }) => ({
            title: "Карта пациента",
            headerStyle: {
              backgroundColor: "#fff",
            },
            headerTitleStyle: {
              fontSize: "16px",
              fontWeight: "bold",
              color: "#2A86FF",
            },
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => {
                  navigation.goBack();
                }}
              >
                <Ionicons name="chevron-back-sharp" size={24} color="#2A86FF" />
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name="AddPatient"
          component={AddPatientScreen}
          options={({ navigation }) => ({
            title: "Добавить пациента",
            headerStyle: {
              backgroundColor: "#fff",
            },
            headerTitleStyle: {
              fontSize: "16px",
              fontWeight: "bold",
              color: "#2A86FF",
            },
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => {
                  navigation.goBack();
                }}
              >
                <Ionicons name="chevron-back-sharp" size={24} color="#2A86FF" />
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name="AddAppointment"
          component={AddAppointmentScreen}
          options={({ navigation }) => ({
            title: "Добавить приём",
            headerStyle: {
              backgroundColor: "#fff",
            },
            headerTitleStyle: {
              fontSize: "16px",
              fontWeight: "bold",
              color: "#2A86FF",
            },
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => {
                  navigation.goBack();
                }}
              >
                <Ionicons name="chevron-back-sharp" size={24} color="#2A86FF" />
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name="ReductPatient"
          component={ReductPatientScreen}
          options={{
            title: "Изменить пациента",
            headerStyle: {
              backgroundColor: "#fff",
            },
            headerTitleStyle: {
              fontSize: "16px",
              fontWeight: "bold",
              color: "#2A86FF",
            },
          }}
        />
        <Stack.Screen
          name="ReductAppointment"
          component={ReductAppointmentScreen}
          options={({ navigation }) => ({
            title: "Изменить приём",
            headerStyle: {
              backgroundColor: "#fff",
            },
            headerTitleStyle: {
              fontSize: "16px",
              fontWeight: "bold",
              color: "#2A86FF",
            },
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => {
                  navigation.goBack();
                }}
              >
                <Ionicons name="chevron-back-sharp" size={24} color="#2A86FF" />
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name="Formula"
          component={FormulaScreen}
          options={({ navigation }) => ({
            title: "Формула зубов",
            headerStyle: {
              backgroundColor: "#fff",
            },
            headerTitleStyle: {
              fontSize: "16px",
              fontWeight: "bold",
              color: "#2A86FF",
            },
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => {
                  navigation.goBack();
                }}
              >
                <Ionicons name="chevron-back-sharp" size={24} color="#2A86FF" />
              </TouchableOpacity>
            ),
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
