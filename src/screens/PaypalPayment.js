import React, { useContext } from "react";
import { View, Dimensions, Image } from "react-native";
import { WebView } from "react-native-webview";
import { UserContext } from "../services/user/user.context";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("screen");

export const PaypalPayment = () => {
  const navigation = useNavigation();
  const stateChng = (e) => {
    const { title, url } = e;
    if (title === "PayPal Success" || url.includes("/pay/success")) {
      navigation.popToTop();
      navigation.navigate("PaymentSuccess");
    }
  };
  const userCtx = useContext(UserContext);

  const payer_name = "Nguyen Van Hieu";
  const payer_email = "hieulun@gmail.com";
  const payer_phone = "0113114115";
  const area = "north";
  const quantity = 1;
  return (
    <WebView
      startInLoadingState={true}
      onNavigationStateChange={stateChng}
      renderLoading={() => <Loading />}
      source={{
        uri: `${process.env.EXPO_PUBLIC_API_URL}/pay/25/${payer_name}/${payer_email}/${payer_phone}/${area}/${quantity}`,
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
