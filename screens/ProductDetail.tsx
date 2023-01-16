import React from "react";
import { Text, View, Image, StyleSheet, ActivityIndicator } from "react-native";
import type { RootStackParamList } from "../navigation";
import type { NativeStackScreenProps } from "@react-navigation/native-stack/lib/typescript/src/types";
import { useGetProductDetails } from "../hooks/query-hooks";

type Props = NativeStackScreenProps<RootStackParamList, "ProductDetails">;

const ProductDetail = ({ route }: Props) => {
  const { data: productDetails, isFetching } = useGetProductDetails({
    id: route.params.productId,
  });

  return (
    <>
      {isFetching ? (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <ActivityIndicator />
        </View>
      ) : (
        <View>
          <View>
            <Image
              source={{ uri: productDetails?.product?.avatar }}
              style={styles.image}
            />
          </View>
          <View style={styles.textContainer}>
            <View
              style={{
                paddingVertical: 5,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text style={[styles.text, { fontWeight: "700", fontSize: 20 }]}>
                {productDetails?.product?.name}
              </Text>
              <Text style={[styles.text, { fontWeight: "700", fontSize: 20 }]}>
                ${productDetails?.product?.price}
              </Text>
            </View>
            <Text style={styles.text}>
              {productDetails?.product?.description}
            </Text>
          </View>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  image: {
    resizeMode: "contain",
    height: undefined,
    aspectRatio: 1,
    width: "100%",
  },
  textContainer: {
    backgroundColor: "#000000",
    height: "100%",
    padding: 5,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingHorizontal: 10,
    marginTop: 20,
    shadowOffset: { width: 2, height: -20 },
    shadowColor: "#171717",
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  text: {
    color: "#ffffff",
    fontSize: 15,
  },
});

export default ProductDetail;
