// This file is machine-generated - edit at your own risk.

'use server';

/**
 * @fileOverview Provides a Genkit flow for AI-powered symptom analysis.
 *
 * - aiSymptomAnalysis - A function that takes user-reported symptoms and returns a preliminary health assessment.
 * - AISymptomAnalysisInput - The input type for the aiSymptomAnalysis function.
 * - AISymptomAnalysisOutput - The return type for the aiSymptomAnalysis function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AISymptomAnalysisInputSchema = z.object({
  symptoms: z
    .string()
    .describe(
      'A detailed description of the symptoms experienced by the user.'
    ),
});
export type AISymptomAnalysisInput = z.infer<typeof AISymptomAnalysisInputSchema>;

const AISymptomAnalysisOutputSchema = z.object({
  assessment: z
    .string()
    .describe(
      'A preliminary assessment of potential health conditions based on the provided symptoms.'
    ),
  recommendation: z
    .string()
    .describe(
      'A recommendation on whether the user should seek medical attention.'
    ),
});
export type AISymptomAnalysisOutput = z.infer<typeof AISymptomAnalysisOutputSchema>;

export async function aiSymptomAnalysis(
  input: AISymptomAnalysisInput
): Promise<AISymptomAnalysisOutput> {
  return aiSymptomAnalysisFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiSymptomAnalysisPrompt',
  input: {schema: AISymptomAnalysisInputSchema},
  output: {schema: AISymptomAnalysisOutputSchema},
  prompt: `You are an AI health assistant. Analyze the following symptoms and provide a preliminary assessment of potential health conditions, along with a recommendation on whether the user should see a doctor.\n\nSymptoms: {{{symptoms}}}`,
});

const aiSymptomAnalysisFlow = ai.defineFlow(
  {
    name: 'aiSymptomAnalysisFlow',
    inputSchema: AISymptomAnalysisInputSchema,
    outputSchema: AISymptomAnalysisOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
