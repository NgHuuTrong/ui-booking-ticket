import { Image, Pressable, Text, View } from "react-native";
import { MotiView, useAnimationState } from "moti";
import { useEffect, useState } from "react";
import { Button } from "@rneui/themed";
import { LoginForm } from "../components/Login/LoginForm";
import { useNavigation } from "@react-navigation/native";
import { SignUpForm } from "../components/Login/SignUpForm";
import { themeColors } from "../theme";
import { ResetPasswordForm } from "../components/Login/ResetPasswordForm";
export const LoginScreen = () => {
  const [mode, setMode] = useState("signIn");
  const navigation = useNavigation();
  const animationState = useAnimationState({
    resetPassword: {
      height: 390,
    },
    signIn: {
      height: 469,
    },
    signUp: {
      height: 585,
    },
  });
  useEffect(() => {
    animationState.transitionTo("signIn");
  }, []);
  const handleChangeMode = () => {
    if (mode === "signUp") {
      animationState.transitionTo("signIn");
      setMode("signIn");
    } else {
      animationState.transitionTo("signUp");
      setMode("signUp");
    }
  };
  function handleChangeToResetMode() {
    animationState.transitionTo("resetPassword");
    setMode("resetPassword");
  }
  return (
    <View className="p-4">
      <View className="items-end">
        <Pressable onPress={() => navigation.goBack()}>
          <Text className="text-yellow-500 font-bold text-lg ">Close</Text>
        </Pressable>
      </View>
      <View className="items-center mb-8">
        <Image
          source={require("../../assets/images/LeagueIcon.png")}
          style={{ width: 112.7 * 0.7, height: 108 * 0.7 }}
        ></Image>
      </View>
      <MotiView
        state={animationState}
        style={{ elevation: 10 }}
        className="rounded-lg p8 mb-4 bg-white overflow-hidden"
      >
        {mode === "signIn" ? (
          <LoginForm
            handleChangeToResetMode={handleChangeToResetMode}
          ></LoginForm>
        ) : mode === "signUp" ? (
          <SignUpForm></SignUpForm>
        ) : (
          <ResetPasswordForm></ResetPasswordForm>
        )}
      </MotiView>
      <Pressable className="items-center" onPress={handleChangeMode}>
        {mode === "signUp" ? (
          <>
            <Text className="text-slate-500 ">
              I already have an account.{" "}
              <Text style={{ color: themeColors.bgButton }}>Sign in.</Text>
            </Text>
          </>
        ) : (
          <>
            <Text className="text-slate-500 ">
              I don't have account.{" "}
              <Text style={{ color: themeColors.bgButton }}>Sign up.</Text>
            </Text>
          </>
        )}
      </Pressable>
    </View>
  );
};
