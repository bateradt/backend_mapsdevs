const Dev = require("../models/Dev");
const parseStringAsArray = require("../utils/parseStringAsArray");

module.exports = {
  async index(request, response) {
    const { latitude, longitude, techs } = request.query;

    const techArray = parseStringAsArray(techs);
    //buscar todos os devs num raio de 10km
    //filtrar por tecnologia
    //console.log(techArray);

    const devs = await Dev.find({
      techs: {
        $in: techArray
      },
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [longitude, latitude]
          },
          $maxDistance: 10000
        }
      }
    });

    return response.json({ devs });
  }
};
