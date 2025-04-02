Esse projeto foi realizado com a finalidade de aprender fundamentos básicos de Node.js, bem como sua implementação. 
Para a prática, foi proposto um gerenciamento de tarefas com as seguintes funcionalidades: criação de uma task, deleção, edição, listagem de todas as tasks e marcar uma task como completada.
Além dessas funcionalidades, fiz uma função que importa de um CSV, as tasks e suas descrições. Esse CSV está na raiz do projeto e para executar essa funcionalidade, basta descomentar a função
que chama esse recurso no arquivo server.js.
Utilizei rotas diferentes para cada ação citada.
Toda implementação está rodando localmente e para conseguir acessá-las basta clonar esse repositório, executar "npm install" no terminal para instalar todas as dependências e logo em seguida,
"npm run dev" para a aplicação rodar. Com isso, o servidor estará funcionando. Para testar as rotas, utilizei o HTTPie para mandar as requisições.
