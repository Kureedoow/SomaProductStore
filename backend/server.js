import express from 'express'
import connectDB from './config/database.js';
import product from './modals/product.modal.js';
import ProductRoutes from './routes/prouduct.route.js'
import path from 'path'
import dotenv from 'dotenv';
dotenv.config();
const app =  express()
app.use(express.json())
const PORT=process.env.PORT || 5000
// console.log(process.env.MONGODB_URI);
app.use('/api/products',ProductRoutes)
//here is for getting ready for deployment

const __dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "frontend/dist")));

  app.get(/.*/, (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "frontend", "dist", "index.html")
    );
  });
}

app.listen(PORT,(req,res)=>{
    connectDB();
    console.log(`Server is running on http://localhost:${PORT}`)
})