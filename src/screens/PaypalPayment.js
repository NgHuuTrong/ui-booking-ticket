import React, { useContext } from "react";
import { View, Dimensions, Image } from "react-native";
import { WebView } from "react-native-webview";
import { UserContext } from "../services/user/user.context";
import { useNavigation, useRoute } from "@react-navigation/native";

const { width, height } = Dimensions.get("screen");

export const PaypalPayment = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const stateChng = (e) => {
    const { title, url } = e;
    if (title === "PayPal Success" || url.includes("/pay/success")) {
      navigation.popToTop();
      navigation.navigate("PaymentSuccess");
    }
  };
  const userCtx = useContext(UserContext);

  return (
    <WebView
      startInLoadingState={true}
      onNavigationStateChange={stateChng}
      renderLoading={() => <Loading />}
      source={{
        uri: `${process.env.EXPO_PUBLIC_API_URL}/pay/${route.params.matchId}/${route.params.name}/${route.params.email}/${route.params.phone}/${route.params.side}/${route.params.numberTickets}`,
        headers: {
          Authorization: `Bearer ${userCtx.access_token}`,
        },
        method: "GET",
      }}
    />
  );
};

const Loading = () => {
  return (
    <View
      style={{
        height: height,
        width: width,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image
        source={require("../../assets/images/paypal-logo.png")}
        style={{ width: 250, height: 100, resizeMode: "contain" }}
      />
    </View>
  );
};
