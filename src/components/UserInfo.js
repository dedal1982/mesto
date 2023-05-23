export default class UserInfo {
  constructor({ name, description }) {
    this._userName = name;
    this._userDescription = description;
  }

  getUserInfo() {
    return {
      name: this._userName.textContent,
      description: this._userDescription.textContent
    }
  }

  setUserInfo({ name, description }) {
      this._userName.textContent = name;
      this._userDescription.textContent = description;
  }
}
