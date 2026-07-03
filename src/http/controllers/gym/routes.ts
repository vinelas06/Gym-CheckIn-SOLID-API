import { verifyJWT } from "@/http/middlewares/verify-jwt.js";
import type { FastifyInstance } from "fastify";
import { searchGymController } from "./search-gym.controller.js";
import { searchNearbyGymController } from "./nearby-gym.controller.js";
import { createGymController } from "./create.controller.js";
import { verifyUserRole } from "@/http/middlewares/verify-user-role.js";

export async function gymRoutes(app: FastifyInstance) {
    app.addHook('onRequest', verifyJWT)

    app.get('/gyms/search', searchGymController)
    app.get('/gyms/nearby', searchNearbyGymController)

    app.post('/gym', { onRequest: [verifyUserRole('ADMIN')] }, createGymController)
}