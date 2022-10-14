import { Text } from "react-native";
import React, { Component } from "react";
import { recipes, categories, ingredients } from "./dataArrays";
import axios from "axios";
import { useLayoutEffect, useEffect, useState } from "react";
import Ip from "../Ip";
export function getCategoryById(categoryId) {
  let category;
  categories.map((data) => {
    if (data.id == categoryId) {
      category = data;
    }
  });
  return category;
}

export function getIngredientName(ingredientID) {
  let name;
  ingredients.map((data) => {
    if (data.ingredientId == ingredientID) {
      name = data.name;
    }
  });
  return name;
}

export function getIngredientUrl(ingredientID) {
  let url;
  ingredients.map((data) => {
    if (data.ingredientId == ingredientID) {
      url = data.photo_url;
    }
  });
  return url;
}

export function getCategoryName(categoryId) {
  let name;
  categories.map((data) => {
    if (data.id == categoryId) {
      name = data.name;
    }
  });
  return name;
}
const { ip } = Ip();
export function getCategoryNamee(categorie_annonce_id) {
  let name = "cat";
  const [categoriesArray, setCategories] = useState([]);

  const load = () => {
    async function f() {
      axios
        .get("http://" + ip + "/api/categorieAnnonces")
        .then(function (response) {
          alert("categoriiies");
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
    load();
  }, []);

  categoriesArray.map((data) => {
    if (data.id == categorie_annonce_id) {
      name = data.libelle;
    }
  });
  return name;
}

export function getRecipes(categoryId) {
  const recipesArray = [];
  annonces.map((data) => {
    if (data.categoryId == categoryId) {
      recipesArray.push(data);
    }
  });
  return recipesArray;
}

export function getAnnonces(categorie_annonce_id) {
  const annoncesArray = [];
  //********* */
  const [annonces, setAnnonces] = useState([]);
  const load = () => {
    async function f() {
      axios
        .get("http://" + ip + "/api/annonces")
        .then(function (response) {
          // console.log("response.data.annonce[0].id");
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

  //********* */
  annonces.map((data) => {
    if (data.categorie_annonce_id == categorie_annonce_id) {
      annoncesArray.push(data);
    }
  });
  return annoncesArray;
}

//
export function getTelById(membre_id) {
  const membresArray = [];
  let tel;
  //********* */
  const [membres, setMembres] = useState([]);
  const load = () => {
    async function f() {
      axios
        .get("http://" + ip + "/api/membres")
        .then(function (response) {
          // console.log("response.data.annonce[0].id");
          setMembres(response.data.membre);
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
  }, [membres]);

  //********* */
  membres.map((data) => {
    if (data.membre_id == membre_id) {
      tel = data.tel;
    }
  });
  return tel;
}
//
// modifica
export function getRecipesByIngredient(ingredientId) {
  const recipesArray = [];
  recipes.map((data) => {
    data.ingredients.map((index) => {
      if (index[0] == ingredientId) {
        recipesArray.push(data);
      }
    });
  });
  return recipesArray;
}

export function getNumberOfRecipes(categoryId) {
  let count = 0;
  recipes.map((data) => {
    if (data.categoryId == categoryId) {
      count++;
    }
  });
  return count;
}

export function getAllIngredients(idArray) {
  const ingredientsArray = [];
  idArray.map((index) => {
    ingredients.map((data) => {
      if (data.ingredientId == index[0]) {
        ingredientsArray.push([data, index[1]]);
      }
    });
  });
  return ingredientsArray;
}

// functions for search
export function getRecipesByIngredientName(ingredientName) {
  const nameUpper = ingredientName.toUpperCase();
  const recipesArray = [];
  ingredients.map((data) => {
    if (data.name.toUpperCase().includes(nameUpper)) {
      // data.name.yoUpperCase() == nameUpper
      const recipes = getRecipesByIngredient(data.ingredientId);
      const unique = [...new Set(recipes)];
      unique.map((item) => {
        recipesArray.push(item);
      });
    }
  });
  const uniqueArray = [...new Set(recipesArray)];
  return uniqueArray;
}

export function getRecipesByCategoryName(categoryName) {
  const nameUpper = categoryName.toUpperCase();
  const recipesArray = [];
  categories.map((data) => {
    if (data.name.toUpperCase().includes(nameUpper)) {
      const recipes = getAnnonces(data.id); // return a vector of recipes
      recipes.map((item) => {
        recipesArray.push(item);
      });
    }
  });
  return recipesArray;
}

export function getRecipesByRecipeName(recipeName) {
  const nameUpper = recipeName.toUpperCase();
  const recipesArray = [];
  recipes.map((data) => {
    if (data.title.toUpperCase().includes(nameUpper)) {
      recipesArray.push(data);
    }
  });
  return recipesArray;
}
