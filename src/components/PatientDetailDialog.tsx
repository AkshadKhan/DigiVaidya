import React from 'react';
import { User, Mail, Phone, MapPin, Calendar, FileText, Edit } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Patient } from './PatientsPage';

interface PatientDetailsDialogProps {
  patient: Patient | null;
  onClose: () => void;
}

export function PatientDetailsDialog({ patient, onClose }: PatientDetailsDialogProps) {
  if (!patient) return null;

  const formatHealthIssues = (issues: string[]) => {
    return issues.map(issue => 
      issue.split('-').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
      ).join(' ')
    ).join(', ') || 'None';
  };

  const formatGoals = (goals: string[]) => {
    return goals.map(goal => 
      goal.split('-').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
      ).join(' ')
    ).join(', ') || 'None specified';
  };

  return (
    <Dialog open={!!patient} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-3">
            <Avatar className="h-12 w-12">
              <AvatarFallback className="bg-primary text-primary-foreground">
                {patient.avatar}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2>{patient.name}</h2>
              <p className="text-sm text-muted-foreground">
                {patient.condition}
              </p>
            </div>
          </DialogTitle>
          <DialogDescription>
            Complete patient profile with Ayurvedic assessment details, health information, and treatment history.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Personal Information */}
            <div className="space-y-4">
              <h3>Personal Information</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Age: {patient.age} years</span>
                </div>
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Gender: {patient.gender}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{patient.email}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{patient.phone}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{patient.address}</span>
                </div>
              </div>
            </div>

            {/* Ayurvedic Assessment */}
            <div className="space-y-4">
              <h3>Ayurvedic Assessment</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Dosha: {patient.dosha}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Last Visit: {patient.lastVisit}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    Next Appointment: {patient.nextAppointment || "Not scheduled"}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Status: </span>
                  <Badge variant={patient.status === "Active" ? "default" : "secondary"}>
                    {patient.status}
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          {/* Health Profile */}
          <div className="space-y-4">
            <h3>Health Profile</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-4 border rounded-lg">
                <h4 className="mb-2">Physical Attributes</h4>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <p>Body Type: {patient.bodyType}</p>
                  <p>Activity Level: {patient.activityLevel}</p>
                  <p>Sleep: {patient.sleepHours}h ({patient.sleepQuality})</p>
                </div>
              </div>
              
              <div className="p-4 border rounded-lg">
                <h4 className="mb-2">Digestion & Wellness</h4>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <p>Digestion: {patient.digestion}</p>
                  <p>Skin: {patient.skinTexture}</p>
                  <p>Mental State: {patient.mentalState}</p>
                </div>
              </div>
              
              <div className="p-4 border rounded-lg">
                <h4 className="mb-2">Health Focus</h4>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <p>Issues: {formatHealthIssues(patient.healthIssues)}</p>
                  <p>Goals: {formatGoals(patient.goals)}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Notes */}
          {patient.notes && (
            <div className="space-y-4">
              <h3>Additional Notes</h3>
              <div className="p-4 border rounded-lg bg-muted/50">
                <p className="text-sm">{patient.notes}</p>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end space-x-2 pt-4 border-t">
            <Button variant="outline">
              <FileText className="mr-2 h-4 w-4" />
              View Records
            </Button>
            <Button variant="outline">
              <Calendar className="mr-2 h-4 w-4" />
              Schedule Appointment
            </Button>
            <Button className="bg-primary hover:bg-primary/90">
              <Edit className="mr-2 h-4 w-4" />
              Edit Patient
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}