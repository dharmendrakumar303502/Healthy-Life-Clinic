
"use client";

import { PageHeader } from '@/components/shared/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Stethoscope, ShieldCheck, HeartPulse, Users, CheckCircle, Microscope, Smile, Bike, Baby, Layers, UtensilsCrossed, Brain } from 'lucide-react';

const medicalServices = [
  { name: 'General Checkups', description: 'Routine physical examinations, health screenings, and preventive care for all ages.', icon: Stethoscope },
  { name: 'Dentistry', description: 'Comprehensive dental care including checkups, cleanings, fillings, and cosmetic procedures.', icon: Smile },
  { name: 'Physiotherapy', description: 'Personalized rehabilitation programs to restore movement, function, and manage pain.', icon: Bike },
  { name: 'Cardiology', description: 'Specialized care for heart conditions, including diagnostics, treatment, and prevention.', icon: HeartPulse },
  { name: 'Pediatrics', description: 'Dedicated healthcare for infants, children, and adolescents, from wellness visits to illness care.', icon: Baby },
  { name: 'Dermatology', description: 'Diagnosis and treatment of skin, hair, and nail conditions, including cosmetic dermatology.', icon: Layers },
  { name: 'Vaccinations & Immunizations', description: 'Comprehensive vaccination services for children and adults to protect against preventable diseases.', icon: ShieldCheck },
  { name: 'Chronic Disease Management', description: 'Personalized care plans for managing conditions like diabetes, hypertension, and asthma.', icon: Users },
  { name: 'Minor Surgical Procedures', description: 'In-clinic treatments for minor injuries, biopsies, mole removal, and other small surgical needs.', icon: CheckCircle },
  { name: 'Diagnostic Lab Services', description: 'On-site and partnered lab services for quick and accurate diagnostic testing.', icon: Microscope },
  { name: 'Nutritional Counseling', description: 'Expert advice on diet and nutrition tailored to your health goals and medical conditions.', icon: UtensilsCrossed },
  { name: 'Mental Health Support', description: 'Counseling and support services for managing stress, anxiety, depression, and other mental well-being concerns.', icon: Brain },
];

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        title="Our Medical Services"
        description="Discover the wide range of healthcare services we offer at Healthy Life Clinic."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {medicalServices.map((service) => (
          <Card key={service.name} className="flex flex-col hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <service.icon className="h-8 w-8 text-primary flex-shrink-0" />
                <CardTitle className="font-headline text-xl">{service.name}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-muted-foreground text-sm">{service.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <Card className="mt-8 glass-card">
        <CardHeader>
          <CardTitle className="font-headline">Why Choose Healthy Life Clinic?</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>Patient-centered approach focusing on your individual needs and well-being.</li>
            <li>Team of experienced, compassionate, and highly qualified medical professionals.</li>
            <li>Modern facility equipped with state-of-the-art medical technology.</li>
            <li>Strong commitment to preventive care, health education, and promoting a healthier lifestyle.</li>
            <li>Convenient location with ample parking and flexible appointment scheduling.</li>
            <li>Comprehensive care for the entire family, from pediatrics to geriatric support.</li>
          </ul>
        </CardContent>
      </Card>
    </>
  );
}
