import { useCallback, useEffect, useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { MainLayout } from "../components/Common/MainLayout";
import { themeColors } from "../theme";
import { TicketCard } from "../components/Ticket/ticketCard";

const { width } = Dimensions.get("window");

const List = ({ data }) => {
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.ticket.ticket_id}
      contentContainerStyle={{
        paddingBottom: 250,
        minHeight: "100%",
      }}
      renderItem={({ item }) => {
        return <TicketCard item={item} />;
      }}
    />
  );
};

const data = [
  {
    ticket_id: 1,
    user_id: 1,
    match_id: 1,
    area: "North",
    seat: 1,
    price: 100,
    code: "0e76b6a34e920044edcb9cd3f4afb744565d49baa212321a64cffe8e80eae930",
    order_time: "2023-08-30 15:00:00",
  },
  {
    ticket_id: 2,
    user_id: 1,
    match_id: 5,
    area: "North",
    seat: 1,
    price: 100,
    code: "0e76b6a34e920044edcb9cd3f4afb744565d49baa212321a64cffe8e80eae930",
    order_time: "2023-08-30 15:00:00",
  },
  {
    ticket_id: 3,
    user_id: 1,
    match_id: 10,
    area: "North",
    seat: 1,
    price: 100,
    code: "0e76b6a34e920044edcb9cd3f4afb744565d49baa212321a64cffe8e80eae930",
    order_time: "2023-08-30 15:00:00",
  },
];

const part = ["Waiting", "Active", "History"];
const match = require("../../assets/data/match.json");
const club = require("../../assets/data/club.json");
const stadium = require("../../assets/data/stadium.json");

export const MyTicketScreen = () => {
  const [active, setActive] = useState(0);
  const flatListRef = useRef(null);
  const [ticket, setTicket] = useState([]);

  useEffect(() => {
    const fetchTicket = () => {
      const res = data.map((ele) => {
        const tmp = match.find((el) => el.match_id === ele.match_id);
        const homeClub = club.find((el) => el.club_id === tmp.home_club_id);
        const awayClub = club.find((el) => el.club_id === tmp.away_club_id);
        const tmpStadium = stadium.find(
          (el) => el.stadium_id === tmp.stadium_id
        );
        return {
          ticket: ele,
          match: tmp,
          homeClub,
          awayClub,
          stadium: tmpStadium,
        };
      });
      return res;
    };
    setTicket(fetchTicket);
  }, []);

  const handleOnScroll = useCallback((event) => {
    const index = event.nativeEvent.contentOffset.x / width;
    setActive(Math.round(index));
  }, []);

  const handleOnPress = (e, index) => {
    flatListRef.current.scrollToIndex({
      animated: true,
      index: index,
    });
  };

  return (
    <MainLayout>
      <View>
        <Text
          style={{ color: themeColors.bgButton }}
          className="text-2xl font-bold m-4"
        >
          My tickets
        </Text>
        <View className="flex-row items-center mb-4">
          {part.map((ele, index) => (
            <TouchableOpacity
              className="flex-1 p-6 items-center border-b-2"
              style={{
                backgroundColor: themeColors.bgCard,
                borderBottomColor:
                  active === index
                    ? themeColors.bgButton
                    : themeColors.bgScreen,
              }}
              key={index}
              onPress={(e) => handleOnPress(e, index)}
            >
              <Text
                className="text-14 font-bold"
                style={{
                  color: active === index ? themeColors.bgButton : "white",
                }}
              >
                {ele}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <FlatList
          ref={flatListRef}
          getItemLayour={(data, index) => ({
            length: width,
            offset: width * index,
          })}
          horizontal
          pagingEnabled
          snapToAlignment="center"
          keyExtractor={(item, index) => index}
          data={part}
          showsHorizontalScrollIndicator={false}
          renderItem={() => <List data={ticket} />}
          onScroll={handleOnScroll}
        />
      </View>
    </MainLayout>
  );
};
