import { Modal, Text, View } from "react-native";
import LottieView from "lottie-react-native";
import { quotes } from "../../assets/data/quote";
import React, { useEffect, useState } from "react";

const InAppLoading = ({ visible }) => {
  const [randomIndex, setRandomIndex] = useState(null);
  useEffect(() => {
    const newRandomIndex = Math.floor(Math.random() * quotes.length);
    setRandomIndex(newRandomIndex);
  }, []);
  if (randomIndex === null) {
    return null;
  }
  return (
    <Modal transparent={true} visible={visible} animationType="slide">
      <View
        className="flex-1 items-center justify-center "
        style={{ backgroundColor: "rgba(15, 23, 42, .6)" }}
      >
        <View className="flex-1 p-2 items-center justify-center px-4">
          <View className="items-center">
            <LottieView
              source={require("../../assets/Lottie/InAppLoading.json")}
              autoPlay
              loop
              style={{ width: 300 }}
            />
            <Text className="text-white text-xl font-semibold mt-2 text-center ">
              {quotes[randomIndex].quote}
            </Text>
            <Text className="text-white mb-2">______</Text>
            <Text className="text-white text-base font-semibold">
              {quotes[randomIndex].player}
            </Text>
            <LottieView
              source={require("../../assets/Lottie/loading.json")}
              autoPlay
              loop
              style={{ width: 180 }}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default React.memo(InAppLoading);
