// Definição do objeto `form` que encapsula funções para obter elementos do DOM
const form = {
    email: () => document.getElementById("email"),
    emailInvalidError: () => document.getElementById("email-invalid-error"),
    emailRequiredError: () => document.getElementById("email-required-error"),
    loginButton: () => document.getElementById("login-button"),
    password: () => document.getElementById("password"),
    passwordRequiredError: () => document.getElementById("password-required-error"),
    recoverPasswordButton: () => document.getElementById("recover-password-button"),
};

// Listener para verificar mudanças no estado de autenticação do Firebase
firebase.auth().onAuthStateChanged(user => {
    // Se o usuário estiver autenticado, redireciona para a página home
    if (user) {
        window.location.href = "../../pags/choose/choose.html";
    }
});

// Função chamada quando o email é alterado
function onChangeEmail() {
    toggleButtonsDisable(); // Desabilita ou habilita botões com base na validade do email e senha
    toggleEmailErrors(); // Mostra ou oculta mensagens de erro relacionadas ao email
}

// Função chamada quando a senha é alterada
function onChangePassword() {
    toggleButtonsDisable(); // Desabilita ou habilita botões com base na validade do email e senha
    togglePasswordErrors(); // Mostra ou oculta mensagens de erro relacionadas à senha
}

// Função para login utilizando o Firebase Authentication
function login(event) {
    event.preventDefault(); // Previne o envio padrão do formulário
    showLoading();
    firebase.auth().signInWithEmailAndPassword(
        form.email().value, form.password().value
    ).then(() => {
        hideLoading();
        window.location.href = "../../pags/choose/choose.html";
    }).catch(error => {
        hideLoading();
        alert(getErrorMessage(error));
    });
}

// Função para redirecionar para a página de registro
function register() {
    window.location.href = "../../pags/login/register.html";
}

// Função para recuperar a senha
function recoverPassword() {
    showLoading(); // Mostra indicador de carregamento
    firebase.auth().sendPasswordResetEmail(form.email().value).then(() => {
        hideLoading(); // Esconde indicador de carregamento após envio de email de recuperação
        alert('Email enviado com sucesso'); // Informa ao usuário que o email foi enviado com sucesso
    }).catch(error => {
        hideLoading(); // Esconde indicador de carregamento em caso de erro
        alert(getErrorMessage(error)); // Exibe mensagem de erro ao usuário
    });
}

// Função para obter mensagem de erro específica do Firebase Authentication
function getErrorMessage(error) {
    if (error.code == "auth/user-not-found") {
        return "Usuário não encontrado";
    }
    if (error.code == "auth/wrong-password") {
        return "Senha inválida";
    }
    return error.message; // Retorna mensagem de erro padrão
}

// Função para alternar a exibição de mensagens de erro relacionadas ao email
function toggleEmailErrors() {
    const email = form.email().value;
    form.emailRequiredError().style.display = email ? "none" : "block";
    
    form.emailInvalidError().style.display = validateEmail(email) ? "none" : "block"; 
}

// Função para alternar a exibição de mensagens de erro relacionadas à senha
function togglePasswordErrors() {
    const password = form.password().value; 
    form.passwordRequiredError().style.display = password ? "none" : "block"; 
}

// Função para desabilitar ou habilitar botões com base na validade do email e senha
function toggleButtonsDisable() {
    const emailValid = isEmailValid(); 
    form.recoverPasswordButton().disabled = !emailValid; 
    
    const passwordValid = isPasswordValid();
    form.loginButton().disabled = !emailValid || !passwordValid; // Desabilita ou habilita botão de login
}

// Função para verificar se o email é válido
function isEmailValid() {
    const email = form.email().value; // Obtém o valor do campo de email
    if (!email) {
        return false; 
    }
    return validateEmail(email); 
}

// Função para verificar se a senha é válida
function isPasswordValid() {
    return form.password().value ? true : false; 
}