const ROLES = [
    { id: 1, role: "ROLE_USER" },
    { id: 2, role: "ROLE_ADMIN" }
]

function getCheckedRoles(elementSelector) {
    let array = []
    let options = document.querySelector(elementSelector).options
    for (let i = 0; i < options.length; i++) {
        if (options[i].selected) {
            array.push(ROLES[i])
        }
    }
    return array;
}
