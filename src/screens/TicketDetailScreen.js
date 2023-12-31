import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { useContext, useEffect, useState } from "react";

import { SubLayout } from "../components/Common/SubLayout";
import { themeColors } from "../theme";
import { datetimeTransform } from "../utils/timeTransform";
import { getMyTicketById } from "../services/ticket.service";
import { AxiosContext } from "../services/axios.context";
import { Loading } from "../components/Loading";
import { MatchCarousel } from "../components/Matches/MatchCarousel";
import { ErrorAlertModal } from "../components/ErrorAlertModal";
import { TouchableOpacity } from "react-native";
import { UserContext } from "../services/user/user.context";

const { width } = Dimensions.get("window");

const RowDetail = ({ left, right, color = "white" }) => (
  <View className="flex-row mb-2 flex-1">
    <View className="w-1/3">
      <Text className="font-bold text-base" style={{ color: color }}>
        {left}
      </Text>
    </View>
    <View className="w-2/3">
      <Text className="font-bold text-base" style={{ color: color }}>
        {right}
      </Text>
    </View>
  </View>
);

export const TicketDetailScreen = ({ route, navigation }) => {
  const { ticketId } = route.params;
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [isUnauthorized, setUnauthorized] = useState(false);

  const { authAxios } = useContext(AxiosContext);
  const { logout } = useContext(UserContext);

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      const fetchData = async () => {
        try {
          setLoading(true);
          const res = await getMyTicketById(authAxios, ticketId);
          setTicket(res);
          setLoading(false);
        } catch (err) {
          setLoading(false);
          if (err.status === 401) {
            setUnauthorized(true);
          }
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
        <SubLayout title={"Ticket Detail"} goBackButton={true}>
          {errorMessage && (
            <ErrorAlertModal
              message={errorMessage}
              onDismiss={() => {
                if (isUnauthorized) {
                  setUnauthorized(false);
                  setErrorMessage("");
                  logout();

                  navigation.reset({
                    index: 0,
                    routes: [{ name: "Login" }],
                  });
                } else {
                  setErrorMessage("");
                  navigation.goBack();
                }
              }}
            />
          )}
          {ticket && (
            <ScrollView>
              <View className="mt-8">
                <MatchCarousel matchData={ticket.match} />
              </View>
              <View className="my-8">
                <Text
                  className="text-xl ml-6 mb-6 font-bold"
                  style={{ color: themeColors.bgButton }}
                >
                  Ticket Detail
                </Text>
                <View className="mx-4 items-center">
                  <View
                    className="px-4 pt-2"
                    style={{
                      backgroundColor: "white",
                      width: width - 80,
                      borderTopLeftRadius: 12,
                      borderTopRightRadius: 12,
                    }}
                  >
                    <Text className="font-bold">Ticket Code : xxxxxxxxxx</Text>
                    <View className="items-center py-8">
                      <Text className="font-bold text-xl">
                        {ticket.payerName}
                      </Text>
                      <Text>email: {ticket.payerEmail}</Text>
                      <Text>phone: {ticket.payerPhone}</Text>
                    </View>
                  </View>

                  <View
                    className="flex-row relative items-center"
                    style={{
                      height: (width - 80) / 5,
                      backgroundColor: "white",
                      width: width - 80,
                    }}
                  >
                    <View
                      className="absolute rounded-full"
                      style={{
                        left: (80 - width) / 10,
                        width: (width - 80) / 5,
                        height: (width - 80) / 5,
                        backgroundColor: themeColors.bgScreen,
                      }}
                    ></View>
                    <View
                      style={{
                        borderBottomColor: "black",
                        borderWidth: StyleSheet.hairlineWidth,
                        width: "100%",
                      }}
                    />
                    <View
                      className="absolute rounded-full"
                      style={{
                        right: (80 - width) / 10,
                        width: (width - 80) / 5,
                        height: (width - 80) / 5,
                        backgroundColor: themeColors.bgScreen,
                      }}
                    ></View>
                  </View>

                  <View
                    className="bg-white items-center"
                    style={{
                      width: width - 80,
                      borderBottomLeftRadius: 12,
                      borderBottomRightRadius: 12,
                    }}
                  >
                    <Text
                      className="py-6 font-bold text-lg"
                      style={{
                        color: "#6D6D6D",
                      }}
                    >
                      Scan this code at the entrance.
                    </Text>
                    <Image
                      width={width - 100}
                      height={width - 100}
                      source={{
                        uri: ticket.code,
                      }}
                    />
                    <View className="p-2">
                      <Text className="font-bold text-base">
                        {ticket.area.toUpperCase()} AREA - Seat: {ticket.seat}
                      </Text>
                      <Text>Price : ${ticket.price}</Text>
                      <Text>
                        Order. At : {datetimeTransform(ticket.createdAt)}
                      </Text>
                      <Text
                        className="text-sm"
                        style={{
                          color: "#6D6D6D",
                        }}
                      >
                        (Please be at the gate before 1h to make procedure)
                      </Text>
                    </View>
                  </View>
                </View>
              </View>

              <View className="my-2 h-0.5 bg-white w-full"></View>

              <View>
                <Text
                  className="text-xl ml-6 font-bold"
                  style={{ color: themeColors.bgButton }}
                >
                  Stadium Detail
                </Text>
                <View
                  className="px-4 py-6 rounded-2xl m-4 w-full"
                  style={{
                    backgroundColor: themeColors.bgCard,
                    width: width - 32,
                  }}
                >
                  <RowDetail
                    left={"Stadium"}
                    right={ticket.match.stadium.name}
                  />
                  <RowDetail
                    left={"Capacity"}
                    right={ticket.match.stadium.capacity}
                  />
                  <RowDetail
                    left={"Address"}
                    right={`${
                      ticket.match.stadium.address +
                      ", " +
                      ticket.match.stadium.location
                    }`}
                  />
                  <Image
                    source={{ uri: ticket.match.stadium.image }}
                    style={{ height: 300, objectFit: "contain" }}
                  />
                  {/* <MapBox /> */}
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("MapBox", {
                        longitude: Number(
                          ticket.match.stadium.coordinates.split(", ")[1]
                        ),
                        latitude: Number(
                          ticket.match.stadium.coordinates.split(", ")[0]
                        ),
                        longitudeDelta: 0.01,
                        latitudeDelta: 0.01,
                        stadiumName: ticket.match.stadium.name,
                        clubName: ticket.match.homeClub.name,
                      })
                    }
                    className="p-3 rounded-2xl items-center"
                    style={{ backgroundColor: themeColors.bgButton }}
                  >
                    <Text className="font-bold text-base">View map</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          )}
        </SubLayout>
      )}
    </>
  );
};
