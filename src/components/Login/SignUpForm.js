import { Button, Input, CheckBox } from "@rneui/themed";
import { Alert, Pressable, ScrollView, Text } from "react-native";
import { View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useContext, useState } from "react";
import { themeColors } from "../../theme";
import { AxiosContext } from "../../services/axios.context";
import { UserContext } from "../../services/user/user.context";
import { signUp } from "../../services/user/user.service";
import { ErrorAlertModal } from "../ErrorAlertModal";
import { useNavigation } from "@react-navigation/native";
import { SuccessModal } from "../SuccessModal";

export const SignUpForm = () => {
  const [inputs, setInputs] = useState({
    email: "",
    name: "",
    phone: "",
    password: "",
    passwordConfirm: "",
    gender: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const { publicAxios } = useContext(AxiosContext);
  const { authenticate } = useContext(UserContext);
  const [errorMessage, setErrorMessage] = useState("");
  const navigation = useNavigation();

  const handleSignUp = () => {
    const signUpFunction = async () => {
      try {
        const res = await signUp(publicAxios, inputs);

        //get token
        authenticate(res.token);

        setShowSuccessModal(true);
        setTimeout(() => {
          setShowSuccessModal(false);
        }, 2000);
        setTimeout(() => {
          navigation.navigate("home");
        }, 3000);
      } catch (error) {
        setErrorMessage(error.message);
      }
    };

    signUpFunction();
  };

  return (
    <ScrollView className="rounded-lg shadow-sm p-4">
      <SuccessModal
        title="Sign up successfully"
        message="You have successfully signed up, navigating to Home screen..."
        visible={showSuccessModal}
      ></SuccessModal>
      {errorMessage && (
        <ErrorAlertModal
          message={errorMessage}
          onDismiss={() => setErrorMessage("")}
        />
      )}
      <Text className="text-3xl font-extrabold mb-7">
        {"Create new account"}
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
          <Pressable onPress={() => setInputs({ ...inputs, email: "" })}>
            <MaterialCommunityIcons name="close" size={24} color="black" />
          </Pressable>
        }
        placeholder="Email"
        onChangeText={(value) => setInputs({ ...inputs, email: value })}
        value={inputs.email}
        shake={true}
      ></Input>
      <Input
        leftIcon={
          <MaterialCommunityIcons
            name="phone-outline"
            size={24}
            color="black"
          />
        }
        rightIcon={
          <Pressable onPress={() => setInputs({ ...inputs, phone: "" })}>
            <MaterialCommunityIcons name="close" size={24} color="black" />
          </Pressable>
        }
        placeholder="Phone number"
        value={inputs.phone}
        onChangeText={(value) => setInputs({ ...inputs, phone: value })}
      ></Input>
      <Input
        leftIcon={
          <MaterialCommunityIcons
            name="account-outline"
            size={24}
            color="black"
          />
        }
        rightIcon={
          <Pressable onPress={() => setInputs({ ...inputs, name: "" })}>
            <MaterialCommunityIcons name="close" size={24} color="black" />
          </Pressable>
        }
        placeholder="Name"
        value={inputs.name}
        onChangeText={(value) => setInputs({ ...inputs, name: value })}
      ></Input>
      <Input
        leftIcon={
          <MaterialCommunityIcons name="lock-outline" size={24} color="black" />
        }
        rightIcon={
          <Pressable onPress={() => setInputs({ ...inputs, password: "" })}>
            <MaterialCommunityIcons name="close" size={24} color="black" />
          </Pressable>
        }
        placeholder="Password"
        value={inputs.password}
        onChangeText={(value) => setInputs({ ...inputs, password: value })}
        secureTextEntry={!showPassword}
      ></Input>
      <CheckBox
        title="Show password"
        checked={showPassword}
        containerStyle={{
          padding: 0,
          margin: 0,
          marginBottom: 15,
        }}
        onPress={() => setShowPassword(!showPassword)}
      />
      <Input
        leftIcon={
          <MaterialCommunityIcons
            name="lock-check-outline"
            size={24}
            color="black"
          />
        }
        rightIcon={
          <Pressable
            onPress={() => setInputs({ ...inputs, passwordConfirm: "" })}
          >
            <MaterialCommunityIcons name="close" size={24} color="black" />
          </Pressable>
        }
        placeholder="Password confirm"
        value={inputs.passwordConfirm}
        onChangeText={(value) =>
          setInputs({ ...inputs, passwordConfirm: value })
        }
        secureTextEntry={true}
      ></Input>
      <View className="flex-row">
        <CheckBox
          checkedColor={themeColors.bgButton}
          checked={inputs.gender === "male" ? true : false}
          title={"Male"}
          onPress={() => setInputs({ ...inputs, gender: "male" })}
        />
        <CheckBox
          checkedColor={themeColors.bgButton}
          checked={inputs.gender === "female" ? true : false}
          title={"Female"}
          onPress={() => setInputs({ ...inputs, gender: "female" })}
        />
      </View>
      <View className="items-center my-5">
        <Button
          title="Create Account"
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
          onPress={handleSignUp}
        />
      </View>
    </ScrollView>
  );
};
