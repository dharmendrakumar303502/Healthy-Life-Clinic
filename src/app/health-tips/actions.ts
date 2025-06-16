
"use server";

import { getPersonalizedHealthTips, type PersonalizedHealthTipsOutput, type PersonalizedHealthTipsInput } from '@/ai/flows/personalized-health-tips';

interface ActionResult {
  data?: PersonalizedHealthTipsOutput;
  error?: string;
}

export async function getHealthTipAction(input: PersonalizedHealthTipsInput): Promise<ActionResult> {
  if (!input.profile || input.profile.trim().length === 0) {
    return { error: 'User profile information is required for personalized tips.' };
  }
  if (!input.healthData || input.healthData.trim().length === 0) {
    return { error: 'User health data is required for personalized tips.' };
  }
  
  try {
    const result = await getPersonalizedHealthTips(input);
    return { data: result };
  } catch (e) {
    console.error("Personalized health tip generation failed:", e);
    if (e instanceof Error) {
      return { error: e.message };
    }
    return { error: 'An unexpected error occurred while generating your health tip.' };
  }
}
