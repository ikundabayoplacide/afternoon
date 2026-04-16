
import express from "express";
import sequelize from "./src/config/db.js";
import userRoutes from "./src/routes/users.js";
import authRoutes from "./src/routes/auth.js";
const app=express();
const PORT=process.env.PORT||8000;

app.use(express.json())
app.use("/api",userRoutes);
app.use("/api",authRoutes);
sequelize.authenticate().then(()=>sequelize.sync())
.then(()=>{
    app.listen(PORT,()=>{
        console.log("Database connect successfully 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥" );
        console.log(`Our server is running on http://localhost:${PORT} `);
    });
})
.catch((err)=>{
    console.log("Server failed to start",err)
    process.exit(1);
}
);

