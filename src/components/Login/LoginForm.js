import { Button, CheckBox, Input } from "@rneui/themed";
import { Alert, Pressable, ScrollView, Text } from "react-native";
import { View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useContext, useState } from "react";
import { themeColors } from "../../theme";
import { AxiosContext } from "../../services/axios.context";
import { UserContext } from "../../services/user/user.context";
import { ErrorAlertModal } from "../ErrorAlertModal";
import { signIn } from "../../services/user/user.service";
import { useNavigation } from "@react-navigation/native";

export const LoginForm = ({ handleChangeToResetMode }) => {
  const [inputs, setInputs] = useState({
    email: "",
    password: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { publicAxios } = useContext(AxiosContext);
  const { authenticate } = useContext(UserContext);
  const navigation = useNavigation();

  const handleSignIn = () => {
    const signInFunction = async () => {
      try {
        const res = await signIn(publicAxios, inputs);

        //get token
        authenticate(res.token);

        Alert.alert('Sign in successfully', '', [
          {},
          { text: 'OK', onPress: () => navigation.navigate("home") },
        ]);
      } catch (error) {
        setErrorMessage(error);
      }
    }

    signInFunction();
  }

  return (
    <ScrollView className="rounded-lg shadow-sm p-4">
      {errorMessage && <ErrorAlertModal message={errorMessage} onDismiss={() => setErrorMessage('')} />}
      <Text className="text-3xl font-extrabold mb-12">
        {"Sign in to continue"}
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
          <Pressable onPress={() => setInputs({ ...inputs, email: '' })}>
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
          <MaterialCommunityIcons name="lock-outline" size={24} color="black" />
        }
        rightIcon={
          <Pressable onPress={() => setInputs({ ...inputs, password: '' })}>
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
        checkedColor={themeColors.bgScreen}
        checked={showPassword}
        containerStyle={{
          padding: 0,
          margin: 0,
          marginBottom: 15
        }}
        onPress={() => setShowPassword(!showPassword)}
      />
      <Pressable
        onPress={handleChangeToResetMode}
        className="p-2 items-end mb-12"
      >
        <Text style={{ color: themeColors.bgButton }} className="font-semibold">
          Forgot password?
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
          onPress={handleSignIn}
        />
      </View>
    </ScrollView>
  );
};
