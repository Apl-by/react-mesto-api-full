import { config } from "./data";

class Auth {
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

  registerUser(regData) {
    return fetch(`${this._baseUrl}/signup`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(regData),
    })
      .then(this._handleResToJson)
      .then(this._handleResponse);
  }

  signIn(authData) {
    return fetch(`${this._baseUrl}/signin`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(authData),
    })
      .then(this._handleResToJson)
      .then(this._handleResponse);
  }

  checkToken(token) {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        ...this._headers,
        Authorization: `Bearer ${token}`,
      },
    })
      .then(this._handleResToJson)
      .then(this._handleResponse);
  }
}

export const auth = new Auth(config);
