import { Image, ScrollView, Text, View } from "react-native";
import { SubLayout } from "../components/Common/SubLayout";
import { MatchCarousel } from "../components/Matches/MatchCarousel";
import { StadiumSideSection } from "../components/Matches/StadiumSideSection";
import { useContext, useEffect, useState } from "react";
import {
  useIsFocused,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { AxiosContext } from "../services/axios.context";
import { ErrorAlertModal } from "../components/ErrorAlertModal";
import { getMatch } from "../services/match.service";
import { UserContext } from "../services/user/user.context";

export const ChooseSeatScreen = () => {
  const route = useRoute();
  const [matchData, setMatchData] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const { isAuthenticated } = useContext(UserContext);
  const { authAxios } = useContext(AxiosContext);
  const isFocused = useIsFocused();
  const navigation = useNavigation();

  useEffect(() => {
    if (!isAuthenticated && isFocused) {
      setErrorMessage("You must login to order ticket !");
      return;
    }
    const fetchData = async () => {
      try {
        const res = await getMatch(authAxios, route.params.matchId);
        setMatchData(res);
      } catch (error) {
        setErrorMessage(error);
      }
    };

    fetchData();
  }, [isFocused]);

  return (
    <SubLayout title={"Choose Seat"} goBackButton={true}>
      {errorMessage && (
        <ErrorAlertModal
          message={errorMessage}
          onDismiss={() => {
            setErrorMessage("");
            navigation.goBack();
          }}
        />
      )}
      {matchData && <MatchCarousel matchData={matchData} />}
      <ScrollView>
        <View className="justify-center items-center mt-5">
          <Text className="text-white text-xl font-bold">Stadium Diagram</Text>
          <Image source={require("../../assets/images/stadium-diagram.png")} />
        </View>
        <StadiumSideSection
          title="North Side"
          side="north"
          matchId={route.params.matchId}
          unitPrice={matchData?.defaultPrice}
          remainSeats={matchData?.remainSeatsNorth}
        />
        <StadiumSideSection
          title="South Side"
          side="south"
          matchId={route.params.matchId}
          unitPrice={matchData?.defaultPrice}
          remainSeats={matchData?.remainSeatsSouth}
        />
        <StadiumSideSection
          title="West Side"
          side="west"
          matchId={route.params.matchId}
          unitPrice={matchData?.defaultPrice}
          remainSeats={matchData?.remainSeatsWest}
        />
        <StadiumSideSection
          title="East Side"
          side="east"
          matchId={route.params.matchId}
          unitPrice={matchData?.defaultPrice}
          remainSeats={matchData?.remainSeatsEast}
        />
      </ScrollView>
    </SubLayout>
  );
};
