import React from "react";
import { Linking } from "react-native";
import { TouchableHighlight, Image, Text, View } from "react-native";
import PropTypes from "prop-types";
import styles from "./styles";
import { getTelById } from "../../data/MockDataAPI";

export default function ViewIngredientsButton(props) {
  return (
    <TouchableHighlight
      underlayColor="rgba(73,182,77,0.9)"
      onPress={() => {
        //Linking.openURL("tel:8777111223");
        alert("contacter");
      }}
    >
      <View style={styles.container}>
        <Text style={styles.text}>Contacter l'annonceur</Text>
      </View>
    </TouchableHighlight>
  );
}

ViewIngredientsButton.propTypes = {
  onPress: PropTypes.func,
  source: PropTypes.number,
  title: PropTypes.string,
};
