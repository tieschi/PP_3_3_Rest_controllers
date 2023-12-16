let isAdmin = false;

async function renderMyUser() {
    const table = document.querySelector('#tableUser tbody');
    const res = await UserAPI.getMyUser();
    const user = await res.json();

    table.innerHTML = `
        <tr>
            <td>${user.userId}</td>
            <td>${user.username}</td>
            <td>${user.surname}</td>
            <td>${user.age}</td>
            <td>${user.roles.map(e => e.role).join(" ")}</td>
        </tr>
    `;

    isAdmin = user.roles.some(e => e.role === 'ROLE_ADMIN');

    if (isAdmin) {
        $("#adminTable").addClass("show active");
        $("#adminTab").addClass("show active");
    } else {
        $("#userTable").addClass("show active");
        $("#userTab").addClass("show active");
    }
}

function renderTitle() {
    const title = document.querySelector('#page-title');
    if (isAdmin) {
        title.innerHTML = `Admin panel`;
    } else {
        title.innerHTML = `User information page`;
    }
}

async function renderMyUserInfo() {
    const myUserEl = document.querySelector('#my-user'); // �������� ������� �� html � id - my-user
    const res = await UserAPI.getMyUser();
    const user = await res.json(); // �� ������ (������� ������) � json

    myUserEl.innerHTML = `${user.username} with roles ${user.roles.map(e => e.role).join(" ")}`;
}

async function renderUsers() {
    if (!isAdmin) {
        return;
    }

    const table = document.querySelector('#tableAllUsers tbody');
    const res = await UserAPI.getAllUsers();
    const users = await res.json();

    let temp = '';
    users.forEach(user => {
        temp += `
        <tr>
            <td>${user.userId}</td>
            <td>${user.username}</td>
            <td>${user.surname}</td>
            <td>${user.age}</td>
            <td>${user.roles.map(e => e.role).join(" ")}</td>
            <td>
                <button type="button" data-userid="${user.userId}" data-action="edit" class="btn btn-info"
                     data-toggle="modal" data-target="#editModal">Edit</button>
            </td>
            <td>
                <button type="button" data-userid="${user.userId}" data-action="delete" class="btn btn-danger"
                     data-toggle="modal" data-target="#deleteModal">Delete</button>
            </td>
        </tr>
       `;
    })
    table.innerHTML = temp;

    $("#tableAllUsers").find('button').on('click', (event) => {
        const defaultModal = $('#defaultModal');

        const targetButton = $(event.target);
        const buttonUserId = targetButton.attr('data-userid');
        const buttonAction = targetButton.attr('data-action');

        defaultModal.attr('data-userid', buttonUserId);
        defaultModal.attr('data-action', buttonAction);
        defaultModal.modal('show');
    })
}

