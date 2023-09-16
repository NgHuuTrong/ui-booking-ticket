import {
  Dimensions,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
} from "react-native";
import { View } from "react-native";
import { Avatar, Button, CheckBox, Input } from "@rneui/themed";
import { useContext, useEffect, useState } from "react";
import { themeColors } from "../theme";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import {
  AntDesign,
  EvilIcons,
  Entypo,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { getUser, updateUser } from "../services/user/user.service";
import { AxiosContext } from "../services/axios.context";
import { UserContext } from "../services/user/user.context";
import { AuthSection } from "../components/AuthSection";
import { ErrorAlertModal } from "../components/ErrorAlertModal";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const circleRadius = ((windowWidth / 4) * (windowWidth / 4) + 43 * 43) / 86;

export const ProfileScreen = () => {
  const navigation = useNavigation();
  const [isEdited, setEdited] = useState(false);
  const [currentName, setCurrentName] = useState("");
  const [details, setDetails] = useState({
    email: "",
    phone: "",
    name: "",
    gender: "",
    image: null,
  });
  const [inputs, setInputs] = useState({
    email: "",
    phone: "",
    name: "",
    gender: "",
    image: null,
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [isUnauthorized, setUnauthorized] = useState(false);
  const isFocused = useIsFocused();
  const { isAuthenticated, logout } = useContext(UserContext);
  const { authAxios } = useContext(AxiosContext);

  useEffect(() => {
    if (isFocused && isAuthenticated) {
      const fetchData = async () => {
        try {
          const res = await getUser(authAxios);

          setCurrentName(res.name);
          setDetails({
            email: res.email,
            phone: res.phone,
            name: res.name,
            gender: res.gender,
            image: res.photo,
          });
          setInputs({
            email: res.email,
            phone: res.phone,
            name: res.name,
            gender: res.gender,
            image: res.photo,
          });
        } catch (error) {
          if (error.status === 401) {
            setUnauthorized(true);
          }
          setErrorMessage(error.message);
        }
      };

      fetchData();
    }
  }, [isFocused]);

  const handleChangeProfile = () => {
    // update user here
    const updateProfile = async () => {
      try {
        let formData = new FormData();

        if (inputs.image !== details.image) {
          let filename = inputs.image.split("/").pop();
          let match = /\.(\w+)$/.exec(filename);
          let type = match ? `image/${match[1]}` : `image`;

          formData.append("photo", { uri: inputs.image, name: filename, type });
        }
        formData.append("name", inputs.name);
        formData.append("email", inputs.email);
        formData.append("phone", inputs.phone);
        formData.append("gender", inputs.gender);
        await updateUser(authAxios, formData);

        setDetails(inputs);
        setCurrentName(inputs.name);
        setEdited(false);
      } catch (err) {
        setErrorMessage(err.message);
      }
    };
    updateProfile();
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setInputs({ ...inputs, image: result.assets[0].uri });
    }
  };

  return (
    <View
      className="flex-1 bg-white"
      style={{ backgroundColor: themeColors.bgCard }}
    >
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
                routes: [{ name: "Login" }],
              });
            } else {
              setErrorMessage("");
              navigation.goBack();
            }
          }}
        />
      )}
      <View>
        <View
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
            {isAuthenticated ? (
              !isEdited ? (
                <EvilIcons name="pencil" size={38} color="white" />
              ) : (
                <Pressable
                  onPress={() => {
                    setEdited(false);
                    setInputs(details);
                  }}
                >
                  <Text className="text-white text-lg font-semibold">
                    Cancel
                  </Text>
                </Pressable>
              )
            ) : (
              ""
            )}
          </Pressable>
        </View>
        <View className="items-center" style={{ marginTop: -60 }}>
          <Avatar
            size={120}
            rounded
            source={
              inputs.image
                ? { uri: inputs.image }
                : require("../../assets/images/DefaultProfilePic.png")
            }
            avatarStyle={{
              borderColor: "#fff",
              borderWidth: 5,
            }}
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
          <Text className="text-white text-xl font-bold my-2">
            {currentName}
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
          <View className="px-3 flex-row items-center">
            <Text className="ml-3 font-bold text-lg text-white">Gender:</Text>
            <CheckBox
              title={<Text className="text-white ml-2">Male</Text>}
              checked={inputs.gender === "male" ? true : false}
              onPress={() => setInputs({ ...inputs, gender: "male" })}
              disabled={!isEdited}
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
              containerStyle={{ backgroundColor: "transparent" }}
            />
            <CheckBox
              title={<Text className="text-white ml-2">Female</Text>}
              checked={inputs.gender === "female" ? true : false}
              onPress={() => setInputs({ ...inputs, gender: "female" })}
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
          {!isAuthenticated && <AuthSection />}
        </ScrollView>
      </View>
    </View>
  );
};
