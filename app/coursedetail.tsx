import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import axios from "axios";
import { password, username } from "@/utils/apikeys";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import { CurriculumItem, Course, Review } from "@/types/types";
import { Ionicons } from "@expo/vector-icons";
const fetchCourseDetail = async (courseId: string) => {
  const response = axios.get(
    `https://www.udemy.com/api-2.0/courses/${courseId}`,
    {
      auth: {
        username: username,
        password: password,
      },
    }
  );
  return response;
};

const fetchCourseCurriculum = async (courseId: string, page: number = 1) => {
  const response = axios.get<CurriculumItem>(
    `https://www.udemy.com/api-2.0/courses/${courseId}/public-curriculum-items/?page=${page}`,
    {
      auth: {
        username: username,
        password: password,
      },
    }
  );
  return response;
};

const fetchCourseReviews = async (courseId: string) => {
  const response = axios.get<Course>(
    `https://www.udemy.com/api-2.0/courses/${courseId}/reviews`,
    {
      auth: {
        username: username,
        password: password,
      },
    }
  );
  return response;
};

const StarRating = ({ rating }: { rating: number }) => (
  <View className="flex-row">
    {[1, 2, 3, 4, 5].map((star) => (
      <Ionicons
        key={star}
        name={star <= rating ? "star" : "star-outline"}
        color={star <= rating ? "#a16207" : "#d3d3d3"}
        size={16}
      />
    ))}
  </View>
);

const renderReviewList = ({ item }: { item: Review }) => (
  <>
    <View
      key={item.id}
      className="border-neutral-300 rounded-lg mb-4 border-t mt-4 "
    ></View>
    <View className="flex-row items-center justify-between">
      <View>
        <Text className="text-lg font-bold">{item?.user?.display_name}</Text>

        <Text
          className="text-gray-500 text-sm"
          style={{ fontFamily: "BarlowMedium" }}
        >
          {new Date(item.created).toLocaleDateString()}
        </Text>

        {item.content ? (
          <Text className="text-gray-600 mt-2 capitalize" style={{fontFamily: "BarlowBold"}}>{item.content}</Text>
        ) : (
          <Text className="text-gray-600 mt-2"> No comments provided</Text>
        )}
      </View>

      {/* Rating */}
      <StarRating rating={item.rating} />
    </View>
  </>
);

const SegmentedControl = ({ selectedSegemnt, setSelectedSegment }) => (
  <View className="bg-gray-200 flex-row rounded-lg p-1">
    <Pressable
      onPress={() => setSelectedSegment("curriculum")}
      className={` py-3 flex-1 rounded-md ${
        selectedSegemnt === "curriculum" ? "bg-blue-700" : "bg-gray-200"
      }`}
    >
      <Text
        className={`text-center ${
          selectedSegemnt === "curriculum" ? "text-white" : "text-gray-700"
        }`}
        style={{
          fontFamily:
            selectedSegemnt === "curriculum" ? "BarlowBold" : "BarlowMedium",
        }}
      >
        Curriculum
      </Text>
    </Pressable>

    <Pressable
      onPress={() => setSelectedSegment("reviews")}
      className={` py-3 flex-1 rounded-md ${
        selectedSegemnt === "reviews" ? "bg-blue-700" : "bg-gray-200"
      }`}
    >
      <Text
        className={`text-center  ${
          selectedSegemnt === "reviews" ? "text-white" : "text-gray-700"
        }`}
        style={{
          fontFamily:
            selectedSegemnt === "reviews" ? "BarlowBold" : "BarlowMedium",
        }}
      >
        Reviews
      </Text>
    </Pressable>
  </View>
);

export default function CourseDetail() {
  const [selectedSegemnt, setSelectedSegment] = useState("curriculum");
  const [curriculumPage, setCurriculumPage] = useState(1);
  const [reviewPage, setReviewPage] = useState(1);
  const { courseId } = useLocalSearchParams<{ courseId: string }>();

  const { data, isSuccess, error, isLoading, refetch } = useQuery({
    queryKey: ["courseId", courseId],
    queryFn: () => fetchCourseDetail(courseId),
  });

  //Curriculum Data

  const {
    data: curriculumData,
    error: curriculumError,
    isLoading: curriculumLoading,
    refetch: curriculumRefetch,
  } = useQuery({
    queryKey: ["coursecurriculum", courseId, curriculumPage],
    queryFn: () => fetchCourseCurriculum(courseId || "", curriculumPage),
    //not run if courseId is not present
    enabled: !!courseId,
    keepPreviousData: true,
  });

  //Review Data
  const {
    data: reviewData,
    error: reviewError,
    isLoading: reviewLoading,
    refetch: reviewRefetch,
  } = useQuery({
    queryKey: ["coursereviews", courseId],
    queryFn: () => fetchCourseReviews(courseId || ""),
    enabled: !!courseId,
  });

  console.log("review", reviewData?.data.results);

  return (
    <>
      <Image
        source={{ uri: data?.data?.image_480x270 }}
        className="w-full h-60"
      />
      <View className="bg-white flex-1 rounded-t-xl px-4 py-3">
        <View className="bg-blue-700 w-32 rounded-xl p-1 mt-4  items-center">
          <Text
            className="text-base text-white"
            style={{ fontFamily: "BarlowMedium" }}
          >
            {data?.data?.locale.title}
          </Text>
        </View>

        <Text className="text-2xl" style={{ fontFamily: "BarlowBold" }}>
          {data?.data?.title}
        </Text>
        <View>
          <Image />
          <Text
            className="text-base text-gray-700"
            style={{ fontFamily: "BarlowMedium" }}
          >
            {data?.data?.visible_instructors[0].display_name}
          </Text>
        </View>
        <Text
          className="text-base text-gray-700"
          style={{ fontFamily: "BarlowBold" }}
        >
          {data?.data?.is_paid ? data?.data?.is_paid : "Free"}
        </Text>

        <SegmentedControl
          selectedSegemnt={selectedSegemnt}
          setSelectedSegment={setSelectedSegment}
        />
        {/* Content for segment */}

        {selectedSegemnt === "curriculum" ? (
          <View>
            <Text className="text-2xl" style={{ fontFamily: "BarlowBold" }}>
              Curriculum
            </Text>
          </View>
        ) : (
          <View className="mt-2 flex-1">
            <Text className="text-2xl" style={{ fontFamily: "BarlowBold" }}>
              Reviews {reviewData?.data.count}
            </Text>

            {/* <View style={{ flex: 1 }}> */}
            <FlatList
              nestedScrollEnabled={true}
              scrollEnabled={true}
              data={reviewData?.data.results}
              renderItem={renderReviewList}
              keyExtractor={(item: Review) => item.id.toString()}
              contentContainerStyle={{ paddingBottom: 20 }}
            />
            {/* </View> */}
          </View>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
});
