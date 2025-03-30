const form = {
    confirmPassword: () => document.getElementById('confirmPassword'),
    confirmPasswordDoesntMatchError: () => document.getElementById('password-doesnt-match-error'),
    email: () => document.getElementById('email'),
    emailInvalidError: () => document.getElementById('email-invalid-error'),
    emailRequiredError: () => document.getElementById('email-required-error'),
    password: () => document.getElementById('password'),
    passwordMinLengthError: () => document.getElementById('password-min-length-error'),
    passwordRequiredError: () => document.getElementById('password-required-error'),
    registerButton: () => document.getElementById('register-button'),
    cpf: () => document.getElementById('cpf'),
    cep: () => document.getElementById('cep'),
    bairro: () => document.getElementById('bairro'),
    rua: () => document.getElementById('rua'),
    numero: () => document.getElementById('numero')
}

firebase.auth().onAuthStateChanged(user => {
    if (user) {
        window.location.href = "../home/home.html";
    }
})

function onChangeEmail() {
    const email = form.email().value;
    form.emailRequiredError().style.display = email ? "none" : "block";

    form.emailInvalidError().style.display = validateEmail(email) ? "none" : "block";

    toggleRegisterButtonDisable();
}

function onChangePassword() {
    const password = form.password().value;
    form.passwordRequiredError().style.display = password ? "none" : "block";

    form.passwordMinLengthError().style.display = password.length >= 6 ? "none" : "block";

    validatePasswordsMatch();
    toggleRegisterButtonDisable();
}

function onChangeConfirmPassword() {
    validatePasswordsMatch();
    toggleRegisterButtonDisable();
}


function register() {
    showLoading();

    const emailValue = form.email().value; // Obter o valor do campo de e-mail
    const passwordValue = form.password().value; // Obter o valor do campo de senha

    // Criar usuário com e-mail e senha
    firebase.auth().createUserWithEmailAndPassword(emailValue, passwordValue)
        .then((userCredential) => {
            // Após o registro bem-sucedido, salvar informações adicionais no Firestore
            const user = userCredential.user;

            const userData = {
                cpf: form.cpf().value,
                cep: form.cep().value,
                bairro: form.bairro().value,
                rua: form.rua().value,
                numero: form.numero().value,
            };

            // Salvar informações adicionais do usuário no Firestore
            firebase.firestore().collection('users').doc(user.uid).set(userData)
                .then(() => {
                    hideLoading();
                    // Redirecionar para a página inicial após o registro
                    window.location.href = "../../pages/home/home.html";
                })
                .catch((error) => {
                    hideLoading();
                    console.error('Erro ao salvar informações adicionais:', error);
                    alert(getErrorMessage(error));
                });
        })
        .catch((error) => {
            hideLoading();
            console.error('Erro ao registrar usuário:', error);
            alert(getErrorMessage(error));
        });
}

function getErrorMessage(error) {
    if (error.code == "auth/email-already-in-use") {
        return "Email já está em uso";
    }
    return error.message;
}

function validatePasswordsMatch() {
    const password = form.password().value;
    const confirmPassword = form.confirmPassword().value;

    form.confirmPasswordDoesntMatchError().style.display =
        password == confirmPassword ? "none" : "block";
}

function toggleRegisterButtonDisable() {
    form.registerButton().disabled = !isFormValid();
}

function isFormValid() {
    const email = form.email().value;
    if (!email || !validateEmail(email)) {
        return false;
    }

    const password = form.password().value;
    if (!password || password.length < 6) {
        return false;
    }

    const confirmPassword = form.confirmPassword().value;
    if (password != confirmPassword) {
        return false;
    }

    return true;
}

