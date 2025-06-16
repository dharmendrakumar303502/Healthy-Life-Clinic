
"use client";

import { PageHeader } from '@/components/shared/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

export default function ContactUsPage() {
  // Placeholder for form submission
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Add form submission logic here (e.g., send to an API endpoint or Firebase)
    alert("Message sent (placeholder - not actually sent).");
  };

  return (
    <>
      <PageHeader
        title="Contact Us"
        description="Get in touch with Healthy Life Clinic. We're here to help."
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card className="md:col-span-2 glass-card">
          <CardHeader>
            <CardTitle className="font-headline">Send us a Message</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" placeholder="Your Name" required />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="emailAddress">Email Address</Label>
                  <Input id="emailAddress" type="email" placeholder="your@email.com" required />
                </div>
              </div>
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" type="tel" placeholder="Your Phone Number" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" placeholder="Reason for contact" required />
                </div>
              </div>
              <div className="space-y-1">
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" placeholder="Your message..." className="min-h-[120px]" required />
              </div>
              <Button type="submit">Send Message</Button>
            </form>
          </CardContent>
        </Card>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline text-lg">Clinic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold">Address</h3>
                  <p className="text-sm text-muted-foreground">Near Mahua Bypaas, Hindoun Road, Mahua, Dausa, Rajasthan, 321608</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold">Phone</h3>
                  <p className="text-sm text-muted-foreground">+91 7990799205</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold">Email</h3>
                  <p className="text-sm text-muted-foreground">healthylifeclinic12@gmail.com</p>
                </div>
              </div>
               <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold">Clinic Hours</h3>
                  <p className="text-sm text-muted-foreground">Mon - Fri: 9:00 AM - 7:00 PM</p>
                  <p className="text-sm text-muted-foreground">Sat: 10:00 AM - 4:00 PM</p>
                  <p className="text-sm text-muted-foreground">Sun: Closed (Emergency Available)</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
             <CardHeader>
                <CardTitle className="font-headline text-lg">Our Location</CardTitle>
             </CardHeader>
            <CardContent>
              {/* Placeholder for Map - You would embed a Google Map iframe here */}
              <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
                <p className="text-muted-foreground text-center">Google Map will be embedded here.<br/> (Near Mahua Bypaas, Hindoun Road)</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
