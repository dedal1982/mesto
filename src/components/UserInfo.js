export default class UserInfo {
	constructor({ selectorUserName, selectorUserAbout, selectorUserAvatar }) {
		this._userNameElement = selectorUserName;
		this._userAboutElement = selectorUserAbout;
		this._userAvatarElement = selectorUserAvatar;
	}

	getUserInfo() {
		return {
			name: this._userNameElement.textContent,
			about: this._userAboutElement.textContent,
			avatar: this._userAvatarElement.src
		}
	}

	setUserInfo({ name, about, avatar }) {
		this._userNameElement.textContent = name;
		this._userAboutElement.textContent = about;
		this._userAvatarElement.src = avatar;
	}
}
