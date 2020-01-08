const db = require('../db')


function find(){
    return db('schemes')

}

function findById(id){
    return db('schemes').where({ id }).first()
}

function findSteps(){
    return db('steps').join('schemes', 'steps.scheme_id', 'schemes.id').orderBy('steps.id').select("steps.id", "schemes.scheme_name", "steps.instructions")
}

function add(payload){
    return db('schemes').insert(payload)
}

function update(payload, id){
    return db('schemes').where("id", id).update(payload)
}

function remove(id){
    return db('schemes').where("id", id).del()
}


module.exports = {
    find,
    findById,
    findSteps,
    add,
    update,
    remove
}





