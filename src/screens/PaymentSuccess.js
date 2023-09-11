import React, { useEffect, useRef } from "react";
import { Dimensions, Text, TouchableOpacity, View } from "react-native";
import { themeColors } from "../theme";
import LottieView from "lottie-react-native";
import { useIsFocused, useNavigation } from "@react-navigation/native";

const success = require("../../assets/images/payment-success.json");
const { width } = Dimensions.get("window");

export const PaymentSuccess = () => {
  const successAnimation = useRef();
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      successAnimation.current?.reset();
      successAnimation.current?.play();
    }
  }, [isFocused]);

  return (
    <View
      className="flex-1 justify-center items-center"
      style={{ backgroundColor: themeColors.bgScreen }}
    >
      <LottieView
        style={{
          width: width,
        }}
        ref={successAnimation}
        source={success}
        loop={true}
        resizeMode="cover"
      />
      <Text
        className="text-2xl font-bold my-2"
        style={{ color: themeColors.bgButton }}
      >
        Payment Success
      </Text>
      <Text className="text-white">Your payment has been successfully</Text>
      <Text className="text-white">For more detail, go to my tickets.</Text>
      <TouchableOpacity
        onPress={() => {
          successAnimation.current?.reset();
          navigation.navigate("MyTicket");
        }}
        className="rounded-2xl p-2 w-1/2 items-center mt-6"
        style={{ backgroundColor: themeColors.bgButton }}
      >
        <Text className="font-bold text-base">Track My Tickets</Text>
      </TouchableOpacity>
    </View>
  );
};
