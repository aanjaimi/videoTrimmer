import { FastifyPluginCallback } from "fastify";

export const healthRouter: FastifyPluginCallback = (fastify, _, done) => {
  fastify.get('/', (req, res) => {
    res.send('Server is up and running!');
  })
  
  done();
};
