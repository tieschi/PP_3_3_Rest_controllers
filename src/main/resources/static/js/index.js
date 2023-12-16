$(async function() {
    await renderMyUser();
    renderMyUserInfo();
    renderTitle();
    renderUsers();
})

setupModal();

// Event Listeners
$(`#addUser`).click(() => {
    $(`#addForm`).show()
})

$('#addUser').click(() => {
    createUser()
});
