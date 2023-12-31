import { useCallback, useContext, useEffect, useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useIsFocused, useNavigation } from "@react-navigation/native";

import { MainLayout } from "../components/Common/MainLayout";
import { themeColors } from "../theme";
import { TicketCard } from "../components/Ticket/ticketCard";
import { AxiosContext } from "../services/axios.context";
import { getMyTicket } from "../services/ticket.service";
import { Loading } from "../components/Loading";
import { ErrorAlertModal } from "../components/ErrorAlertModal";
import { UserContext } from "../services/user/user.context";
const { width } = Dimensions.get("window");

const List = ({ data }) => {
  return (
    <>
      {data && data.length === 0 ? (
        <View
          className="items-center"
          style={{ width: width, minHeight: "100%" }}
        >
          <Text className="font-bold text-white">
            You don't have any ticket here!
          </Text>
        </View>
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) => item.ticketId}
          contentContainerStyle={{
            paddingBottom: 250,
            minHeight: "100%",
          }}
          renderItem={({ item }) => {
            return <TicketCard ticket={item} />;
          }}
        />
      )}
    </>
  );
};

const part = ["Active", "History"];

export const MyTicketScreen = () => {
  const [active, setActive] = useState(0);
  const flatListRef = useRef(null);
  const [ticket, setTicket] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [isUnauthorized, setUnauthorized] = useState(false);

  const { authAxios } = useContext(AxiosContext);
  const { isAuthenticated, logout } = useContext(UserContext);

  const isFocused = useIsFocused();
  const navigation = useNavigation();

  useEffect(() => {
    if (isFocused && !isAuthenticated) {
      setLoading(false);
      setErrorMessage("You must login to view your ordered tickets !");
      return;
    }
    if (isFocused) {
      const fetchData = async () => {
        try {
          setLoading(true);
          const res = await getMyTicket(authAxios);
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
      setActive(0);
    }
  }, [isFocused]);

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
    <>
      {loading ? (
        <Loading />
      ) : (
        <MainLayout>
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
                    routes: [{ name: 'Login' }],
                  });
                } else {
                  setErrorMessage("");
                  navigation.goBack();
                }
              }}
            />
          )}
          <View>
            <View className="flex-row items-center mb-4">
              {part.map((ele, index) => (
                <TouchableOpacity
                  className="flex-1 p-4 items-center border-b-2"
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
                    className="text-base font-bold"
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
              keyExtractor={(item) => item}
              data={part}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item, index }) => <List data={ticket[index]} />}
              onScroll={handleOnScroll}
            />
          </View>
        </MainLayout>
      )}
    </>
  );
};
