import { ScrollView, Text, View } from "react-native";
import { MainLayout } from "../components/Common/MainLayout";
import { useEffect, useState } from "react";
import { themeColors } from "../theme";
import { GroupCart } from "../components/LeaderBoard/groupCart";

export const LeaderBoardScreen = () => {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      const _group = require("../../assets/data/group.json");
      const _groupClub = require("../../assets/data/groupClub.json");
      const _club = require("../../assets/data/club.json");

      const result = _group.map((ele) => {
        const tmpGrCl = _groupClub.filter((el) => el.group_id === ele.group_id);
        const tmpCl = tmpGrCl.map((res) => {
          const dummy = _club.find((c) => c.club_id === res.club_id);
          return {
            ...res,
            club_name: dummy.name,
            club_logo: dummy.logo,
          };
        });
        tmpCl.sort(function (a, b) {
          return b.points - a.points;
        });
        return {
          group_id: ele.group_id,
          group_name: ele.group_name,
          clubs: tmpCl,
        };
      });
      return result;
    };
    setGroups(fetchData);
  }, []);

  return (
    <MainLayout>
      <ScrollView>
        <Text
          style={{ color: themeColors.bgButton }}
          className=" text-2xl font-bold m-4"
        >
          Group stage standings
        </Text>
        {groups &&
          groups.map((group) => (
            <GroupCart group={group} key={group.group_id} />
          ))}
      </ScrollView>
    </MainLayout>
  );
};
