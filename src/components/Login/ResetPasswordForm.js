import { Button, Input } from "@rneui/themed";
import { Pressable, Text } from "react-native";
import { View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import { themeColors } from "../../theme";
export const ResetPasswordForm = () => {
  const [email, setEmail] = useState("");
  return (
    <View className="rounded-lg shadow-sm p-4">
      <Text className="text-3xl font-extrabold mb-12">
        {"Reset your\npassword."}
      </Text>
      <Input
        leftIcon={
          <MaterialCommunityIcons
            name="email-outline"
            size={24}
            color="black"
          />
        }
        rightIcon={
          <Pressable onPress={() => console.log(123)}>
            <MaterialCommunityIcons name="close" size={24} color="black" />
          </Pressable>
        }
        placeholder="Email"
        errorMessage="123"
        onChangeText={(value) => setEmail(value)}
        value={email}
        shake={true}
      ></Input>
      <View className="p-2 items-end mb-12">
        <Text style={{ color: themeColors.bgButton }} className="font-semibold">
          For got password?
        </Text>
      </View>
      <View className="items-center">
        <Button
          title="Log in"
          titleStyle={{ fontWeight: "700", color: "white" }}
          buttonStyle={{
            backgroundColor: "#5b66c9",
            borderColor: "white",
            borderWidth: 1,
            borderRadius: 14,
            height: 60,
          }}
          containerStyle={{
            width: "90%",
            marginVertical: 10,
          }}
        />
      </View>
    </View>
  );
};
