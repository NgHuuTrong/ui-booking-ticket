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
import { UserContext } from "../services/user/user.context";

const nameRegex = /^[A-Za-z\s]+$/;
const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

export const DetailOrderInforScreen = () => {
    const navigation = useNavigation();
    const route = useRoute(); // .params.matchId, .params.numberTickets, .params.side
    const isFocused = useIsFocused();
    const { isAuthenticated } = useContext(UserContext);
    const { authAxios } = useContext(AxiosContext);
    const [matchData, setMatchData] = useState(null);
    const [checked, setChecked] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [inputs, setInputs] = useState({
        name: "",
        phone: "",
        email: ""
    });
    const [isError, setErrors] = useState({
        name: false,
        phone: false,
        email: false
    });

    useEffect(() => {
        if (!isAuthenticated && isFocused) {
            setErrorMessage("You must login to order ticket !");
            return;
        }
        if (isFocused) {
            const fetchData = async () => {
                try {
                    const res = await getMatch(authAxios, route.params.matchId);
                    setMatchData(res);
                } catch (error) {
                    setErrorMessage(error);
                }
            }

            fetchData();
        }
    }, [isFocused]);

    const validateName = (name) => {
        if (!nameRegex.test(name)) {
            setErrors({ ...isError, name: true })
        }
    }
    const validatePhone = (phone) => {
        if (!phoneRegex.test(phone)) {
            setErrors({ ...isError, phone: true })
        }
    }
    const validateEmail = (email) => {
        if (!emailRegex.test(email)) {
            setErrors({ ...isError, email: true })
        }
    }

    const handleOrder = () => {
        if (!inputs.name || !inputs.phone || !inputs.email) {
            setErrorMessage("Please fill all information fields before placing an order.");
            return;
        }
        if (isError.name || isError.phone || isError.email) {
            setErrorMessage("Please fill all valid information before placing an order.");
            return;
        }
        if (!checked) {
            setErrorMessage("Please agree to the service term by checking the box.");
            return;
        }
        navigation.navigate("DetailOrderPayment", {
            matchId: route.params.matchId,
            numberTickets: route.params.numberTickets,
            side: route.params.side,
            name: inputs.name,
            phone: inputs.phone,
            email: inputs.email
        });
    }

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
                        value={inputs.name}
                        onChangeText={(value) => { setInputs({ ...inputs, name: value }) }}
                        onTouchEnd={() => setErrors({ ...isError, name: false })}
                        onBlur={() => validateName(inputs.name)}
                    />
                    <Text className={`text-sm text-red-700 ${isError.name ? 'block' : 'hidden'}`}>
                        Please fill a valid name
                    </Text>
                </View>
                <View className="px-5 mb-4">
                    <View className="flex-row">
                        <Text className="mb-2 mr-1 text-white font-semibold">Phone number</Text>
                        <Text className="text-red-700-500">*</Text>
                    </View>
                    <TextInput
                        className="border border-white rounded-lg px-3 text-white"
                        value={inputs.phone}
                        onChangeText={(value) => setInputs({ ...inputs, phone: value })}
                        onTouchEnd={() => setErrors({ ...isError, phone: false })}
                        onBlur={() => validatePhone(inputs.phone)}
                    />
                    <Text className={`text-sm text-red-700 ${isError.phone ? 'block' : 'hidden'}`}>
                        Please fill a valid phone number
                    </Text>
                </View>
                <View className="px-5 mb-4">
                    <View className="flex-row">
                        <Text className="mb-2 mr-1 text-white font-semibold">Email</Text>
                        <Text className="text-red-500">*</Text>
                    </View>
                    <TextInput
                        className="border border-white rounded-lg px-3 text-white opacity-80"
                        value={inputs.email}
                        onChangeText={(value) => setInputs({ ...inputs, email: value })}
                        onTouchEnd={() => setErrors({ ...isError, email: false })}
                        onBlur={() => validateEmail(inputs.email)}
                    />
                    <Text className={`text-sm text-red-700 ${isError.email ? 'block' : 'hidden'}`}>
                        Please fill a valid email
                    </Text>
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
                        onPress={handleOrder}
                    >
                        <Text className="font-semibold" style={{ color: themeColors.bgScreen }}>Order Now</Text>
                    </Pressable>
                </View>
            </ScrollView>
        </SubLayout>
    )
};
