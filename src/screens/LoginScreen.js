import { Image, Pressable, Text, View } from "react-native";
import { MotiView, useAnimationState } from "moti";
import { useEffect, useState } from "react";
import { LoginForm } from "../components/Login/LoginForm";
import { useNavigation, useRoute } from "@react-navigation/native";
import { SignUpForm } from "../components/Login/SignUpForm";
import { themeColors } from "../theme";
import { ResetPasswordForm } from "../components/Login/ResetPasswordForm";
import { ScrollView } from "react-native";
import { ForgotPasswordForm } from "../components/Login/ForgotPasswordForm";
export const LoginScreen = () => {
  const route = useRoute();
  const [mode, setMode] = useState(
    route?.params?.mode ? route.params.mode : "signIn"
  );
  const navigation = useNavigation();
  const animationState = useAnimationState({
    forgotPassword: {
      height: 300,
    },
    resetPassword: {
      height: 420,
    },
    signIn: {
      height: 469,
    },
    signUp: {
      height: 590,
    },
  });

  useEffect(() => {
    switch (route?.params?.mode) {
      case "signIn": {
        animationState.transitionTo("signIn");
        break;
      }
      case "signUp": {
        animationState.transitionTo("signUp");
        break;
      }
      case "resetPassword": {
        animationState.transitionTo("resetPassword");
        break;
      }
      default:
        animationState.transitionTo("forgotPassword");
    }
  }, []);

  const renderForm = () => {
    switch (mode) {
      case "signIn": {
        return (
          <LoginForm handleChangeToForgotMode={handleChangeToForgotMode} />
        );
      }
      case "signUp": {
        return <SignUpForm />;
      }
      case "resetPassword": {
        return (
          <ResetPasswordForm
            handleChangeToLoginMode={handleChangeToLoginMode}
          />
        );
      }
      default:
        return (
          <ForgotPasswordForm
            handleChangeToLoginMode={handleChangeToLoginMode}
            handleChangeToResetMode={handleChangeToResetMode}
          />
        );
    }
  };

  const handleChangeMode = () => {
    if (mode == "signIn") {
      navigation.setParams({
        mode: "signUp",
      });
      setMode("signUp", animationState.transitionTo("signUp"));
    } else {
      navigation.setParams({
        mode: "signIn",
      });
      setMode("signIn", animationState.transitionTo("signIn"));
    }
  };

  const handleChangeToLoginMode = () => {
    animationState.transitionTo("signIn");
    navigation.setParams({
      mode: "signIn",
    });
    setMode("signIn");
  };

  const handleChangeToForgotMode = () => {
    animationState.transitionTo("forgotPassword");
    navigation.setParams({
      mode: "forgotPassword",
    });
    setMode("forgotPassword");
  };

  const handleChangeToResetMode = () => {
    navigation.setParams({
      mode: "resetPassword",
    });
    setMode("resetPassword", animationState.transitionTo("resetPassword"));
  };

  return (
    <ScrollView className="p-4">
      <View className="items-end">
        <Pressable
          onPress={() => {
            if (navigation.canGoBack()) {
              navigation.goBack();
            } else {
              navigation.navigate("home");
            }
          }}
        >
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
        {renderForm()}
      </MotiView>
      <Pressable className="items-center" onPress={handleChangeMode}>
        {mode === "signIn" ? (
          <>
            <Text className="text-slate-500 ">
              I don't have account.{" "}
              <Text style={{ color: themeColors.bgButton }}>Sign up.</Text>
            </Text>
          </>
        ) : (
          <>
            <Text className="text-slate-500 ">
              I already have an account.{" "}
              <Text style={{ color: themeColors.bgButton }}>Sign in.</Text>
            </Text>
          </>
        )}
      </Pressable>
    </ScrollView>
  );
};
