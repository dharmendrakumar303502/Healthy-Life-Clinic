
"use server";

import { aiSymptomAnalysis, type AISymptomAnalysisOutput, type AISymptomAnalysisInput } from '@/ai/flows/ai-symptom-analysis';

interface ActionResult {
  data?: AISymptomAnalysisOutput;
  error?: string;
}

export async function analyzeSymptomsAction(symptoms: string): Promise<ActionResult> {
  if (!symptoms || symptoms.trim().length < 10) {
    return { error: 'Please provide a more detailed description of your symptoms (at least 10 characters).' };
  }
  if (symptoms.trim().length > 2000) {
    return { error: 'Symptom description cannot exceed 2000 characters.' };
  }

  const input: AISymptomAnalysisInput = { symptoms };

  try {
    const result = await aiSymptomAnalysis(input);
    return { data: result };
  } catch (e) {
    console.error("Symptom analysis failed:", e);
    if (e instanceof Error) {
      return { error: e.message };
    }
    return { error: 'An unexpected error occurred during symptom analysis.' };
  }
}
