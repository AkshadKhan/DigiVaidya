import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Search, Plus, Eye, Edit, Trash2, Users, Save, X } from 'lucide-react';
import { DietPlan } from './DietPlan';
import { AusadhiPlan } from './AushadhiPlan';
import { AyurvedaPatientForm } from './AyurvedaPatientForm';

interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  lastVisit: string;
  dietType: string;
  status: 'active' | 'completed' | 'pending';
  initials: string;
}

interface DietFormData {
  dietType: string;
  description: string;
  allergies: string;
  restrictions: string;
  goals: string;
  duration: string;
}

interface PatientFormData {
  name: string;
  age: string;
  gender: string;
  dietType: string;
}

const mockPatientsData: Patient[] = [
  {
    id: '1',
    name: 'John Smith',
    age: 45,
    gender: 'Male',
    lastVisit: '2024-01-20',
    dietType: 'Vata Balancing',
    status: 'active',
    initials: 'JS'
  },
  {
    id: '2', 
    name: 'Emily Davis',
    age: 32,
    gender: 'Female',
    lastVisit: '2024-01-18',
    dietType: 'Pitta Balancing',
    status: 'completed',
    initials: 'ED'
  },
  {
    id: '3',
    name: 'Michael Johnson',
    age: 38,
    gender: 'Male', 
    lastVisit: '2024-01-15',
    dietType: 'Kapha Balancing',
    status: 'pending',
    initials: 'MJ'
  },
  {
    id: '4',
    name: 'Sarah Wilson',
    age: 29,
    gender: 'Female',
    lastVisit: '2024-01-12',
    dietType: 'Tridoshic',
    status: 'active',
    initials: 'SW'
  }
];

const dietTypes = [
  'Vata Balancing',
  'Pitta Balancing',
  'Kapha Balancing',
  'Tridoshic',
  'Detox Diet',
  'Weight Management'
];

export function DietPage() {
  const [patients, setPatients] = useState<Patient[]>(mockPatientsData);
  const [searchTerm, setSearchTerm] = useState('');
  const [genderFilter, setGenderFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [isDietModalOpen, setIsDietModalOpen] = useState(false);
  const [isEditDietModalOpen, setIsEditDietModalOpen] = useState(false);
  const [isAddPatientModalOpen, setIsAddPatientModalOpen] = useState(false);
  const [editingPatient, setEditingPatient] = useState<Patient | null>(null);
  const [dietFormData, setDietFormData] = useState<DietFormData>({
    dietType: '',
    description: '',
    allergies: '',
    restrictions: '',
    goals: '',
    duration: ''
  });
  const [patientFormData, setPatientFormData] = useState<PatientFormData>({
    name: '',
    age: '',
    gender: '',
    dietType: ''
  });

  const filteredPatients = patients.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patient.dietType.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGender = genderFilter === 'all' || patient.gender === genderFilter;
    const matchesStatus = statusFilter === 'all' || patient.status === statusFilter;
    
    return matchesSearch && matchesGender && matchesStatus;
  });

  const handleViewDiet = (patient: Patient) => {
    setSelectedPatient(patient);
    setIsDietModalOpen(true);
  };

  const handleEditDiet = (patient: Patient) => {
    setEditingPatient(patient);
    setDietFormData({
      dietType: patient.dietType,
      description: 'Personalized diet plan based on Ayurvedic principles',
      allergies: '',
      restrictions: '',
      goals: 'Balance doshas and improve overall health',
      duration: '30 days'
    });
    setIsEditDietModalOpen(true);
  };

  const handleAddPatient = () => {
    setPatientFormData({
      name: '',
      age: '',
      gender: '',
      dietType: ''
    });
    setIsAddPatientModalOpen(true);
  };

  const handleSaveDiet = () => {
    if (editingPatient) {
      setPatients(prev => 
        prev.map(patient => 
          patient.id === editingPatient.id 
            ? { ...patient, dietType: dietFormData.dietType }
            : patient
        )
      );
      setIsEditDietModalOpen(false);
      setEditingPatient(null);
      setDietFormData({
        dietType: '',
        description: '',
        allergies: '',
        restrictions: '',
        goals: '',
        duration: ''
      });
    }
  };

  const handleSavePatient = () => {
    if (patientFormData.name && patientFormData.age && patientFormData.gender && patientFormData.dietType) {
      const newPatient: Patient = {
        id: (patients.length + 1).toString(),
        name: patientFormData.name,
        age: parseInt(patientFormData.age),
        gender: patientFormData.gender,
        lastVisit: new Date().toISOString().split('T')[0],
        dietType: patientFormData.dietType,
        status: 'active',
        initials: patientFormData.name.split(' ').map(n => n[0]).join('').toUpperCase()
      };
      
      setPatients(prev => [...prev, newPatient]);
      setIsAddPatientModalOpen(false);
      setPatientFormData({
        name: '',
        age: '',
        gender: '',
        dietType: ''
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'completed':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'pending':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-green-100 rounded-full">
              <Users className="w-6 h-6 text-green-600" />
            </div>
            <h1 className="text-green-800 text-4xl font-bold">Ayurvedic Diet Plans</h1>
          </div>
          <p className="text-muted-foreground">
            Digital personalized diet plan management
          </p>
        </div>
        <Button 
          className="bg-green-600 hover:bg-green-700 text-white"
          onClick={handleAddPatient}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Patient
        </Button>
      </div>

      {/* Search Bar */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search patients by name, diet type, or status..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-3">
              <div className="min-w-32">
                <Select value={genderFilter} onValueChange={setGenderFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Genders</SelectItem>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="min-w-32">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Patients Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-green-700">
            Diet Plans ({filteredPatients.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b bg-muted/50">
                <tr>
                  <th className="text-left p-4">Patient</th>
                  <th className="text-left p-4">Age</th>
                  <th className="text-left p-4">Diet Type</th>
                  <th className="text-left p-4">Last Visit</th>
                  <th className="text-left p-4">Status</th>
                  <th className="text-left p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredPatients.map((patient) => (
                  <tr key={patient.id} className="border-b hover:bg-muted/30 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-8 h-8">
                          <AvatarFallback className="bg-green-100 text-green-700">
                            {patient.initials}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p>{patient.name}</p>
                          <p className="text-sm text-muted-foreground">{patient.gender}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="text-muted-foreground">{patient.age} years</span>
                    </td>
                    <td className="p-4">
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                        {patient.dietType}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <span className="text-muted-foreground">{patient.lastVisit}</span>
                    </td>
                    <td className="p-4">
                      <Badge className={getStatusColor(patient.status)}>
                        {patient.status}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleViewDiet(patient)}
                          className="hover:bg-green-50 hover:text-green-700"
                          title="View Diet Plan"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEditDiet(patient)}
                          className="hover:bg-blue-50 hover:text-blue-700"
                          title="Edit Diet Chart"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="hover:bg-red-50 hover:text-red-700"
                          title="Delete Patient"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Treatment Plan Modal */}
      <Dialog open={isDietModalOpen} onOpenChange={setIsDietModalOpen}>
        <DialogContent className="max-w-7xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              {selectedPatient && (
                <>
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-green-100 text-green-700">
                      {selectedPatient.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-left">
                    <h3>{selectedPatient.name}'s Treatment Plan</h3>
                    <p className="text-sm text-muted-foreground font-normal">
                      {selectedPatient.dietType} • Age: {selectedPatient.age}
                    </p>
                  </div>
                </>
              )}
            </DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            <Tabs defaultValue="diet" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="diet" className="flex items-center gap-2">
                  <span>Diet Plan</span>
                </TabsTrigger>
                <TabsTrigger value="ausadhi" className="flex items-center gap-2">
                  <span>Ausadhi (Herbs)</span>
                </TabsTrigger>
              </TabsList>
              <TabsContent value="diet" className="mt-4">
                <DietPlan />
              </TabsContent>
              <TabsContent value="ausadhi" className="mt-4">
                <AusadhiPlan />
              </TabsContent>
            </Tabs>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Diet Modal */}
      <Dialog open={isEditDietModalOpen} onOpenChange={setIsEditDietModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              {editingPatient && (
                <>
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-blue-100 text-blue-700">
                      {editingPatient.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-left">
                    <h3>Edit Diet Chart - {editingPatient.name}</h3>
                    <p className="text-sm text-muted-foreground font-normal">
                      Age: {editingPatient.age} • {editingPatient.gender}
                    </p>
                  </div>
                </>
              )}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6 mt-4">
            <div className="space-y-2">
              <Label htmlFor="dietType">Diet Type</Label>
              <Select 
                value={dietFormData.dietType} 
                onValueChange={(value:any) => setDietFormData(prev => ({ ...prev, dietType: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select diet type" />
                </SelectTrigger>
                <SelectContent>
                  {dietTypes.map((type) => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Diet Description</Label>
              <Textarea
                id="description"
                placeholder="Enter diet plan description..."
                value={dietFormData.description}
                onChange={(e) => setDietFormData(prev => ({ ...prev, description: e.target.value }))}
                rows={3}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="allergies">Food Allergies</Label>
                <Input
                  id="allergies"
                  placeholder="e.g., nuts, dairy, gluten"
                  value={dietFormData.allergies}
                  onChange={(e) => setDietFormData(prev => ({ ...prev, allergies: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="duration">Plan Duration</Label>
                <Select 
                  value={dietFormData.duration} 
                  onValueChange={(value:any) => setDietFormData(prev => ({ ...prev, duration: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15 days">15 days</SelectItem>
                    <SelectItem value="30 days">30 days</SelectItem>
                    <SelectItem value="45 days">45 days</SelectItem>
                    <SelectItem value="60 days">60 days</SelectItem>
                    <SelectItem value="90 days">90 days</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="restrictions">Dietary Restrictions</Label>
              <Textarea
                id="restrictions"
                placeholder="Enter any specific dietary restrictions..."
                value={dietFormData.restrictions}
                onChange={(e) => setDietFormData(prev => ({ ...prev, restrictions: e.target.value }))}
                rows={2}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="goals">Health Goals</Label>
              <Textarea
                id="goals"
                placeholder="Enter specific health goals for this diet plan..."
                value={dietFormData.goals}
                onChange={(e) => setDietFormData(prev => ({ ...prev, goals: e.target.value }))}
                rows={2}
              />
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button 
                variant="outline" 
                onClick={() => setIsEditDietModalOpen(false)}
                className="flex items-center gap-2"
              >
                <X className="w-4 h-4" />
                Cancel
              </Button>
              <Button 
                onClick={handleSaveDiet}
                className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                Save Diet Chart
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add Patient Modal */}
      <Dialog open={isAddPatientModalOpen} onOpenChange={setIsAddPatientModalOpen}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-full">
                <Plus className="w-5 h-5 text-green-600" />
              </div>
              <h3>Add New Patient</h3>
            </DialogTitle>
          </DialogHeader>
          
          <div className="mt-4">
            {/* Import the complete patient form component */}
            <AyurvedaPatientForm onSubmit={function (data: { name: string; age: number; ageGroup: string; gender: string; bodyType: string; activityLevel: string; healthIssues: string[]; sleepHours: number; sleepQuality: string; temperaturePreference: string; digestion: string; skinTexture: string; mentalState: string; afterMealFeeling: string; craveSpecificFoods: string; goals: string[]; dietStrictness: string; mainMealsPerDay: number; dietType: string; recipePortionGuidelines: boolean; recipeMealtimeAligned: boolean; includeAnimalProtein: boolean; }): void {
              throw new Error('Function not implemented.');
            } } />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}