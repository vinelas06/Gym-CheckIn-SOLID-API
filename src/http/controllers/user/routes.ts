import type { FastifyInstance } from "fastify";
import { registerUserController } from "./register.controller.js";
import { authenticateUserController } from "./authenticate.controller.js";
import { getUserProfileController } from "./profile.controller.js";
import { verifyJWT } from "@/http/middlewares/verify-jwt.js";
import { refreshTokenController } from "./refresh.controller.js";

export async function userRoutes(app: FastifyInstance) {
  app.post("/user", registerUserController);
  app.post("/session", authenticateUserController);

  app.patch('/token/refresh', refreshTokenController)
  
  //Authenticated
  app.get("/me", {onRequest: [verifyJWT]}, getUserProfileController)
}
