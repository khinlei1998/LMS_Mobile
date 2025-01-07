import { View, Text, Pressable } from "react-native";
import React, { useRef } from "react";
import Animated, { FadeInDown } from "react-native-reanimated";
import { router } from "expo-router";
import LottieView from "lottie-react-native";
import Button from "@/components/Button";
export default function Welcome() {
  const animation = useRef<LottieView>(null);

  return (
    <View className="flex-1 justify-center bg-white items-center ">
      <Animated.View
        entering={FadeInDown.duration(300).springify()}
        className="w-full"
      >
        <LottieView
          autoPlay
          loop
          ref={animation}
          style={{
            width: "100%",
            height: 400,
          }}
          source={require("../assets/animations/learner.json")}
        />
      </Animated.View>

      <Animated.View entering={FadeInDown.duration(300).springify()}>
        <Text
          style={{ fontFamily: "BarlowExtraBold" }}
          className="text-5xl text-center leading-[3.5rem]"
        >
          Discover and improve your skills
        </Text>
      </Animated.View>

      <Animated.View entering={FadeInDown.duration(400).springify()}>
        <Text
          style={{ fontFamily: "BarlowSemiBold" }}
          className="text-xl text-center leading-[3 rem]"
        >
          Learn from the best courses & tutorials.🚀
        </Text>
      </Animated.View>

      {/* <Pressable className="bg-blue-700 w-3/4 py-4 rounded-3xl justify-center items-center">
        <Text className="text-white">hello </Text>
      </Pressable> */}
      <Button title="Get Started" action={() => router.push("/(tabs)")} />

      {/* <Animated.View
        entering={FadeInDown.duration(400).springify()}
        className="w-full items-center justify-center mt-8 bg-green-50"
      >
        <Button title="Get Started" action={() => router.push("/(tabs)")} />
      </Animated.View> */}
    </View>
  );
}
