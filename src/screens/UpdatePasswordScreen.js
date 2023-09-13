import { Pressable, ScrollView, View } from "react-native";
import { SubLayout } from "../components/Common/SubLayout";
import { Button, Input } from "@rneui/themed";
import {
    Ionicons,
    MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useCallback, useContext, useState } from "react";
import { updatePassword } from "../services/user/user.service";
import { AxiosContext } from "../services/axios.context";
import { UserContext } from "../services/user/user.context";
import { Alert } from "react-native";
import { ErrorAlertModal } from "../components/ErrorAlertModal";
import { useNavigation } from "@react-navigation/native";
import InAppLoading from "../components/InAppLoading";

export const UpdatePasswordScreen = () => {
    const [inputs, setInputs] = useState({
        currentPassword: '',
        newPassword: '',
        newPasswordConfirm: ''
    });
    const [isHided, setHided] = useState({
        currentPassword: true,
        newPassword: true,
        newPasswordConfirm: true
    });
    const [isError, setErrors] = useState({
        newPassword: false,
        newPasswordConfirm: false
    });
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setLoading] = useState(false);
    const { authAxios } = useContext(AxiosContext);
    const { authenticate } = useContext(UserContext);
    const navigation = useNavigation();

    const validateNewPassword = useCallback((newPassword) => {
        if (newPassword.length < 8) {
            setErrors({
                ...isError,
                newPassword: true
            })
        }
    });

    const validateNewPasswordConfirm = useCallback((newPasswordConfirm, newPassword) => {
        if (newPasswordConfirm !== newPassword) {
            setErrors({
                ...isError,
                newPasswordConfirm: true
            })
        }
    });

    const handleUpdatePassword = () => {
        if (!inputs.currentPassword || !inputs.newPassword || !inputs.newPasswordConfirm) {
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
                Alert.alert('Update password successfully', '', [
                    {},
                    { text: 'OK', onPress: () => navigation.goBack() },
                ]);
            } catch (error) {
                setErrorMessage(error);
            }
        }

        updatePasswordFunction();
    }

    return (
        <SubLayout title={"Update Password"} goBackButton={true}>
            {errorMessage && <ErrorAlertModal message={errorMessage} onDismiss={() => setErrorMessage('')} />}
            <InAppLoading visible={isLoading} />
            <ScrollView className="mt-10 px-3 ">
                <View className="mt-3">
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
                            <MaterialCommunityIcons name="lock-outline" size={24} color="black" />
                        }
                        rightIcon={
                            <Pressable
                                onPress={() => setHided({ ...isHided, currentPassword: !isHided.currentPassword })}
                            >
                                {
                                    isHided.currentPassword ? <Ionicons name="eye-outline" size={24} color="black" /> :
                                        <Ionicons name="eye-off-outline" size={24} color="black" />
                                }
                            </Pressable>
                        }
                        onChangeText={(value) => setInputs({ ...inputs, currentPassword: value })}
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
                            <MaterialCommunityIcons name="lock-alert-outline" size={24} color="black" />
                        }
                        rightIcon={
                            <Pressable
                                onPress={() => setHided({ ...isHided, newPassword: !isHided.newPassword })}
                            >
                                {
                                    isHided.newPassword ? <Ionicons name="eye-outline" size={24} color="black" /> :
                                        <Ionicons name="eye-off-outline" size={24} color="black" />
                                }
                            </Pressable>
                        }
                        errorStyle={{
                            opacity: isError.newPassword ? 1 : 0
                        }}
                        errorMessage="Please fill a valid password (at least 8 characters)"
                        value={inputs.newPassword}
                        onChangeText={(value) => setInputs({ ...inputs, newPassword: value })}
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
                            <MaterialCommunityIcons name="lock-open-check-outline" size={24} color="black" />
                        }
                        rightIcon={
                            <Pressable
                                onPress={() => setHided({ ...isHided, newPasswordConfirm: !isHided.newPasswordConfirm })}
                            >
                                {
                                    isHided.newPasswordConfirm ? <Ionicons name="eye-outline" size={24} color="black" /> :
                                        <Ionicons name="eye-off-outline" size={24} color="black" />
                                }
                            </Pressable>
                        }
                        errorStyle={{
                            opacity: isError.newPasswordConfirm ? 1 : 0
                        }}
                        errorMessage="Not match the new password"
                        value={inputs.newPasswordConfirm}
                        onChangeText={(value) => setInputs({ ...inputs, newPasswordConfirm: value })}
                        onTouchEnd={() => setErrors({ ...isError, newPasswordConfirm: false })}
                        onBlur={() => validateNewPasswordConfirm(
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
                            width: "90%",
                            marginVertical: 10,
                        }}
                        onPress={handleUpdatePassword}
                    />
                </View>
            </ScrollView>
        </SubLayout>
    )
}