import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  Plus, 
  Search, 
  Filter,
  Video,
  Phone,
  MapPin,
  User,
  Edit,
  Trash2,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Calendar } from './ui/calendar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Textarea } from './ui/textarea';
import { toast } from 'sonner';

const mockAppointments = [
  {
    id: 1,
    patientId: 1,
    patientName: 'John Smith',
    patientAvatar: 'JS',
    patientPhone: '+1 (555) 123-4567',
    date: '2024-01-25',
    time: '09:00',
    endTime: '09:30',
    type: 'In-person',
    reason: 'Cardiology Consultation',
    status: 'confirmed',
    notes: 'Follow-up for hypertension management'
  },
  {
    id: 2,
    patientId: 2,
    patientName: 'Emily Davis',
    patientAvatar: 'ED',
    patientPhone: '+1 (555) 987-6543',
    date: '2024-01-25',
    time: '10:30',
    endTime: '11:00',
    type: 'Video call',
    reason: 'Diabetes Follow-up',
    status: 'confirmed',
    notes: 'Review blood sugar logs and adjust medication'
  },
  {
    id: 3,
    patientId: 3,
    patientName: 'Michael Johnson',
    patientAvatar: 'MJ',
    patientPhone: '+1 (555) 456-7890',
    date: '2024-01-25',
    time: '14:00',
    endTime: '14:30',
    type: 'In-person',
    reason: 'Annual Checkup',
    status: 'pending',
    notes: 'Comprehensive health examination'
  },
  {
    id: 4,
    patientId: 4,
    patientName: 'Sarah Wilson',
    patientAvatar: 'SW',
    patientPhone: '+1 (555) 321-0987',
    date: '2024-01-26',
    time: '11:00',
    endTime: '11:30',
    type: 'Phone call',
    reason: 'Medication Review',
    status: 'confirmed',
    notes: 'Discuss side effects and dosage adjustments'
  }
];

const mockPatients = [
  { id: 1, name: 'John Smith', avatar: 'JS', phone: '+1 (555) 123-4567' },
  { id: 2, name: 'Emily Davis', avatar: 'ED', phone: '+1 (555) 987-6543' },
  { id: 3, name: 'Michael Johnson', avatar: 'MJ', phone: '+1 (555) 456-7890' },
  { id: 4, name: 'Sarah Wilson', avatar: 'SW', phone: '+1 (555) 321-0987' }
];

const timeSlots = [
  '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
  '16:00', '16:30', '17:00', '17:30'
];

export function ConsultationsPage() {
  const [appointments, setAppointments] = useState(mockAppointments);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [isBookingDialogOpen, setIsBookingDialogOpen] = useState(false);
  const [newAppointment, setNewAppointment] = useState({
    patientId: '',
    date: '',
    time: '',
    type: 'In-person',
    reason: '',
    notes: ''
  });

  const filteredAppointments = appointments.filter(appointment => {
    const matchesSearch = appointment.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         appointment.reason.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || appointment.status === filterStatus;
    const matchesDate = appointment.date === selectedDate.toISOString().split('T')[0];
    
    return matchesSearch && matchesStatus && matchesDate;
  });

  const handleBookAppointment = () => {
    if (!newAppointment.patientId || !newAppointment.date || !newAppointment.time || !newAppointment.reason) {
      toast.error('Please fill in all required fields');
      return;
    }

    const patient = mockPatients.find(p => p.id === parseInt(newAppointment.patientId));
    if (!patient) return;

    // Calculate end time (30 minutes later)
    const [hours, minutes] = newAppointment.time.split(':').map(Number);
    const endTime = `${String(hours).padStart(2, '0')}:${String(minutes + 30).padStart(2, '0')}`;

    const appointment = {
      id: appointments.length + 1,
      patientId: parseInt(newAppointment.patientId),
      patientName: patient.name,
      patientAvatar: patient.avatar,
      patientPhone: patient.phone,
      endTime,
      ...newAppointment,
      status: 'pending' as const
    };

    setAppointments([...appointments, appointment]);
    setNewAppointment({
      patientId: '',
      date: '',
      time: '',
      type: 'In-person',
      reason: '',
      notes: ''
    });
    setIsBookingDialogOpen(false);
    toast.success('Appointment booked successfully!');
  };

  const handleConfirmAppointment = (id: number) => {
    setAppointments(appointments.map(a => 
      a.id === id ? { ...a, status: 'confirmed' } : a
    ));
    toast.success('Appointment confirmed!');
  };

  const handleCancelAppointment = (id: number) => {
    setAppointments(appointments.map(a => 
      a.id === id ? { ...a, status: 'cancelled' } : a
    ));
    toast.success('Appointment cancelled');
  };

  const handleDeleteAppointment = (id: number) => {
    setAppointments(appointments.filter(a => a.id !== id));
    toast.success('Appointment deleted');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Video call': return <Video className="h-4 w-4" />;
      case 'Phone call': return <Phone className="h-4 w-4" />;
      case 'In-person': return <MapPin className="h-4 w-4" />;
      default: return <CalendarIcon className="h-4 w-4" />;
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
          <h1 className="text-3xl font-bold">Consultations & Appointments</h1>
          <p className="text-muted-foreground">Schedule and manage patient consultations</p>
        </div>
        
        <Dialog open={isBookingDialogOpen} onOpenChange={setIsBookingDialogOpen}>
          <DialogTrigger asChild>
            <Button className="glow-button">
              <Plus className="mr-2 h-4 w-4" />
              Book Appointment
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Book New Appointment</DialogTitle>
              <DialogDescription>
                Schedule a consultation with a patient.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="appointment-patient">Patient *</Label>
                <Select value={newAppointment.patientId} onValueChange={(value:any) => setNewAppointment({ ...newAppointment, patientId: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select patient" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockPatients.map(patient => (
                      <SelectItem key={patient.id} value={patient.id.toString()}>
                        {patient.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="appointment-date">Date *</Label>
                  <Input
                    id="appointment-date"
                    type="date"
                    value={newAppointment.date}
                    onChange={(e) => setNewAppointment({ ...newAppointment, date: e.target.value })}
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="appointment-time">Time *</Label>
                  <Select value={newAppointment.time} onValueChange={(value:any) => setNewAppointment({ ...newAppointment, time: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeSlots.map(time => (
                        <SelectItem key={time} value={time}>
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="appointment-type">Consultation Type</Label>
                <Select value={newAppointment.type} onValueChange={(value:any) => setNewAppointment({ ...newAppointment, type: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="In-person">In-person</SelectItem>
                    <SelectItem value="Video call">Video call</SelectItem>
                    <SelectItem value="Phone call">Phone call</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="appointment-reason">Reason for Visit *</Label>
                <Input
                  id="appointment-reason"
                  placeholder="Routine checkup, follow-up, etc."
                  value={newAppointment.reason}
                  onChange={(e) => setNewAppointment({ ...newAppointment, reason: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="appointment-notes">Notes</Label>
                <Textarea
                  id="appointment-notes"
                  placeholder="Additional notes or instructions..."
                  value={newAppointment.notes}
                  onChange={(e) => setNewAppointment({ ...newAppointment, notes: e.target.value })}
                  rows={3}
                />
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline" onClick={() => setIsBookingDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleBookAppointment} className="glow-button">
                  Book Appointment
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Calendar Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-1"
        >
          <Card className="glass">
            <CardHeader>
              <CardTitle className="text-lg">Calendar</CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={(date:Date) => date && setSelectedDate(date)}
                className="rounded-md border"
              />
            </CardContent>
          </Card>
        </motion.div>

        {/* Appointments List */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-3 space-y-6"
        >
          {/* Search and Filters */}
          <Card className="glass">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search appointments by patient or reason..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-40">
                    <Filter className="mr-2 h-4 w-4" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="confirmed">Confirmed</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Appointments for Selected Date */}
          <Card className="glass">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CalendarIcon className="h-5 w-5" />
                <span>Appointments for {selectedDate.toLocaleDateString()}</span>
              </CardTitle>
              <CardDescription>
                {filteredAppointments.length} appointment{filteredAppointments.length !== 1 ? 's' : ''} scheduled
              </CardDescription>
            </CardHeader>
            <CardContent>
              {filteredAppointments.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <CalendarIcon className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No appointments scheduled for this date</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredAppointments
                    .sort((a, b) => a.time.localeCompare(b.time))
                    .map((appointment) => (
                      <motion.div
                        key={appointment.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        whileHover={{ scale: 1.02 }}
                        className="border rounded-lg p-4 space-y-3"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <Avatar className="h-10 w-10">
                              <AvatarFallback className="bg-primary text-primary-foreground">
                                {appointment.patientAvatar}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <h4 className="font-medium">{appointment.patientName}</h4>
                              <p className="text-sm text-muted-foreground">{appointment.patientPhone}</p>
                            </div>
                          </div>
                          <Badge className={getStatusColor(appointment.status)}>
                            {appointment.status}
                          </Badge>
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div className="flex items-center space-x-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span>{appointment.time} - {appointment.endTime}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            {getTypeIcon(appointment.type)}
                            <span>{appointment.type}</span>
                          </div>
                        </div>

                        <div>
                          <p className="font-medium text-sm">{appointment.reason}</p>
                          {appointment.notes && (
                            <p className="text-sm text-muted-foreground mt-1">{appointment.notes}</p>
                          )}
                        </div>

                        <div className="flex justify-end space-x-2 pt-2">
                          {appointment.status === 'pending' && (
                            <>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleConfirmAppointment(appointment.id)}
                                className="text-green-600 hover:text-green-700"
                              >
                                <CheckCircle className="h-4 w-4 mr-1" />
                                Confirm
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleCancelAppointment(appointment.id)}
                                className="text-red-600 hover:text-red-700"
                              >
                                <XCircle className="h-4 w-4 mr-1" />
                                Cancel
                              </Button>
                            </>
                          )}
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteAppointment(appointment.id)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </motion.div>
                    ))}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}