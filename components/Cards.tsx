import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";

interface ICardProps {
  name: string;
  price: number;
  imgSrc: string;
}

const Cards = ({ name, price, imgSrc }: ICardProps) => {

  return (
    <View style={styles.container}>
      <Image source={{ uri: imgSrc }} style={styles.image}/>
      <View style={styles.detailContainer}>
        <Text style={styles.detailText}>{name}</Text>
        <Text style={styles.detailText}>${price}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    // paddingVertical: 25,
    // paddingHorizontal: 25,
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
