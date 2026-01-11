import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Pressable,
} from "react-native";
import React from "react";
import { CurriculumItem } from "@/types/types";
interface CurriculumData {
  count: number;
  next: string | null;
  previous: string | null;
  results: CurriculumItem;
}

interface CurriculumListProps {
  curriculumData: CurriculumData | undefined;
  isLoading: boolean;
  onLoadingMore: () => void;
}

const CurriculumList: React.FC<CurriculumListProps> = ({
  curriculumData,
  isLoading,
  onLoadMore,
}) => {
  if (!curriculumData) return <Text>No Curriculum Data</Text>;

  const renderItem = ({ item }: { item: CurriculumItem }) => (
    //   <View className="border-b border-s-cyan-300 p-4">
    <View className="border-neutral-300 rounded-lg mb-4 border-t mt-4 ">
      {item._class === "chapter" ? (
        <Text className="text-xl" style={{ fontFamily: "BarlowSemiBold" }}>
          {item.title}
        </Text>
      ) : (
        <View>
          <Text className="text-xl" style={{ fontFamily: "BarlowSemiBold" }}>
            {item.title}
          </Text>
          {item._class === "lecture" && (
            <Text
              className="text-base text-blue-700"
              style={{ fontFamily: "BarlowMedium" }}
            >
              {item.is_free ? "Free" : "Paid"}
            </Text>
          )}

          {item._class === "quiz" && (
            <Text className="text-base" style={{ fontFamily: "BarlowMedium" }}>
              Quiz
            </Text>
          )}
        </View>
      )}
    </View>
  );

  const renderFooter = () => {
    if (!isLoading) return null;

    return (
      <View>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  };

  return (
    <View>
      <Text
        className="  pl-4 text-2xl"
        style={{ fontFamily: "BarlowExtraBold" }}
      >
        Course Currriculum {curriculumData.results.length} Items
      </Text>

      <FlatList
        data={curriculumData.results}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        // nestedScrollEnabled={true}
        // persistentScrollbar={true}
        ListFooterComponent={renderFooter}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      />

      {curriculumData.next && !isLoading && (
        <Pressable
          onPress={onLoadMore}
          className="bg-blue-700 rounded-2xl py-4 items-center mt-10"
        >
          <Text
            className="text-base text-white"
            style={{ fontFamily: "BarlowMedium" }}
          >
            Load More
          </Text>
        </Pressable>
      )}
    </View>
  );
};

export default CurriculumList;
