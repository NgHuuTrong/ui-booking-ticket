import React from "react";
import { View, Dimensions, Image } from "react-native";
import { WebView } from "react-native-webview";

const { width, height } = Dimensions.get("screen");

export const PaypalPayment = ({ navigation }) => {
  const stateChng = (navState) => {
    const { title } = navState;
    if (title == "PayPal Success") {
      navigation.navigate("PaymentSuccess");
    }
  };

  return (
    <WebView
      startInLoadingState={true}
      onNavigationStateChange={stateChng}
      renderLoading={() => <Loading />}
      source={{ uri: `${process.env.EXPO_PUBLIC_API_URL}/pay` }}
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
