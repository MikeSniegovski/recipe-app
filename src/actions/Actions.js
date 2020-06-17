import React, { Component, Fragment } from 'react';
import { firestore } from "components/firebase";
import { connect } from 'react-redux'

const createActionSavePeople = (peopleList) => ({
  type: "SAVE_PEOPLE_LIST",
  payload: peopleList,
});

class RecipesList extends Component {
  state = {
    recipes: []
  };

  firestoreData = null;

  componentDidMount = () => {

    // this.firestoreData = firestore
    //   .collection("recipes")
    //   .onSnapshot(snapshot => {
    //     const recipes = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    //     this.setState({ recipes });
    //   });
  };

  componentWillUnmount = () => {
    this.firestoreData();
  };

  render() {
    const { recipes } = this.state;
    const { reduxStore } = this.props;

    if (!recipes.length) {
      return <p className="c-list__recipes c-list__recipes--empty">Loading data</p>;
    }else{
      return (
        <ul className="c-list c-list__recipes">
          <li className="c-list__item">gfdb</li>
          <li className="c-list__item">bfgbsdfb</li>
          <li className="c-list__item">bfdbsdb</li>
          <li className="c-list__item">fdbdb</li>
          <li className="c-list__item">bfdbd</li>
          <li className="c-list__item">bdfb</li>
        </ul>
      )
    }
  }
}

const mapStateToProps = (state) => {
  return {
    reduxStore: state
  }
};

export default connect(mapStateToProps)(RecipesList);