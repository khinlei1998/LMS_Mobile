import { View, Text, Pressable, Image } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Course } from "@/types/types";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useWishlistStore } from "@/store/wishListStore";

interface courseItemProps {
  course: Course;
  customStyle?: string;
}

const CourseItem: React.FC<courseItemProps> = ({ course, customStyle }) => {
  const { addToWishList, removeFromWishList, isInWishList } =
    useWishlistStore();

  const isWishlisted = isInWishList(course.id);

  const toggleWishlist = () => {
    if (isWishlisted) {
      removeFromWishList(course.id);
    } else {
      addToWishList(course);
    }
  }
  return (
    <Pressable className={customStyle ? customStyle : ""}>
      <Animated.View
        className="gap-2 w-full border border-gray-400 rounded-2xl overflow-hidden"
        // style={{ height: 250 }} // Set a fixed height for the card
        entering={FadeInDown.duration(100).springify()}
      >
        <Image source={{ uri: course.image_480x270 }} style={{ height: 160 }} />
        <View className=" px-4 p-2"> 
          <Text className="text-lg min-h-16" style={{ fontFamily: "BarlowBold" }}>
            {course.title}
          </Text>
        </View>
        <View className="flex-row justify-between items-center bg-yellow-700 p-4">
          <Text>{course.is_paid ? course.price : "Free"}</Text>
          <Pressable onPress={toggleWishlist} >
            <Ionicons
              size={24}
              name={isWishlisted ? "heart" : "heart-outline"}
              color={isWishlisted ? "red" : "gray"}
            />
          </Pressable>
        </View>
      </Animated.View>
    </Pressable>
  );
};
export default CourseItem;
