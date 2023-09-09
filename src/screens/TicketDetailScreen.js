import { Dimensions, Image, ScrollView, Text, View } from "react-native";
import { SubLayout } from "../components/Common/SubLayout";
import { themeColors } from "../theme";
import { TicketCard } from "../components/Ticket/ticketCard";
import { datetimeTransform } from "../utils/timeTransform";
const { width } = Dimensions.get("window");

const RowDetail = ({ left, right }) => (
  <View className="flex-row mb-2 flex-1">
    <View className="w-1/3">
      <Text className="text-white text-base font-bold">{left}</Text>
    </View>
    <View className="w-2/3">
      <Text className="text-white text-base font-bold">{right}</Text>
    </View>
  </View>
);

export const TicketDetailScreen = ({ route }) => {
  const { item } = route.params;

  return (
    <SubLayout title={"Ticket Detail"} goBackButton={true}>
      <ScrollView>
        <View className="my-8">
          <Text
            className="text-xl ml-6 font-bold"
            style={{ color: themeColors.bgButton }}
          >
            Ticket Code
          </Text>
          <Text className="text-white text-lg">{item.ticket.code}</Text>
        </View>
        <View className="mt-2 h-0.5 bg-white w-full"></View>
        <View className="mt-8">
          <Text
            className="text-xl ml-6 font-bold"
            style={{ color: themeColors.bgButton }}
          >
            Match Detail
          </Text>
          <TicketCard item={item} hasExpand={false} />
        </View>

        <View>
          <Text
            className="text-xl ml-6 font-bold"
            style={{ color: themeColors.bgButton }}
          >
            Stadium Detail
          </Text>
          <View
            className="px-4 pt-6 rounded-2xl m-4 w-full"
            style={{ backgroundColor: themeColors.bgCard, width: width - 32 }}
          >
            <RowDetail left={"Stadium"} right={item.stadium.name} />
            <RowDetail left={"Capacity"} right={item.stadium.capacity} />
            <RowDetail
              left={"Address"}
              right={`${item.stadium.address + ", " + item.stadium.location}`}
            />
            <Image
              source={{ uri: item.stadium.image }}
              style={{ height: 300, objectFit: "contain" }}
            />
          </View>
        </View>

        <View>
          <Text
            className="text-xl ml-6 font-bold"
            style={{ color: themeColors.bgButton }}
          >
            Booking Detail
          </Text>
          <View
            className="px-4 pt-6 rounded-2xl m-4"
            style={{ backgroundColor: themeColors.bgCard, width: width - 32 }}
          >
            <RowDetail left={"Area"} right={item.ticket.area} />
            <RowDetail left={"No. Seat"} right={item.ticket.seat} />
            <RowDetail left={"Price"} right={item.ticket.price} />
            <RowDetail
              left={"Order. At"}
              right={datetimeTransform(item.ticket.order_time)}
            />

            <View className="flex-row w-full items-center"></View>
          </View>
        </View>
      </ScrollView>
    </SubLayout>
  );
};
