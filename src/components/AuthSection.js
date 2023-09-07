import { Dimensions, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Text } from "react-native";
import { themeColors } from "../theme";
import { Button } from "@rneui/themed";

const windowWidth = Dimensions.get("window").width;

export const AuthSection = () => {
    const navigation = useNavigation();

    return <View className="p-4">
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
}