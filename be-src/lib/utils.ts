import * as crypto from "crypto";
import * as jwt from "jsonwebtoken";
const SECRET = "sofa-secreto-2";

export const getSHA256 = (text: string) => {
  return crypto.createHash("sha256").update(text).digest("hex");
};

export const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  try {
    const data = jwt.verify(token, SECRET);
    req._user = data;
    next();
  } catch {}
};

export { SECRET };

export const bodyToItem = (petId, body) => {
  const respuesta: any = {};
  if (body.name) {
    respuesta.name = body.nombre;
  }
  if (body.image) {
    respuesta.image = body.image;
  }
  if (body.lastGeo_lat && body.lastGeo_lon) {
    respuesta._geoloc = { lat: body.lastGeo_lat, lng: body.lastGeo_lon };
  }
  if (body.founded) {
    respuesta.founded = body.founded;
  }
  if (petId) {
    respuesta.objectID = petId;
  }

  return respuesta;
};
