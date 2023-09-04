import {
  Image,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { SubLayout } from "../components/Common/SubLayout";
import { MatchCarousel } from "../components/Matches/MatchCarousel";
import { BottomSheet } from "@rneui/themed";
import { themeColors } from "../theme";
import { useState } from "react";
import { PaymentItem } from "../components/Payment/PaymentItem";

const listPayment = [
  { title: "Paypal", image: require("../../assets/images/paypal-logo.png") },
  { title: "Visa", image: require("../../assets/images/visa-logo.png") },
];

export const DetailOrderPaymentScreen = ({ navigation }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState({
    ...listPayment[0],
    index: 0,
  });

  return (
    <SubLayout title={"Payment"} goBackButton={true}>
      <MatchCarousel />
      <ScrollView className="mt-5 px-5">
        <View className="justify-center items-center w-full">
          <Text className="text-white text font-semibold">
            TIME REMAINING TO PAY
          </Text>
          <View className="flex-row justify-center mt-4 border border-x-0 border-t-0 border-b-2 w-full">
            <Text className="text-white text-5xl font-bold mr-4">10</Text>
            <Text className="text-white text-5xl font-bold mr-4">:</Text>
            <Text className="text-white text-5xl font-bold">00</Text>
          </View>
        </View>
        <View
          className="rounded-lg w-full p-3 mt-5"
          style={{
            backgroundColor: themeColors.bgCard,
          }}
        >
          <View className="flex-row items-center">
            <Image
              className="mr-4"
              source={require("../../assets/images/alfamart.png")}
              style={{
                width: 80,
                height: 40,
              }}
            />
            <Text className="text-white font-bold">ALFAMART</Text>
          </View>
          <Text className="text-white text-sm mt-4">Payment Code</Text>
          <Text className="text-white text-lg font-semibold">XXXXXXXXX</Text>
        </View>
        <View className="mt-4">
          <Text className="text-white text-lg font-bold">Detail Price</Text>
          <View
            className="rounded-lg w-full flex-row justify-around items-center p-3 mt-2"
            style={{
              backgroundColor: themeColors.bgCard,
            }}
          >
            <Text className="text-white text-sm">Total price</Text>
            <Text className="text-white text-lg font-semibold">200€</Text>
          </View>
        </View>
        <View className="mt-4">
          <Text className="text-white text-lg font-bold">Payment Method</Text>
          <Pressable
            className="rounded-lg w-full p-3 mt-2 opacity-70"
            style={{
              backgroundColor: themeColors.bgCard,
            }}
            onPress={() => setIsVisible(true)}
          >
            <Text className="text-white">
              Payment ticket via {paymentMethod.title}
            </Text>
            <Text className="text-gray-500">
              Make sure that you have {paymentMethod.title} account to checkout
            </Text>
          </Pressable>
        </View>
        <View className="justify-center items-center mt-4 mb-5">
          <Pressable
            className="justify-center items-center w-1/2 rounded-lg py-3 mt-2"
            style={{
              backgroundColor: themeColors.bgButton,
            }}
            onPress={() => navigation.navigate("PaypalPayment")}
          >
            <Text
              className="font-semibold"
              style={{ color: themeColors.bgScreen }}
            >
              CHECKOUT
            </Text>
          </Pressable>
        </View>
        <BottomSheet
          modalProps={{}}
          isVisible={isVisible}
          onBackdropPress={() => setIsVisible(false)}
        >
          {listPayment.map((l, i) => (
            <PaymentItem
              payment={l}
              index={i}
              key={i}
              checked={i === paymentMethod.index}
              handleSetPaymentMethod={setPaymentMethod}
            />
          ))}
        </BottomSheet>
      </ScrollView>
    </SubLayout>
  );
};
