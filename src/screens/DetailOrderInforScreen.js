import { Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { SubLayout } from "../components/Common/SubLayout";
import { MatchCarousel } from "../components/Matches/MatchCarousel";
import { CheckBox } from "@rneui/themed";
import { themeColors } from "../theme";
import { useContext, useEffect, useState } from "react";
import { useIsFocused, useNavigation, useRoute } from "@react-navigation/native";
import { ErrorAlertModal } from "../components/ErrorAlertModal";
import { AxiosContext } from "../services/axios.context";
import { getMatch } from "../services/match.service";

export const DetailOrderInforScreen = () => {
    const navigation = useNavigation();
    const route = useRoute(); // .params.matchId, .params.numberTickets, .params.side
    const isFocused = useIsFocused();
    const [matchData, setMatchData] = useState(null);
    const [checked, setChecked] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const { authAxios } = useContext(AxiosContext);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getMatch(authAxios, route.params.matchId);
                setMatchData(res);
            } catch (error) {
                setErrorMessage(error);
            }
        }

        fetchData();
    }, [isFocused]);
    return (
        <SubLayout title={'Personal Information'} goBackButton={true}>
            {errorMessage && <ErrorAlertModal message={errorMessage} onDismiss={() => setErrorMessage('')} />}
            {matchData && <MatchCarousel matchData={matchData} />}
            <ScrollView className="mt-5">
                <View className="px-5 mb-4">
                    <View className="flex-row">
                        <Text className="mb-2 mr-1 text-white font-semibold">Name</Text>
                        <Text className="text-red-500">*</Text>
                    </View>
                    <TextInput
                        className="border border-white rounded-lg px-3 text-white opacity-80"
                        editable={false}
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
                        onPress={() => navigation.navigate("DetailOrderPayment")}
                    >
                        <Text className="font-semibold" style={{ color: themeColors.bgScreen }}>Order Now</Text>
                    </Pressable>
                </View>
            </ScrollView>
        </SubLayout>
    )
};
