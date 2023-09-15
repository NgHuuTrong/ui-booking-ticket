import { useContext, useEffect, useState } from "react";
import { GroupCart } from "../components/LeaderBoard/groupCart";
import { useIsFocused } from "@react-navigation/native";
import { AxiosContext } from "../services/axios.context";
import { getGroup, getGroupAndMatches } from "../services/group.service";
import { Loading } from "../components/Loading";
import { SubLayout } from "../components/Common/SubLayout";
import { MatchCard } from "../components/Matches/MatchCard";
import { FlatList, Text, View } from "react-native";
import { themeColors } from "../theme";
import { MatchTable } from "../components/Matches/MatchTable";

export const GroupDetailScreen = ({ route }) => {
  const { groupId } = route.params;
  const [loading, setLoading] = useState(true);

  const [group, setGroup] = useState({});
  const [matches, setMatches] = useState([]);
  const { publicAxios } = useContext(AxiosContext);
  const [errorMessage, setErrorMessage] = useState("");
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      const fetchData = async () => {
        try {
          setLoading(true);
          const resMatches = await getGroupAndMatches(publicAxios, groupId);
          const resGroup = await getGroup(publicAxios, groupId);
          setGroup(resGroup);
          setMatches(resMatches);
          setLoading(false);
        } catch (err) {
          setLoading(false);
          setErrorMessage(err.message);
        }
      };
      fetchData();
    } else {
      setLoading(true);
      setErrorMessage("");
    }
  }, [isFocused]);
  return (
    <>
      {loading ? (
        <Loading layout={SubLayout} />
      ) : (
        <SubLayout title="Group Detail" goBackButton={true}>
          <GroupCart group={group} viewBtn={false} />
          <Text className="text-xl text-white font-bold mt-2 ml-4">
            List Matches
          </Text>
          <FlatList
            contentContainerStyle={{ marginTop: 20, paddingBottom: 80 }}
            data={matches}
            renderItem={({ item, index }) => (
              <View className="my-2 mx-4 rounded-2xl">
                <MatchTable roundTitle={item.round} roundMatches={[item]} />
              </View>
            )}
            keyExtractor={(item) => item.matchId}
          />
        </SubLayout>
      )}
    </>
  );
};
