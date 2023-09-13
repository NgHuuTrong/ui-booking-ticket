import { Button, Input } from "@rneui/themed";
import { Alert, Pressable, Text } from "react-native";
import { View } from "react-native";
import { FontAwesome5, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useCallback, useContext, useState } from "react";
import { AxiosContext } from "../../services/axios.context";
import { resetPassword } from "../../services/user/user.service";
import { ErrorAlertModal } from "../ErrorAlertModal";

export const ResetPasswordForm = ({ handleChangeToLoginMode }) => {
  const [inputs, setInputs] = useState({
    resetToken: '',
    password: '',
    passwordConfirm: ''
  });
  const [isHided, setHided] = useState({
    password: true,
    passwordConfirm: true
  });
  const [isError, setErrors] = useState({
    password: false,
    passwordConfirm: false
  });
  const [errorMessage, setErrorMessage] = useState("");
  const { publicAxios } = useContext(AxiosContext);

  const validatePassword = useCallback((password) => {
    if (password.length < 8) {
      setErrors({
        ...isError,
        password: true
      })
    }
  });

  const validatePasswordConfirm = useCallback((password, passwordConfirm) => {
    if (password !== passwordConfirm) {
      setErrors({
        ...isError,
        passwordConfirm: true
      })
    }
  });

  const handleResetPassword = () => {
    if (!inputs.resetToken || !inputs.password || !inputs.passwordConfirm) {
      setErrorMessage(
        "Please fill all information fields before updating password."
      );
      return;
    }
    if (isError.password || isError.passwordConfirm) {
      setErrorMessage(
        "Please fill all valid information before updating password."
      );
      return;
    }

    const resetPasswordFunction = async () => {
      try {
        const res = await resetPassword(publicAxios, inputs);

        Alert.alert('Reset password successfully', '', [
          {},
          { text: 'OK', onPress: () => handleChangeToLoginMode() },
        ]);
      } catch (error) {
        setErrorMessage(error);
      }
    }

    resetPasswordFunction();
  }

  return (
    <View className="rounded-lg shadow-sm p-4">
      {errorMessage && <ErrorAlertModal message={errorMessage} onDismiss={() => setErrorMessage('')} />}
      <Text className="text-3xl font-extrabold mb-12">
        {"Reset your password."}
      </Text>
      <Input
        leftIcon={
          <FontAwesome5 name="coins" size={24} color="black" />
        }
        placeholder="Reset token"
        onChangeText={(value) => setInputs({ ...inputs, resetToken: value })}
        value={inputs.resetToken}
        shake={true}
      />
      <Input
        leftIcon={
          <MaterialCommunityIcons name="lock-outline" size={24} color="black" />
        }
        rightIcon={
          <Pressable
            onPress={() => setHided({ ...isHided, password: !isHided.password })}
          >
            {
              isHided.password ? <Ionicons name="eye-outline" size={24} color="black" /> :
                <Ionicons name="eye-off-outline" size={24} color="black" />
            }
          </Pressable>
        }
        placeholder="Password"
        onChangeText={(value) => setInputs({ ...inputs, password: value })}
        value={inputs.password}
        errorMessage="Please fill a valid password (at least 8 characters)"
        errorStyle={{
          opacity: isError.password ? 1 : 0
        }}
        onTouchEnd={() => setErrors({ ...isError, password: false })}
        onBlur={() => validatePassword(inputs.password)}
        secureTextEntry={isHided.password}
      />
      <Input
        leftIcon={
          <MaterialCommunityIcons name="lock-open-check-outline" size={24} color="black" />
        }
        rightIcon={
          <Pressable
            onPress={() => setHided({ ...isHided, passwordConfirm: !isHided.passwordConfirm })}
          >
            {
              isHided.passwordConfirm ? <Ionicons name="eye-outline" size={24} color="black" /> :
                <Ionicons name="eye-off-outline" size={24} color="black" />
            }
          </Pressable>
        }
        placeholder="Password confirm"
        onChangeText={(value) => setInputs({ ...inputs, passwordConfirm: value })}
        value={inputs.passwordConfirm}
        errorMessage="Not match the new password"
        errorStyle={{
          opacity: isError.passwordConfirm ? 1 : 0
        }}
        onTouchEnd={() => setErrors({ ...isError, passwordConfirm: false })}
        onBlur={() => validatePasswordConfirm(inputs.password, inputs.passwordConfirm)}
        secureTextEntry={isHided.passwordConfirm}
      />
      <View className="items-center">
        <Button
          title="Reset My Password"
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
          onPress={handleResetPassword}
        />
      </View>
    </View>
  );
};
