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
import { useContext, useEffect, useState } from "react";
import { PaymentItem } from "../components/Payment/PaymentItem";
import { useIsFocused, useRoute } from "@react-navigation/native";
import { getMatch } from "../services/match.service";
import { AxiosContext } from "../services/axios.context";
import { Loading } from "../components/Loading";

const listPayment = [
  { title: "Paypal", image: require("../../assets/images/paypal-logo.png") },
  { title: "Visa", image: require("../../assets/images/visa-logo.png") },
];

const DetailRow = ({ left, right }) => {
  return (
    <View className="w-full flex-row items-center p-3">
      <Text className="text-white text-sm w-1/2">{left}</Text>
      <Text className="text-white text-base font-semibold w-1/2">{right}</Text>
    </View>
  );
};

export const DetailOrderPaymentScreen = ({ navigation }) => {
  const route = useRoute();
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [match, setMatch] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [paymentMethod, setPaymentMethod] = useState({
    ...listPayment[0],
    index: 0,
  });
  const isFocused = useIsFocused();

  const { publicAxios } = useContext(AxiosContext);

  useEffect(() => {
    if (isFocused) {
      const fetchData = async () => {
        try {
          setLoading(true);
          const res = await getMatch(publicAxios, route.params.matchId);
          setMatch(res);
          setLoading(false);
        } catch (err) {
          setLoading(false);
          setErrorMessage(err.message);
        }
      };
      fetchData();
    } else {
      setLoading(true);
      setErrorMessage("");
    }
  }, [isFocused]);

  return (
    <>
      {loading ? (
        <Loading layout={SubLayout} />
      ) : (
        <SubLayout title={"Payment"} goBackButton={true}>
          <MatchCarousel matchData={match} />
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
              <Text className="text-white text-lg font-semibold">
                XXXXXXXXX
              </Text>
            </View>
            <View className="mt-4">
              <Text className="text-white text-lg font-bold">Detail Owner</Text>
              <View
                className="rounded-xl"
                style={{ backgroundColor: themeColors.bgCard }}
              >
                <DetailRow left="Name" right={route.params.name} />
                <DetailRow left="Email" right={route.params.email} />
                <DetailRow left="Phone number" right={route.params.phone} />
              </View>
            </View>
            <View className="mt-4">
              <Text className="text-white text-lg font-bold">Detail Price</Text>
              <View
                className="rounded-xl"
                style={{ backgroundColor: themeColors.bgCard }}
              >
                <DetailRow left="Area" right={route.params.side} />
                <DetailRow left="Quantity" right={route.params.numberTickets} />
                <DetailRow
                  left="Total price"
                  right={`${route.params.numberTickets * match.defaultPrice}€`}
                />
              </View>
            </View>
            <View className="mt-4">
              <Text className="text-white text-lg font-bold">
                Payment Method
              </Text>
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
                  Make sure that you have {paymentMethod.title} account to
                  checkout
                </Text>
              </Pressable>
            </View>
            <View className="justify-center items-center mt-4 mb-5">
              <Pressable
                className="justify-center items-center w-1/2 rounded-lg py-3 mt-2"
                style={{
                  backgroundColor: themeColors.bgButton,
                }}
                onPress={() =>
                  navigation.navigate("PaypalPayment", {
                    matchId: route.params.matchId,
                    numberTickets: route.params.numberTickets,
                    side: route.params.side,
                    name: route.params.name,
                    phone: route.params.phone,
                    email: route.params.email,
                  })
                }
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
      )}
    </>
  );
};
