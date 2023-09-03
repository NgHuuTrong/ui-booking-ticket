import { Image, ImageBackground, Pressable, Text, View } from "react-native";

export const MatchCarousel = () => {
    return (
        <ImageBackground
            source={require('../../../assets/images/HeaderBackground.jpeg')}
            className="w-full justify-center items-center"
            style={{
                height: 230
            }}
        >
            <View className="flex-row justify-center items-center px-3">
                <View className="w-1/3 justify-center items-center">
                    <Image
                        source={require('../../../assets/images/team1.png')}
                        style={{
                            width: 50,
                            height: 50
                        }}
                    />
                    <Text className="text-white font-bold mt-3">Manchester City</Text>
                </View>
                <View className="w-1/3 justify-center items-center">
                    <Text className="text-white">Group stage</Text>
                    <Text className="text-white font-bold">September 3, 2023</Text>
                    <Text className="text-white mt-3">KICK OFF</Text>
                    <Text className="text-white text-lg font-bold">20:00 P.M</Text>
                </View>
                <View className="w-1/3 justify-center items-center">
                    <Image
                        source={require('../../../assets/images/team2.png')}
                        style={{
                            width: 45,
                            height: 45
                        }}
                    />
                    <Text className="text-white font-bold mt-3">Arsenal</Text>
                </View>
            </View>
            <Text className="text-white text-xl font-extrabold mt-3">Santiago Bernabéu</Text>
        </ImageBackground>
    );
};
