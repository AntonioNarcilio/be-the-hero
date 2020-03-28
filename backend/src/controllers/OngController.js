// pacote/modulo para criptografia
const crypto = require('crypto');
// conexão com o banco
const connection = require('../database/connection');

module.exports = {
	// método para listar dados armazenado em uma tabela
	async index(request, response) {
		const ongs = await connection('ongs').select('*');
	
		return response.json(ongs);
	},

	async create(request, response) {
		const {name, email, whatsapp, city, uf} = request.body;

		// gerar uma string aleatória
		// gerando 4 byte aleatório do tipo string HEXADECIMAL
		const id = crypto.randomBytes(4).toString('HEX');
	
		// cadastrando nova ong
		await connection('ongs').insert({
			id,
			name,
			email,
			whatsapp,
			city,
			uf,
		});
		// devolvendo uma id para a ongs cadastrada
		return response.json({ id });

	}
};