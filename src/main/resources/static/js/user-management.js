// User creation
async function createUser() {
    const addUserForm = $('#addForm')

    const usernameField = addUserForm.find('#usernameCreate');
    const passwordField = addUserForm.find('#passwordCreate');
    const surnameField = addUserForm.find('#surnameCreate');
    const ageField = addUserForm.find('#ageCreate');

    const res = await UserAPI.createUser({
        username: usernameField.val().trim(),
        password: passwordField.val().trim(),
        surname: surnameField.val().trim(),
        age: ageField.val().trim(),
        roles: getCheckedRoles('#rolesCreate')
    });

    if (res.ok) {
        await renderUsers();

        usernameField.val('');
        passwordField.val('');
        surnameField.val('');
        ageField.val('');
        addUserForm.find('#rolesCreate').val('');

        const alert = `<div class="alert alert-success alert-dismissible fade show col-12" role="alert">
                     User created!
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>`;
        addUserForm.prepend(alert);
        $('.nav-tabs a[href="#adminTable"]').tab('show');
    } else {
        const body = await res.json();
        const alert = `<div class="alert alert-danger alert-dismissible fade show col-12" role="alert">
                        ${body.info}
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>`;
        addUserForm.prepend(alert);
    }
}

// User deletion
async function deleteUser(modal, id) {
    const res = await UserAPI.getUserById(id);
    const user = res.json();

    modal.find('.modal-title').html('Delete user');

    const deleteButton = `<button  class="btn btn-danger" id="deleteButton">Delete</button>`;
    const closeButton = `<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>`
    modal.find('.modal-footer').append(deleteButton);
    modal.find('.modal-footer').append(closeButton);

    user.then(user => {
        let bodyForm = `
            <form class="form-group text-center" id="deleteUser">
               <div class="form-group">
                    <label for="userId" class="col-form-label">ID</label>
                    <input type="text" class="form-control username" id="userId" value="${user.userId}" readonly>
               </div>

               <div class="form-group">
                    <label for="username" class="col-form-label">Username</label>
                    <input type="text" class="form-control username" id="username" value="${user.username}" readonly>
               </div>

                <div class="form-group">
                    <label for="surname" class="com-form-label">Surname</label>
                    <input type="text" class="form-control" id="surname" value="${user.surname}" readonly>
                </div>

                <div class="form-group">
                    <label for="age" class="com-form-label">Age</label>
                    <input type="number" class="form-control" id="age" value="${user.age}" readonly>
                    <div class="invalid-feedback">
                        Age cannot be empty
                    </div>
                </div>

                <div class="form-group">
                    <label for="roles" class="com-form-label">Roles:</label>
                    <select id="roles" class="form-control" size="2" name="roles" style="max-height: 100px" disabled>
                        <option>${user.roles.map(e => e.role).join(" ")}</option>
                    </select>
                </div>

            </form>
        `;
        modal.find('.modal-body').append(bodyForm);
    })

    $("#deleteButton").on('click', async () => {
        const res = await UserAPI.deleteUser(id);

        if (res.ok) {
            await renderUsers();
            modal.modal('hide');
        } else {
           const  body = await res.json();
           const alert = `<div class="alert alert-danger alert-dismissible fade show col-12" role="alert" id="messageError">
                            ${body.info}
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>`;
            modal.find('.modal-body').prepend(alert);
        }
    })
}

// User editing
async function editUser(modal, id) {
    const res = await UserAPI.getUserById(id);
    const user = res.json();

    modal.find('.modal-title').html('Edit user');

    const editButton = `<button  class="btn btn-info" id="editButton">Edit</button>`;
    const closeButton = `<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>`
    modal.find('.modal-footer').append(editButton);
    modal.find('.modal-footer').append(closeButton);

    user.then(user => {
        let bodyForm = `
            <form class="form-group text-center" id="editUser">
               <div class="form-group">
                    <label for="userId" class="col-form-label">ID</label>
                    <input type="text" class="form-control username" id="userId" value="${user.userId}" readonly>
               </div>

               <div class="form-group">
                    <label for="username" class="col-form-label">Username</label>
                    <input type="text" class="form-control username" id="username" value="${user.username}">
               </div>

                <div class="form-group">
                    <label for="password" class="com-form-label">Password</label>
                    <input type="password" class="form-control" id="password" value="${user.password}">
                </div>

                <div class="form-group">
                    <label for="surname" class="com-form-label">Surname</label>
                    <input type="text" class="form-control" id="surname" value="${user.surname}">
                </div>

                <div class="form-group">
                    <label for="age" class="com-form-label">Age</label>
                    <input type="number" class="form-control" id="age" value="${user.age}">
                </div>

                <div class="form-group">
                    <label for="roles" class="com-form-label">Role</label>
                    <select multiple id="roles" size="2" class="form-control" style="max-height: 100px">
                        <option value="ROLE_USER">USER</option>
                        <option value="ROLE_ADMIN">ADMIN</option>
                    </select>
                </div>
            </form>
        `;
        modal.find('.modal-body').append(bodyForm);
    })

    $("#editButton").on('click', async () => {
        const res = await UserAPI.updateUser(id, {
            userId: modal.find("#userId").val().trim(),
            username: modal.find("#username").val().trim(),
            password: modal.find("#password").val().trim(),
            surname: modal.find("#surname").val().trim(),
            age: modal.find("#age").val().trim(),
            roles: getCheckedRoles('#roles')
        });

        if (res.ok) {
            await renderUsers();
            modal.modal('hide');
        } else {
            const body = await res.json();
            const alert = `<div class="alert alert-danger alert-dismissible fade show col-12" role="alert" id="messageError">
                            ${body.info}
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>`;
            modal.find('.modal-body').prepend(alert);
        }
    })
}
