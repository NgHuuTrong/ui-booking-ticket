import { Pressable } from "react-native";
import { themeColors } from "../../theme";
import { Text } from "react-native";
import { useState } from "react";
import { View } from "react-native";

export const StadiumSideSection = ({ title, unitPrice }) => {
    const [isShown, setShown] = useState(false);
    const [numberTickets, setNumberTickers] = useState(0)

    return <Pressable
        className={`mx-5 pt-3 my-3 rounded-md overflow-hidden ${isShown ? "border border-white" : ""}`}
        style={{ backgroundColor: themeColors.bgCard }}
        onPress={() => {
            setShown(!isShown);
            setNumberTickers(0);
        }}
    >
        <Text className="text-white text-lg font-bold px-5 pb-3">{title}</Text>
        {
            isShown && <>
                <View
                    className="flex-row justify-around items-center px-5 py-3"
                    style={{ backgroundColor: themeColors.bgScreen }}
                >
                    <Text className="text-white">Unit price: {unitPrice}€</Text>
                    <View>
                        <Text className="text-white font-bold">Number of tickets</Text>
                        <View className="flex-row justify-evenly items-center mt-2">
                            <Pressable
                                className="rounded-xl justify-center items-center"
                                style={{
                                    backgroundColor: themeColors.bgButton,
                                    width: 20,
                                    height: 20
                                }}
                                onPress={() => {
                                    if (numberTickets > 0) {
                                        setNumberTickers(numberTickets - 1);
                                    }
                                }}
                            >
                                <Text className="text-white font-bold">-</Text>
                            </Pressable>
                            <Text className="text-white">{numberTickets}</Text>
                            <Pressable
                                className="rounded-xl justify-center items-center"
                                style={{
                                    backgroundColor: themeColors.bgButton,
                                    width: 20,
                                    height: 20
                                }}
                                onPress={() => setNumberTickers(numberTickets + 1)}
                            >
                                <Text className="text-white font-bold">+</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
                <Pressable
                    className="justify-center items-center py-3 mt-2"
                    style={{
                        backgroundColor: themeColors.bgButton
                    }}
                >
                    <Text className="text-white font-semibold" style={{ color: themeColors.bgScreen }}>Order Now</Text>
                </Pressable>
            </>
        }
    </Pressable >
}