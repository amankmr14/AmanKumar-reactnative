import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
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
  const [searchInput, setSearchInput] = useState<string>("");
  const [categorizedProductList, setCategorizedProductList] = useState<
    ProductDetails[] | undefined
  >([]);
  const { data: categoryListData, isFetching: isFetchingCategoryList } =
    useGetCategoryList();
  const { data: productListData, isFetching: isFetchingProductList } =
    useGetAllProducts();

  const handleCategoryChange = (name: string) => {
    setSelectedCategory(name);
    let categorizedData = productListData?.products.filter(
      (product) => product.category === name
    );
    setCategorizedProductList(categorizedData);
  };

  const setSearchValue = (query: string) => {
    setSearchInput(query);
  };

  const handleNavigateToProductDetails = (productId: string) => {
    navigation.navigate("ProductDetails", {
      productId,
    });
  };

  const handleAddNewProduct = () => {
    navigation.navigate("AddProduct");
  };

  useEffect(() => {
    if (searchInput) {
      let filteredList;
      if (categorizedProductList?.length) {
        filteredList = categorizedProductList.filter((product) =>
          product.name.includes(searchInput)
        );
      } else {
        filteredList = productListData?.products.filter((product) =>
          product.name.includes(searchInput)
        );
      }
      setCategorizedProductList(filteredList);
    }
  }, [searchInput]);

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
      {isFetchingCategoryList || isFetchingProductList ? (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <ActivityIndicator />
        </View>
      ) : (
        <>
          <View>
            <Header setSearchValue={setSearchValue} />
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
                selectedCategory || searchInput
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
      )}
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
    borderRadius: 5,
  },
  customButtonText: {
    color: "#ffffff",
    padding: 10,
    fontWeight: "600",
    fontSize: 16,
  },
});

export default Home;
