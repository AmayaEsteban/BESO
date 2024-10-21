import { mongooseConnect } from "@/lib/mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import { WishedProduct } from "@/models/WishedProduct";

export default async function handle(req, res) {
  try {
    // Conectar a la base de datos
    await mongooseConnect();

    // Obtener la sesión del usuario
    const session = await getServerSession(req, res, authOptions);
    if (!session || !session.user) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    const { user } = session;

    // Manejar solicitudes POST
    if (req.method === "POST") {
      const { product } = req.body;

      if (!product) {
        return res.status(400).json({ error: "Product ID is required" });
      }

      const wishedDoc = await WishedProduct.findOne({
        userEmail: user.email,
        product,
      });

      if (wishedDoc) {
        // Si el producto ya está en la lista de deseos, lo eliminamos
        await WishedProduct.findByIdAndDelete(wishedDoc._id);
        return res.json({ message: "Product removed from wishlist" });
      } else {
        // Si no está en la lista, lo agregamos
        await WishedProduct.create({ userEmail: user.email, product });
        return res.json({ message: "Product added to wishlist" });
      }
    }

    // Manejar solicitudes GET
    if (req.method === "GET") {
      const wishlist = await WishedProduct.find({
        userEmail: user.email,
      }).populate("product");
      return res.json(wishlist);
    }

    // Si el método no es GET ni POST
    res.status(405).json({ error: "Method not allowed" });
  } catch (error) {
    console.error("Error in wishlist API:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
