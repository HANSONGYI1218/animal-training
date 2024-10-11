// pages/api-docs.js
import swaggerDocs from "../../swagger";
import swaggerUi from "swagger-ui-express";

export default function handler(req, res) {
  if (req.method === "GET") {
    return swaggerUi.setup(swaggerDocs)(req, res);
  }
}
