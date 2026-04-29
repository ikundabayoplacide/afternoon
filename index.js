
import express from "express";
import cors from "cors";
import sequelize from "./src/config/db.js";
import userRoutes from "./src/routes/users.js";
import authRoutes from "./src/routes/auth.js";
import { swaggerDocs } from "./src/doc/swagger.js";
const app=express();
const PORT=process.env.PORT||8000;

app.use(cors({ origin: ["http://localhost:5173","https://afternoonmember.vercel.app/"] }));
app.use(express.json())
app.use("/api",userRoutes);
app.use("/api",authRoutes);
swaggerDocs(app);
sequelize.authenticate().then(()=>sequelize.sync())
.then(()=>{
    app.listen(PORT,()=>{
        console.log("Database connect successfully 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥" );
        console.log(`Our server is running on http://localhost:${PORT} `);
        console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
    });
})
.catch((err)=>{
    console.log("Server failed to start",err)
    process.exit(1);
}
);

