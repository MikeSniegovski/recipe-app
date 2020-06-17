import React, { Component } from 'react';
import { connect } from 'react-redux'
import Account from 'components/Account';
import RecipesList from 'components/RecipesList';
import RecipesDetails from 'components/RecipesDetails';
import RecipesAdd from 'components/RecipesAdd';

import 'components/App.css';

const createActionAddingRecipe = () => ({
  type: "ADDING_RECIPE",
});

class App extends Component {

  render() {
    const { isAddingRecipe, saveAddingRecipeToStore } = this.props;

    return (
      <div className="App">
        <h1 className="app-name">Przepiśnik</h1>
        <Account/>
        <div className="c-search"><input className="c-input" placeholder="Search"/></div>
        <div className="add-recipe">
          <button className="c-button c-button__add-recipe" onClick={() => saveAddingRecipeToStore()}>Add recipe</button>
        </div>
        <RecipesList/>
        {isAddingRecipe ? <RecipesAdd /> : <RecipesDetails />}
      </div>
    );
  }
}

const mapStateToProps = (mainState) => {
  return {
    isAddingRecipe: mainState.isAddingRecipe
  }
};

const mapDispatchToProps = dispatch => ({
  saveAddingRecipeToStore: () => {
    dispatch(createActionAddingRecipe())
  },
})


export default connect(mapStateToProps, mapDispatchToProps)(App);