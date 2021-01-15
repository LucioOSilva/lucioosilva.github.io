function alertEmailOrPhone() {
  const inputEmailPhone = document.querySelector('#button-login');
  const inputUserName = document.querySelector('#user-email-phone');
  inputEmailPhone.addEventListener('click', function () {
    alert(inputUserName.value);
  });
}

function verifyCheckedRadioInputs(listElements, index) {
  let getGender = '';
  if (listElements[index].checked) {
    getGender = listElements[index].value;
    if (listElements[index].value === 'Personalizado') {
      getGender = listElements[10].value;
    }
  }
  return getGender;
}

function verifyGender(listElements) {
  let checkBoxGender = '';
  for (let index = 2; index < listElements.length; index += 1) {
    checkBoxGender = verifyCheckedRadioInputs(listElements, index);
    if (checkBoxGender !== '') {
      break;
    }
  }
  return checkBoxGender;
}

function clearRightSide(listElements) {
  for (let index = listElements[0].children.length - 1; index >= 0; index -= 1) {
    listElements[0].removeChild(listElements[0].children[index]);
  }
}

function createAnswerLayout() {
  const rightSideList = document.querySelectorAll('.right-content');
  const inputs = document.querySelectorAll('input');
  // create elements to the card after verified
  const greetings = document.createElement('h3');
  const email = document.createElement('p');
  const birthdate = document.createElement('p');
  const gender = document.createElement('p');
  greetings.innerText = `Olá, ${inputs[2].value} ${inputs[3].value}`;
  email.innerText = inputs[4].value;
  birthdate.innerText = inputs[6].value;
  // get the checked radio input
  gender.innerText = verifyGender(inputs);
  // clear the right side
  clearRightSide(rightSideList);
  // create answer layout
  rightSideList[0].appendChild(greetings);
  rightSideList[0].appendChild(email);
  rightSideList[0].appendChild(birthdate);
  rightSideList[0].appendChild(gender);
}

function validateForm() {
  const formSubscribe = document.querySelector('#form-subscribe');
  const formSubscribeSubmitButton = document.querySelector('#facebook-register');
  const paragraph = document.querySelector('#message');
  formSubscribeSubmitButton.addEventListener('click', function (event) {
    event.preventDefault();
    if (!formSubscribe.checkValidity()) {
      paragraph.innerText = 'Campos inválidos';
      paragraph.className = 'message';
    } else {
      paragraph.innerText = '';
      createAnswerLayout();
    }
  });
}

function customGender() {
  const formSubscribe = document.querySelector('#form-subscribe');
  const radioGender = document.querySelector('#gender-custom');
  const buttonSubmitForm = document.querySelector('#facebook-register');
  radioGender.addEventListener('click', function () {
    const trigger = document.querySelectorAll('#input-gender3').length;
    if (trigger === 0) {
      const inputGender = document.createElement('input');
      inputGender.id = 'input-gender3';
      inputGender.name = 'gender-custom';
      inputGender.placeholder = 'Gênero (opcional)';
      inputGender.className = 'form-subscrib-full-line';
      inputGender.required = true;
      formSubscribe.insertBefore(inputGender, buttonSubmitForm);
    } else {
      formSubscribe.removeChild(buttonSubmitForm.previousSibling);
    }
  });
}

function createListLinks(item) {
  const link = document.createElement('a');
  const listItem = document.createElement('li');
  link.innerText = item;
  link.href = '';
  listItem.className = 'footer-list';
  listItem.appendChild(link);
  return listItem;
}

function fillFooter(footerItems,idSection) {
  const footerSection2 = document.querySelector(idSection);
  for (let index = 0; index < footerItems.length; index += 1) {
    const child = createListLinks(footerItems[index]);
    footerSection2.appendChild(child);
  }
}

const footerSection1Items = ['Português (Brasil)','English (US)','Español','Français (France)','Italiano','العربية',
  'Deustch','हिन्दी','中文(简体)','日本語'];

const footerSection2Items = ['Cadastre-se','Entrar','Messenger','Facebook Lite','Watch','Pessoas','Páginas','Categorias de Página',
  'Locais','Jogos','Locais','Marketplace','Facebook Pay','Grupos','Vagas de emprego','Oculus','Portal','InstagramLocal',
  'Campanhas de arrecadação de fundos','Serviços','Central de Informações de Votação','Sobre','Criar anúncio','Criar Página',
  'Desenvolvedores','Carreiras','Privacidade','Cookies','Escolhas para anúncios','Termos','Ajuda','Configurações'];


validateForm();
alertEmailOrPhone();
customGender();

fillFooter(footerSection1Items, '#footer-section1');
fillFooter(footerSection2Items, '#footer-section2');
