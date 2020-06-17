import React, { Component } from 'react';
import { firestore } from "components/firebase";
import { connect } from 'react-redux'

const createActionSaveRecipesList = (recipesList) => ({
  type: "SAVE_RECIPES_LIST",
  payload: recipesList,
});

const createActionSelectRecipe = (selectedRecipe) => ({
  type: "SELECT_RECIPE",
  payload: selectedRecipe,
});

class RecipesList extends Component {

  firestoreData = null;

  componentDidMount = () => {
    const {saveRecipesListToStore} = this.props;

    this.firestoreData = firestore
      .collection("recipes")
      .onSnapshot(snapshot => {
        const recipes = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        saveRecipesListToStore(recipes);
      });
  };

  componentWillUnmount = () => {
    this.firestoreData();
  };

  render() {
    const { recipeList, selectRecipesInStore, selectedRecipe } = this.props;

    if (!recipeList) {
      return <p className="c-list__recipes c-list__recipes--empty">Loading data</p>;
    }else{
      return (
        <ul className="c-list c-list__recipes scrolbar">
          {recipeList.map((item) => {
            return <li key={item.id} 
              onClick={() => selectRecipesInStore(item.id)}
              className={selectedRecipe === item.id ? 'c-list__item c-list__item--selected' : 'c-list__item'}>
              {item.name}</li>
            })}
        </ul>
      )
    }
  }
}

const mapStateToProps = (mainState) => {
  return {
    recipeList: mainState.recipeList,
    selectedRecipe: mainState.selectedRecipe
  }
};

const mapDispatchToProps = dispatch => ({
  saveRecipesListToStore: (recipesList) => {
    dispatch(createActionSaveRecipesList(recipesList))
  },
  selectRecipesInStore: (selectedRecipe) => {
    dispatch(createActionSelectRecipe(selectedRecipe))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(RecipesList);