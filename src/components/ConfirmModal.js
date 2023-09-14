import { Image, Modal, Pressable, Text, View } from "react-native";

export const ConfirmModal = ({
  onDisplay,
  title,
  message,
  handleConfirm,
  handleCancel,
}) => {
  return (
    <Modal transparent={true} visible={onDisplay} animationType="slide">
      <View
        className="flex-1 items-center justify-center "
        style={{ backgroundColor: "rgba(15, 23, 42, .4)" }}
      >
        <View className="w-80 bg-white rounded-lg overflow-hidden">
          <View className="items-center mt-4">
            <Image
              source={require("../../assets/images/ConfirmModalImage.png")}
              className="w-24 h-24"
            ></Image>
          </View>
          <View className="items-center px-4">
            <Text
              style={{ color: "#5074fc" }}
              className="text-xl font-semibold mt-2"
            >
              {title}
            </Text>
            <Text className="mt-2 font-semibold text-zinc-500 text-center">
              {message}
            </Text>
          </View>
          <View className="mt-4 flex-row w-full">
            <Pressable
              style={{ width: 160, backgroundColor: "#a0a4ac" }}
              className="p-4 items-center justify-center"
              onPress={handleCancel}
            >
              <Text className="text-white font-semibold">Cancel</Text>
            </Pressable>
            <Pressable
              style={{ width: 160, backgroundColor: "#5074fc" }}
              className="p-4 items-center justify-center"
              onPress={handleConfirm}
            >
              <Text className="text-white font-semibold">Continue</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};
