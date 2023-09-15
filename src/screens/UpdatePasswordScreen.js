import {
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SubLayout } from "../components/Common/SubLayout";
import { Button, Input } from "@rneui/themed";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useCallback, useContext, useState } from "react";
import { updatePassword } from "../services/user/user.service";
import { AxiosContext } from "../services/axios.context";
import { UserContext } from "../services/user/user.context";
import { Alert } from "react-native";
import { ErrorAlertModal } from "../components/ErrorAlertModal";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import InAppLoading from "../components/InAppLoading";
import { SuccessModal } from "../components/SuccessModal";

export const UpdatePasswordScreen = () => {
  const [inputs, setInputs] = useState({
    currentPassword: "",
    newPassword: "",
    newPasswordConfirm: "",
  });
  const [isHided, setHided] = useState({
    currentPassword: true,
    newPassword: true,
    newPasswordConfirm: true,
  });
  const [isError, setErrors] = useState({
    newPassword: false,
    newPasswordConfirm: false,
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [isUnauthorized, setUnauthorized] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const { authAxios } = useContext(AxiosContext);
  const { authenticate, logout } = useContext(UserContext);
  const navigation = useNavigation();

  const validateNewPassword = useCallback((newPassword) => {
    if (newPassword.length < 8) {
      setErrors({
        ...isError,
        newPassword: true,
      });
    }
  });

  const validateNewPasswordConfirm = useCallback(
    (newPasswordConfirm, newPassword) => {
      if (newPasswordConfirm !== newPassword) {
        setErrors({
          ...isError,
          newPasswordConfirm: true,
        });
      }
    }
  );

  const handleUpdatePassword = () => {
    if (
      !inputs.currentPassword ||
      !inputs.newPassword ||
      !inputs.newPasswordConfirm
    ) {
      setErrorMessage(
        "Please fill all information fields before updating password."
      );
      return;
    }
    if (isError.newPassword || isError.newPasswordConfirm) {
      setErrorMessage(
        "Please fill all valid information before updating password."
      );
      return;
    }

    const updatePasswordFunction = async () => {
      try {
        setLoading(true);
        const res = await updatePassword(authAxios, inputs);

        authenticate(res.token);

        setLoading(false);
        setShowSuccessModal(true);
        setTimeout(() => {
          setShowSuccessModal(false);
        }, 2000);
        setTimeout(() => {
          navigation.goBack();
        }, 3000);
      } catch (error) {
        setLoading(false);
        if (error.status === 401) {
          setUnauthorized(true);
        }
        setErrorMessage(error.message);
      }
    };

    updatePasswordFunction();
  };

  return (
    <View>
      {errorMessage && (
        <ErrorAlertModal
          message={errorMessage}
          onDismiss={() => {
            if (isUnauthorized) {
              setUnauthorized(false);
              setErrorMessage("");
              logout();

              navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }],
              });
            } else {
              navigation.goBack();
            }
          }}
        />
      )}
      <InAppLoading visible={isLoading} />
      <SuccessModal
        title="Update password successfully"
        message="Your password has been updated. Navigating back..."
        visible={showSuccessModal}
      ></SuccessModal>
      <ScrollView className="mt-10 px-3 ">
        <TouchableOpacity
          className=" rounded-full absolute left-2 top-4"
          onPress={() => navigation.goBack()}
        >
          <AntDesign name="left" size={30} color="black" />
        </TouchableOpacity>
        <View className="mt-24">
          <View className="px-2 mb-8">
            <Text className="text-3xl font-bold mb-2">Create new password</Text>
            <Text className="text-zinc-500 font-semibold">
              Your new password must be different from the previous used
              password.
            </Text>
          </View>
          <Input
            inputContainerStyle={{
              backgroundColor: "#f9f9f9",
              borderRadius: 10,
              paddingHorizontal: 9,
              height: 60,
              elevation: 2,
            }}
            placeholder="Your password"
            leftIcon={
              <MaterialCommunityIcons
                name="lock-outline"
                size={24}
                color="black"
              />
            }
            rightIcon={
              <Pressable
                onPress={() =>
                  setHided({
                    ...isHided,
                    currentPassword: !isHided.currentPassword,
                  })
                }
              >
                {isHided.currentPassword ? (
                  <Ionicons name="eye-outline" size={24} color="black" />
                ) : (
                  <Ionicons name="eye-off-outline" size={24} color="black" />
                )}
              </Pressable>
            }
            onChangeText={(value) =>
              setInputs({ ...inputs, currentPassword: value })
            }
            secureTextEntry={isHided.currentPassword}
          />
        </View>
        <View className="mt-3">
          <Input
            inputContainerStyle={{
              backgroundColor: "#f9f9f9",
              borderRadius: 10,
              paddingHorizontal: 9,
              height: 60,
              elevation: 2,
            }}
            placeholder="Enter new password"
            leftIcon={
              <MaterialCommunityIcons
                name="lock-alert-outline"
                size={24}
                color="black"
              />
            }
            rightIcon={
              <Pressable
                onPress={() =>
                  setHided({ ...isHided, newPassword: !isHided.newPassword })
                }
              >
                {isHided.newPassword ? (
                  <Ionicons name="eye-outline" size={24} color="black" />
                ) : (
                  <Ionicons name="eye-off-outline" size={24} color="black" />
                )}
              </Pressable>
            }
            errorStyle={{
              opacity: isError.newPassword ? 1 : 0,
            }}
            errorMessage="Please fill a valid password (at least 8 characters)"
            value={inputs.newPassword}
            onChangeText={(value) =>
              setInputs({ ...inputs, newPassword: value })
            }
            onTouchEnd={() => setErrors({ ...isError, newPassword: false })}
            onBlur={() => validateNewPassword(inputs.newPassword)}
            secureTextEntry={isHided.newPassword}
          />
        </View>
        <View className="mt-3">
          <Input
            inputContainerStyle={{
              backgroundColor: "#f9f9f9",
              borderRadius: 10,
              paddingHorizontal: 9,
              height: 60,
              elevation: 2,
            }}
            placeholder="New password confirm"
            leftIcon={
              <MaterialCommunityIcons
                name="lock-open-check-outline"
                size={24}
                color="black"
              />
            }
            rightIcon={
              <Pressable
                onPress={() =>
                  setHided({
                    ...isHided,
                    newPasswordConfirm: !isHided.newPasswordConfirm,
                  })
                }
              >
                {isHided.newPasswordConfirm ? (
                  <Ionicons name="eye-outline" size={24} color="black" />
                ) : (
                  <Ionicons name="eye-off-outline" size={24} color="black" />
                )}
              </Pressable>
            }
            errorStyle={{
              opacity: isError.newPasswordConfirm ? 1 : 0,
            }}
            errorMessage="Not match the new password"
            value={inputs.newPasswordConfirm}
            onChangeText={(value) =>
              setInputs({ ...inputs, newPasswordConfirm: value })
            }
            onTouchEnd={() =>
              setErrors({ ...isError, newPasswordConfirm: false })
            }
            onBlur={() =>
              validateNewPasswordConfirm(
                inputs.newPasswordConfirm,
                inputs.newPassword
              )
            }
            secureTextEntry={isHided.newPasswordConfirm}
          />
        </View>
        <View className="w-full justify-center items-center mt-4">
          <Button
            title="Update"
            titleStyle={{ fontWeight: "700", color: "white" }}
            buttonStyle={{
              backgroundColor: "#7d6bfc",
              borderColor: "white",
              borderWidth: 1,
              borderRadius: 14,
              height: 60,
            }}
            containerStyle={{
              width: "100%",
              marginVertical: 10,
            }}
            onPress={handleUpdatePassword}
          />
        </View>
      </ScrollView>
    </View>
  );
};
