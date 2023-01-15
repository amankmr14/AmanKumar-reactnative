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
import {
  useGetAllProducts,
  useGetCategoryList,
  useGetProductByCategory,
} from "../hooks/query-hooks";
import Cards from "../components/Cards";
import Header from "../components/Header";
import FloatingButton from "../components/FloatingButton";
import type { ProductDetails } from "../hooks/query-hooks";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../navigation";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

const Home = ({ navigation }: Props) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [categorizedProductList, setCategorizedProductList] = useState<
    ProductDetails[] | undefined
  >([]);
  const { data: categoryListData } = useGetCategoryList();
  const { data: productListData } = useGetAllProducts();

  const handleCategoryChange = (name: string) => {
    setSelectedCategory(name);
    let categorizedData = productListData?.products.filter(
      (product) => product.category === name
    );
    setCategorizedProductList(categorizedData);
  };

  const handleNavigateToProductDetails = (productId: string) => {
    console.log(productId);
    navigation.navigate("ProductDetails", {
      productId,
    });
  };

  const handleAddNewProduct = () => {
    navigation.navigate("AddProduct");
  }

  const renderItem = ({ item }: { item: ProductDetails }) => {
    return (
      <Cards
        name={item.name}
        key={item._id}
        imgSrc={item.avatar}
        price={item.price}
        onPress={() => handleNavigateToProductDetails(item._id)}
      />
    );
  };

  return (
    <>
      <View>
        <Header />
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={{ marginBottom: 10 }}
        >
          <View style={styles.categoryButton}>
            <TouchableOpacity
              style={
                !selectedCategory
                  ? {
                      ...styles.customButton,
                      backgroundColor: "#ffffff",
                      borderWidth: 2,
                      borderColor: "#000000",
                    }
                  : styles.customButton
              }
              onPress={() => handleCategoryChange("")}
            >
              <Text
                style={
                  !selectedCategory
                    ? { ...styles.customButtonText, color: "#000000" }
                    : styles.customButtonText
                }
              >
                All
              </Text>
            </TouchableOpacity>
          </View>
          {categoryListData?.categories?.map((category) => (
            <View style={styles.categoryButton} key={category._id}>
              <TouchableOpacity
                style={
                  selectedCategory === category.name
                    ? {
                        ...styles.customButton,
                        backgroundColor: "#ffffff",
                        borderWidth: 2,
                        borderColor: "#000000",
                      }
                    : styles.customButton
                }
                onPress={() => handleCategoryChange(category.name)}
              >
                <Text
                  style={
                    selectedCategory === category.name
                      ? { ...styles.customButtonText, color: "#000000" }
                      : styles.customButtonText
                  }
                >
                  {category.name}
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
        <FlatList
          data={
            selectedCategory
              ? categorizedProductList
              : productListData?.products
          }
          keyExtractor={(product) => product?._id}
          renderItem={renderItem}
          numColumns={2}
        />
      </View>
      <FloatingButton onPress={handleAddNewProduct} />
    </>
  );
};

const styles = StyleSheet.create({
  categoryButton: {
    paddingHorizontal: 5,
  },
  cardContainer: {
    flexDirection: "column",
  },
  customButton: {
    backgroundColor: "#000000",
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 5,
  },
  customButtonText: {
    color: "#ffffff",
    fontWeight: "600",
    fontSize: 16,
  },
});

export default Home;
