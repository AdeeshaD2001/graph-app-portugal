// controllers contém as CRUDs(REST) para cada pedaço do app.
// aqui o controller para gerenciar os graficos. (em desenvolvimento)
import User from "../models/User";
import Graph from "../models/Graph";

class GraphsController{ // define a classe que ira controlar os graficos
    async index(req,res){ // método async de listagem dos elementos dentro do controlador
        try{
            let query = Graph.find(); // caso seja encontrado, aloca os graficos que esse usuario pode acessar.
            query = query.select('cadeia_nome cadeia_id');
            const graphs = await query;

            return res.json(graphs); // retorna os graficos.
        }catch(err){ // caso não sejá possivel retornar nada, mostra o erro abaixo.
            console.error(err); 
            return res.status(500).json({ error: 'Internal server error.' });
        }    
    }
    async create(req,res){ // médoto de criar um novo usuario
        try{
            //const { codcarga, consumo, endereco } = req.body; // email e senha passados do frontend
            const {cadeia_nome, cadeia_id, lojas} = req.body;

            //const cod = await Graph.findOne({codcarga}); // busca se o email já está cadastrado
            const cadeia = await Graph.findOne({cadeia_id});

        

            // if (cod){// em caso de email já cadastrado no banco de dados, retonar o erro.
            //     return res.status(422).json({message:`Store ${codcarga} already exists.`});
            // }// em caso de novo email ->

             
             if (cadeia){
                 const updatedCadeia = await Graph.findByIdAndUpdate(cadeia._id, { lojas }, {new:true});
                return res.status(201).json(updatedCadeia);
            }
             
            // const newStore = await Graph.create({ codcarga, consumo, endereco }); // cria novo usuario com nome e senha(criptografada - hash)
            const newChain = await Graph.create({cadeia_nome, cadeia_id, lojas});

            // return res.status(201).json(newStore); // retorna confirmação de exito com os dados de novo usuario em formato json para o banco de dados.

            return res.status(201).json(newChain);

        }catch(err){  // caso não sejá possivel retorna o  erro!
            console.error(err);
            return res.status(500).json({ error: 'Internal server error.' });
        }    
        
    }
}

export default new GraphsController(); // exporta como uma nova instancia da classe dos controles de graficos.