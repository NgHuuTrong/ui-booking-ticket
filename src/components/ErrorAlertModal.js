import { Button } from "@rneui/themed";
import { useState } from "react";
import { Image, Modal, Text, View } from "react-native";

export const ErrorAlertModal = ({ message, onDismiss }) => {
  const [isDisplayed, setDisplayed] = useState(true);

  return (
    <Modal transparent={true} visible={isDisplayed} animationType="slide">
      <View
        className="flex-1 items-center justify-center "
        style={{ backgroundColor: "rgba(15, 23, 42, .4)" }}
      >
        <View className="w-80 bg-white rounded-lg overflow-hidden">
          <View className="items-center">
            <Image
              source={require("../../assets/images/AlertModalImage.png")}
              className="w-32 h-32"
            ></Image>
          </View>
          <View className="items-center">
            <Text
              style={{ color: "#7d6bfc" }}
              className="text-xl font-semibold"
            >
              Oh snap!
            </Text>
            <Text className="mt-2 font-semibold">{message}</Text>
          </View>
          <View className="mt-4">
            <Button
              onPress={() => {
                if (onDismiss) onDismiss();
                setDisplayed(false);
              }}
              title={"Dismiss"}
              buttonStyle={{ height: 54, backgroundColor: "#7d6bfc" }}
            ></Button>
          </View>
        </View>
      </View>
    </Modal>
  );
};
