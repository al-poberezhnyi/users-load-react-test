import React, { Component } from 'react';
import loadUsers from '../../api';
import UserItem from './UserItem';

import styles from './UsersLoad.module.scss';

class UsersLoad extends Component {
    constructor (props) {
        super(props);

        this.state = {
            users: [],
            errors: null,
            isFatching: false,
            page: window.localStorage.getItem('page') || 1,
            results: window.localStorage.getItem('results') || 2,
            input: '',
        };
    }
    componentDidMount () {
        this.loadData();
    }
    componentDidUpdate (prevProps, prevState) {
        const { page, results } = this.state;
        if (prevState.page !== page) {
            window.localStorage.setItem('page', page);
            this.loadData();
        }
        if (prevState.results !== results) {
            window.localStorage.setItem('results', results);
            this.loadData();
        }
    }
    //
    loadData = () => {
        const { page, results } = this.state;
        this.setState({ isFatching: true });

        loadUsers({ page, results })
            .then(({ results }) => this.setState({ users: results }))
            .catch(error => this.setState({ errors: error }))
            .finally(() => {
                this.setState({ isFatching: false });
            });
    };

    prevPage = () => {
        const { page } = this.state;
        page > 1 ? this.setState({ page: page - 1 }) : page;
    };
    nextPage = () => {
        const { page } = this.state;
        this.setState({ page: page + 1 });
    };
    handleOnSubmit = e => {
        e.preventDefault();
        const { value } = e.target[0];
        this.setState({ results: Number(value) });
        this.setState({ input: '' });
    };
    handleOnChange = ({ target: { value } }) => {
        this.setState({ input: value });
    };

    mapUser = u => <UserItem key={u.login.uuid} user={u} />;
    //
    render () {
        const { users, isFatching, errors, input } = this.state;
        return (
            <>
                {isFatching && <div>plese, low 3G!!!!</div>}
                {errors && <div>ERROR!!!!</div>}
                <div>
                    <button onClick={this.prevPage}>prev page</button>
                    <button onClick={this.nextPage}>next page</button>
                </div>
                <form onSubmit={this.handleOnSubmit}>
                    <input
                        type='number'
                        name='results'
                        value={input}
                        onChange={this.handleOnChange}
                    />
                    <button type='submit'>SUBMIT</button>
                </form>

                <ul>{users.map(this.mapUser)}</ul>
            </>
        );
    }
}
export default UsersLoad;
