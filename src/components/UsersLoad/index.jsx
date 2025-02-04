import React, { Component } from 'react';
import loadUsers from '../../api';

class UsersLoad extends Component {
    constructor (props) {
        super(props);

        this.state = {
            users: [],
            errors: null,
            isFatching: false,
            page: window.localStorage.getItem('page') || 1,
            results: 12,
        };
    }
    componentDidMount () {
        this.loadData();
    }
    componentDidUpdate (prevProps, prevState) {
        const { page } = this.state;
        if (prevState.page !== page) {
            window.localStorage.setItem('page', page);
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

    //
    render () {
        const { users, isFatching, errors } = this.state;
        return (
            <>
                {isFatching && <div>plese, low 3G!!!!</div>}
                {errors && <div>ERROR!!!!</div>}
                <div>
                    <button onClick={this.prevPage}>prev page</button>
                    <button onClick={this.nextPage}>next page</button>
                </div>

                <ul>
                    {users.map(u => (
                        <li key={u.login.uuid}>{JSON.stringify(u)}</li>
                    ))}
                </ul>
            </>
        );
    }
}
export default UsersLoad;
