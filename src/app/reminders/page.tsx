
"use client";

import { useState, useEffect } from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { PlusCircle, Edit2, Trash2, BellDot } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { useToast } from '@/hooks/use-toast';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Calendar as CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Reminder {
  id: string;
  medicineName: string;
  dosage: string;
  time: string; // HH:mm format
  frequency: 'Daily' | 'Twice a day' | 'Specific days';
  startDate: Date;
  endDate?: Date;
  takenToday?: boolean; // For daily tracking
}

const initialReminders: Reminder[] = [
  { id: '1', medicineName: 'Metformin', dosage: '500mg', time: '08:00', frequency: 'Daily', startDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), takenToday: true },
  { id: '2', medicineName: 'Vitamin D', dosage: '1000 IU', time: '09:00', frequency: 'Daily', startDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), takenToday: false },
  { id: '3', medicineName: 'Atorvastatin', dosage: '20mg', time: '20:00', frequency: 'Daily', startDate: new Date(), endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) },
];

export default function RemindersPage() {
  const [reminders, setReminders] = useState<Reminder[]>(initialReminders);
  const [isFormDialogOpen, setIsFormDialogOpen] = useState(false);
  const [editingReminder, setEditingReminder] = useState<Reminder | null>(null);

  const [medicineName, setMedicineName] = useState('');
  const [dosage, setDosage] = useState('');
  const [time, setTime] = useState('');
  const [frequency, setFrequency] = useState<'Daily' | 'Twice a day' | 'Specific days'>('Daily');
  const [startDate, setStartDate] = useState<Date | undefined>(new Date());
  const [endDate, setEndDate] = useState<Date | undefined>();
  
  const { toast } = useToast();

  // Effect to reset form when dialog closes or editingReminder changes
  useEffect(() => {
    if (isFormDialogOpen) {
      if (editingReminder) {
        setMedicineName(editingReminder.medicineName);
        setDosage(editingReminder.dosage);
        setTime(editingReminder.time);
        setFrequency(editingReminder.frequency);
        setStartDate(editingReminder.startDate);
        setEndDate(editingReminder.endDate);
      } else {
        // Reset for new reminder
        setMedicineName('');
        setDosage('');
        setTime('');
        setFrequency('Daily');
        setStartDate(new Date());
        setEndDate(undefined);
      }
    }
  }, [isFormDialogOpen, editingReminder]);


  const handleSubmitReminder = () => {
    if (!medicineName || !dosage || !time || !startDate) {
      toast({ title: "Error", description: "Please fill all required fields.", variant: "destructive" });
      return;
    }

    if (editingReminder) {
      // Update existing reminder
      setReminders(reminders.map(r => r.id === editingReminder.id ? { ...editingReminder, medicineName, dosage, time, frequency, startDate, endDate } : r));
      toast({ title: "Reminder Updated", description: `${medicineName} reminder has been updated.` });
    } else {
      // Add new reminder
      const newReminder: Reminder = {
        id: String(Date.now()),
        medicineName,
        dosage,
        time,
        frequency,
        startDate,
        endDate,
        takenToday: false,
      };
      setReminders(prev => [...prev, newReminder]);
      toast({ title: "Reminder Added", description: `${medicineName} reminder has been set.` });
    }
    setIsFormDialogOpen(false);
    setEditingReminder(null);
  };

  const handleEditReminder = (reminder: Reminder) => {
    setEditingReminder(reminder);
    setIsFormDialogOpen(true);
  };
  
  const handleDeleteReminder = (reminderId: string) => {
    setReminders(reminders.filter(r => r.id !== reminderId));
    toast({ title: "Reminder Deleted", description: "The reminder has been removed." });
  };

  const toggleTakenStatus = (reminderId: string) => {
    setReminders(reminders.map(r => r.id === reminderId ? { ...r, takenToday: !r.takenToday } : r));
  };

  return (
    <>
      <PageHeader
        title="Medicine Reminders"
        description="Stay on top of your medication schedule."
        actions={
          <Dialog open={isFormDialogOpen} onOpenChange={(isOpen) => { setIsFormDialogOpen(isOpen); if(!isOpen) setEditingReminder(null); }}>
            <DialogTrigger asChild>
              <Button onClick={() => { setEditingReminder(null); setIsFormDialogOpen(true); }}>
                <PlusCircle className="mr-2 h-4 w-4" /> Add New Reminder
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px]">
              <DialogHeader>
                <DialogTitle className="font-headline">{editingReminder ? 'Edit Reminder' : 'Add New Reminder'}</DialogTitle>
                <DialogDescription>
                  Fill in the details for your medicine reminder.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="medicineName" className="text-right">Medicine</Label>
                  <Input id="medicineName" value={medicineName} onChange={(e) => setMedicineName(e.target.value)} className="col-span-3" placeholder="e.g., Amoxicillin" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="dosage" className="text-right">Dosage</Label>
                  <Input id="dosage" value={dosage} onChange={(e) => setDosage(e.target.value)} className="col-span-3" placeholder="e.g., 250mg, 1 tablet" />
                </div>
                 <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="time" className="text-right">Time</Label>
                  <Input id="time" type="time" value={time} onChange={(e) => setTime(e.target.value)} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="frequency" className="text-right">Frequency</Label>
                   <Select value={frequency} onValueChange={(value: 'Daily' | 'Twice a day' | 'Specific days') => setFrequency(value)}>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Daily">Daily</SelectItem>
                      <SelectItem value="Twice a day">Twice a day</SelectItem>
                      <SelectItem value="Specific days">Specific days (manual tracking)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                 <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="startDate" className="text-right">Start Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn("col-span-3 justify-start text-left font-normal",!startDate && "text-muted-foreground")}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {startDate ? format(startDate, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={startDate} onSelect={setStartDate} initialFocus />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="endDate" className="text-right">End Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn("col-span-3 justify-start text-left font-normal", !endDate && "text-muted-foreground")}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {endDate ? format(endDate, "PPP") : <span>Pick an end date (optional)</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={endDate} onSelect={setEndDate} disabled={(date) => startDate ? date < startDate : false} />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => {setIsFormDialogOpen(false); setEditingReminder(null);}}>Cancel</Button>
                <Button onClick={handleSubmitReminder}>Save Reminder</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        }
      />

      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="font-headline">Your Medication Schedule</CardTitle>
          <CardDescription>Mark medicines as taken and manage your reminders.</CardDescription>
        </CardHeader>
        <CardContent>
          {reminders.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Taken?</TableHead>
                  <TableHead>Medicine</TableHead>
                  <TableHead>Dosage</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Frequency</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reminders.map(reminder => (
                  <TableRow key={reminder.id} className={reminder.takenToday ? "bg-green-50 dark:bg-green-900/30" : ""}>
                    <TableCell>
                      <Checkbox
                        checked={reminder.takenToday}
                        onCheckedChange={() => toggleTakenStatus(reminder.id)}
                        aria-label={`Mark ${reminder.medicineName} as taken`}
                      />
                    </TableCell>
                    <TableCell className="font-medium">{reminder.medicineName}</TableCell>
                    <TableCell>{reminder.dosage}</TableCell>
                    <TableCell>{format(parseISO(`2000-01-01T${reminder.time}:00`), 'hh:mm a')}</TableCell>
                    <TableCell>{reminder.frequency}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" onClick={() => handleEditReminder(reminder)} className="mr-2">
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDeleteReminder(reminder.id)} className="text-destructive hover:text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <BellDot className="mx-auto h-12 w-12 mb-4" />
              <p className="font-semibold">No reminders set yet.</p>
              <p>Click "Add New Reminder" to get started.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
}
