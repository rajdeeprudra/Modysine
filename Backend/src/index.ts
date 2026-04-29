import express from 'express';
import "dotenv/config";
import cookieParser from "cookie-parser";
import productRoutes from './routes/product.routes';
import userRoutes from './routes/user.routes';
import uploadRoutes from "./routes/upload.routes";
import orderRoutes from "./routes/order.routes";
const app = express();

app.use(cookieParser());
app.use(express.json());

const PORT = 4000;



const v1Router = express.Router();


//Routes
v1Router.use("/products", productRoutes);
v1Router.use("/user", userRoutes);
v1Router.use("/upload", uploadRoutes);
v1Router.use("/order", orderRoutes);



//versions
app.use("/api/v1", v1Router);


//Health Check

v1Router.get("/health", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Modysine Server is healthy and running 🚀",
    timestamp: new Date().toISOString(),
    uptime: Math.floor(process.uptime()) + " seconds"
  });
});

console.log('DB_PASSWORD type:', typeof process.env.DATABASE_URL);


app.listen(PORT, () => {
  console.log(`🚀 Modysine API V1 is live at: http://localhost:${PORT}/api/v1`);
});

