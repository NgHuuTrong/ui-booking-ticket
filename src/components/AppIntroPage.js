import { Image, ImageBackground, View } from "react-native";
import Lottie from "lottie-react-native";

export const AppIntroPage = () => {
  return (
    <View
      className="flex-1 items-center justify-center"
      style={{ backgroundColor: "#0c174c" }}
    >
      <ImageBackground
        source={require("../../assets/images/AppLoadingImage.jpg")}
        className="justify-center items-center"
        style={{ width: "100%", height: "100%" }}
      >
        <Image
          source={require("../../assets/images/AppLoadingLogo.png")}
          className="absolute top-24 "
          style={{ width: 141.11, height: 135.43 }}
        ></Image>
        <Lottie
          source={require("../../assets/Lottie/FootBallAnimation.json")}
          autoPlay
          loop
          style={{ width: 231.62 * 1.4, height: 190.143 * 1.4 }}
          className="mt-12"
        />
      </ImageBackground>
    </View>
  );
};
