import { getAssignedTask } from "@/app/(tabs)/tasks";
import Colors from "@/constants/Colors";
import { AppDispatch, RootState } from "@/redux/store";
import { setFilterData, setMyTask, setSelectedDate } from "@/redux/taskSlice";
import { getFullDate } from "@/utils/functions";
import { Entypo, Feather, Ionicons } from "@expo/vector-icons";
import React, { useState, useEffect, useRef, SetStateAction } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

interface Task {
  date: string;
  title: string;
}

interface Props {
  tasks: Task[];
  initialDate?: string;
  setActive:React.Dispatch<SetStateAction<string>>
}

const AgendaCalendar: React.FC<Props> = ({ tasks, initialDate, setActive }) => {
  const flatListRef = useRef<FlatList>(null);
  const { user } = useSelector((state: RootState) => state.auth);
  const { selectedDate } = useSelector((state: RootState) => state.task);
  const dispatch = useDispatch<AppDispatch>();
  // const [selectedDate, setSelectedDate] = useState(
  //   new Date().toISOString().split("T")[0]
  // );
  const [days, setDays] = useState<string[]>([]);

  useEffect(() => {
    setDays(generateDays(selectedDate));
  }, [selectedDate]);

  useEffect(() => {
    const index = days.findIndex((d) => d === selectedDate);
    if (index !== -1 && flatListRef.current) {
      setTimeout(() => {
        flatListRef.current?.scrollToIndex({ index, animated: true });
      }, 100); // küçük bir delay ile yumuşatıyoruz
    }
  }, [days]);

  function generateDays(centerDateStr: string, range = 7): string[] {
    const dates = [];
    const centerDate = new Date(centerDateStr);
    for (let i = -range; i <= range; i++) {
      const d = new Date(centerDate);
      d.setDate(centerDate.getDate() + i);
      dates.push(d.toISOString().split("T")[0]);
    }
    return dates;
  }

  const { day, month, dayName } = getFullDate(selectedDate);

  const handleDateChange = async (dateString: string) => {
  setActive("all")
    dispatch(setSelectedDate(dateString));
    const { data } = await getAssignedTask({
      userId: user?._id,
      sortDate: dateString,
    });
    dispatch(setMyTask(data));
    if (data) {
      dispatch(setFilterData(data));
    }
  };
  return (
    <View style={styles.container}>
      {/* Tarihler */}
      <View
        style={{
          paddingHorizontal: 18,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingVertical: 10,
        }}
      >
        <Text style={{ fontSize: 22, fontWeight: "600" }}> {month} </Text>
        <Feather
          name="calendar"
          size={20}
          color={"#6B7280"}
          style={{
            backgroundColor: Colors.palette.backgroundCard,
            padding: 8,
            borderRadius: 50,
            shadowColor: "#000",
          }}
        />
      </View>

      <FlatList
        data={days}
        ref={flatListRef}
        horizontal
        getItemLayout={(data, index) => ({
          length: 60, // her kutu genişliği
          offset: 50 * index,
          index,
        })}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item}
        renderItem={({ item }) => {
          const { dayName, day, month } = getFullDate(item);
          return (
            <TouchableOpacity
              onPress={() => handleDateChange(item)}
              // style={[
              //   styles.dateButton,
              //   selectedDate === item && styles.selectedDateButton,
              // ]}
              style={{
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ fontSize: 16, fontWeight: 600 }}>
                {" "}
                {dayName.charAt(0)}
              </Text>
              <View
                style={[
                  styles.dateButton,
                  // selectedDate === item && styles.selectedDateButton,
                ]}
              >
                <Entypo
                  name="dot-single"
                  size={24}
                  color={
                    selectedDate === item
                      ? Colors.palette.accent
                      : Colors.textLight_50
                  }
                />

                <Text
                  style={[
                    styles.dateText,
                    selectedDate === item && styles.selectedDateText,
                  ]}
                >
                  {day}
                </Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default AgendaCalendar;

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
  },
  dateButton: {
    padding: 4,
    backgroundColor: Colors.palette.backgroundCard,
    borderRadius: 50,
    // marginRight: 10,,
    marginHorizontal: 6,
    width: 40,
    height: 75,
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 8,
    shadowColor: "#fff",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
  selectedDateButton: {
    backgroundColor: "#4F46E5",
  },
  dateText: {
    color: "#000",
    fontWeight: "600",
    backgroundColor: Colors.palette.backgroundLight,
    width: 30,
    height: 30,
    textAlign: "center",
    lineHeight: 30, // dikey ortalama için
    fontSize: 14,
    fontWeight: "bold",
    borderRadius: 50,
  },
  selectedDateText: {
    backgroundColor: Colors.palette.accent,
    color: Colors.background,
  },
  taskList: {
    marginTop: 20,
  },
  taskItem: {
    padding: 12,
    backgroundColor: "#F3F4F6",
    borderRadius: 6,
    marginBottom: 10,
  },
  noTaskText: {
    textAlign: "center",
    color: "#6B7280",
    marginTop: 20,
  },
});
