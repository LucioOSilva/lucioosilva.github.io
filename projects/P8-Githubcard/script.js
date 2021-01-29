function dateConverter(date) {
  const dateObj = new Date(date);
  const dateFormated = (dateObj.getDate() ) + "/" + ((dateObj.getMonth() + 1)) + "/" + dateObj.getFullYear();
  return dateFormated;
}

function personaWebConstructor(data) {
  const userElement = document.createElement('div');
  const userImage = document.createElement('img');
  const userName = document.createElement('h2');
  const userLogin = document.createElement('h3');
  const userOthers = document.createElement('p');
  const userOthersBio = document.createElement('p');
  const userLastAtualization = document.createElement('p');
  userImage.src = data.avatar_url;
  userName.innerText = data.name;
  userLogin.innerText = `🌟 ${data.login} 🌟`;
  userOthers.innerText = `Usuário do Github desde ${dateConverter(data.created_at)}, natural de ${data.location}, com ${data.public_repos} repositórios públicos`;
  userOthersBio.innerText = `📎bio📎
  ${data.bio}`;
  userLastAtualization.innerText = `Última atualização do perfil em ${dateConverter(data.updated_at)}`;
  userElement.id = 'user-card';
  userElement.className = 'user-card';
  userLastAtualization.className = 'footer-card';
  document.body.appendChild(userElement);
  userElement.appendChild(userImage);
  userElement.appendChild(userName);
  userElement.appendChild(userLogin);
  userElement.appendChild(userOthers);
  userElement.appendChild(userOthersBio);
  userElement.appendChild(userLastAtualization);
}

function githubUserFetch(user) {
  const URL = `https://api.github.com/users/${user}`;
  return new Promise((resolve, rejected) => {
    fetch(URL)
      .then((response) => response.json())
      .then((data) => resolve(personaWebConstructor(data))) // constroi os elementos no html
      .catch((error) => rejected(error));
  })
}

async function githubUserFinder(user) {
  try {
    await githubUserFetch(user)
  } catch (error) {
    alert(error);
  }
}

function formSearchByUserName() {
  const buttonSubmitSearch = document.querySelector('#btn-find');
  const inputFormText = document.querySelector('#github-name');
  buttonSubmitSearch.addEventListener('click', (event) =>{
    if (inputFormText.value) {
      event.preventDefault();
      githubUserFinder(inputFormText.value);
      inputFormText.value = '';
    } else {
      alert('Campo de busca de usuário em branco- pesquise novamente!')
    }
  });
}

window.onload = () => {
  formSearchByUserName();
}
