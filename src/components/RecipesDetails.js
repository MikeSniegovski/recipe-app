import React, { Component } from 'react';
import { connect } from 'react-redux'

// const createActionSaveRecipesList = (recipesList) => ({
//   type: "SAVE_RECIPES_LIST",
//   payload: recipesList,
// });

class RecipesDetails extends Component {

  render() {
    const { recipeList, selectedRecipe } = this.props;

    if (!selectedRecipe) {
      return <p className="c-recipe c-recipe--empty">Select a recipe for details</p>;
    } else {
      const selected = recipeList.find((item) => item.id === selectedRecipe)
      const { name, ingridients, steps, categories } = selected;
      console.log(selected);
      return (
        <div className="c-recipe">
          <h2 className="c-recipe__name">{name}</h2>
          <div className="c-ingridients">
            <h3 className="c-list__title">Ingridients</h3>
            <ul className="c-list c-ingridients__list">
              {ingridients && ingridients.map((item) => <li className="c-list__item" key={item}>{item}</li>)}
            </ul>
          </div>
          <div className="c-steps">
            <h3 className="c-list__title">Steps</h3>
            <ol className="c-list c-steps__list">
              {steps && steps.map((item) => <li className="c-list__item" key={item}>{item}</li>)}
            </ol>
          </div>
          <div className="c-comments">
            <h3 className="c-list__title">Categories</h3>
            <ul className="c-list c-comments__list">
              {categories && categories.map((item) => <li className="c-list__item" key={item}>{item}</li>)}
            </ul>
          </div>
        </div>
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
  // saveRecipesListToStore: (recipesList) => {
  //   dispatch(createActionSaveRecipesList(recipesList))
  // },
})

export default connect(mapStateToProps, mapDispatchToProps)(RecipesDetails);