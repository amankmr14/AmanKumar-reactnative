import React, { useState } from "react";
import { Text, View, TextInput, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

interface IHeaderProps {
  setSearchValue: (args: string) => void;
}

const Header: React.FC<IHeaderProps> = ({ setSearchValue }) => {
  const [search, setSearch] = useState<string>("");
  const [showSearchBar, setShowSearchBar] = useState<boolean>(false);

  const handleSearchProp = (text :string) => {
    setSearch(text)
    setSearchValue(text)
  }

  return (
    <>
      {showSearchBar ? (
        <TextInput style={styles.input} onChangeText={handleSearchProp} onBlur={() => setShowSearchBar(false)}/>
      ) : (
        <View
          style={{
            paddingHorizontal: 10,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 30,
              fontWeight: "700",
            }}
          >
            UPayments Stores
          </Text>
          <Icon
            name="search"
            size={20}
            onPress={() => setShowSearchBar(true)}
          />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
  },
})

export default Header;
