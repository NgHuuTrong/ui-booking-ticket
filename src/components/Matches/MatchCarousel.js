import { Image, ImageBackground, Text, View } from "react-native";
import { Club } from "../Club/Club";
import clubs from '../../../assets/data/club.json'

export const MatchCarousel = () => {
    return (
        <ImageBackground
            source={require('../../../assets/images/HeaderBackground.jpeg')}
            className="w-full justify-center items-center"
            style={{
                height: 230
            }}
        >
            <View className="flex-row justify-center items-center">
                <View className="w-1/3 justify-center items-center">
                    <Club name={clubs[0].name} uri={clubs[0].logo} />
                </View>
                <View className="w-1/3 justify-center items-center">
                    <Text className="text-white">Group stage</Text>
                    <Text className="text-white font-bold">September 3, 2023</Text>
                    <Text className="text-white mt-3">KICK OFF</Text>
                    <Text className="text-white text-lg font-bold">20:00 P.M</Text>
                </View>
                <View className="w-1/3 justify-center items-center">
                    <Club name={clubs[1].name} uri={clubs[1].logo} />
                </View>
            </View>
            <Text className="text-white text-xl font-extrabold mt-3">Santiago Bernabéu</Text>
        </ImageBackground>
    );
};
