import Fastify from 'fastify' 
import cors from '@fastify/cors'
import helmet from '@fastify/helmet'

const PORT = parseInt(process.env.PORT ?? '3000');

const fastify = Fastify({
    logger: true
})

fastify.register(cors, {
    origin: true,
    credentials: true,
})

fastify.register(helmet, {
    contentSecurityPolicy: false,
})

// Declaração de uma rota 
fastify.get('/', async (request, reply) => {
    return {
        message: 'E-commerce SyntaxWear API',
        version: '1.0.0',
        status: 'running',
    }
})

fastify.get('/health', async (request, reply) => {
    return {
        status: 'ok',
        timestamp: new Date().toISOString(),
    }
})

// Inicialização do servidor 
fastify.listen({ port: PORT }, function (err, address) {
    if (err) {
        fastify.log.error(err)
        process.exit(1)
    }
})

export default fastify;

