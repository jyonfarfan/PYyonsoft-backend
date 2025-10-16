import jwt from "jsonwebtoken";

export const generateJWT = (id: string): string => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "10H",
    algorithm: "HS384",
  });
  return token;
};
