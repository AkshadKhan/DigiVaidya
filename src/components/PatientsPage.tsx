import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Search, UserPlus, Filter, Eye, Edit, Trash2 } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Badge } from './ui/badge';
import { toast } from 'sonner';
import { AyurvedaPatientForm } from './AyurvedaPatientForm.tsx'
import { PatientDetailsDialog } from './PatientDetailDialog.tsx';

export interface Patient {
  id: number;
  name: string;
  age: number;
  gender: string;
  email: string;
  phone: string;
  address: string;
  lastVisit: string;
  nextAppointment: string | null;
  condition: string;
  status: string;
  avatar: string;
  dosha: string;
  healthIssues: string[];
  goals: string[];
  activityLevel: string;
  bodyType: string;
  sleepHours: number;
  sleepQuality: string;
  digestion: string;
  skinTexture: string;
  mentalState: string;
  dietType?: string;
  notes?: string;
}

export function PatientsPage() {
  const [patients, setPatients] = useState<Patient[]>([
    {
      id: 1,
      name: 'Priya Sharma',
      age: 34,
      gender: 'Female',
      email: 'priya.sharma@email.com',
      phone: '+91 98765 43210',
      address: '123 MG Road, Bangalore',
      lastVisit: '2024-01-15',
      nextAppointment: '2024-02-15',
      condition: 'Digestive Issues',
      status: 'Active',
      avatar: 'PS',
      dosha: 'Vata-Pitta',
      healthIssues: ['digestive'],
      goals: ['improve-energy'],
      activityLevel: 'moderate',
      bodyType: 'normal',
      sleepHours: 7,
      sleepQuality: 'fair',
      digestion: 'bloating-gas',
      skinTexture: 'dry',
      mentalState: 'anxious',
    },
    {
      id: 2,
      name: 'Rajesh Kumar',
      age: 45,
      gender: 'Male',
      email: 'rajesh.kumar@email.com',
      phone: '+91 87654 32109',
      address: '456 Park Street, Mumbai',
      lastVisit: '2024-01-10',
      nextAppointment: null,
      condition: 'Joint Pain',
      status: 'Active',
      avatar: 'RK',
      dosha: 'Kapha',
      healthIssues: ['joint'],
      goals: ['reduce-stress'],
      activityLevel: 'light',
      bodyType: 'overweight',
      sleepHours: 8,
      sleepQuality: 'good',
      digestion: 'slow',
      skinTexture: 'oily',
      mentalState: 'calm',
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [genderFilter, setGenderFilter] = useState('all');
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  const handleAddPatient = (patientData: any) => {
    const newPatient: Patient = {
      id: patients.length + 1,
      name: patientData.name,
      age: patientData.age,
      gender: patientData.gender,
      email: `${patientData.name.toLowerCase().replace(/\s+/g, '.')}@email.com`,
      phone: '+91 98765 43210', // Default for demo
      address: 'Address not provided',
      lastVisit: new Date().toISOString().split('T')[0],
      nextAppointment: null,
      condition: patientData.healthIssues.length > 0 ? 
        patientData.healthIssues.map((issue: string) => 
          issue.charAt(0).toUpperCase() + issue.slice(1).replace('-', ' ')
        ).join(', ') : 'General Consultation',
      status: 'Active',
      avatar: patientData.name.split(' ').map((n: string) => n[0]).join(''),
      dosha: 'Assessment Pending',
      healthIssues: patientData.healthIssues,
      goals: patientData.goals,
      activityLevel: patientData.activityLevel,
      bodyType: patientData.bodyType,
      sleepHours: patientData.sleepHours,
      sleepQuality: patientData.sleepQuality,
      digestion: patientData.digestion,
      skinTexture: patientData.skinTexture,
      mentalState: patientData.mentalState,
      dietType: patientData.dietType,
      notes: patientData.notes || '',
    };

    setPatients([...patients, newPatient]);
    toast.success('Patient added successfully!');
  };

  const handleDeletePatient = (id: number) => {
    setPatients(patients.filter(p => p.id !== id));
    toast.success('Patient deleted successfully!');
  };

  const filteredPatients = patients.filter(patient => {
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch = 
      patient.name.toLowerCase().includes(searchLower) ||
      patient.email.toLowerCase().includes(searchLower) ||
      patient.phone.includes(searchTerm) ||
      patient.condition.toLowerCase().includes(searchLower) ||
      patient.dosha.toLowerCase().includes(searchLower);

    const matchesStatus = statusFilter === 'all' || 
      patient.status.toLowerCase() === statusFilter.toLowerCase();

    const matchesGender = genderFilter === 'all' || 
      patient.gender.toLowerCase() === genderFilter.toLowerCase();

    return matchesSearch && matchesStatus && matchesGender;
  });

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
      >
        <div>
          <h1>Patient Management</h1>
          <p className="text-muted-foreground">Comprehensive Ayurvedic patient records and assessments</p>
        </div>
        
        <AyurvedaPatientForm onSubmit={handleAddPatient} />
      </motion.div>

      {/* Search and Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search patients by name, email, or condition..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                <Select value={genderFilter} onValueChange={setGenderFilter}>
                  <SelectTrigger className="w-32">
                    <Filter className="h-4 w-4 text-muted-foreground" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Genders</SelectItem>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Patients</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Patients Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>
              Patient Records ({filteredPatients.length})
            </CardTitle>
            <CardDescription>
              Comprehensive Ayurvedic patient database
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Patient</TableHead>
                  <TableHead>Age</TableHead>
                  <TableHead>Gender</TableHead>
                  <TableHead>Dosha</TableHead>
                  <TableHead>Last Visit</TableHead>
                  <TableHead>Next Appointment</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPatients.map((patient) => (
                  <motion.tr
                    key={patient.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    whileHover={{ backgroundColor: "rgba(0,0,0,0.02)" }}
                    className="cursor-pointer"
                  >
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-primary text-primary-foreground">
                            {patient.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p>{patient.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {patient.condition}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{patient.age}</TableCell>
                    <TableCell>{patient.gender}</TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {patient.dosha}
                      </Badge>
                    </TableCell>
                    <TableCell>{patient.lastVisit}</TableCell>
                    <TableCell>
                      {patient.nextAppointment ? (
                        <Badge variant="outline">
                          {patient.nextAppointment}
                        </Badge>
                      ) : (
                        <span className="text-muted-foreground">
                          Not scheduled
                        </span>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          patient.status === "Active" ? "default" : "secondary"
                        }
                      >
                        {patient.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedPatient(patient)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeletePatient(patient.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </motion.tr>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </motion.div>

      {/* Patient Details Dialog */}
      <PatientDetailsDialog 
        patient={selectedPatient} 
        onClose={() => setSelectedPatient(null)} 
      />
    </div>
  );
}