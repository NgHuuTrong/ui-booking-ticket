import { ImageBackground, Pressable, ScrollView, Text, TextInput } from "react-native";
import { SubLayout } from "../components/Common/SubLayout";
import { View } from "react-native";
import { Avatar, CheckBox, Stack } from "@rneui/themed";
import { useContext, useState } from "react";
import { themeColors } from "../theme";
import { UserContext } from "../services/user/user.context";
import { Button } from "react-native";
import * as ImagePicker from 'expo-image-picker';

export const ProfileScreen = () => {
  const userCtx = useContext(UserContext);
  const [isEdited, setEdited] = useState(false);
  const [inputs, setInputs] = useState({
    email: userCtx.email,
    phone: userCtx.phone,
    name: userCtx.name,
    password: userCtx.password
  });
  const [isMale, setMale] = useState(userCtx.gender.toLowerCase() === 'male' ? true : false);

  const handleChangeProfile = () => {
    userCtx.changeProfile({
      ...inputs,
      gender: isMale ? 'male' : 'female'
    });

    setEdited(false);
  }

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

  return <SubLayout goBackButton={true} title="Profile">
    <View>
      <ImageBackground
        source={require('../../assets/images/HeaderBackground.jpeg')}
        className="w-full justify-center items-center"
        style={{
          height: 250
        }}
      >
        {
          image && <Avatar
            size={120}
            rounded
            source={{ uri: image }}
            avatarStyle={{
              borderColor: '#fff',
              borderWidth: 5
            }}
          />
        }
        <Text className="text-white text-lg font-bold mt-2">Nguyen Van Hieu</Text>
        <Pressable
          className="border border-3 border-white rounded-lg px-8 py-2 mt-3"
          onPress={() => setEdited(true)}
        >
          <Text className="text-white">Edit Profile</Text>
        </Pressable>
      </ImageBackground>
      <ScrollView>
        <View className="px-3 mt-5">
          <Text className="text-white font-bold">Email</Text>
          <TextInput
            className={`border border-t-0 border-x-0 border-b-3 border-white text-white ${isEdited ? '' : 'opacity-80'}`}
            value={inputs.email}
            onChangeText={(newText) => setInputs({ ...inputs, email: newText })}
            editable={isEdited}
          />
        </View>
        <View className="px-3 mt-3">
          <Text className="text-white font-bold">Phone number</Text>
          <TextInput
            className={`border border-t-0 border-x-0 border-b-3 border-white text-white ${isEdited ? '' : 'opacity-80'}`}
            value={inputs.phone}
            onChangeText={(newText) => setInputs({ ...inputs, phone: newText })}
            editable={isEdited}
          />
        </View>
        <View className="px-3 mt-3">
          <Text className="text-white font-bold">Name</Text>
          <TextInput
            className={`border border-t-0 border-x-0 border-b-3 border-white text-white ${isEdited ? '' : 'opacity-80'}`}
            value={inputs.name}
            onChangeText={(newText) => setInputs({ ...inputs, name: newText })}
            editable={isEdited}
          />
        </View>
        <View className="px-3 mt-3">
          <Text className="text-white font-bold">Password</Text>
          <TextInput
            className={`border border-t-0 border-x-0 border-b-3 border-white text-white ${isEdited ? '' : 'opacity-80'}`}
            value={inputs.password}
            onChangeText={(newText) => setInputs({ ...inputs, password: newText })}
            editable={isEdited}
          />
        </View>
        <View className="px-3 mt-3">
          <Text className="text-white font-bold">Gender</Text>
          <CheckBox
            containerStyle={{ backgroundColor: themeColors.bgScreen }}
            title={<Text className="text-white ml-2">Male</Text>}
            checked={isMale}
            onPress={() => setMale(true)}
            disabled={!isEdited}
          />
          <CheckBox
            containerStyle={{ backgroundColor: themeColors.bgScreen }}
            title={<Text className="text-white ml-2">Female</Text>}
            checked={!isMale}
            onPress={() => setMale(false)}
            disabled={!isEdited}
          />
        </View>
        <Pressable
          className={`ml-3 mt-3 py-2 w-2/5 rounded-lg border border-white justify-center items-center ${isEdited ? '' : 'opacity-80'}`}
          onPress={pickImage}
          disabled={!isEdited}
          style={{
            backgroundColor: themeColors.bgCard
          }}
        >
          <Text className="text-white font-bold">Upload avatar</Text>
        </Pressable>
        {
          isEdited && <View className="w-full flex-row justify-center items-center mt-4">
            <Pressable
              className="w-1/4 py-3 rounded-xl justify-center items-center mr-2"
              style={{
                backgroundColor: '#eb4134'
              }}
              onPress={() => {
                setEdited(false);
                setInputs({
                  email: userCtx.email,
                  phone: userCtx.phone,
                  name: userCtx.name,
                  password: userCtx.password
                });
              }}
            >
              <Text className="text-white font-bold">Cancel</Text>
            </Pressable>
            <Pressable
              className="w-1/3 py-3 rounded-xl justify-center items-center"
              style={{
                backgroundColor: themeColors.bgButton
              }}
              onPress={handleChangeProfile}
            >
              <Text className="font-bold" style={{ color: themeColors.bgCard }}>Update</Text>
            </Pressable>
          </View>
        }
      </ScrollView>
    </View>
  </SubLayout>
};
