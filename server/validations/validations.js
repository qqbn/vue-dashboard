const Joi = require('joi');

exports.validateTask = async (data) => {
    const schema = Joi.object({
        content: Joi.string().min(1).required(),
    })

    return schema.validate(data);
}