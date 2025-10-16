import { rateLimit } from "express-rate-limit";

export const limiter = rateLimit({
  //TODO: SE LE PUSO UN LIMITE X HORA
  windowMs: 60 * 1000,
  limit: process.env.NODE_ENV === "production" ? 25 : 150, //SI ES AMBIENTE PRODUCCION AGREGA 25, SINO AGREGA 150.
  message: {
    error: "Has alcanzado el limite de peticiones, espera un momento.",
  },
});
