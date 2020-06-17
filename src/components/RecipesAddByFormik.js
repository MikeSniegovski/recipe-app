import React, {Component} from 'react';
import {connect} from 'react-redux';
import {firestore} from "components/firebase";
import RecipesList from "./RecipesList";
import {Formik, Form, useField} from 'formik';
import styled from 'styled-components'
import * as Yup from 'yup';


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

const Button = styled.button`
padding:1em;
// border:0 none;
// background-color: blue;
// color: white;
`

const Input = styled.input`
  font-size: 1.1rem;
  padding: 0.5em 1em;
  background: none transparent;
  border: 1px dotted #666;
  cursor: text;
  margin: 0.5em;
`


const MyTextInput = ({label, ...props}) => {
    // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
    // which we can spread on <input> and alse replace ErrorMessage entirely.
    const [field, meta] = useField(props);
    return (
        <>
            <label htmlFor={props.id || props.name}>{label}</label>
            <Input className="text-input" {...field} {...props} />
            {meta.touched && meta.error ? (
                <div className="error">{meta.error}</div>
            ) : null}
        </>
    );
};

// And now we can use these
const SignupForm = () => {
    return (
        <>
            <h1>Subscribe!</h1>
            <Formik
                initialValues={{
                    name: '',
                    ingridient: '',
                    step: '',
                }}
                enableReinitialize={true}
                validationSchema={Yup.object({
                    name: Yup.string()
                        .min(3, 'Must be 3 characters or less')
                        .required('Required'),
                    ingridient: Yup.string()
                        .min(5, 'Must be 20 characters or less')
                        .required('Required'),
                    step: Yup.string()
                        .min(5, 'Must be 20 characters or less')
                        .required('Required'),
                })}
                onSubmit={async (values, actions) => {

                    await firestore.collection("recipes").add(values)
                        .then(response => {
                            actions.setStatus('success')
                            console.log(response)
                            // return response
                        })
                        .finally(() => {
                            setTimeout(() => actions.resetForm(), 1000)

                        })
                }}
            >

                {formikProps => <Form>
                    {console.log(formikProps)}
                    <div>
                        <MyTextInput
                            name="name"
                            type="text"
                            placeholder="name"
                        />
                    </div>
                    <div>
                        <MyTextInput
                            name="ingridient"
                            type="text"
                            placeholder="ingridient"
                        />
                    </div>
                    <div>
                        <MyTextInput
                            name="step"
                            type="text"
                            placeholder="step"
                        />
                    </div>
                    {formikProps.isSubmitting ? <span>is Submiting</span> : null}
                    {formikProps.status === 'success' ? <span>success</span> : null}
                    <Button type="submit" disabled={formikProps.isSubmitting}>Submit</Button>
                </Form>

                }

            </Formik>
        </>
    );
};

class RecipesAddByFormik extends Component {
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
        const {value} = event.target;
        this.setState({name: value});
    };

    addIngridient = event => {
        event.preventDefault();
        const name = this.getIngridient.value;
        this.setState(prevState => ({ingridients: [...prevState.ingridients, name]}));
        this.getIngridient.value = "";
    };

    addStep = event => {
        event.preventDefault();
        const name = this.getStep.value;
        this.setState(prevState => ({steps: [...prevState.steps, name]}));
        this.getStep.value = "";
    };

    addCategory = event => {
        event.preventDefault();
        const name = this.getCategory.value;
        this.setState(prevState => ({categories: [...prevState.categories, name]}));
        this.getCategory.value = "";
    };

    sendRecipe = event => {
        event.preventDefault();
        const {name, ingridients, steps, categories} = this.state;
        console.log(event)
        firestore.collection("recipes").add({name, ingridients, steps, categories})
            .then(this.setState({name: '', ingridients: [], steps: [], categories: []}));
    };

    render() {
        const {name, ingridients, steps, categories} = this.state;

        return (
            <>
                <SignupForm/>
                <div className="c-recipe">
                    <input className="c-input" placeholder="Name" onChange={this.handleChange} value={name}/>
                    <div className="c-ingridients">
                        <h3 className="c-list__title">Ingridients</h3>
                        <form onSubmit={this.addIngridient}>
                            <input className="c-input inp-add" ref={(input) => this.getIngridient = input}
                                   placeholder="ingridient"/>
                            <button className="c-button btn-add" type="submit">+</button>
                        </form>
                        <ul className="c-list c-ingridients__list">
                            {ingridients && ingridients.map((item) => <li className="c-list__item"
                                                                          key={item}>{item}</li>)}
                        </ul>
                    </div>
                    <div className="c-steps">
                        <h3 className="c-list__title">Steps</h3>
                        <form onSubmit={this.addStep}>
                            <input className="c-input inp-add" ref={(input) => this.getStep = input}
                                   placeholder="step"/>
                            <button className="c-button btn-add" type="submit">+</button>
                        </form>
                        <ol className="c-list c-steps__list">
                            {steps && steps.map((item) => <li className="c-list__item" key={item}>{item}</li>)}
                        </ol>
                    </div>
                    <div className="c-ingridients">
                        <h3 className="c-list__title">Categories</h3>
                        <form onSubmit={this.addCategory}>
                            <input className="c-input inp-add" ref={(input) => this.getCategory = input}
                                   placeholder="category"/>
                            <button className="c-button btn-add" type="submit">+</button>
                        </form>
                        <ul className="c-list c-ingridients__list">
                            {categories && categories.map((item, index) => <li className="c-list__item"
                                                                               key={index}>{item}</li>)}
                        </ul>
                    </div>
                    <button className="c-button btn-add" onClick={this.sendRecipe} type="submit">Submit recipe</button>
                </div>
                <RecipesList/>

            </>

        )
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

export default connect(mapStateToProps, mapDispatchToProps)(RecipesAddByFormik);