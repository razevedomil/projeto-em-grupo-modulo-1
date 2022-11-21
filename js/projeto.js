function validar() {
  let nome = contact_form.name.value;
  let email = contact_form.email.value;
  let message = contact_form.message.value;

  if (nome == "") {
    alert('Preencha o campo nome.');
    contact_form.name.focus();
    return false;
  }

  if (email == "" || email.indexOf('@') == -1) {
    alert('Preencha o campo email.');
    contact_form.email.focus();
    return false;
  }

  if (message == "") {
    alert('Preencha o campo mensagem.');
    contact_form.message.focus();
    return false;
  }

  if (action == "") {
    alert('Preencha o campo email.');
    contact_form.action.focus();
    return false;
  }
}