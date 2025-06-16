
"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { PageHeader } from '@/components/shared/page-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Loader2, AlertTriangle, CheckCircle2 } from 'lucide-react';
import type { AISymptomAnalysisOutput } from '@/ai/flows/ai-symptom-analysis';
import { analyzeSymptomsAction } from './actions';
import { useToast } from '@/hooks/use-toast';


const symptomSchema = z.object({
  symptoms: z.string().min(10, { message: 'Please describe your symptoms in at least 10 characters.' }).max(2000, { message: 'Symptom description cannot exceed 2000 characters.' }),
});

type SymptomFormData = z.infer<typeof symptomSchema>;

export default function SymptomAnalyzerPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AISymptomAnalysisOutput | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const form = useForm<SymptomFormData>({
    resolver: zodResolver(symptomSchema),
    defaultValues: {
      symptoms: '',
    },
  });

  async function onSubmit(data: SymptomFormData) {
    setIsLoading(true);
    setAnalysisResult(null);
    setError(null);

    try {
      const result = await analyzeSymptomsAction(data.symptoms);
      if (result.error) {
        setError(result.error);
        toast({
          title: "Analysis Error",
          description: result.error,
          variant: "destructive",
        });
      } else if (result.data) {
        setAnalysisResult(result.data);
         toast({
          title: "Analysis Complete",
          description: "Your symptom analysis is ready.",
        });
      }
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : 'An unexpected error occurred.';
      setError(errorMessage);
      toast({
        title: "Analysis Failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <PageHeader
        title="AI Symptom Analyzer"
        description="Describe your symptoms, and our AI will provide a preliminary analysis. This is not a substitute for professional medical advice."
      />

      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="font-headline">Symptom Input</CardTitle>
          <CardDescription>
            Please provide a detailed description of your symptoms.
            Include when they started, their severity, and any other relevant information.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="symptoms"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Symptoms</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., I have a persistent cough, mild fever, and headache for the past 3 days..."
                        className="min-h-[150px] resize-y"
                        {...field}
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading} className="w-full sm:w-auto">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  'Analyze Symptoms'
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {error && (
        <Card className="mt-6 border-destructive bg-destructive/10">
          <CardHeader className="flex flex-row items-center gap-2">
            <AlertTriangle className="h-6 w-6 text-destructive" />
            <CardTitle className="font-headline text-destructive">Analysis Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-destructive">{error}</p>
          </CardContent>
        </Card>
      )}

      {analysisResult && (
        <div className="mt-8 space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center gap-2">
               <CheckCircle2 className="h-6 w-6 text-primary" />
              <CardTitle className="font-headline">Preliminary Assessment</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-foreground">{analysisResult.assessment}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center gap-2">
              <AlertTriangle className="h-6 w-6 text-amber-500" />
              <CardTitle className="font-headline">Recommendation</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-foreground">{analysisResult.recommendation}</p>
              <p className="mt-4 text-sm text-muted-foreground">
                <strong>Disclaimer:</strong> This AI-powered analysis is for informational purposes only and does not constitute medical advice. Always consult with a qualified healthcare professional for diagnosis and treatment.
              </p>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
}
