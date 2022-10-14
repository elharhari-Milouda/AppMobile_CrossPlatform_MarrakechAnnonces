import axios from "axios";
import React, { useLayoutEffect, useEffect, useState } from "react";
import { FlatList, Text, View, Image, TouchableHighlight } from "react-native";
import styles from "./styles";
//import { categories } from "../../data/dataArrays";
import { getNumberOfRecipes } from "../../data/MockDataAPI";
import MenuImage from "../../components/MenuImage/MenuImage";
import Ip from "../../Ip";
export default function CategoriesScreen(props) {
  const { navigation } = props;
  const [categories, setCategories] = useState([]);
  const { ip } = Ip();
  const loadd = () => {
    async function f() {
      axios
        .get("http://" + ip + "/api/categorieAnnonces")
        .then(function (response) {
          //console.log(response.data.categorieAnnonce[0]);
          setCategories(response.data.categorieAnnonce);
        })
        .catch(function (error) {
          // handle error
          alert(error.message);
        });
    }
    f();
  };

  useEffect(() => {
    loadd();
  }, []);

  /************* */
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitleStyle: {
        fontWeight: "bold",
        textAlign: "center",
        alignSelf: "center",
        flex: 1,
      },
      headerLeft: () => (
        <MenuImage
          onPress={() => {
            navigation.openDrawer();
          }}
        />
      ),
      headerRight: () => <View />,
    });
  }, []);

  const onPressCategory = (item) => {
    const title = item.name;
    const category = item;
    navigation.navigate("RecipesList", { category, title });
  };

  const renderCategory = ({ item }) => (
    <TouchableHighlight
      underlayColor="rgba(73,182,77,0.9)"
      onPress={() => onPressCategory(item)}
    >
      <View style={styles.categoriesItemContainer}>
        <Image style={styles.categoriesPhoto} source={{ uri: item.image }} />
        <Text style={styles.categoriesName}>{item.libelle}</Text>
        <Text style={styles.categoriesInfo}>{item.desc}</Text>
      </View>
    </TouchableHighlight>
  );

  return (
    <View>
      <FlatList
        data={categories}
        renderItem={renderCategory}
        keyExtractor={(item) => `${item.id}`}
      />
    </View>
  );
}
