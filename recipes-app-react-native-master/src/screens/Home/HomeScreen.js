import axios from "axios";
import React, { useLayoutEffect, useEffect, useState } from "react";
import { FlatList, Text, View, TouchableHighlight, Image } from "react-native";
import styles from "./styles";
//import { recipess } from "../../data/dataArrays";
import MenuImage from "../../components/MenuImage/MenuImage";
import { getCategoryName } from "../../data/MockDataAPI";
import { set } from "react-native-reanimated";
import Ip from "../../Ip";
export default function HomeScreen(props) {
  const { navigation } = props;
  const [annonces, setAnnonces] = useState([]);
  const { ip } = Ip();
  const load = () => {
    async function f() {
      axios
        .get("http://" + ip + "/api/annonces")
        .then(function (response) {
          // console.log(response.data.annonce);
          setAnnonces(response.data.annonce);
        })
        .catch(function (error) {
          // handle error
          alert(error.message);
        });
    }
    f();
  };

  useEffect(() => {
    load();
  }, [annonces]);

  /************* */

  useLayoutEffect(() => {
    navigation.setOptions({
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

  const onPressRecipe = (item) => {
    // alert(item.titre);
    //console.log(item);
    navigation.navigate("Recipe", { item });
  };

  const renderRecipes = ({ item }) => (
    <TouchableHighlight
      underlayColor="rgba(73,182,77,0.9)"
      onPress={() => onPressRecipe(item)}
    >
      <View style={styles.container}>
        <Image style={styles.photo} source={{ uri: item.image }} />
        <Text style={styles.title}>{item.titre}</Text>
        <Text style={styles.category}>{item.libelle} </Text>
        <Text style={styles.vue}>{item.nbr_vue} vues</Text>
      </View>
    </TouchableHighlight>
  );

  return (
    <View>
      <FlatList
        vertical
        showsVerticalScrollIndicator={true}
        numColumns={2}
        data={annonces}
        renderItem={renderRecipes}
        keyExtractor={(item) => `${item.id}`}
      />
    </View>
  );
}
