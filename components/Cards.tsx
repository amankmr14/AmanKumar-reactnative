import React from "react";
import { View, Image, Text, StyleSheet, TouchableOpacity, GestureResponderEvent } from "react-native";

interface ICardProps {
  name: string;
  price: number;
  imgSrc: string;
  onPress: (event: GestureResponderEvent) => void;
}

const Cards: React.FC<ICardProps> = ({ name, price, imgSrc, onPress }) => {

  return (
    <TouchableOpacity style={styles.container} onPress={onPress} >
      <Image source={{ uri: imgSrc }} style={styles.image} />
      <View style={styles.detailContainer}>
        <Text style={styles.detailText}>{name}</Text>
        <Text style={styles.detailText}>${price}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    width: "45%",
    margin: 10,
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  detailContainer: {
    backgroundColor: "#000000",
    borderRadius: 7,
    shadowColor: "#000000",
    shadowOffset: { width: -6, height: 8 },
    shadowOpacity: 0.7,
    shadowRadius: 7,
  },
  detailText: {
    color: "#ffffff",
    paddingHorizontal: 5,
    paddingBottom: 4
  },
  image: {
    height: undefined,
    aspectRatio: 1,
    width: "100%",
    
  }
});

export default Cards;
