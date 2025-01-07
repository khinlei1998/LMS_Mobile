import {
  View,
  Text,
  Pressable,
  ScrollView,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { useState } from "react";
import Animated from "react-native-reanimated";
import { HelloWave } from "@/components/HelloWave";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { router } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useQuery } from "@tanstack/react-query";
import { password, username } from "@/utils/apikeys";
import axios from "axios";
import CourseItem from "@/components/CourseItem";
import { Category } from "@/types/types";
const categories: Category[] = [
  {
    id: "business",
    name: "Business",
    icon: "briefcase",
  },
  {
    id: "tech",
    name: "Tech",
    icon: "hardware-chip",
  },
  {
    id: "design",
    name: "Design",
    icon: "color-palette",
  },
  {
    id: "marketing",
    name: "Marketing",
    icon: "megaphone",
  },
  {
    id: "health",
    name: "Health",
    icon: "fitness",
  },
  {
    id: "music",
    name: "Music",
    icon: "musical-notes",
  },
  {
    id: "lifestyle",
    name: "lifestyle",
    icon: "heart",
  },
];

export default function HomeScreen() {
  const [selectedCategory, setSelectedCategory] = useState("business");

  const fetchCourse = async (searchTerm: string) => {
    const response = axios.get("https://www.udemy.com/api-2.0/courses/", {
      params: { search: searchTerm },
      auth: {
        username: username,
        password: password,
      },
    });
    return response;
  };

  const { data, isSuccess, error, isLoading, refetch } = useQuery({
    queryKey: ["searchCourses", selectedCategory],
    queryFn: () => fetchCourse(selectedCategory),
    // enabled:true
  });

  const renderCategory = ({ item }: { item: Category }) => (
    <Pressable
      className="p-2  flex-col items-center gap-4 "
      onPress={() => setSelectedCategory(item.id)}
    >
      <View
        className={`p-4 border-2 rounded-full items-center ${
          selectedCategory == item.id
            ? "border-2 border-blue-700"
            : "border border-gray-400"
        } `}
      >
        <Ionicons
          name={item.icon as any}
          size={24}
          color={selectedCategory == item.id ? "#1d4ed8" : "gray"}
        />
      </View>
      <Text
        style={{
          fontFamily:
            selectedCategory == item.id ? "BarlowBold" : "BarlowMedium",
        }}
      >
        {item.name}
      </Text>
    </Pressable>
  );

  return (
    <View className="bg-white flex-1">
      {/* Greetings */}
      <View className="bg-[#2563eb] pt-16 pb-10 px-10 ">
        <Animated.View className="flex-row justify-between  items-center mt-2">
          <View>
            <View className="flex-row gap-2 items-end">
              <Text
                className="text-white text-lg"
                style={{ fontFamily: "BarlowMedium" }}
              >
                {" "}
                Good Morning
              </Text>
              <View>
                <HelloWave />
              </View>
            </View>

            <Text
              className="text-white text-2xl"
              style={{ fontFamily: "BarlowBold" }}
            >
              Yati
            </Text>
          </View>

          <View>
            <MaterialCommunityIcons
              name="bell-badge-outline"
              size={30}
              color="white"
            />
          </View>
        </Animated.View>

        {/* Search */}
        <Pressable onPress={() => router.push("/explore")}>
          <View className="bg-white/20 p-4 mt-4 rounded-2xl flex-row gap-x-2 items-center ">
            <Ionicons name="search-outline" size={20} color="white" />
            <Text className="text-white" style={{ fontFamily: "BarlowMedium" }}>
              What do you want to learn?
            </Text>
          </View>
        </Pressable>
      </View>

      <ScrollView className="flex-1 ">
        {/* Annimated */}
        <View className="flex-row justify-between px-6 pt-4 items-center ">
          <Text style={{ fontFamily: "BarlowBold" }} className=" text-xl">
            Explore Topics
          </Text>
          <Text className="text-blue-700" style={{ fontFamily: "BarlowBold" }}>
            See more{" "}
          </Text>
        </View>

        {/* Categories List */}
        <ScrollView
          horizontal
          className="mt-3"
          showsHorizontalScrollIndicator={false}
        >
          {categories.map((category: Category) => (
            <View key={category.id}>{renderCategory({ item: category })}</View>
          ))}
        </ScrollView>

        {/* Category Course */}
        {isLoading ? (
          <View>
            <ActivityIndicator size="large" color="#2563eb" />
          </View>
        ) : error ? (
          <Text>Error:{error}</Text>
        ) : data?.data.results ? (
          <FlatList
            data={data.data.results}
            horizontal={true}
            keyExtractor={(item) => item.id.toString()}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
            <CourseItem course={item} customStyle="w-[22rem] pl-6 mt-3 " />
        )}
          />
        ) : (
          <View>
            <Text>No results .Try searching for difference courses.</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
