export class Usuario {
	constructor(nome, sobrenome = '', dataNascimento, email, senha) {
		this._nome = nome;
		this._sobrenome = sobrenome;
		this._dataNascimento = dataNascimento;
		this._email = email;
		this._senha = senha;
	}

	get nome() {
		return this._nome;
	}

	get sobrenome() {
		return this._sobrenome;
	}

	get dataNascimento() {
		return this._dataNascimento;
	}

	get email() {
		return this._email;
	}

	get senha() {
		return this._senha;
	}

	isEquals(outroUsuario) {
		return JSON.stringify(this) == JSON.stringify(outroUsuario);
	}
}
