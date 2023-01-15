import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome"

interface IProps {
  onPress: () => void;
}

const FloatingButton: React.FC<IProps> = ({ onPress }) => {

  return (
    <View style={styles.container}>
      <TouchableOpacity activeOpacity={0.7} style={styles.floatingActionButton} onPress={onPress}>
        <Icon name="plus" size={35}/>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
  },
  floatingActionButton: {
    position: "absolute",
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    right: 30,
    bottom: 100,
    backgroundColor: "#ffffff",
    borderColor: "#000000",
    borderWidth: 2,
    borderRadius: 200 / 2,
  },
});

export default FloatingButton;
