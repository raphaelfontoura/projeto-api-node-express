var express = require('express');
var apiRouterV1 = express.Router();

var produtos = [
  {"id":1, "descricao":"Camiseta", "marca":"Nike", "preco": 49.99}
]

apiRouterV1.get('/produtos', function(req, res, next) {
  res.json(produtos);
});

apiRouterV1.get('/produtos/:id', function(req, res, next) {
  let id = req.params.id;
  if (id) {
    idInt = Number.parseInt(id)
    let idx = produtos.findIndex(o => o.id === idInt);
    if (idx > -1) {
      res.json(produtos[idx]);
    } else {
      res.status(404).json({ message: `Produto não encontrado.` });
    }
  }
  else {
    res.status(404).json({ message: `Produto não encontrado.` });
  }
});

apiRouterV1.post('/produtos', function(req, res, next) {
  let produto = req.body
  let newId = Math.max(...produtos.map(o => o.id)) + 1
  produto.id = newId
  produtos.push(produto)
  res.status(201).json({ message: `Produto inserido com sucesso`, data: {id: newId}})
});

apiRouterV1.delete('/produtos/:id', function(req, res, next) {
  let id = req.params.id;
  if (id) {
    idInt = Number.parseInt(id)
    let idx = produtos.findIndex(o => o.id === idInt);
    if (idx > -1) {
      produtos.splice(idx, 1)
      res.status(200).json({message: `Produto excluído com sucesso`})
    } else {
      res.status(404).json({ message: `Produto não encontrado.` });
    }
  }
  else {
    res.status(404).json({ message: `Produto não encontrado.` });
  }
});

apiRouterV1.put('/produtos/:id', function(req, res, next) {
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

module.exports = apiRouterV1;
