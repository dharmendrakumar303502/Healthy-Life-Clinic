
import { PageHeader } from '@/components/shared/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';

export default function SettingsPage() {
  return (
    <>
      <PageHeader
        title="Settings"
        description="Manage your account and application preferences."
      />
      <div className="space-y-8 max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Profile Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="name">Name</Label>
              <Input id="name" defaultValue="Demo User" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue="demo@example.com" />
            </div>
            <Button>Update Profile</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Preferences</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="darkMode" className="font-medium">Dark Mode</Label>
                <p className="text-sm text-muted-foreground">Toggle between light and dark themes.</p>
              </div>
              {/* Dark mode switch is usually handled at a higher level (e.g., next-themes) 
                  This is a visual placeholder. Add actual functionality if theme provider is set up. */}
              <Switch id="darkMode" disabled />
            </div>
            <div className="flex items-center justify-between">
               <div>
                <Label htmlFor="notifications" className="font-medium">Push Notifications</Label>
                <p className="text-sm text-muted-foreground">Receive alerts for reminders and tips.</p>
              </div>
              <Switch id="notifications" defaultChecked />
            </div>
          </CardContent>
        </Card>

         <Card>
          <CardHeader>
            <CardTitle className="font-headline">Account Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
             <Button variant="outline">Change Password</Button>
             <Button variant="destructive">Delete Account</Button>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
