import { Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { SubLayout } from "../components/Common/SubLayout";
import { MatchCarousel } from "../components/Matches/MatchCarousel";
import { CheckBox } from "@rneui/themed";
import { themeColors } from "../theme";
import { useState } from "react";

export const DetailOrderInforScreen = () => {
    const [checked, setChecked] = useState(true);

    return (
        <SubLayout title={'Personal Information'} goBackButton={true}>
            <MatchCarousel />
            <ScrollView className="mt-5">
                <View className="px-5 mb-4">
                    <View className="flex-row">
                        <Text className="mb-2 mr-1 text-white font-semibold">Name</Text>
                        <Text className="text-red-500">*</Text>
                    </View>
                    <TextInput
                        className="border border-white rounded-lg px-3 text-white opacity-80"
                        editable={false}
                        defaultValue="Nguyen Van Hieu"
                    />
                </View>
                <View className="px-5 mb-4">
                    <View className="flex-row">
                        <Text className="mb-2 mr-1 text-white font-semibold">Phone number</Text>
                        <Text className="text-red-500">*</Text>
                    </View>
                    <TextInput
                        className="border border-white rounded-lg px-3 text-white"
                    />
                </View>
                <View className="px-5 mb-4">
                    <View className="flex-row">
                        <Text className="mb-2 mr-1 text-white font-semibold">Email</Text>
                        <Text className="text-red-500">*</Text>
                    </View>
                    <TextInput
                        className="border border-white rounded-lg px-3 text-white opacity-80"
                        editable={false}
                        defaultValue="vanhieu230303@gmail.com"
                    />
                </View>
                <View className="flex-row justify-center items-center flex-wrap">
                    <CheckBox
                        containerStyle={{
                            backgroundColor: themeColors.bgScreen,
                            margin: 0,
                            padding: 0
                        }}
                        checked={checked}
                        onPress={() => setChecked(!checked)}
                        iconType="material-community"
                        checkedIcon="checkbox-outline"
                        uncheckedIcon={'checkbox-blank-outline'}
                    />
                    <Text className="text-white">I agree to receive notifications
                        order tickets via email.</Text>
                    <Text className="text-red-500">*</Text>
                </View>
                <View className="justify-center items-center">
                    <Pressable
                        className="justify-center items-center w-1/2 rounded-lg py-3 mt-2"
                        style={{
                            backgroundColor: themeColors.bgButton
                        }}
                        onPress={() => navigation.navigate("DetailOrderInfor")}
                    >
                        <Text className="font-semibold" style={{ color: themeColors.bgScreen }}>Continue</Text>
                    </Pressable>
                </View>
            </ScrollView>
        </SubLayout>
    )
};
