
"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { ArrowRight, Stethoscope, Smile, Bike, HeartPulse, Baby, Layers } from 'lucide-react';

const services = [
  { name: 'General Checkups', description: 'Routine exams and preventive care for all ages.', icon: Stethoscope, href: '/services#general-checkups' },
  { name: 'Dentistry', description: 'Comprehensive dental care for a healthy smile.', icon: Smile, href: '/services#dentistry' },
  { name: 'Physiotherapy', description: 'Rehabilitation and physical therapy services.', icon: Bike, href: '/services#physiotherapy' },
  { name: 'Cardiology', description: 'Specialized heart care and diagnostics.', icon: HeartPulse, href: '/services#cardiology' },
  { name: 'Pediatrics', description: 'Healthcare for infants, children, and adolescents.', icon: Baby, href: '/services#pediatrics' },
  { name: 'Dermatology', description: 'Skin care, diagnosis, and treatments.', icon: Layers, href: '/services#dermatology' },
];

const testimonials = [
  { name: 'Bharti Kumari', quote: 'The doctors here are so caring and knowledgeable. I always feel listened to and well taken care of.', avatar: 'https://placehold.co/100x100.png', hint: 'patient face' },
  { name: 'Sunita', quote: 'Booking an appointment was incredibly easy, and the clinic is modern and clean. Highly recommend!', avatar: 'https://placehold.co/100x100.png', hint: 'patient face' },
  { name: 'Krishan K.', quote: 'Finally, a clinic that truly puts patients first. The AI health tips are a great bonus!', avatar: 'https://placehold.co/100x100.png', hint: 'patient face' },
];

export default function HomePage() {
  return (
    <div className="space-y-16 md:space-y-24">
      {/* Hero Section */}
      <section className="relative rounded-xl overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://placehold.co/1200x700.png"
            alt="Doctors at Healthy Life Clinic"
            layout="fill"
            objectFit="cover"
            className="opacity-30"
            data-ai-hint="clinic doctor team"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
        </div>
        <div className="relative container mx-auto px-4 py-24 md:py-32 text-center">
          <h1 className="font-headline text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground">
            Welcome to <span className="text-primary">Healthy Life Clinic</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Your trusted partner for comprehensive healthcare. Better Health, Better Life.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4">
            <Button asChild size="lg" className="w-full sm:w-auto">
              <Link href="/appointments">Book an Appointment</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
              <Link href="/services">Our Services <ArrowRight className="ml-2 h-5 w-5" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="font-headline text-3xl md:text-4xl font-semibold text-foreground">
            Compassionate Care, Modern Medicine
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">
            At Healthy Life Clinic, we combine cutting-edge medical technology with a patient-first approach. Our dedicated team of professionals is committed to providing you and your family with the highest quality healthcare in a warm and welcoming environment.
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-headline text-3xl md:text-4xl font-semibold text-foreground">
            Our Core Services
          </h2>
          <p className="mt-2 text-muted-foreground">
            Comprehensive healthcare solutions tailored to your needs.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service) => (
            <Card key={service.name} className="glass-card hover:shadow-2xl transition-shadow duration-300">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <service.icon className="h-10 w-10 text-primary flex-shrink-0" />
                  <CardTitle className="font-headline text-xl">{service.name}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription>{service.description}</CardDescription>
                <Button variant="link" asChild className="px-0 mt-2 text-primary">
                  <Link href={service.href}>Learn More <ArrowRight className="ml-1 h-4 w-4" /></Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Testimonials Section - Placeholder */}
      <section className="bg-muted/50 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-headline text-3xl md:text-4xl font-semibold text-foreground">
              What Our Patients Say
            </h2>
            <p className="mt-2 text-muted-foreground">
              Real stories from our valued patients.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="flex flex-col">
                <CardContent className="pt-6 flex-grow">
                  <p className="italic text-foreground">&ldquo;{testimonial.quote}&rdquo;</p>
                </CardContent>
                <CardFooter className="flex items-center gap-3 mt-4">
                  <Image src={testimonial.avatar} alt={testimonial.name} width={40} height={40} className="rounded-full" data-ai-hint={testimonial.hint} />
                  <div>
                    <p className="font-semibold text-foreground">{testimonial.name}</p>
                    <p className="text-xs text-muted-foreground">Valued Patient</p>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
          {/* Future: Implement a carousel/slider here */}
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <h2 className="font-headline text-3xl md:text-4xl font-semibold text-foreground">
          Ready to Prioritize Your Health?
        </h2>
        <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
          Schedule your appointment today and take the first step towards a healthier, happier life with Healthy Life Clinic.
        </p>
        <Button asChild size="lg" className="mt-8">
          <Link href="/appointments">Book Your Appointment Now</Link>
        </Button>
      </section>
    </div>
  );
}

