import { motion } from 'motion/react';
import { 
  Users, 
  Calendar, 
  Pill, 
  FileText, 
  TrendingUp, 
  Clock, 
  Activity,
  Heart,
  AlertCircle,
  CheckCircle
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const statsData = [
  { id: 1, title: 'Total Patients', value: '1,247', change: '+12%', icon: Users, color: 'text-blue-600' },
  { id: 2, title: 'Upcoming Appointments', value: '24', change: '+8%', icon: Calendar, color: 'text-green-600' },
  { id: 3, title: 'Pending Prescriptions', value: '7', change: '-2%', icon: Pill, color: 'text-orange-600' },
  { id: 4, title: 'Recent Records Updated', value: '89', change: '+15%', icon: FileText, color: 'text-purple-600' },
];

const visitData = [
  { name: 'Mon', visits: 12, consultations: 8 },
  { name: 'Tue', visits: 19, consultations: 15 },
  { name: 'Wed', visits: 15, consultations: 12 },
  { name: 'Thu', visits: 22, consultations: 18 },
  { name: 'Fri', visits: 28, consultations: 24 },
  { name: 'Sat', visits: 18, consultations: 14 },
  { name: 'Sun', visits: 8, consultations: 6 },
];

const upcomingAppointments = [
  {
    id: 1,
    patient: 'John Smith',
    time: '09:00 AM',
    type: 'Cardiology Consultation',
    status: 'confirmed',
    avatar: 'JS'
  },
  {
    id: 2,
    patient: 'Emily Davis',
    time: '10:30 AM',
    type: 'Follow-up',
    status: 'pending',
    avatar: 'ED'
  },
  {
    id: 3,
    patient: 'Michael Johnson',
    time: '02:00 PM',
    type: 'Annual Checkup',
    status: 'confirmed',
    avatar: 'MJ'
  }
];

const notifications = [
  {
    id: 1,
    type: 'alert',
    message: 'Lab results for Patient #1247 are ready for review',
    time: '10 minutes ago',
    icon: AlertCircle,
    color: 'text-red-500'
  },
  {
    id: 2,
    type: 'success',
    message: 'Prescription for Emily Davis has been sent to pharmacy',
    time: '25 minutes ago',
    icon: CheckCircle,
    color: 'text-green-500'
  },
  {
    id: 3,
    type: 'info',
    message: 'New patient registration: Michael Johnson',
    time: '1 hour ago',
    icon: Users,
    color: 'text-blue-500'
  }
];

export function Dashboard() {
  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-2"
      >
        <h1 className="text-3xl font-bold">Welcome back, Dr. Sarah Johnson</h1>
        <p className="text-muted-foreground">
          Here's what's happening with your practice today.
        </p>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {statsData.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 * index }}
              whileHover={{ scale: 1.02 }}
            >
              <Card className="glass">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        {stat.title}
                      </p>
                      <p className="text-2xl font-bold">{stat.value}</p>
                      <p className={`text-sm ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                        {stat.change} from last week
                      </p>
                    </div>
                    <Icon className={`h-8 w-8 ${stat.color}`} />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Patient Visits Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2"
        >
          <Card className="glass">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5" />
                <span>Patient Visits This Week</span>
              </CardTitle>
              <CardDescription>
                Daily patient visits and consultations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={visitData}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                      border: '1px solid rgba(0, 0, 0, 0.1)',
                      borderRadius: '8px'
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="visits"
                    stackId="1"
                    stroke="#10b981"
                    fill="#10b981"
                    fillOpacity={0.6}
                  />
                  <Area
                    type="monotone"
                    dataKey="consultations"
                    stackId="1"
                    stroke="#1a5e3d"
                    fill="#1a5e3d"
                    fillOpacity={0.8}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Upcoming Appointments */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="glass">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="h-5 w-5" />
                <span>Today's Schedule</span>
              </CardTitle>
              <CardDescription>Upcoming appointments</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingAppointments.map((appointment) => (
                <motion.div
                  key={appointment.id}
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center space-x-3 p-3 rounded-lg bg-accent/50"
                >
                  <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
                    {appointment.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{appointment.patient}</p>
                    <p className="text-xs text-muted-foreground">{appointment.type}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{appointment.time}</p>
                    <Badge 
                      variant={appointment.status === 'confirmed' ? 'default' : 'secondary'}
                      className="text-xs"
                    >
                      {appointment.status}
                    </Badge>
                  </div>
                </motion.div>
              ))}
              <Button variant="outline" className="w-full">
                View All Appointments
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Notifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="glass">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Activity className="h-5 w-5" />
                <span>Recent Activity</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {notifications.map((notification) => {
                const Icon = notification.icon;
                return (
                  <motion.div
                    key={notification.id}
                    whileHover={{ scale: 1.01 }}
                    className="flex items-start space-x-3 p-3 rounded-lg hover:bg-accent/50 transition-colors"
                  >
                    <Icon className={`h-5 w-5 mt-0.5 ${notification.color}`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm">{notification.message}</p>
                      <p className="text-xs text-muted-foreground">{notification.time}</p>
                    </div>
                  </motion.div>
                );
              })}
              <Button variant="outline" className="w-full">
                View All Notifications
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="glass">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Heart className="h-5 w-5" />
                <span>Quick Actions</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start glow-button" variant="default">
                <Users className="mr-2 h-4 w-4" />
                Add New Patient
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Calendar className="mr-2 h-4 w-4" />
                Schedule Appointment
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Pill className="mr-2 h-4 w-4" />
                Create Prescription
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <FileText className="mr-2 h-4 w-4" />
                View Medical Records
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}