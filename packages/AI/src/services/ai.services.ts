import { workflow } from "../graph";

class AIService {

 async query(question:string){

   return workflow.invoke({
     question
   });

 }

}


export const aiService = new AIService();