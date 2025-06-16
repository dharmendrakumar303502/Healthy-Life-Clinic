
"use client";

import { useState } from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, Sparkles, AlertTriangle, UserCircle, Activity } from 'lucide-react';
import type { PersonalizedHealthTipsOutput } from '@/ai/flows/personalized-health-tips';
import { getHealthTipAction } from './actions';
import { useToast } from '@/hooks/use-toast';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export default function HealthTipsPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [healthTip, setHealthTip] = useState<PersonalizedHealthTipsOutput | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  // Mock user profile and health data for demonstration
  const [userProfile, setUserProfile] = useState("Age: 30, Gender: Male, Fitness Level: Intermediate");
  const [userHealthData, setUserHealthData] = useState("Activity: Runs 3 times a week, average 5km. Sleep: 7 hours/night. Diet: Generally healthy, enjoys fruits and vegetables, occasional processed foods.");

  async function fetchHealthTip() {
    setIsLoading(true);
    setHealthTip(null);
    setError(null);

    if(!userProfile.trim() || !userHealthData.trim()){
      setError("Please provide user profile and health data.");
      setIsLoading(false);
      toast({
        title: "Missing Information",
        description: "User profile and health data are required for personalized tips.",
        variant: "destructive",
      });
      return;
    }

    try {
      const result = await getHealthTipAction({ profile: userProfile, healthData: userHealthData });
      if (result.error) {
        setError(result.error);
        toast({
          title: "Tip Generation Error",
          description: result.error,
          variant: "destructive",
        });
      } else if (result.data) {
        setHealthTip(result.data);
         toast({
          title: "New Health Tip!",
          description: "A personalized health tip has been generated for you.",
        });
      }
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : 'An unexpected error occurred.';
      setError(errorMessage);
       toast({
        title: "Tip Generation Failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }
  
  // Fetch initial tip on load
  useState(() => {
    fetchHealthTip();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <>
      <PageHeader
        title="Personalized Health Tips"
        description="Get daily AI-powered health and wellness advice tailored to you."
        actions={
          <Button onClick={fetchHealthTip} disabled={isLoading}>
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Sparkles className="mr-2 h-4 w-4" />
            )}
            Get New Tip
          </Button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1 glass-card">
          <CardHeader>
            <CardTitle className="font-headline flex items-center gap-2"><UserCircle /> Your Profile</CardTitle>
            <CardDescription>This data helps in personalizing your tips. (Editable for demo)</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="userProfile">Profile Summary</Label>
              <Textarea id="userProfile" value={userProfile} onChange={(e) => setUserProfile(e.target.value)} placeholder="e.g., Age: 30, Gender: Male, Fitness Level: Intermediate" className="min-h-[80px]" />
            </div>
            <div>
              <Label htmlFor="userHealthData">Health Data</Label>
              <Textarea id="userHealthData" value={userHealthData} onChange={(e) => setUserHealthData(e.target.value)} placeholder="e.g., Activity: Runs 3 times/week. Sleep: 7 hours. Diet: Balanced." className="min-h-[100px]" />
            </div>
          </CardContent>
        </Card>

        <div className="md:col-span-2">
          {error && (
            <Card className="border-destructive bg-destructive/10">
              <CardHeader className="flex flex-row items-center gap-2">
                 <AlertTriangle className="h-6 w-6 text-destructive" />
                <CardTitle className="font-headline text-destructive">Error Generating Tip</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-destructive">{error}</p>
              </CardContent>
            </Card>
          )}

          {isLoading && !healthTip && !error && (
             <Card className="min-h-[200px] flex flex-col items-center justify-center text-muted-foreground">
                <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
                <p className="font-semibold">Generating your personalized tip...</p>
             </Card>
          )}

          {healthTip && (
            <Card className="bg-gradient-to-br from-primary/20 to-accent/20 border-primary/50 shadow-xl">
              <CardHeader>
                <CardTitle className="font-headline text-2xl flex items-center gap-2">
                  <Sparkles className="h-7 w-7 text-amber-400" /> Today's Personalized Tip
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg leading-relaxed text-foreground">
                  {healthTip.tip}
                </p>
              </CardContent>
              <CardFooter>
                 <p className="text-xs text-muted-foreground">Tips are AI-generated and for informational purposes. Consult a professional for medical advice.</p>
              </CardFooter>
            </Card>
          )}

          {!isLoading && !healthTip && !error && (
            <Card className="min-h-[200px] flex flex-col items-center justify-center text-muted-foreground">
               <Activity className="h-12 w-12 text-primary mb-4" />
               <p className="font-semibold">Click "Get New Tip" to receive personalized advice.</p>
            </Card>
          )}
        </div>
      </div>
    </>
  );
}
