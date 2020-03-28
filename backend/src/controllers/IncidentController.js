// conexão com o banco
const connection = require('../database/connection');

// cadastrando incidente
module.exports = {
	// método para listar dados armazenado em uma tabela
	async index(request, response) {
		/* ** paginação
			* se a pagina 'page' não existir por 
			  padrão ir para a pagina 1 
		*/
		const { page = 1} = request.query;

		// retornando a quantidade de casos cadastrados
		const [count] = await connection('incidents').count();
		// console.log(count);

		const incidents = await connection('incidents')
		//  relacionando dados de duas tabelas 'join'
		/* trazendo dados da tabela ongs, trazer penas os dados
			onde o id na tabela ongs seja igual ao id do incidents.ong_id	*/
		.join('ongs', 'ongs.id', '=', 'incidents.ong_id')

		// limitando a busca no banco de dados para apenas 5 incidentes
		.limit(5)
		// pulando 5 registro por pagina
		.offset((page -1)* 5)

		.select([
			'incidents.*',
			 'ongs.name',
			 'ongs.email',
			 'ongs.whatsapp',
			 'ongs.city',
			 'ongs.uf'
		]);
	
		/* * retornando o resultado da quantidade de casos cadastrados
			através do cabeçalho 'header'	*/
		response.header('X-Total-Count', count['count(*)']);


		return response.json(incidents);
	},

	async create(request, response){
		const { title, description, value } = request.body;
		// acessando o id da ong
		const ong_id = request.headers.authorization;

		// inserindo dados na tabela incidents
		const [id] = await connection('incidents').insert({
		/* * [id] id gerado ao fazer um novo cadastro 
			 onde o primeiro valor do array é armazenado na variável 
			 id
		*/
			title,
			description,
			value,
			ong_id,
		});

		return response.json({ id });
	},

	async delete(request, response){
		//  pegando a id através do parâmetro de rota - request.params
		const { id } = request.params;
		//  pegando o id da ong logada
		const ong_id = request.headers.authorization;

		// buscando incident na tabela
		const incident = await connection('incidents')
			.where('id', id)
			.select('ong_id')
			// retornando apenas um resultado
			.first();

		//  se o id da ong for diferente do que esta logado retornar um erro
		// diferente { !== -> ! = = }
		if (incident.ong_id !== ong_id){
			return response.status(401).json({ error: 'Operation not permitted.'});
		}
		
		// se deu tudo certo então deleta do banco
		await connection('incidents').where('id', id).delete();

		return response.status(204).send();
		//  204 => No Content => sem conteúdo


	}
};