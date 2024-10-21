import { mongooseConnect } from "@/lib/mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import { Address } from "@/models/Address";

export default async function handle(req, res) {
  await mongooseConnect();
  const { user } = await getServerSession(req, res, authOptions);
  if (req.method === "PUT") {
    const userEmail = user?.email;

    if (!userEmail) {
      return res
        .status(400)
        .json({ error: "El correo del usuario no está disponible" });
    }

    // Busca la dirección existente
    const address = await Address.findOne({ userEmail });

    if (address) {
      // Actualiza la dirección existente
      res.json(
        await Address.findByIdAndUpdate(address._id, req.body, { new: true })
      );
    } else {
      // Crea una nueva dirección
      res.json(await Address.create({ userEmail, ...req.body }));
    }
  }

  if (req.method === "GET") {
    const userEmail = user?.email;

    if (!userEmail) {
      return res
        .status(400)
        .json({ error: "El correo del usuario no está disponible" });
    }

    // Busca la dirección del usuario
    const address = await Address.findOne({ userEmail });
    res.json(address);
  }
}
