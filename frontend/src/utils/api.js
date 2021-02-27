import { config } from "./data";
class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _handleResToJson(res) {
    return res.json().then((result) => {
      return { ok: res.ok, status: res.status, body: result };
    });
  }

  _handleResponse(res) {
    if (res.ok) {
      return res.body;
    }
    return Promise.reject(`Ошибка ${res.status}: ${res.body.message || res.body.error}`);
  }

  getInitialCards(token) {
    return fetch(`${this._baseUrl}/cards`, {
      headers: {
        ...this._headers,
        Authorization: `Bearer ${token}`,
      },
    })
      .then(this._handleResToJson)
      .then(this._handleResponse);
  }

  updateUserInfo(info, token) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        ...this._headers,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(info),
    })
      .then(this._handleResToJson)
      .then(this._handleResponse);
  }

  addNewCard(info, token) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: {
        ...this._headers,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(info),
    })
      .then(this._handleResToJson)
      .then(this._handleResponse);
  }

  deleteCard(card, token) {
    return fetch(`${this._baseUrl}/cards/${card._id}`, {
      method: "DELETE",
      headers: {
        ...this._headers,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(card),
    })
      .then(this._handleResToJson)
      .then(this._handleResponse);
  }

  changeLikeCardStatus(cardId, isLiked, token) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: isLiked ? "DELETE" : "PUT",
      headers: {
        ...this._headers,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(),
    })
      .then(this._handleResToJson)
      .then(this._handleResponse);
  }

  editAvatar(link, token) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        ...this._headers,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ avatar: link }),
    })
      .then(this._handleResToJson)
      .then(this._handleResponse);
  }
}

export const api = new Api(config);
