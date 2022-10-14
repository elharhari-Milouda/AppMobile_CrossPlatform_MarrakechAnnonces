import axios from "axios";
import Select from "react-select";
import { Form, FormItem, Label, Modal } from "react-native-form-component";
import React, {
  useLayoutEffect,
  useEffect,
  useState,
  useContext,
  useCallback,
} from "react";
import {
  ScrollView,
  StatusBar,
  Button,
  ImageBackground,
  Text,
  View,
  Image,
  TouchableHighlight,
  TextInput,
  SafeAreaView,
  StyleSheet,
  FlatList,
} from "react-native";
import styles from "./styles";
import { Picker } from "@react-native-picker/picker";
//import { categories } from "../../data/dataArrays";
import { getNumberOfRecipes } from "../../data/MockDataAPI";
import MenuImage from "../../components/MenuImage/MenuImage";
import Ip from "../../Ip";
import NativeUploady, {
  UploadyContext,
  useItemFinishListener,
  useItemStartListener,
  useItemErrorListener,
} from "@rpldy/native-uploady";
import { RollInRight } from "react-native-reanimated";

export default function AjouterAnnonceScreen(props) {
  /*/
  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ]
  /*/
  //
  let pickerGeneratorCat = (dblist) =>
    dblist.map((i) => {
      return <Picker.Item key={i} label={i.libelle.toString()} value={i.id} />;
    });
  let pickerGeneratorMem = (dblist) =>
    dblist.map((i) => {
      return <Picker.Item key={i} label={i.login.toString()} value={i.id} />;
    });
  let pickerGeneratorCom = (dblist) =>
    dblist.map((i) => {
      return <Picker.Item key={i} label={i.contenue.toString()} value={i.id} />;
    });
  let pickerGeneratorType = (dblist) =>
    dblist.map((i) => {
      return <Picker.Item key={i} label={i.libelle.toString()} value={i.id} />;
    });
  const [selectedValue, setSelectedValue] = useState("java");
  //
  const { ip } = Ip();
  const { navigation } = props;
  const [categories, setCategories] = useState([]);
  const [cat, setCat] = useState([]);
  const [mem, setMem] = useState([]);
  const [com, setCom] = useState([]);
  const [type, setType] = useState([]);
  const loadd = () => {
    async function f() {
      axios
        .get("http://" + ip + "/api/lista")
        .then(function (response) {
          setCat(response.data.cat);
          setMem(response.data.mem);
          setCom(response.data.com);
          setType(response.data.type);
        })
        .catch(function (error) {
          // handle error
          alert(error.message);
        });
    }
    f();
  };
  const [membre_id, setmembre_id] = useState("2");
  const [type_annonce_id, settype_annonce_id] = useState("2");
  const [categorie_annonce_id, setcategorie_annonce_id] = useState("2");
  const [commentaire_id, setcommentaire_id] = useState("2");

  const [titre, setTitre] = useState("titre");
  const [texte, setTexte] = useState("texte");
  const [nbr_vue, setNbrVue] = useState("100000");

  const [etat, setEtat] = useState("etat");
  const [img, setImg] = useState("Img");
  const [classement, setClassement] = useState("10");

  const [visible, setVisible] = useState("1");
  const [publie, setPublie] = useState("1");
  const [photosArray, setphotosArray] = useState("photosArray");
  const [tel, setTel] = useState("06******");

  //
  const Upload = () => {
    const [uploadUrl, setUploadUrl] = useState(false);
    const uploadyContext = useContext(UploadyContext);
    const pickFile = useCallback(async () => {
      try {
        console.log("click !!!! ");
        /*  console.log(categorie_annonce_id);
     console.log(classement);
     console.log(commentaire_id);*/
        axios
          .post("http://" + ip + "/api/annonces", {
            tel: tel,
            categorie_annonce_id: categorie_annonce_id,
            titre: titre,
            texte: texte,
            etat: etat,
            visible: visible,
            publie: publie,
          })
          .then(function (response) {
            alert(response.data);
            navigation.navigate("Home");
          })
          .catch(function (error) {
            console.log(error);
            //alert(response.message);
            alert(error);
          });
      } catch (err) {
        console.log(err);
      }
    }, []);

    return (
      <View>
        <Button title="Choisir Photos" onPress={pickFile} />
      </View>
    );
  };
  //

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
      <Text style={styles.categoriesName}>{item.libelle}</Text>
    </TouchableHighlight>
  );

  return (
    <ScrollView>
      <Form style={stylezs.container}>
        <FormItem
          style={stylezs.formItem}
          label="Titre annonce:"
          onChangeText={setTitre}
          value={titre}
          asterik
        ></FormItem>
        <FormItem
          style={stylezs.formItem}
          label="Description de l'annonce:"
          onChangeText={setTexte}
          value={texte}
          asterik
        ></FormItem>
        <FormItem
          style={stylezs.formItem}
          label="Categorie de l'annonce:"
          onValueChange={(categorie_annonce_id) =>
            setcategorie_annonce_id(categorie_annonce_id)
          }
          asterik
        >
          <Picker
            selectedValue={categorie_annonce_id}
            style={stylezs.red}
            onValueChange={(itemValue, itemIndex) =>
              setcategorie_annonce_id(itemValue)
            }
          >
            {pickerGeneratorCat(cat)}
          </Picker>
        </FormItem>

        <FormItem
          style={stylezs.formItem}
          label="Etat:"
          onChangeText={setEtat}
          value={etat}
          asterik
        ></FormItem>
        <FormItem
          style={stylezs.formItem}
          label="Visible?"
          onChangeText={setVisible}
          value={visible}
          asterik
        ></FormItem>
        <FormItem
          style={stylezs.formItem}
          label="Publie?"
          onChangeText={setPublie}
          value={publie}
          asterik
        ></FormItem>
        <FormItem
          style={stylezs.formItem}
          label="Numero de l'annonceur:"
          onChangeText={setTel}
          value={tel}
          asterik
        ></FormItem>
        <Upload />
      </Form>

      {/*<SafeAreaView>
        <Text style={stylezs.text}>categorie_annonce_id</Text>
        <Picker
          selectedValue={categorie_annonce_id}
          style={stylezs.input}
          onValueChange={(itemValue, itemIndex) =>
            setcategorie_annonce_id(itemValue)
          }
        >
          {pickerGeneratorCat(cat)}
        </Picker>

        <Text style={stylezs.text}>classement</Text>
        <TextInput
          name="classement"
          style={stylezs.input}
          onChangeText={setClassement}
          value={classement}
        />
        <Text style={stylezs.text}>commentaire_id</Text>
        <Picker
          selectedValue={commentaire_id}
          style={stylezs.input}
          onValueChange={(itemValue, itemIndex) => setcommentaire_id(itemValue)}
        >
          {pickerGeneratorCom(com)}
        </Picker>

        <Text style={stylezs.text}>membre_id</Text>
        <Picker
          selectedValue={membre_id}
          style={stylezs.input}
          onValueChange={(itemValue, itemIndex) => setmembre_id(itemValue)}
        >
          {pickerGeneratorMem(mem)}
        </Picker>

        <Text style={stylezs.text}>type_annonce_id</Text>
        <Picker
          selectedValue={type_annonce_id}
          style={stylezs.input}
          onValueChange={(itemValue, itemIndex) =>
            settype_annonce_id(itemValue)
          }
        >
          {pickerGeneratorType(type)}
        </Picker>
        <Text style={stylezs.text}>titre</Text>
        <TextInput
          name="titre"
          style={stylezs.input}
          onChangeText={setTitre}
          value={titre}
        />
        <Text style={stylezs.text}>texte</Text>
        <TextInput
          name="texte"
          style={stylezs.input}
          onChangeText={setTexte}
          value={texte}
        />
        <Text style={stylezs.text}>nbr_vue</Text>
        <TextInput
          name="nbr_vue"
          style={stylezs.input}
          onChangeText={setNbrVue}
          value={nbr_vue}
        />
        <Text style={stylezs.text}>etat</Text>
        <TextInput
          name="etat"
          style={stylezs.input}
          onChangeText={setEtat}
          value={etat}
        />
        <Text style={stylezs.text}>photosArray</Text>
        <TextInput
          name="photosArray"
          style={stylezs.input}
          onChangeText={setphotosArray}
          value={photosArray}
        />
        <Text style={stylezs.text}>visible</Text>
        <TextInput
          name="visible"
          style={stylezs.input}
          onChangeText={setVisible}
          value={visible}
        />
        <Text style={stylezs.text}>publie</Text>
        <TextInput
          name="publie"
          style={stylezs.input}
          onChangeText={setPublie}
          value={publie}
        />
        </SafeAreaView>*/}
    </ScrollView>
  );
}
const stylezs = StyleSheet.create({
  input: {
    height: 40,
    marginLeft: 20,
    marginRight: 10,
    borderWidth: 1,
    padding: 10,
  },
  text: {
    height: 40,
    marginLeft: 10,
    padding: 10,
  },
  formItem: {
    flex: 1,
  },
  red: {
    height: 40,
    width: 150,
    marginLeft: 0,
    marginRight: 10,
    borderWidth: 1,
    padding: 10,
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 8,
    marginLeft: 20,
  },
});
