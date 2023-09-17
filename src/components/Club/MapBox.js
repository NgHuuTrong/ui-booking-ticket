import { useRef } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import * as FileSystem from "expo-file-system";
import { shareAsync } from "expo-sharing";
import { SubLayout } from "../Common/SubLayout";
import { Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
export const MapBoxScreen = ({ route, navigation }) => {
  const mapRef = useRef();

  const takeSnapshotAndShare = async () => {
    const snapshot = await mapRef.current.takeSnapshot({
      width: 300,
      height: 300,
      result: "base64",
    });
    const uri = FileSystem.documentDirectory + "snapshot.png";
    await FileSystem.writeAsStringAsync(uri, snapshot, {
      encoding: FileSystem.EncodingType.Base64,
    });
    await shareAsync(uri);
  };

  return (
    <SafeAreaView>
      <View>
        <Pressable
          onPress={() => navigation.goBack()}
          className="p-2 absolute top-2 left-2 z-10 rounded-full"
          style={{ backgroundColor: "rgba(255,255,255, 0.8)" }}
        >
          <AntDesign name="left" size={30} color="black" />
        </Pressable>
        <MapView
          provider={PROVIDER_GOOGLE}
          ref={mapRef}
          style={styles.map}
          initialRegion={{
            longitude: route.params.longitude,
            latitude: route.params.latitude,
            longitudeDelta: route.params.longitudeDelta,
            latitudeDelta: route.params.latitudeDelta,
          }}
        >
          <Marker
            coordinate={{
              longitude: route.params.longitude,
              latitude: route.params.latitude,
            }}
            title={route.params.stadiumName}
            description={route.params.clubName}
          />
        </MapView>
        <Callout className="right-0 top-4">
          <Button
            title="Take Snapshot and Share"
            onPress={takeSnapshotAndShare}
          />
        </Callout>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 1000,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
