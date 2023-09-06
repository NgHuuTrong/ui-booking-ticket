import {
  Dimensions,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
} from "react-native";
import { SubLayout } from "../components/Common/SubLayout";
import { View } from "react-native";
import { Avatar, Button, CheckBox, Input, Stack } from "@rneui/themed";
import { useContext, useState } from "react";
import { themeColors } from "../theme";
import { UserContext } from "../services/user/user.context";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import {
  AntDesign,
  EvilIcons,
  Entypo,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const circleRadius = ((windowWidth / 4) * (windowWidth / 4) + 43 * 43) / 86;
export const ProfileScreen = () => {
  const navigation = useNavigation();
  const userCtx = useContext(UserContext);
  const [isEdited, setEdited] = useState(false);
  const [inputs, setInputs] = useState({
    email: userCtx.email,
    phone: userCtx.phone,
    name: userCtx.name,
    password: userCtx.password,
  });
  const [isMale, setMale] = useState(
    userCtx.gender.toLowerCase() === "male" ? true : false
  );

  const handleChangeProfile = () => {
    userCtx.changeProfile({
      ...inputs,
      gender: isMale ? "male" : "female",
    });

    setEdited(false);
  };

  const [image, setImage] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View
      className="flex-1 bg-white"
      style={{ backgroundColor: themeColors.bgCard }}
    >
      <View>
        <View
          // source={require("../../assets/images/HeaderBackground.jpeg")}
          className="w-full items-center pt-8"
          style={{
            height: 200,
            backgroundColor: themeColors.bgScreen,
          }}
        >
          <View
            style={{
              width: circleRadius * 2,
              height: circleRadius * 2,
              position: "absolute",
              top: 200 - windowWidth / 4 + 60,
              left: windowWidth / 4 - circleRadius,
              backgroundColor: themeColors.bgCard,
            }}
            className="bg-white rounded-full"
          ></View>
          <View
            style={{
              width: circleRadius * 2,
              height: circleRadius * 2,
              position: "absolute",
              top: 200 - windowWidth / 4 + 60,
              right: windowWidth / 4 - circleRadius,
              backgroundColor: themeColors.bgCard,
            }}
            className="bg-white rounded-full"
          ></View>
          <TouchableOpacity
            className=" rounded-full absolute left-2 top-6"
            onPress={() => navigation.goBack()}
          >
            <AntDesign name="left" size={30} color="white" />
          </TouchableOpacity>
          <Text className="text-white top-0 text-xl font-bold">Profile</Text>
          <Pressable
            onPress={() => setEdited(true)}
            className="absolute right-2 top-7"
          >
            {!isEdited ? (
              <EvilIcons name="pencil" size={38} color="white" />
            ) : (
              <Pressable
                onPress={() => {
                  setEdited(false);
                  setInputs({
                    email: userCtx.email,
                    phone: userCtx.phone,
                    name: userCtx.name,
                    password: userCtx.password,
                  });
                }}
              >
                <Text className="text-white text-lg font-semibold">Cancel</Text>
              </Pressable>
            )}
          </Pressable>
        </View>
        <View className="items-center" style={{ marginTop: -60 }}>
          <Avatar
            size={120}
            rounded
            source={
              image
                ? { uri: image }
                : require("../../assets/images/DefaultProfilePic.png")
            }
            avatarStyle={{
              borderColor: "#fff",
              borderWidth: 5,
            }}
            className
          />
          <Pressable
            className={`justify-center items-center ${
              isEdited ? "" : "opacity-80"
            } absolute`}
            onPress={pickImage}
            disabled={!isEdited}
            style={{
              top: 90,
              left: 45 + windowWidth / 2,
            }}
          >
            <View
              className="items-center -justify-center white border-blue-500 rounded-full absolute bg-white"
              style={{ padding: 2, borderWidth: 1 }}
            >
              <Entypo name="pencil" size={24} color="rgb(59 130 246)" />
            </View>
          </Pressable>
          <Text className="text-white text-xl font-bold mt-2">
            Nguyen Van Hieu
          </Text>
        </View>
        <ScrollView style={{ height: windowHeight - 150.095 - 156.1904 + 60 }}>
          <View className="px-3 mt-5">
            <Input
              inputContainerStyle={{
                backgroundColor: "#f9f9f9",
                borderRadius: 10,
                paddingHorizontal: 9,
                height: 60,
                elevation: 2,
              }}
              errorMessage="Please enter your email address"
              placeholder="Enter your email"
              leftIcon={
                <MaterialCommunityIcons
                  name="email-outline"
                  size={24}
                  color="black"
                />
              }
              onChangeText={(newText) =>
                setInputs({ ...inputs, email: newText })
              }
              disabled={!isEdited}
              value={inputs.email}
            ></Input>
          </View>
          <View className="px-3 mt-3">
            <Input
              inputContainerStyle={{
                backgroundColor: "#f9f9f9",
                borderRadius: 10,
                paddingHorizontal: 9,
                height: 60,
                elevation: 2,
              }}
              errorMessage="Please enter your valid phone"
              placeholder="Enter your phone"
              leftIcon={
                <MaterialCommunityIcons
                  name="phone-outline"
                  size={24}
                  color="black"
                />
              }
              onChangeText={(newText) =>
                setInputs({ ...inputs, phone: newText })
              }
              disabled={!isEdited}
              value={inputs.phone}
            ></Input>
          </View>
          <View className="px-3 mt-3">
            <Input
              inputContainerStyle={{
                backgroundColor: "#f9f9f9",
                borderRadius: 10,
                paddingHorizontal: 9,
                height: 60,
                elevation: 2,
              }}
              errorMessage="Please enter your name"
              placeholder="Enter your name"
              leftIcon={
                <MaterialCommunityIcons
                  name="account-outline"
                  size={24}
                  color="black"
                />
              }
              onChangeText={(newText) =>
                setInputs({ ...inputs, name: newText })
              }
              disabled={!isEdited}
              value={inputs.name}
            ></Input>
          </View>
          <View className="px-3 mt-3">
            <Input
              inputContainerStyle={{
                backgroundColor: "#f9f9f9",
                borderRadius: 10,
                paddingHorizontal: 9,
                height: 60,
                elevation: 2,
              }}
              errorMessage="Please enter your password"
              placeholder="Enter your password"
              leftIcon={
                <MaterialCommunityIcons
                  name="lock-outline"
                  size={24}
                  color="black"
                />
              }
              disabled={!isEdited}
              value={inputs.password}
              onChangeText={(newText) =>
                setInputs({ ...inputs, password: newText })
              }
            ></Input>
          </View>
          <View className="px-3 flex-row items-center">
            <Text className="ml-3 font-bold text-lg text-white">Gender:</Text>
            <CheckBox
              title={<Text className="text-white ml-2">Male</Text>}
              checked={isMale}
              onPress={() => setMale(true)}
              disabled={!isEdited}
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
              containerStyle={{ backgroundColor: "transparent" }}
            />
            <CheckBox
              title={<Text className="text-white ml-2">Female</Text>}
              checked={!isMale}
              onPress={() => setMale(false)}
              disabled={!isEdited}
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
              containerStyle={{ backgroundColor: "transparent" }}
            />
          </View>

          {isEdited && (
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
                onPress={handleChangeProfile}
              />
            </View>
          )}
          <View className="p-4">
            <View className="justify-center bg-slate-800 p-4 items-center rounded-lg">
              <View className="w-full items-start">
                <Text className="text-white text-xl font-bold">
                  Get more from UEFA
                </Text>
                <Text className="flex-wrap text-white font-semibold">
                  Get your account and enjoy unrivalled access to match
                  highlights, latests news, official games and more.
                </Text>
              </View>
              <View className="flex-row">
                <Button
                  title="Login"
                  titleStyle={{
                    fontWeight: "700",
                    color: themeColors.bgScreen,
                  }}
                  buttonStyle={{
                    backgroundColor: themeColors.bgButton,
                    borderColor: "transparent",
                    borderWidth: 0,
                    borderRadius: 10,
                  }}
                  containerStyle={{
                    width: windowWidth / 2 - 33,
                    marginRight: 10,
                    marginVertical: 10,
                  }}
                  onPress={() => navigation.navigate("Login")}
                />

                <Button
                  title="Create account"
                  titleStyle={{
                    fontWeight: "700",
                    color: themeColors.bgButton,
                  }}
                  buttonStyle={{
                    backgroundColor: "transparent",
                    borderColor: themeColors.bgButton,
                    borderWidth: 1,
                    borderRadius: 10,
                  }}
                  containerStyle={{
                    width: windowWidth / 2 - 33,
                    marginVertical: 10,
                  }}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};
