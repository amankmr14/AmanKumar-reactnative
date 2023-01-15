import React, { useState } from "react";
import { Text, TextInput, View, StyleSheet } from "react-native";

const AddProduct = () => {
  return (
    <View>
      <TextInput style={styles.input} placeholder={"Product Title"}/>
      <TextInput style={styles.input} placeholder={"Price"}/>
      <TextInput style={[styles.input, { height: 80 }]} placeholder={"Description"} multiline={true} numberOfLines={4}/>
      <TextInput style={styles.input} placeholder={"Image Link"}/>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10
  },
})

export default AddProduct;
