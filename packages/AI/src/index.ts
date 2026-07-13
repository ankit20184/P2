import express from "express";
import aiRoutes from "./routes/ai.routes";


const app = express();


app.use(express.json());


app.use(
 "/api/ai",
 aiRoutes
);
export {
    aiService
   } from "./services/ai.services";
   
   
   export {
    workflow
   } from "./graph";

app.listen(3001,()=>{

 console.log(
 "API running on 3001"
 );

});