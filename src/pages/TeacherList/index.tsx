import React, { useState } from "react";
import { View, Text, AsyncStorage } from "react-native";
import PageHeader from "../../components/PageHeader";
import TeacherItem, { Teacher } from "../../components/TeacherItem";
import {
  ScrollView,
  TextInput,
  BorderlessButton,
  RectButton,
} from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";
import api from "../../services/api";
import styles from "./styles";
import { useFocusEffect } from "@react-navigation/native";

function TeacherList() {
  const [favorites, setFavorites] = useState<number[]>([]);
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [teachers, setTeachers] = useState([]);
  const [filter, setFilter] = useState({
    subject: "",
    week_day: "",
    time: "",
  });

  const handleToogleFiltersVisible = () => {
    setIsFilterVisible((current) => !current);
  };

  const handleFilterSubmit = async () => {
    setIsFilterVisible(false);

    AsyncStorage.getItem("favorites").then((response) => {
      if (response) {
        setFavorites(
          JSON.parse(response).map((teacher: Teacher) => teacher.id)
        );
      }
    });

    const response = await api.get("classes", {
      params: {
        ...filter,
      },
    });

    setTeachers(response.data);
  };

  return (
    <View style={styles.container}>
      <PageHeader
        title="Proffys disponíveis"
        headerRight={
          <BorderlessButton onPress={handleToogleFiltersVisible}>
            <Feather name="filter" size={20} color="#fff" />
          </BorderlessButton>
        }
      >
        {isFilterVisible && (
          <View style={styles.searchForm}>
            <Text style={styles.label}>Matéria</Text>
            <TextInput
              value={filter.subject}
              onChangeText={(text) =>
                setFilter({
                  ...filter,
                  subject: text,
                })
              }
              placeholderTextColor="#c1bccc"
              style={styles.input}
              placeholder="Qual a matéria?"
            />

            <View style={styles.inputGroup}>
              <View style={styles.inputBlock}>
                <Text style={styles.label}>Dia da semana</Text>
                <TextInput
                  value={filter.week_day}
                  onChangeText={(text) =>
                    setFilter({
                      ...filter,
                      week_day: text,
                    })
                  }
                  placeholderTextColor="#c1bccc"
                  style={styles.input}
                  placeholder="Qual o dia?"
                />
              </View>

              <View style={styles.inputBlock}>
                <Text style={styles.label}>Horário</Text>
                <TextInput
                  value={filter.time}
                  onChangeText={(text) =>
                    setFilter({
                      ...filter,
                      time: text,
                    })
                  }
                  placeholderTextColor="#c1bccc"
                  style={styles.input}
                  placeholder="Qual horário?"
                />
              </View>
            </View>

            <RectButton
              onPress={handleFilterSubmit}
              style={styles.submitButton}
            >
              <Text style={styles.submitButtonText}>Filtrar</Text>
            </RectButton>
          </View>
        )}
      </PageHeader>

      <ScrollView
        style={styles.teacherList}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 16,
        }}
      >
        {teachers.map((item: Teacher) => (
          <TeacherItem
            key={item.id}
            teacher={item}
            favorited={favorites.includes(item.id)}
          />
        ))}
      </ScrollView>
    </View>
  );
}

export default TeacherList;
