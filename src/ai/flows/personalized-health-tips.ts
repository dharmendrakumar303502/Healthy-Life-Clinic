'use server';

/**
 * @fileOverview Provides personalized daily health tips based on user profile and health data.
 *
 * - getPersonalizedHealthTips - A function that generates personalized health tips.
 * - PersonalizedHealthTipsInput - The input type for the getPersonalizedHealthTips function.
 * - PersonalizedHealthTipsOutput - The return type for the getPersonalizedHealthTips function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedHealthTipsInputSchema = z.object({
  profile: z
    .string()
    .describe('The user profile including age, gender, and fitness level.'),
  healthData: z
    .string()
    .describe(
      'The user health data including historical activity, sleep patterns, and dietary preferences.'
    ),
});
export type PersonalizedHealthTipsInput = z.infer<
  typeof PersonalizedHealthTipsInputSchema
>;

const PersonalizedHealthTipsOutputSchema = z.object({
  tip: z.string().describe('A personalized health tip for the user.'),
});
export type PersonalizedHealthTipsOutput = z.infer<
  typeof PersonalizedHealthTipsOutputSchema
>;

export async function getPersonalizedHealthTips(
  input: PersonalizedHealthTipsInput
): Promise<PersonalizedHealthTipsOutput> {
  return personalizedHealthTipsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedHealthTipsPrompt',
  input: {schema: PersonalizedHealthTipsInputSchema},
  output: {schema: PersonalizedHealthTipsOutputSchema},
  prompt: `You are a personalized health and wellness advisor.

  Based on the user's profile and health data, provide a single, actionable health tip.

  Profile: {{{profile}}}
  Health Data: {{{healthData}}}

  Tip: `,
});

const personalizedHealthTipsFlow = ai.defineFlow(
  {
    name: 'personalizedHealthTipsFlow',
    inputSchema: PersonalizedHealthTipsInputSchema,
    outputSchema: PersonalizedHealthTipsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
