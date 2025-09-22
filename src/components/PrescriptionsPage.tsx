import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Search, 
  Plus, 
  Pill, 
  Download, 
  Eye, 
  Edit, 
  Trash2,
  Calendar,
  User,
  Clock,
  FileText,
  Printer,
  Send
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Separator } from './ui/separator';
import { toast } from 'sonner';

const mockPrescriptions = [
  {
    id: 1,
    patientId: 1,
    patientName: 'John Smith',
    patientAvatar: 'JS',
    patientAge: 45,
    patientPhone: '+1 (555) 123-4567',
    date: '2024-01-20',
    medications: [
      {
        name: 'Lisinopril',
        dosage: '10mg',
        frequency: 'Once daily',
        duration: '30 days',
        instructions: 'Take with or without food, preferably in the morning'
      },
      {
        name: 'Metformin',
        dosage: '500mg',
        frequency: 'Twice daily',
        duration: '30 days',
        instructions: 'Take with meals to reduce stomach upset'
      }
    ],
    diagnosis: 'Hypertension, Type 2 Diabetes',
    status: 'sent',
    pharmacy: 'Central Pharmacy'
  },
  {
    id: 2,
    patientId: 2,
    patientName: 'Emily Davis',
    patientAvatar: 'ED',
    patientAge: 32,
    patientPhone: '+1 (555) 987-6543',
    date: '2024-01-18',
    medications: [
      {
        name: 'Insulin Glargine',
        dosage: '20 units',
        frequency: 'Once daily',
        duration: '90 days',
        instructions: 'Inject subcutaneously at the same time each evening'
      }
    ],
    diagnosis: 'Type 1 Diabetes',
    status: 'pending',
    pharmacy: 'Health Plus Pharmacy'
  },
  {
    id: 3,
    patientId: 3,
    patientName: 'Michael Johnson',
    patientAvatar: 'MJ',
    patientAge: 28,
    patientPhone: '+1 (555) 456-7890',
    date: '2024-01-22',
    medications: [
      {
        name: 'Ibuprofen',
        dosage: '400mg',
        frequency: 'As needed',
        duration: '7 days',
        instructions: 'Take with food. Do not exceed 3 doses per day'
      }
    ],
    diagnosis: 'Lower back pain',
    status: 'draft',
    pharmacy: ''
  }
];

const mockPatients = [
  { id: 1, name: 'John Smith', avatar: 'JS', age: 45, phone: '+1 (555) 123-4567' },
  { id: 2, name: 'Emily Davis', avatar: 'ED', age: 32, phone: '+1 (555) 987-6543' },
  { id: 3, name: 'Michael Johnson', avatar: 'MJ', age: 28, phone: '+1 (555) 456-7890' },
  { id: 4, name: 'Sarah Wilson', avatar: 'SW', age: 38, phone: '+1 (555) 321-0987' }
];

const commonMedications = [
  'Lisinopril', 'Metformin', 'Atorvastatin', 'Amlodipine', 'Omeprazole',
  'Levothyroxine', 'Simvastatin', 'Losartan', 'Gabapentin', 'Hydrochlorothiazide',
  'Ibuprofen', 'Acetaminophen', 'Aspirin', 'Prednisone', 'Amoxicillin'
];

export function PrescriptionsPage() {
  const [prescriptions, setPrescriptions] = useState(mockPrescriptions);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPrescription, setSelectedPrescription] = useState<typeof mockPrescriptions[0] | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newPrescription, setNewPrescription] = useState({
    patientId: '',
    diagnosis: '',
    pharmacy: '',
    medications: [
      {
        name: '',
        dosage: '',
        frequency: '',
        duration: '',
        instructions: ''
      }
    ]
  });

  const filteredPrescriptions = prescriptions.filter(prescription =>
    prescription.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    prescription.diagnosis.toLowerCase().includes(searchQuery.toLowerCase()) ||
    prescription.medications.some(med => 
      med.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const addMedication = () => {
    setNewPrescription({
      ...newPrescription,
      medications: [
        ...newPrescription.medications,
        { name: '', dosage: '', frequency: '', duration: '', instructions: '' }
      ]
    });
  };

  const removeMedication = (index: number) => {
    setNewPrescription({
      ...newPrescription,
      medications: newPrescription.medications.filter((_, i) => i !== index)
    });
  };

  const updateMedication = (index: number, field: string, value: string) => {
    const updatedMedications = [...newPrescription.medications];
    updatedMedications[index] = { ...updatedMedications[index], [field]: value };
    setNewPrescription({ ...newPrescription, medications: updatedMedications });
  };

  const handleCreatePrescription = () => {
    if (!newPrescription.patientId || !newPrescription.diagnosis) {
      toast.error('Please select a patient and enter diagnosis');
      return;
    }

    const hasValidMedication = newPrescription.medications.some(med => 
      med.name && med.dosage && med.frequency
    );

    if (!hasValidMedication) {
      toast.error('Please add at least one medication with name, dosage, and frequency');
      return;
    }

    const patient = mockPatients.find(p => p.id === parseInt(newPrescription.patientId));
    if (!patient) return;

    const prescription = {
      id: prescriptions.length + 1,
      patientId: parseInt(newPrescription.patientId),
      patientName: patient.name,
      patientAvatar: patient.avatar,
      patientAge: patient.age,
      patientPhone: patient.phone,
      date: new Date().toISOString().split('T')[0],
      ...newPrescription,
      status: 'draft' as const
    };

    setPrescriptions([prescription, ...prescriptions]);
    setNewPrescription({
      patientId: '',
      diagnosis: '',
      pharmacy: '',
      medications: [{ name: '', dosage: '', frequency: '', duration: '', instructions: '' }]
    });
    setIsCreateDialogOpen(false);
    toast.success('Prescription created successfully!');
  };

  const handleSendPrescription = (id: number) => {
    setPrescriptions(prescriptions.map(p => 
      p.id === id ? { ...p, status: 'sent' } : p
    ));
    toast.success('Prescription sent to pharmacy!');
  };

  const handleDeletePrescription = (id: number) => {
    setPrescriptions(prescriptions.filter(p => p.id !== id));
    toast.success('Prescription deleted successfully');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'sent': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold">Prescriptions</h1>
          <p className="text-muted-foreground">Digital prescription management and e-prescribing</p>
        </div>
        
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="glow-button">
              <Plus className="mr-2 h-4 w-4" />
              Create Prescription
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Prescription</DialogTitle>
              <DialogDescription>
                Select patient and add medications to create a digital prescription.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-6">
              {/* Patient Selection */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="prescription-patient">Patient *</Label>
                  <Select value={newPrescription.patientId} onValueChange={(value) => setNewPrescription({ ...newPrescription, patientId: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select patient" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockPatients.map(patient => (
                        <SelectItem key={patient.id} value={patient.id.toString()}>
                          <div className="flex items-center space-x-2">
                            <span>{patient.name}</span>
                            <span className="text-sm text-muted-foreground">({patient.age}y)</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="prescription-pharmacy">Pharmacy</Label>
                  <Input
                    id="prescription-pharmacy"
                    placeholder="Central Pharmacy"
                    value={newPrescription.pharmacy}
                    onChange={(e) => setNewPrescription({ ...newPrescription, pharmacy: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="prescription-diagnosis">Diagnosis *</Label>
                <Textarea
                  id="prescription-diagnosis"
                  placeholder="Enter diagnosis or medical condition..."
                  value={newPrescription.diagnosis}
                  onChange={(e) => setNewPrescription({ ...newPrescription, diagnosis: e.target.value })}
                  rows={2}
                />
              </div>

              {/* Medications */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Medications</Label>
                  <Button type="button" variant="outline" size="sm" onClick={addMedication}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Medication
                  </Button>
                </div>

                {newPrescription.medications.map((medication, index) => (
                  <Card key={index} className="p-4">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">Medication {index + 1}</h4>
                        {newPrescription.medications.length > 1 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeMedication(index)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Medication Name *</Label>
                          <Select
                            value={medication.name}
                            onValueChange={(value) => updateMedication(index, 'name', value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select or type medication" />
                            </SelectTrigger>
                            <SelectContent>
                              {commonMedications.map(med => (
                                <SelectItem key={med} value={med}>
                                  {med}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>Dosage *</Label>
                          <Input
                            placeholder="10mg, 500mg, etc."
                            value={medication.dosage}
                            onChange={(e) => updateMedication(index, 'dosage', e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Frequency *</Label>
                          <Select
                            value={medication.frequency}
                            onValueChange={(value) => updateMedication(index, 'frequency', value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select frequency" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Once daily">Once daily</SelectItem>
                              <SelectItem value="Twice daily">Twice daily</SelectItem>
                              <SelectItem value="Three times daily">Three times daily</SelectItem>
                              <SelectItem value="Four times daily">Four times daily</SelectItem>
                              <SelectItem value="As needed">As needed</SelectItem>
                              <SelectItem value="Every 4 hours">Every 4 hours</SelectItem>
                              <SelectItem value="Every 6 hours">Every 6 hours</SelectItem>
                              <SelectItem value="Every 8 hours">Every 8 hours</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>Duration</Label>
                          <Input
                            placeholder="7 days, 30 days, etc."
                            value={medication.duration}
                            onChange={(e) => updateMedication(index, 'duration', e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Instructions</Label>
                        <Textarea
                          placeholder="Take with food, avoid alcohol, etc."
                          value={medication.instructions}
                          onChange={(e) => updateMedication(index, 'instructions', e.target.value)}
                          rows={2}
                        />
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreatePrescription} className="glow-button">
                  Create Prescription
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </motion.div>

      {/* Search */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="glass">
          <CardContent className="p-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search prescriptions by patient name, medication, or diagnosis..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Prescriptions Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="glass">
          <CardHeader>
            <CardTitle>Prescription History ({filteredPrescriptions.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Patient</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Medications</TableHead>
                  <TableHead>Diagnosis</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPrescriptions.map((prescription) => (
                  <motion.tr
                    key={prescription.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    whileHover={{ backgroundColor: 'rgba(0, 0, 0, 0.02)' }}
                  >
                    <TableCell className="font-medium">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                            {prescription.patientAvatar}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <span className="font-medium">{prescription.patientName}</span>
                          <p className="text-sm text-muted-foreground">Age {prescription.patientAge}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{prescription.date}</TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        {prescription.medications.slice(0, 2).map((med, index) => (
                          <div key={index} className="text-sm">
                            {med.name} {med.dosage}
                          </div>
                        ))}
                        {prescription.medications.length > 2 && (
                          <div className="text-xs text-muted-foreground">
                            +{prescription.medications.length - 2} more
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="max-w-xs truncate">
                      {prescription.diagnosis}
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(prescription.status)}>
                        {prescription.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedPrescription(prescription)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        {prescription.status === 'draft' && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleSendPrescription(prescription.id)}
                            className="text-green-600 hover:text-green-700"
                          >
                            <Send className="h-4 w-4" />
                          </Button>
                        )}
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeletePrescription(prescription.id)}
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

      {/* Prescription Details Dialog */}
      <Dialog open={!!selectedPrescription} onOpenChange={() => setSelectedPrescription(null)}>
        <DialogContent className="max-w-3xl">
          {selectedPrescription && (
            <>
              <DialogHeader>
                <DialogTitle>Prescription Details</DialogTitle>
              </DialogHeader>
              
              <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between p-6 bg-accent/50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {selectedPrescription.patientAvatar}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-lg font-semibold">{selectedPrescription.patientName}</h3>
                      <p className="text-sm text-muted-foreground">
                        Age: {selectedPrescription.patientAge} | {selectedPrescription.patientPhone}
                      </p>
                      <p className="text-sm text-muted-foreground">Date: {selectedPrescription.date}</p>
                    </div>
                  </div>
                  <Badge className={getStatusColor(selectedPrescription.status)}>
                    {selectedPrescription.status}
                  </Badge>
                </div>

                {/* Diagnosis */}
                <div>
                  <h4 className="font-semibold mb-2">Diagnosis</h4>
                  <p className="text-sm bg-accent/30 p-3 rounded-lg">{selectedPrescription.diagnosis}</p>
                </div>

                {/* Medications */}
                <div>
                  <h4 className="font-semibold mb-3">Medications</h4>
                  <div className="space-y-3">
                    {selectedPrescription.medications.map((medication, index) => (
                      <div key={index} className="border rounded-lg p-4">
                        <div className="grid grid-cols-2 gap-4 mb-3">
                          <div>
                            <Label className="text-xs text-muted-foreground">Medication</Label>
                            <p className="font-medium">{medication.name}</p>
                          </div>
                          <div>
                            <Label className="text-xs text-muted-foreground">Dosage</Label>
                            <p className="font-medium">{medication.dosage}</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 mb-3">
                          <div>
                            <Label className="text-xs text-muted-foreground">Frequency</Label>
                            <p>{medication.frequency}</p>
                          </div>
                          <div>
                            <Label className="text-xs text-muted-foreground">Duration</Label>
                            <p>{medication.duration}</p>
                          </div>
                        </div>
                        {medication.instructions && (
                          <div>
                            <Label className="text-xs text-muted-foreground">Instructions</Label>
                            <p className="text-sm">{medication.instructions}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pharmacy */}
                {selectedPrescription.pharmacy && (
                  <div>
                    <Label className="text-sm text-muted-foreground">Pharmacy</Label>
                    <p>{selectedPrescription.pharmacy}</p>
                  </div>
                )}

                <Separator />

                {/* Actions */}
                <div className="flex justify-end space-x-2">
                  <Button variant="outline">
                    <Printer className="mr-2 h-4 w-4" />
                    Print
                  </Button>
                  <Button variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Export PDF
                  </Button>
                  {selectedPrescription.status === 'draft' && (
                    <Button
                      onClick={() => handleSendPrescription(selectedPrescription.id)}
                      className="glow-button"
                    >
                      <Send className="mr-2 h-4 w-4" />
                      Send to Pharmacy
                    </Button>
                  )}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}