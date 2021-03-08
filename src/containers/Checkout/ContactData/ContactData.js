import { Component } from "react";
import axios from '../../../axios-order';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.css';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        console.log(this.props.ingredients);
        this.setState({ loading: true });
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: 'Max Schwarzmuller',
                addressL: {
                    street: 'Teststreet 1',
                    zipCode: '41351',
                    country: 'Slovakia'
                },
                email: 'test@test.com'
            },
            deliveryMethod: 'fastest'
        }
        axios.post('/orders.json', order)
            .then(response => {
                console.log(response);
                this.setState({ loading: false });
                this.props.history.push('/');
            })
            .catch(error => {
                console.log(error);
                this.setState({ loading: false });
            });
    }

    render() {
        let form = (
            <form>
                <input className={classes.Input} type="text" name="name" placeholder="Your name"></input>
                <input className={classes.Input} type="email" name="email" placeholder="Your email"></input>
                <input className={classes.Input} type="text" name="street" placeholder="Your street"></input>
                <input className={classes.Input} type="text" name="postalCode" placeholder="Your postalCode"></input>
                <Button btnType="Success" clicked={this.orderHandler}>Order</Button>
            </form>);
        if (this.state.loading) {
            form = <Spinner></Spinner>;
        }
        return (
            <div className={classes.ContactData}>
                <h4>Entry your Contact Data</h4>
                {form}
            </div>
        );
    }

}

export default ContactData;