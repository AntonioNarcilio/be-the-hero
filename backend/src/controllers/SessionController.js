// conexão com o banco
const connection = require('../database/connection');

module.exports = {
	async create(request, response) {
		// buscando id através do corpo da requisição
		const { id } = request.body;

		// buscar uma ong no banco de dados
		const ong = await connection('ongs')
		 .where('id', id)
		 .select('name')
		// retornar apena um
		 .first();

		// se a ong não existir
		if(!ong){
			return response.status(400).json({ error: 'No ONG found with this ID'});
		}

		// Se deu tudo  certo retorna os dados da ong
		return response.json(ong);

	}
}