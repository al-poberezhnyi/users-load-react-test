import queryString from 'query-string';

import CONSTANTS from '../constants';

function loadUsers (options) {
    console.log('options :>> ', options);
    const defaultOptions = {
        page: 1,
        results: 10,
        seed: CONSTANTS.SEED,
        inc: CONSTANTS.INCLUDING_FIELDS,
    };

    const realOptions = { ...defaultOptions, ...options };
    console.log('realOptions :>> ', realOptions);

    const stringifiedOptions = queryString.stringify(realOptions, {
        arrayFormat: 'comma',
    });
    console.log('stringifiedOptions :>> ', stringifiedOptions);

    return fetch(`${CONSTANTS.BASE_URL}?${stringifiedOptions}`).then(res =>
        res.json()
    );
}

export default loadUsers;
