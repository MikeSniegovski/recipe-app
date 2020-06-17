import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firestore } from "components/firebase";


// const createActionSaveRecipesList = (recipesList) => ({
//   type: "SAVE_RECIPES_LIST",
//   payload: recipesList,
// });
// handleSubmit = event => {
//   event.preventDefault();
//   const { expected, id } = this.props;

//   if (id) {
//     const wordRef = firestore.collection("words").doc(id);

//     wordRef.update({ expected });
//   } else {
//     firestore.collection("words").add({ expected });
//   }

//   this.props.onChange({ expected: "", id: "" });
// };

class RecipesAdd extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      ingridients: [],
      steps: [],
      categories: [],
    };
  }

  handleChange = event => {
    const { value } = event.target;
    this.setState({ name: value });
  };

  addIngridient = event => {
    event.preventDefault();
    const name = this.getIngridient.value;
    this.setState(prevState => ({ ingridients: [...prevState.ingridients, name] }));
    this.getIngridient.value = "";
  };

  addStep = event => {
    event.preventDefault();
    const name = this.getStep.value;
    this.setState(prevState => ({ steps: [...prevState.steps, name] }));
    this.getStep.value = "";
  };

  addCategory = event => {
    event.preventDefault();
    const name = this.getCategory.value;
    this.setState(prevState => ({ categories: [...prevState.categories, name] }));
    this.getCategory.value = "";
  };

  sendRecipe = event => {
    event.preventDefault();
    const { name, ingridients, steps, categories } = this.state;
    console.log(event)
    firestore.collection("recipes").add({ name, ingridients, steps, categories })
      .then(this.setState({name: '', ingridients: [], steps: [], categories: [] }));
  };

  render() {
    const { isLogedIn } = this.props;
    const { name, ingridients, steps, categories } = this.state;

    if (!isLogedIn) {
      return <p className="c-recipe c-recipe--empty">Log in to add recipe</p>;
    } else {
      return (
        <div className="c-recipe">
          <input className="c-input" placeholder="Name" onChange={this.handleChange} value={name}/>
          <div className="c-ingridients">
            <h3 className="c-list__title">Ingridients</h3>
            <form onSubmit={this.addIngridient}>
              <input className="c-input inp-add" ref={(input) => this.getIngridient = input} placeholder="ingridient" />
              <button className="c-button btn-add" type="submit">+</button>
            </form>
            <ul className="c-list c-ingridients__list">
              {ingridients && ingridients.map((item) => <li className="c-list__item" key={item}>{item}</li>)}
            </ul>
          </div>
          <div className="c-steps">
            <h3 className="c-list__title">Steps</h3>
            <form onSubmit={this.addStep}>
              <input className="c-input inp-add" ref={(input) => this.getStep = input} placeholder="step" />
              <button className="c-button btn-add" type="submit">+</button>
            </form>
            <ol className="c-list c-steps__list">
              {steps && steps.map((item) => <li className="c-list__item" key={item}>{item}</li>)}
            </ol>
          </div>
          <div className="c-ingridients">
            <h3 className="c-list__title">Categories</h3>
            <form onSubmit={this.addCategory}>
              <input className="c-input inp-add" ref={(input) => this.getCategory = input} placeholder="category" />
              <button className="c-button btn-add" type="submit">+</button>
            </form>
            <ul className="c-list c-ingridients__list">
              {categories && categories.map((item, index) => <li className="c-list__item" key={index}>{item}</li>)}
            </ul>
          </div>
          <button className="c-button btn-add" onClick={this.sendRecipe} type="submit">Submit recipe</button>
        </div>
      )
    }
  }
}

const mapStateToProps = (mainState) => {
  return {
    isLogedIn: mainState.isLogedIn
  }
};

const mapDispatchToProps = dispatch => ({
  // saveRecipesListToStore: (recipesList) => {
  //   dispatch(createActionSaveRecipesList(recipesList))
  // },
})

export default connect(mapStateToProps, mapDispatchToProps)(RecipesAdd);