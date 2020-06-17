import React, { Component } from 'react';
import { auth } from "components/firebase";
import { provider } from "components/firebase";
import { connect } from 'react-redux'

const createActionloginState = (loginState) => ({
  type: "LOGIN_STATE",
  payload: loginState,
});

class Account extends Component {

  signInWithGoogle = () => auth.signInWithPopup(provider);

  signOut = () => {
    const { saveLoginStateToStore } = this.props;
    auth.signOut().then(() => {
      saveLoginStateToStore({ isLogedIn: false, userID: "" , userEmail: "" });
    });
  };

  componentDidMount() {
    const { saveLoginStateToStore } = this.props;

    auth.onAuthStateChanged((user) => {
      if (user) {
        saveLoginStateToStore({ isLogedIn: true, userID: user.uid, userEmail: user.email })
        console.log("user logged in:", user.uid, user.email);
      } else {
        console.log("user logged out");
      }
    })
  }

  render() {
    const { isLogedIn, userEmail } = this.props;

    return (
      <div className="c-account">
        {userEmail && userEmail}
        {!isLogedIn && <button type="button" className="c-button" onClick={() => this.signInWithGoogle()}>Sign in</button>}
        {isLogedIn && <button type="button" className="c-button" onClick={() => this.signOut()}>Sign out</button>}
        {/* {isLogedIn ? <div>You are logged In</div> : <div>Please log in</div>} */}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLogedIn: state.isLogedIn,
    userEmail: state.userEmail
  }
};

const mapDispatchToProps = dispatch => ({
  saveLoginStateToStore: (loginState) => {
    dispatch(createActionloginState(loginState))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Account);