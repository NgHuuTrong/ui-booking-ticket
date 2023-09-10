import { ImageBackground, Text, View } from "react-native";
import { Club } from "../Club/Club";
import { datetimeTransform } from "../../utils/timeTransform";

export const MatchCarousel = ({ matchData }) => {
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
                    <Club name={matchData.home_club.name} uri={matchData.home_club.logo} />
                </View>
                <View className="w-1/3 justify-center items-center">
                    <Text className="text-white text-center">{matchData.round?.split('-')[0]}</Text>
                    <Text className="text-white text-center">{matchData.round?.split('-')[1]}</Text>
                    <Text className="text-white text-center">{matchData.round?.split('-')[2]}</Text>
                    <Text className="text-white font-bold">
                        {datetimeTransform(matchData.time, "date")}
                    </Text>
                    <Text className="text-white mt-3">KICK OFF</Text>
                    <Text className="text-white text-lg font-bold">
                        {datetimeTransform(matchData.time, "time")}
                    </Text>
                </View>
                <View className="w-1/3 justify-center items-center">
                    <Club name={matchData.away_club.name} uri={matchData.away_club.logo} />
                </View>
            </View>
            <Text className="text-white text-xl font-extrabold mt-3">
                {matchData.stadium.name}
            </Text>
        </ImageBackground>
    );
};
