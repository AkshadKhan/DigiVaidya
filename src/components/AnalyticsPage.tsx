import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  TrendingUp, 
  Users, 
  Calendar, 
  Activity,
  Clock,
  FileText,
  Download,
  Filter,
  BarChart3,
  PieChart,
  LineChart
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { toast } from 'sonner';
import { 
  LineChart as RechartsLineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart as RechartsBarChart,
  Bar,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';

const patientGrowthData = [
  { month: 'Jan', newPatients: 45, returningPatients: 120 },
  { month: 'Feb', newPatients: 52, returningPatients: 135 },
  { month: 'Mar', newPatients: 38, returningPatients: 140 },
  { month: 'Apr', newPatients: 61, returningPatients: 158 },
  { month: 'May', newPatients: 55, returningPatients: 162 },
  { month: 'Jun', newPatients: 67, returningPatients: 175 },
  { month: 'Jul', newPatients: 73, returningPatients: 182 },
  { month: 'Aug', newPatients: 59, returningPatients: 195 },
  { month: 'Sep', newPatients: 68, returningPatients: 208 },
  { month: 'Oct', newPatients: 72, returningPatients: 215 },
  { month: 'Nov', newPatients: 81, returningPatients: 228 },
  { month: 'Dec', newPatients: 85, returningPatients: 242 }
];

const commonAilmentsData = [
  { name: 'Hypertension', value: 28, color: '#10b981' },
  { name: 'Diabetes', value: 24, color: '#059669' },
  { name: 'Heart Disease', value: 18, color: '#047857' },
  { name: 'Respiratory Issues', value: 15, color: '#065f46' },
  { name: 'Mental Health', value: 10, color: '#064e3b' },
  { name: 'Others', value: 5, color: '#1a5e3d' }
];

const consultationTimeData = [
  { day: 'Mon', avgTime: 22, consultations: 18 },
  { day: 'Tue', avgTime: 25, consultations: 24 },
  { day: 'Wed', avgTime: 23, consultations: 20 },
  { day: 'Thu', avgTime: 28, consultations: 26 },
  { day: 'Fri', avgTime: 30, consultations: 32 },
  { day: 'Sat', avgTime: 26, consultations: 15 },
  { day: 'Sun', avgTime: 24, consultations: 8 }
];

const monthlyRevenueData = [
  { month: 'Jan', revenue: 15400, consultations: 165 },
  { month: 'Feb', revenue: 18200, consultations: 187 },
  { month: 'Mar', revenue: 16800, consultations: 178 },
  { month: 'Apr', revenue: 21500, consultations: 219 },
  { month: 'May', revenue: 19800, consultations: 217 },
  { month: 'Jun', revenue: 23400, consultations: 242 },
  { month: 'Jul', revenue: 25200, consultations: 255 },
  { month: 'Aug', revenue: 22800, consultations: 254 },
  { month: 'Sep', revenue: 26500, consultations: 276 },
  { month: 'Oct', revenue: 24800, consultations: 287 },
  { month: 'Nov', revenue: 28200, consultations: 309 },
  { month: 'Dec', revenue: 31500, consultations: 327 }
];

const keyMetrics = [
  {
    id: 1,
    title: 'Total Patients',
    value: '1,247',
    change: '+12.5%',
    trend: 'up',
    icon: Users,
    color: 'text-blue-600'
  },
  {
    id: 2,
    title: 'Monthly Consultations',
    value: '327',
    change: '+8.2%',
    trend: 'up',
    icon: Calendar,
    color: 'text-green-600'
  },
  {
    id: 3,
    title: 'Avg. Consultation Time',
    value: '25 min',
    change: '-3.1%',
    trend: 'down',
    icon: Clock,
    color: 'text-orange-600'
  },
  {
    id: 4,
    title: 'Monthly Revenue',
    value: '$31,500',
    change: '+15.8%',
    trend: 'up',
    icon: TrendingUp,
    color: 'text-purple-600'
  }
];

export function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState('12months');
  const [selectedMetric, setSelectedMetric] = useState('patients');

  const exportData = (format: string) => {
    // In a real app, this would generate and download the file
    toast.success(`Exporting analytics data as ${format.toUpperCase()}...`);
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
          <h1 className="text-3xl font-bold">Analytics & Reports</h1>
          <p className="text-muted-foreground">Insights into your practice performance and patient data</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-40">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 days</SelectItem>
              <SelectItem value="30days">Last 30 days</SelectItem>
              <SelectItem value="3months">Last 3 months</SelectItem>
              <SelectItem value="12months">Last 12 months</SelectItem>
            </SelectContent>
          </Select>
          
          <Select onValueChange={exportData}>
            <SelectTrigger className="w-32">
              <Download className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Export" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pdf">PDF Report</SelectItem>
              <SelectItem value="csv">CSV Data</SelectItem>
              <SelectItem value="excel">Excel File</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </motion.div>

      {/* Key Metrics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {keyMetrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <motion.div
              key={metric.id}
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
                        {metric.title}
                      </p>
                      <p className="text-2xl font-bold">{metric.value}</p>
                      <div className="flex items-center space-x-1">
                        <TrendingUp className={`h-3 w-3 ${
                          metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                        }`} />
                        <p className={`text-sm ${
                          metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {metric.change}
                        </p>
                      </div>
                    </div>
                    <Icon className={`h-8 w-8 ${metric.color}`} />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Patient Growth Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="glass">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <LineChart className="h-5 w-5" />
                <span>Patient Growth Trend</span>
              </CardTitle>
              <CardDescription>New vs returning patients over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <RechartsLineChart data={patientGrowthData}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                      border: '1px solid rgba(0, 0, 0, 0.1)',
                      borderRadius: '8px'
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="newPatients"
                    stroke="#10b981"
                    strokeWidth={2}
                    name="New Patients"
                  />
                  <Line
                    type="monotone"
                    dataKey="returningPatients"
                    stroke="#1a5e3d"
                    strokeWidth={2}
                    name="Returning Patients"
                  />
                </RechartsLineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Common Ailments */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="glass">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <PieChart className="h-5 w-5" />
                <span>Common Ailments</span>
              </CardTitle>
              <CardDescription>Most frequently treated conditions</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <RechartsPieChart>
                  <Pie
                    dataKey="value"
                    data={commonAilmentsData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label={({ name, value }) => `${name}: ${value}%`}
                  >
                    {commonAilmentsData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </RechartsPieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Consultation Analytics */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="glass">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="h-5 w-5" />
                <span>Weekly Consultation Analysis</span>
              </CardTitle>
              <CardDescription>Average consultation time and volume by day</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <RechartsBarChart data={consultationTimeData}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="consultations" fill="#10b981" name="Consultations" />
                  <Bar dataKey="avgTime" fill="#1a5e3d" name="Avg Time (min)" />
                </RechartsBarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Revenue Tracking */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="glass">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5" />
                <span>Revenue Tracking</span>
              </CardTitle>
              <CardDescription>Monthly revenue and consultation correlation</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <RechartsLineChart data={monthlyRevenueData}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value, name) => [
                      name === 'revenue' ? `$${value.toLocaleString()}` : value,
                      name === 'revenue' ? 'Revenue' : 'Consultations'
                    ]}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="#10b981"
                    strokeWidth={3}
                    name="Revenue"
                  />
                  <Line
                    type="monotone"
                    dataKey="consultations"
                    stroke="#1a5e3d"
                    strokeWidth={2}
                    name="Consultations"
                  />
                </RechartsLineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Summary Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <Card className="glass">
          <CardHeader>
            <CardTitle className="text-lg">Top Performing Day</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Best Day:</span>
                <Badge className="bg-green-100 text-green-800">Friday</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Avg Consultations:</span>
                <span className="font-medium">32</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Avg Revenue:</span>
                <span className="font-medium">$2,950</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass">
          <CardHeader>
            <CardTitle className="text-lg">Patient Demographics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Avg Age:</span>
                <span className="font-medium">42 years</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Gender Split:</span>
                <span className="font-medium">58% F, 42% M</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">New vs Returning:</span>
                <span className="font-medium">25% / 75%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass">
          <CardHeader>
            <CardTitle className="text-lg">Practice Efficiency</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Appointment Utilization:</span>
                <Badge className="bg-green-100 text-green-800">92%</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">No-show Rate:</span>
                <span className="font-medium">3.2%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Patient Satisfaction:</span>
                <Badge className="bg-green-100 text-green-800">4.8/5</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}