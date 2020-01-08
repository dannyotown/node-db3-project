const db = require("../db-config");

function find() {
  return db("schemes");
}

function findBy(id) {
  return db("schemes").where({ id });
}

function findSteps(id) {
  return db("schemes").select(
    "*"
    ).innerJoin("steps as s", 'schemes.id','s.id')

    //"schemes.id, schemes.scheme_name, schemes.step_number, steps.instructions"
}

function add(scheme) {
    return db('schemes').insert(scheme)
}

function remove(id) {
    return db('schemes').where({id}).del();
}
async function addStep(stepData, id){
    await db('steps').insert(stepData)
    return db('steps')
}
async function update(id, scheme) {
    await db('schemes').where({id}).update(scheme)
    return db('schemes').select('*').where({id})
}

module.exports = {
  find,
  findBy,
  findSteps,
  addStep,
  add,
  update,
  remove
};
