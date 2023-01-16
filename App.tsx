import Navigation from "./navigation";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar, StyleSheet, Platform, SafeAreaView } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClientConfig = {
  defaultOptions: {
    queries: {
      retry: 2,
      cacheTime: 1000 * 60 * 15, //15minutes
      staleTime: 1000 * 60 * 5, //5minutes
    },
  },
};

export default function App() {
  const queryClient = new QueryClient(queryClientConfig);
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <SafeAreaView style={styles.StatusBar}>
          <StatusBar barStyle={"dark-content"}/>
          <NavigationContainer>
            <Navigation />
          </NavigationContainer>
        </SafeAreaView>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  StatusBar: {
    flex: 1,
    backgroundColor: "inherit",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
