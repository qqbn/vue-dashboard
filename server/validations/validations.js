const Joi = require('joi');

exports.validateTask = async (data) => {
    const schema = Joi.object({
        content: Joi.string().min(1).required(),
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