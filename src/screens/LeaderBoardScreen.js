import { ScrollView, Text, View } from "react-native";
import { MainLayout } from "../components/Common/MainLayout";
import { useContext, useEffect, useState } from "react";
import { themeColors } from "../theme";
import { GroupCart } from "../components/LeaderBoard/groupCart";
import { AxiosContext } from "../services/axios.context";
import { getAllGroup } from "../services/group.service";
import { Loading } from "../components/Loading";
import { useIsFocused } from "@react-navigation/native";

export const LeaderBoardScreen = () => {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const isFocused = useIsFocused();

  const { publicAxios } = useContext(AxiosContext);

  useEffect(() => {
    if (isFocused) {
      const fetchData = async () => {
        try {
          setLoading(true);
          const res = await getAllGroup(publicAxios);
          res.forEach((ele) =>
            ele.groupClubs.sort(function (a, b) {
              return b.points - a.points;
            })
          );
          setGroups(res);
          setLoading(false);
        } catch (err) {
          setLoading(false);
          setErrorMessage(err);
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
        <Loading />
      ) : (
        <MainLayout>
          <ScrollView>
            <Text
              style={{ color: themeColors.bgButton }}
              className=" text-3xl font-bold m-4"
            >
              Group stage standings
            </Text>
            {groups.map((group) => (
              <GroupCart group={group} key={group.groupId} />
            ))}
          </ScrollView>
        </MainLayout>
      )}
    </>
  );
};
