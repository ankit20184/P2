import { workflow } from "../graph/index.js";

class AIService {
  async query(question: string) {
    return workflow.invoke({
      question,
    });
  }
}

export const aiService = new AIService();
