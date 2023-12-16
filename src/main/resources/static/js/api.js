const defaultHeaders = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Referer': null
}

const defaultGetParams = {
    method: 'GET',
    headers: defaultHeaders
}

const defaultPostParams = {
    method: 'POST',
    headers: defaultHeaders
}

const defaultPutParams = {
    method: 'PUT',
    headers: defaultHeaders
}

const defaultDeleteParams = {
    method: 'DELETE',
    headers: defaultHeaders
}

const UserAPI = {
    getAllUsers() {
        return fetch('api/users', defaultGetParams);
    },
    getMyUser() {
        return fetch(`api/user`, defaultGetParams);
    },
    getUserById(id) {
        return fetch(`api/users/${id}`, defaultGetParams)
    },
    createUser(user) {
        return fetch('api/users', {
            ...defaultPostParams,     // ... - ������� �� ������� (spread ��������)
            body: JSON.stringify(user)
        })
    },
    updateUser(id, user) {
        return fetch(`api/users/${id}`, {
            ...defaultPutParams,
            body: JSON.stringify(user)
        })
    },
    deleteUser(id) {
        return fetch(`api/users/${id}`, defaultDeleteParams)
    }
}
