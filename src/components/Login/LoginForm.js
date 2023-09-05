import { Button, Input } from "@rneui/themed";
import { Pressable, Text } from "react-native";
import { View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import { themeColors } from "../../theme";
export const LoginForm = ({ handleChangeToResetMode }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <View className="rounded-lg shadow-sm p-4">
      <Text className="text-3xl font-extrabold mb-12">
        {"Sign in to\ncontinue."}
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
      <Input
        leftIcon={
          <MaterialCommunityIcons name="lock-outline" size={24} color="black" />
        }
        rightIcon={
          <MaterialCommunityIcons name="close" size={24} color="black" />
        }
        placeholder="Password"
        errorMessage="123"
        value={password}
        onChangeText={(value) => setPassword(value)}
        secureTextEntry={true}
      ></Input>
      <Pressable
        onPress={handleChangeToResetMode}
        className="p-2 items-end mb-12"
      >
        <Text style={{ color: themeColors.bgButton }} className="font-semibold">
          For got password?
        </Text>
      </Pressable>
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
