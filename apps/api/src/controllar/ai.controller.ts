import { Request, Response } from "express";
import { workflow } from "@repo/ai";


export async function aiController(
  req: Request,
  res: Response
){

  try {

    const { question } = req.body;


    const result = await workflow.invoke({
      question
    });


    res.json( JSON.parse(
        JSON.stringify(result, (_, value) =>
          typeof value === "bigint"
            ? Number(value)
            : value
        )
      ));


  } catch(error){

    console.error(error);

    res.status(500).json({
      error:"AI workflow failed"
    });

  }

}