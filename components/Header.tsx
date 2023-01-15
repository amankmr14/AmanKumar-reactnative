import React from "react";
import { Text, View } from "react-native";

const Header: React.FC = () => {
  return (
    <View style={{ paddingHorizontal: 10 }}>
      <Text
        style={{
          fontSize: 30,
          fontWeight: "700",
        }}
      >
        UPayments Store
      </Text>
    </View>
  );
};

export default Header;
