const axios = require("axios");
const Dev = require("../models/Dev");
const parseStringAsArray = require("../utils/parseStringAsArray");
const { findConnections, sendMessage } = require("../websocket");
//metodos index, show, sotre, update, destroy

module.exports = {
  async index(request, response) {
    const devs = await Dev.find();

    return response.json(devs);
  },

  async store(request, response) {
    console.log(request.body);
    console.log(request.body.github_username);
    console.log(request.body.techs);
    console.log(request.body.latitude);
    console.log(request.body.longitude);
    const { github_username, techs, latitude, longitude } = request.body;

    let dev = await Dev.findOne({ github_username });

    if (!dev) {
      console.log(1);
      //consumir a API do github
      const apigit = await axios.get(
        `https://api.github.com/users/${github_username}`
      );

      console.log(apigit.data)

      const { name = login, avatar_url, bio } = apigit.data;
  
      console.log('Dados git: ' + name, avatar_url, bio, techs);

      const techarray = parseStringAsArray(techs);

      const location = {
        type: "Point",
        coordinates: [longitude, latitude]
      };

      console.log('location: ' + location);

      dev = await Dev.create({
        name,
        github_username,
        bio,
        avatar_url,
        techs: techarray,
        location,
      });
      //filtrar conexões do websocket
      const sendSocketMessageTo = findConnections(
        { latitude, longitude },
        techarray
      );

      sendMessage(sendSocketMessageTo, "new-dev", dev);
    }

    return response.json(dev);
  }
};
