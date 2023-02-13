import dbConnect from "../../../lib/dbConnect";
import Review from "../../../models/review";
import Joi from 'joi';

async function handler(req, res) {
  const { method, body } = req;
  await dbConnect();

  switch (method) {
    case "POST":
      try {
        const { error } = joiVerPost(body);
        if(error) return res.status(400).send(error.details[0].message);

        let review = await Review.create(body);
        if(!review) return res.status(401).send("Reviews nu a putut sa fie adaugat");

        return res.status(200).send("Review a fost adaugat");
      } catch (error) {
        return res.status(400).send("Reviews nu a putut sa fie adaugat");
      }
    default:
      break;
  }

}

function joiVerPost(data) {
  const schema = Joi.object({ 
    productID: Joi.string().trim().min(2).max(555).required(),
    name: Joi.string().trim().min(2).max(555).required(),
    date: Joi.string().trim().min(2).max(255).required(),
    review: Joi.string().trim().min(2).max(955).required(),
    stars: Joi.number().integer().min(0).required()
  });

  return schema.validate(data);
}

export default handler;