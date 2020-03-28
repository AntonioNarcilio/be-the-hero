/* * ProfileController será responsável pelo
	 perfil de uma ong
*/

// conexão com o banco
const connection = require('../database/connection');

//  retornando os caso específicos de uma única ong
module.exports = {
	async index(request, response) {
		// acessando dados da ong logada
		const ong_id = request.headers.authorization;
		// buscando os incident44es
		const incidents = await connection('incidents')
			.where('ong_id', ong_id)
			.select('*');

		return response.json(incidents);
	}
}
