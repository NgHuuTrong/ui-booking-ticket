import { Button } from "@rneui/themed";
import AnimatedLottieView from "lottie-react-native";
import { useEffect, useState } from "react";
import { Image, Modal, Text, View } from "react-native";

export const SuccessModal = ({ title, message, visible }) => {
  return (
    <Modal transparent={true} visible={visible} animationType="slide">
      <View
        className="flex-1 items-center justify-center"
        style={{ backgroundColor: "rgba(15, 23, 42, .4)" }}
      >
        <View className="w-80 bg-white rounded-lg overflow-hidden py-4">
          <View className="items-center">
            <AnimatedLottieView
              source={require("../../assets/Lottie/SuccessModal.json")}
              autoPlay
              //   loop
              style={{ width: 50 }}
            />
          </View>
          <View className="items-center px-4">
            <Text
              style={{ color: "#2bda95" }}
              className="text-2xl font-semibold text-center"
            >
              {title}
            </Text>
            <Text className="mt-4 mb-2 font-semibold text-zinc-500 text-center ">
              {message}
            </Text>
          </View>
        </View>
      </View>
    </Modal>
  );
};
