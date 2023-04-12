import React from "react";
import { Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import AddButtonWrapper from "./style";

export default function AddButton({ toAddPatient, reduct = false, id }) {
  return (
    <AddButtonWrapper
      onPress={() => toAddPatient(reduct && id)}
      style={{ backgroundColor: reduct ? "#2A86FF" : "#87cc6f" }}
    >
      {!reduct ? (
        <Ionicons name="ios-add" size={22} color="white" />
      ) : (
        <Ionicons name="checkmark-sharp" size={20} color="white" />
      )}
      <Text
        style={{
          color: "white",
          fontSize: 16,
          fontWeight: "500",
          lineHeight: 19,
        }}
      >
        {!reduct ? "Добавить" : "Изменить"}
      </Text>
    </AddButtonWrapper>
  );
}
