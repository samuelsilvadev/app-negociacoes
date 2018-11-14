import { Usuario } from '../models/Usuario';
import { Dom } from '../helpers/Dom';

export class UsuarioController extends Dom {
	constructor() {
		super();

		const $ = super().$;

		this._nome = $('#nome');
		this._sobreNome = $('#sobrenome');
		this._dataNascimento = $('#data-nascimento');
		this._email = $('#email');
		this._senha = $('#senha');
	}

	adiciona(e) {}

	apaga() {}

	_criaUsuario() {
		return new Usuario(
			this._nome.value,
			this._sobreNome.value,
			this._dataNascimento.value,
			this._email.value,
			this._senha.value
		);
	}

	_limpaFormulario() {}

	_exibeUmaMensagem(mensagem) {}
}
