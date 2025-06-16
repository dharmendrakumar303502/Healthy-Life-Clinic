
"use client";

import { PageHeader } from '@/components/shared/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';

const teamMembers = [
  {
    name: 'Dr. Alisha Sharma',
    specialty: 'General Medicine (MD)',
    bio: 'Dr. Sharma is a compassionate general physician with over 10 years of experience in diagnosing and treating a wide range of adult health issues. She believes in a holistic approach to patient care.',
    imageHint: 'female doctor portrait',
  },
  {
    name: 'Dr. Rohan Verma',
    specialty: 'Pediatrics (MBBS, DCH)',
    bio: 'Dr. Verma is dedicated to providing the best care for children from infancy through adolescence. He has a keen interest in child development and immunizations.',
    imageHint: 'male doctor portrait',
  },
  {
    name: 'Dr. Priya Patel',
    specialty: 'Cardiology (DM Cardiology)',
    bio: 'Dr. Patel is a skilled cardiologist focused on preventive heart care and managing complex cardiovascular diseases. She is known for her patient-centric approach and clear communication.',
    imageHint: 'female doctor professional',
  },
];

export default function AboutUsPage() {
  return (
    <>
      <PageHeader
        title="About Us"
        description="Learn more about Healthy Life Clinic, our mission, and our dedicated team."
      />
      <div className="space-y-8">
        <Card className="glass-card">
          <CardContent className="pt-6">
            <p className="text-lg leading-relaxed">
              Welcome to Healthy Life Clinic, where your health and well-being are our utmost priority. 
              Our mission is to provide accessible, comprehensive, and compassionate healthcare to every member of our community. 
              We believe in a holistic approach to medicine, focusing not just on treating illness but also on promoting a healthier lifestyle through preventive care and patient education towards a "Better Health, Better Life."
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Our Mission & Vision</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-primary">Our Mission</h3>
              <p className="text-muted-foreground">
                To empower individuals to achieve their optimal health by delivering personalized, evidence-based medical care in a supportive and respectful environment. We strive to be your trusted partner in your journey towards a "Better Health, Better Life."
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-primary">Our Vision</h3>
              <p className="text-muted-foreground">
                To be a leading healthcare provider recognized for clinical excellence, innovation in patient care, and a commitment to community health. We aim to create a healthier tomorrow by fostering a culture of wellness and continuous improvement.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Meet Our Dedicated Team</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teamMembers.map((member, i) => (
              <Card key={i} className="text-center flex flex-col">
                <CardHeader className="flex-grow">
                  <div className="mx-auto w-32 h-32 relative mb-4">
                    <Image
                      src={`https://placehold.co/200x200.png`}
                      alt={member.name}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-full shadow-md"
                      data-ai-hint={member.imageHint}
                    />
                  </div>
                  <CardTitle className="text-xl font-headline">{member.name}</CardTitle>
                  <p className="text-sm text-primary">{member.specialty}</p>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-xs text-muted-foreground">
                    {member.bio}
                  </p>
                </CardContent>
              </Card>
            ))}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
