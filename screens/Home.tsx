import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Button,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { getAllProducts, getCategoryList } from "../hooks/query-hooks";
import Cards from "../components/Cards";
import Header from "../components/Header";
import type { ProductDetails } from "../hooks/query-hooks";

const Home = () => {
  const { data: categoryListData } = getCategoryList();
  const { data: productListData } = getAllProducts();

  const renderItem = ({ item }: { item: ProductDetails }) => {
    return (
      <Cards
        name={item.name}
        key={item._id}
        imgSrc={item.avatar}
        price={item.price}
      />
    );
  };

  return (
    <View>
      <Header />
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={{ marginBottom: 10 }}
      >
        <View style={styles.categoryButton}>
          <Button title="All" color={"black"} />
        </View>
        {categoryListData?.categories?.map((category) => (
          <View style={styles.categoryButton} key={category._id}>
            <TouchableOpacity style={styles.customButton}>
              <Text style={styles.customButtonText}>{category.name}</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
      <FlatList
        data={productListData?.products}
        keyExtractor={(product) => product?._id}
        renderItem={renderItem}
        numColumns={2}
      />
      <Text>hello</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  categoryButton: {
    paddingHorizontal: 10,
  },
  cardContainer: {
    flexDirection: "column",
  },
  customButton: {
    backgroundColor: "black",
    padding: 6,
    borderRadius: 5,
  },
  customButtonText: {
    color: "#ffffff",
    fontWeight: "600",
    fontSize: 16,
  },
});

export default Home;
