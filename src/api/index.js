//
function loadUsers () {
    return fetch('https://randomuser.me/api/').then(res => res.json());
}

export default loadUsers;
