import React, { useCallback, useState } from "react";
import { Text, View, Image, StyleSheet } from "react-native";
import type { RootStackParamList } from "../navigation";
import type { NativeStackScreenProps } from "@react-navigation/native-stack/lib/typescript/src/types";
import { useGetProductDetails } from "../hooks/query-hooks";

type Props = NativeStackScreenProps<RootStackParamList, "ProductDetails">;

const ProductDetail = ({ route }: Props) => {
  const [productId, setProductId] = useState<string>("");

  useCallback(() => {
    setProductId(route.params.productId)
  }, [route])

  const { data: productDetails, isFetching } = useGetProductDetails({
    id: productId,
  });
  console.log(productDetails?.product, isFetching, route.params);
  return (
    <View>
      <View>
        <Image 
          source={{ uri: productDetails?.product?.avatar }}
          style={styles.image}
        />
      </View>
      <View style={styles.textContainer}>
        <View style={{ paddingVertical: 5, flexDirection: "row", justifyContent: "space-between"}}>
          <Text style={[styles.text, { fontWeight: "700", fontSize: 20 }]}>{productDetails?.product?.name}</Text>
          <Text style={[styles.text, { fontWeight: "700", fontSize: 20 }]}>${productDetails?.product?.price}</Text>
        </View>
        <Text style={styles.text}>{productDetails?.product?.description}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    resizeMode: "cover",
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
    marginTop: 20
  },
  text: {
    color: "#ffffff",
  },
});

export default ProductDetail;
