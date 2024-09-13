var express = require('express');
var apiRouterV2 = express.Router();

const knex = require('knex')(require('../knexfile').development);

apiRouterV2.get('/produtos', function(req, res, next) {
  knex('produtos')
    .select('*')
    .then(produtos => {
      res.status(200).json(produtos)
    })
    .catch(err => res.status(500).json({ message: `Erro ao obter produtos: ${err.message}`}))
});

apiRouterV2.get('/produtos/:id', function(req, res, next) {
  let id = req.params.id;
  if (id) {
    idInt = Number.parseInt(id)
    knex('produtos')
      .where('id', idInt)
      .first('*')
      .then(produto => {
        if (produto)
          res.status(200).json(produto)
        else res.status(404).json({ message: `Produto não encontrado.` });
      })
      .catch(err => res.status(500).json({ message: `Erro ao obter produto: ${err.message}`}))
  }
  else {
    res.status(400).json({ message: `Informe um ID válido.` });
  }
});

apiRouterV2.post('/produtos', function(req, res, next) {
  let produto = req.body
  knex('produtos')
    .insert(produto)
    .then(produto => {
      res.status(201).json({ message: `Produto inserido com sucesso`, data: {id: produto} })
    })
    .catch(err => res.status(500).json({ message: `Erro ao inserir produto: ${err.message}`}))
});

apiRouterV2.delete('/produtos/:id', function(req, res, next) {
  let id = req.params.id;
  if (id) {
    idInt = Number.parseInt(id)
    knex('produtos')
      .where('id', idInt)
      .del()
      .then(res.status(200).json({message: `Produto excluído com sucesso`}))
      .catch(res.status(404).json({ message: `Produto não encontrado.` }))
  }
  else {
    res.status(400).json({ message: `Informe um ID válido.` });
  }
});

apiRouterV2.put('/produtos/:id', function(req, res, next) {
  let id = req.params.id;
  let produto = req.body;
  if (id) {
    idInt = Number.parseInt(id)
    let idx = produtos.findIndex(o => o.id === idInt);
    if (idx > -1) {
      produtos[idx].descricao = produto.descricao
      produtos[idx].marca = produto.marca
      produtos[idx].preco = produto.preco

      res.status(200).json(
        { message: `Produto alterado com sucesso`, 
          data: produtos[idx]
        }
      )
    } else {
      res.status(404).json({ message: `Produto não encontrado.` });
    }
  }
  else {
    res.status(404).json({ message: `Produto não encontrado.` });
  }
});

module.exports = apiRouterV2;
