
"use client";

import { useState, useEffect } from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, PlusCircle, Video, UserMd } from 'lucide-react'; // UserMd is a placeholder, lucide might not have it.
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

// Placeholder for UserMd if not in lucide-react
const StethoscopeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-stethoscope">
    <path d="M4 18a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v1a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1V9a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9a1 1 0 0 0 1 1Z"/>
    <path d="m19 12-2.5-2.5"/>
    <path d="m14.5 14.5-2.5 2.5"/>
    <path d="M18 10h1a1 1 0 0 1 1 1v1a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1V9a2 2 0 0 0-2-2h-2"/>
    <circle cx="5" cy="5" r="2"/>
  </svg>
);


interface Appointment {
  id: string;
  doctor: string;
  specialty: string;
  date: Date;
  time: string;
  type: 'In-Person' | 'Video';
  status: 'Upcoming' | 'Completed' | 'Cancelled';
}

const mockDoctors = [
  { id: '1', name: 'Dr. Dharmendra Kumar', specialty: 'Cardiology' },
  { id: '2', name: 'Dr. Swati Singh', specialty: 'Pediatrics' },
  { id: '3', name: 'Dr. Kalyani', specialty: 'Dermatology' },
  { id: '4', name: 'Dr. Ben Green', specialty: 'General Medicine' },
];

const initialAppointments: Appointment[] = [
  { id: '1', doctor: 'Dr. Dharmendra Kumar', specialty: 'Cardiology', date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), time: '10:00 AM', type: 'Video', status: 'Upcoming' },
  { id: '2', doctor: 'Dr. Swati Singh', specialty: 'Pediatrics', date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), time: '02:30 PM', type: 'In-Person', status: 'Upcoming' },
  { id: '3', doctor: 'Dr. Kalyani', specialty: 'Dermatology', date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), time: '11:15 AM', type: 'Video', status: 'Completed' },
];

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>(initialAppointments);
  const [isBookingDialogOpen, setIsBookingDialogOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedDoctor, setSelectedDoctor] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [appointmentType, setAppointmentType] = useState<'In-Person' | 'Video'>('In-Person');
  const [notes, setNotes] = useState<string>('');
  const { toast } = useToast();

  // Ensure this runs only on client
  const [currentTimeSlots, setCurrentTimeSlots] = useState<string[]>([]);
  useEffect(() => {
    const generateTimeSlots = () => {
      const slots = [];
      for (let hour = 9; hour < 17; hour++) {
        slots.push(`${String(hour).padStart(2, '0')}:00`);
        slots.push(`${String(hour).padStart(2, '0')}:30`);
      }
      return slots.map(slot => {
        const [h, m] = slot.split(':');
        const date = new Date();
        date.setHours(parseInt(h), parseInt(m));
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      });
    };
    setCurrentTimeSlots(generateTimeSlots());
  }, []);


  const handleBookAppointment = () => {
    if (!selectedDate || !selectedDoctor || !selectedTime) {
      toast({
        title: "Booking Error",
        description: "Please fill all required fields: Doctor, Date, and Time.",
        variant: "destructive",
      });
      return;
    }

    const doctorDetails = mockDoctors.find(doc => doc.id === selectedDoctor);
    if (!doctorDetails) {
        toast({ title: "Error", description: "Selected doctor not found.", variant: "destructive" });
        return;
    }

    const newAppointment: Appointment = {
      id: String(Date.now()), // Simple ID generation
      doctor: doctorDetails.name,
      specialty: doctorDetails.specialty,
      date: selectedDate,
      time: selectedTime,
      type: appointmentType,
      status: 'Upcoming',
    };
    setAppointments(prev => [...prev, newAppointment].sort((a, b) => a.date.getTime() - b.date.getTime()));
    toast({
      title: "Appointment Booked!",
      description: `Your appointment with ${newAppointment.doctor} on ${format(newAppointment.date, 'PPP')} at ${newAppointment.time} is confirmed.`,
    });
    setIsBookingDialogOpen(false);
    // Reset form
    setSelectedDate(new Date());
    setSelectedDoctor('');
    setSelectedTime('');
    setAppointmentType('In-Person');
    setNotes('');
  };

  const upcomingAppointments = appointments.filter(app => app.status === 'Upcoming');
  const pastAppointments = appointments.filter(app => app.status !== 'Upcoming');

  return (
    <>
      <PageHeader
        title="Appointments"
        description="Manage your medical appointments and book new ones."
        actions={
          <Dialog open={isBookingDialogOpen} onOpenChange={setIsBookingDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" /> Book New Appointment
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px]">
              <DialogHeader>
                <DialogTitle className="font-headline">Book a New Appointment</DialogTitle>
                <DialogDescription>
                  Fill in the details below to schedule your appointment.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="doctor" className="text-right">Doctor</Label>
                  <Select value={selectedDoctor} onValueChange={setSelectedDoctor}>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select a doctor" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockDoctors.map(doc => (
                        <SelectItem key={doc.id} value={doc.id}>{doc.name} ({doc.specialty})</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="date" className="text-right">Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "col-span-3 justify-start text-left font-normal",
                          !selectedDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        initialFocus
                        disabled={(date) => date < new Date(new Date().setDate(new Date().getDate() -1)) } // Disable past dates
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="time" className="text-right">Time</Label>
                   <Select value={selectedTime} onValueChange={setSelectedTime}>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select a time slot" />
                    </SelectTrigger>
                    <SelectContent>
                      {currentTimeSlots.map(slot => (
                        <SelectItem key={slot} value={slot}>{slot}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="type" className="text-right">Type</Label>
                  <Select value={appointmentType} onValueChange={(value: 'In-Person' | 'Video') => setAppointmentType(value)}>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select appointment type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="In-Person">In-Person</SelectItem>
                      <SelectItem value="Video">Video Consultation</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="notes" className="text-right">Notes</Label>
                  <Textarea id="notes" value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Optional notes for the doctor" className="col-span-3" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsBookingDialogOpen(false)}>Cancel</Button>
                <Button onClick={handleBookAppointment}>Confirm Booking</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        }
      />

      <div className="space-y-8">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="font-headline">Upcoming Appointments</CardTitle>
          </CardHeader>
          <CardContent>
            {upcomingAppointments.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Doctor</TableHead>
                    <TableHead>Date & Time</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {upcomingAppointments.map(app => (
                    <TableRow key={app.id}>
                      <TableCell>
                        <div className="font-medium">{app.doctor}</div>
                        <div className="text-sm text-muted-foreground">{app.specialty}</div>
                      </TableCell>
                      <TableCell>{format(app.date, 'PPP')} at {app.time}</TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${app.type === 'Video' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'}`}>
                          {app.type === 'Video' ? <Video className="mr-1.5 h-3 w-3" /> : <StethoscopeIcon />}
                          {app.type}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">Details</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <p className="text-muted-foreground">No upcoming appointments.</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Past Appointments</CardTitle>
          </CardHeader>
          <CardContent>
             {pastAppointments.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Doctor</TableHead>
                    <TableHead>Date & Time</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pastAppointments.map(app => (
                    <TableRow key={app.id}>
                      <TableCell>
                        <div className="font-medium">{app.doctor}</div>
                        <div className="text-sm text-muted-foreground">{app.specialty}</div>
                      </TableCell>
                      <TableCell>{format(app.date, 'PPP')} at {app.time}</TableCell>
                      <TableCell>{app.type}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          app.status === 'Completed' ? 'bg-green-100 text-green-700 dark:bg-green-700 dark:text-green-100' :
                          app.status === 'Cancelled' ? 'bg-red-100 text-red-700 dark:bg-red-700 dark:text-red-100' :
                          'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-100'
                        }`}>
                          {app.status}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <p className="text-muted-foreground">No past appointment history.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
