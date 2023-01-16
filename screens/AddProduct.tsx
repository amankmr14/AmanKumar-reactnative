import React, { useState } from "react";
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
  Platform,
  ScrollView,
  Alert
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useAddNewProduct, useGetCategoryList } from "../hooks/query-hooks";
import { RootStackParamList } from "../navigation";

type Props = NativeStackScreenProps<RootStackParamList, "ProductDetails">;

const AddProduct = ({ navigation }: Props) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [price, setPrice] = useState<number | undefined>();
  const [description, setDescription] = useState<string>("");
  const [imageLink, setImageLink] = useState<string>("");
  const { data: categoryListData } = useGetCategoryList();

  const handleCategoryChange = (name: string) => {
    setSelectedCategory(name);
  };

  const { mutate } = useAddNewProduct();

  const handleSubmit = () => {
    if(!selectedCategory) {
      Alert.alert("Category is required")
    }
    const formData: any = {
      Name: title,
      Price: price,
      Category: selectedCategory,
      Description: description,
      Avatar: imageLink,
      DeveloperEmail: "amankmr765@gmail.com",
    };
    mutate(formData, {
      onSuccess() {
        navigation.navigate("Home");
      },
      onError() {
        navigation.navigate("Home");
      },
    });
  };

  return (
    <>
      <View>
        <TextInput
          style={styles.input}
          placeholder={"Product Title"}
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          style={styles.input}
          keyboardType={"numeric"}
          placeholder={"Price"}
          value={price?.toString()}
          onChangeText={(text) => setPrice(parseInt(text))}
        />
        <TextInput
          style={[styles.input, { height: 80 }]}
          placeholder={"Description"}
          multiline={true}
          numberOfLines={4}
          value={description}
          onChangeText={setDescription}
        />
        <TextInput
          style={styles.input}
          placeholder={"Image Link"}
          value={imageLink}
          onChangeText={setImageLink}
        />
      </View>
      <View>
        <Text style={{ fontSize: 15, padding: 10 }}>
          Selected Category: {selectedCategory}
        </Text>
      </View>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{}}
      >
        {categoryListData?.categories?.map((category) => (
          <View style={{ paddingHorizontal: 5 }} key={category._id}>
            <TouchableOpacity
              style={
                selectedCategory === category.name
                  ? {
                      ...styles.customButton,
                      backgroundColor: "#000000",
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
                    ? { ...styles.customButtonText, color: "#ffffff" }
                    : styles.customButtonText
                }
              >
                {category.name}
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
      <KeyboardAvoidingView
        style={styles.customButtonContainer}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TouchableOpacity style={styles.customButton} onPress={handleSubmit}>
          <Text style={styles.customButtonText}>Add Product</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
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
  customButtonContainer: {
    alignItems: "center",
  },
  customButton: {
    backgroundColor: "#ffffff",
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 10,
    borderColor: "#000000",
    borderWidth: 2,
  },
  customButtonText: {
    color: "#000000",
    fontWeight: "600",
    fontSize: 16,
  },
});

export default AddProduct;
