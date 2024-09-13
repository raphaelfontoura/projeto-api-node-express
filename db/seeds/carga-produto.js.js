/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('produtos').del()
  await knex('produtos').insert([
    {id: 1, descricao: "Calça Legging", marca: "Nike", preco: 49.99},
    {id: 2, descricao: "Camisa manga longa", marca: "Levi's", preco: 89.99},
    {id: 3, descricao: "Tênis", marca: "Adidas", preco: 99.99},
    {id: 4, descricao: "Blusa de Moleton", marca: "Puma", preco: 59.99},
    {id: 5, descricao: "Short", marca: "Mizuno", preco: 39.99},
    {id: 6, descricao: "Jaqueta", marca: "The North Face", preco: 149.99}
  ]);
};
