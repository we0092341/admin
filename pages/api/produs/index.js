import dbConnect from "../../../lib/dbConnect";
import Product from "../../../models/product";
import { v4 as uuidv4 } from 'uuid';
import Joi from 'joi';

async function handler(req, res) {
  const { method, body } = req;
  await dbConnect();

  switch (method) {
    case "PATCH":
      try {
        let productId = await Product.findOne({ name: body.data });
        if(!productId) return res.status(401).send("Produsul nu a fost gasit");

        return res.status(200).send(productId._id);
      } catch (error) {
        console.log(error)
        return res.status(400).send("Produsul nu a putut sa fie gasit");
      }
    case "POST":
      try {
        const { error } = joiVer(body);
        if(error) return res.status(400).send(error.details[0].message);

        let product = new Product({
          ...body,
          sku: uuidv4(),
          slug: ""
        });
        product.slug = product._id;
        await product.save();

        if(!product) return res.status(401).send("Produsul nu a putut sa fie adaugat");

        return res.status(200).send("Produsul a fost adaugat");
      } catch (error) {
        console.log(error)
        return res.status(400).send("Produsul nu a putut sa fie adaugat");
      }
    default:
      break;
  }

}

function joiVer(data) {
  const schema = Joi.object({ 
    name: Joi.string().trim().min(2).max(555).required(),
    shortDescription: Joi.string().trim().min(2).max(555).required(),
    fullDescription: Joi.string().trim().min(2).required(),
    price: Joi.number().integer().min(0).required(),
    priceGBP: Joi.number().integer().min(0).required(),
    discount: Joi.number().integer().min(0).required(),
    rating: Joi.number().integer().min(0).required(),
    ratingCount: Joi.number().integer().min(0).required(),
    saleCount: Joi.number().integer().min(0).required(),
    featured: Joi.boolean(),
    new: Joi.boolean(),
    category: Joi.array(),
    tag: Joi.array(),
    thumbImage: Joi.array(),
    image: Joi.array(),
    additional: Joi.array()
  });

  return schema.validate(data);
}

export default handler;