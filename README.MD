### First Project

- Primeiro projeto usando node.js
- Uma aplicação simples para armazenar projetos e tarefas utilizando Express.


**Table of Contents**

[TOCM]

[TOC]

### Rotas da API

#### Criar projeto
`POST /projects`: A rota deve receber `id`, `title` e `tasks`dentro do body no seguinte formato: `{ id: "1", title: 'Novo projeto', tasks: [] }`; 


`GET /projects`: Rota que lista todos projetos e suas tarefas;
`PUT /projects/:id`: A rota deve altera apenas o título do projeto com o id presente nos parâmetros da rota;

`DELETE /projects/:id`: A rota deleta o projeto com o id presente nos parâmetros da rota;
`POST /projects/:id/tasks`: A rota deve receber um campo title e armazena uma nova tarefa no array de tarefas de um projeto específico escolhido através do id presente nos parâmetros da rota;




###End