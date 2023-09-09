import { Image, ScrollView, Text, View } from "react-native"
import { SubLayout } from "../components/Common/SubLayout"
import { MatchCarousel } from "../components/Matches/MatchCarousel"
import { StadiumSideSection } from "../components/Matches/StadiumSideSection"

export const ChooseSeatScreen = () => {
    return <SubLayout title={'Choose Seat'} goBackButton={true}>
        <MatchCarousel />
        <ScrollView>
            <View className="justify-center items-center mt-5">
                <Text className="text-white text-xl font-bold">Stadium Diagram</Text>
                <Image source={require("../../assets/images/stadium-diagram.png")} />
            </View>
            <StadiumSideSection title='North Side' unitPrice='100' />
            <StadiumSideSection title='South Side' unitPrice='100' />
            <StadiumSideSection title='West Side' unitPrice='80' />
            <StadiumSideSection title='East Side' unitPrice='80' />
        </ScrollView>
    </SubLayout>
}