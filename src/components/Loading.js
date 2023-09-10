import { ActivityIndicator } from "react-native";
import { MainLayout } from "./Common/MainLayout";
import { themeColors } from "../theme";

export const Loading = ({ layout = MainLayout }) => {
  const Layout = layout;
  return (
    <Layout>
      <ActivityIndicator size="large" animating color={themeColors.bgButton} />
    </Layout>
  );
};
