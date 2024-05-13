const Joi = require('joi');

exports.validateTask = async (data) => {
    const schema = Joi.object({
        content: Joi.string().min(1).required(),
    })

    return schema.validate(data);
}

exports.validateEditingTask = async (data) => {
    const schema = Joi.object({
        content: Joi.string().min(1).required(),
        done: Joi.boolean().required(),
    })

    return schema.validate(data);
}

exports.validateRemind = async (data) => {
    const schema = Joi.object({
        name: Joi.string().min(1),
        date: Joi.date().iso(),
    })

    return schema.validate(data);
}


exports.validateNote = async (data) => {
    const schema = Joi.object({
        title: Joi.string().min(1).required(),
        content: Joi.string(),
        important: Joi.boolean().required(),
    })

    return schema.validate(data);
}