import { Button, Input } from "@rneui/themed";
import { Alert, Pressable, Text } from "react-native";
import { View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useContext, useState } from "react";
import { themeColors } from "../../theme";
import { AxiosContext } from "../../services/axios.context";
import { ErrorAlertModal } from "../ErrorAlertModal";
import { forgotPassword } from "../../services/user/user.service";
import { SuccessModal } from "../SuccessModal";

const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

export const ForgotPasswordForm = ({
  handleChangeToLoginMode,
  handleChangeToResetMode,
}) => {
  const [email, setEmail] = useState("");
  const [isError, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const { publicAxios } = useContext(AxiosContext);

  const validateEmail = (email) => {
    if (!emailRegex.test(email)) {
      setError(true);
    }
  };

  const handleForgotPassword = () => {
    if (!email) {
      setErrorMessage(
        "Please fill your email address before resetting password."
      );
      return;
    }

    const forgotPasswordFunction = async () => {
      try {
        await forgotPassword(publicAxios, { email });

        setShowSuccessModal(true);
        setTimeout(() => {
          setShowSuccessModal(false);
        }, 2000);
        setTimeout(() => {
          handleChangeToResetMode();
        }, 3000);
      } catch (error) {
        setErrorMessage(error.message);
      }
    };

    forgotPasswordFunction();
  };

  return (
    <View className="rounded-lg shadow-sm p-4">
      {errorMessage && (
        <ErrorAlertModal
          message={errorMessage}
          onDismiss={() => setErrorMessage("")}
        />
      )}
      <SuccessModal
        title="Token sent"
        message="Reset token has been sent to you via email. Please use the token to reset your password."
        visible={showSuccessModal}
      ></SuccessModal>
      <Text className="text-3xl font-extrabold mb-5">
        {"Find your account"}
      </Text>
      <Text className="mb-5 text-gray-500">
        Please enter your email address where we can send reset token to.
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
          <Pressable onPress={() => setEmail("")}>
            <MaterialCommunityIcons name="close" size={24} color="black" />
          </Pressable>
        }
        placeholder="Email address"
        onChangeText={(value) => setEmail(value)}
        value={email}
        errorMessage="Please fill a valid email address"
        errorStyle={{
          opacity: isError ? 1 : 0,
        }}
        onTouchEnd={() => setError(false)}
        onBlur={() => validateEmail(email)}
      ></Input>
      <View className="flex-row justify-end items-center mt-5">
        <Button
          title="Cancel"
          titleStyle={{ fontWeight: "700", color: "#4b4f56" }}
          buttonStyle={{
            backgroundColor: "#e4e6eb",
            borderRadius: 14,
            paddingHorizontal: 20,
            height: 50,
          }}
          containerStyle={{
            marginRight: 10,
            marginVertical: 10,
          }}
          onPress={handleChangeToLoginMode}
        />
        <Button
          title="Continue"
          titleStyle={{ fontWeight: "700", color: "white" }}
          buttonStyle={{
            backgroundColor: "#5b66c9",
            borderRadius: 14,
            paddingHorizontal: 30,
            height: 50,
          }}
          containerStyle={{
            marginVertical: 10,
          }}
          onPress={handleForgotPassword}
        />
      </View>
    </View>
  );
};
