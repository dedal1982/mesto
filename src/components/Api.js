export default class Api {
  constructor(options) {
    this._url = options.url;
    this._headers = options.headers;
  }

  //проверка на ошибки
  _checkResponse(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  //запрос данных с сервера
  getInitialsCards() {
    return fetch(`${this._url}/cards`, {
      method: 'GET',
      headers: this._headers
    })
    .then(this._checkResponse)
  }

  getDataUser() {
		return fetch(`${this._url}/users/me`, {
			headers: this._headers
		})
		.then(this._checkResponse)
	}

  setUserData(data) {
		return fetch(`${this._url}/users/me`, {
			method: 'PATCH',
			headers: this._headers,
			body: JSON.stringify({
				name: data.name,
				about: data.about
			})
		})
		.then(this._checkResponse)
	}

  setUserAvatar(data) {
		return fetch(`${this._url}/users/me/avatar`, {
			method: 'PATCH',
			headers: this._headers,
			body: JSON.stringify({
				avatar: data.avatar
			})
		})
		.then(this._checkResponse)
	}

  setLike(cardId) {
		return fetch(`${this._url}/cards/${cardId}/likes`, {
			method: 'PUT',
			headers: this._headers,
		})
    .then(this._checkResponse)
	}

  //удаление лайка
	deleteLike(cardId) {
		return fetch(`${this._url}/cards/${cardId}/likes`, {
			method: 'DELETE',
			headers: this._headers,
		})
    .then(this._checkResponse)
	}

  // Добавление новой карточки в галерею
  addNewPhotocard(name, link) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({ name, link })
    })
    .then(this._checkResponse);
  }

  //удаление карточки
  deleteCard(cardId) {
		return fetch(`${this._url}/cards/${cardId}`, {
			method: 'DELETE',
			headers: this._headers,
		})
		.then(this._checkResponse);
	}

}
