import React, { useEffect, useState } from "react";
import { View, AsyncStorage } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import styles from "./styles";
import PageHeader from "../../components/PageHeader";
import TeacherItem, { Teacher } from "../../components/TeacherItem";
import { ScrollView } from "react-native-gesture-handler";

function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useFocusEffect(() => {
    AsyncStorage.getItem("favorites").then((response) => {
      if (response) {
        setFavorites(JSON.parse(response));
      }
    });
  });

  return (
    <View style={styles.container}>
      <PageHeader title="Meus Proffys favoritos" />

      <ScrollView
        style={styles.teacherList}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 16,
        }}
      >
        {favorites.map((item: Teacher) => (
          <TeacherItem
            key={item.id}
            teacher={item}
            favorited
          />
        ))}
      </ScrollView>
    </View>
  );
}

export default Favorites;
