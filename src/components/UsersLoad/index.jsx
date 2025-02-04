import React, { Component } from 'react';
import loadUsers from '../../api';

class UsersLoad extends Component {
    constructor (props) {
        super(props);

        this.state = {
            users: [],
            errors: null,
            isFatching: false,
        };
    }
    componentDidMount () {
        this.loadData();
    }
    //
    loadData = () => {
        this.setState({ isFatching: true });

        loadUsers()
            .then(({ results }) => this.setState({ users: results }))
            .catch(error => this.setState({ errors: error }))
            .finally(() => {
                this.setState({ isFatching: false });
            });
    };

    //
    render () {
        const { users, isFatching, errors } = this.state;
        return (
            <>
                {isFatching && <div>plese, low 3G!!!!</div>}
                {errors && <div>ERROR!!!!</div>}

                <ul>
                    {users.map(u => (
                        <li key={u.id.value}>{JSON.stringify(u)}</li>
                    ))}
                </ul>
            </>
        );
    }
}
export default UsersLoad;
