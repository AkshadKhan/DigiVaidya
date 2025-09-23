
// "use client";

// import { useState } from "react";
// import { motion } from "framer-motion";
// import jsPDF from "jspdf";
// import {
//   Search,
//   Plus,
//   FileText,
//   Upload,
//   Download,
//   Eye,
//   Edit,
//   Trash2,
//   Activity,
//   Pill,
//   ClipboardList,
//   Image as ImageIcon,
//   File,
// } from "lucide-react";
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
// } from "./ui/card";
// import { Button } from "./ui/button";
// import { Input } from "./ui/input";
// import { Label } from "./ui/label";
// import { Textarea } from "./ui/textarea";
// import { Badge } from "./ui/badge";
// import {
//   Tabs,
//   TabsContent,
//   TabsList,
//   TabsTrigger,
// } from "./ui/tabs";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "./ui/table";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "./ui/dialog";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "./ui/select";
// import { Avatar, AvatarFallback } from "./ui/avatar";
// import { toast } from "sonner";

// const mockRecords = [
//   {
//     id: 1,
//     patientId: 1,
//     patientName: "John Smith",
//     patientAvatar: "JS",
//     date: "2024-01-20",
//     type: "Consultation",
//     symptoms: "Chest pain, shortness of breath",
//     diagnosis: "Hypertension, mild cardiac stress",
//     treatment:
//       "Prescribed Lisinopril 10mg daily, recommended diet changes",
//     notes: "Patient responded well to treatment. Follow-up in 2 weeks.",
//     attachments: [
//       { name: "ECG_Report.pdf", type: "pdf", size: "2.3 MB" },
//       { name: "Chest_Xray.jpg", type: "image", size: "1.8 MB" },
//     ],
//     status: "completed",
//   },
//   {
//     id: 2,
//     patientId: 2,
//     patientName: "Emily Davis",
//     patientAvatar: "ED",
//     date: "2024-01-18",
//     type: "Follow-up",
//     symptoms: "Blood sugar fluctuations, fatigue",
//     diagnosis: "Diabetes Type 2 - adjustment needed",
//     treatment: "Adjusted insulin dosage, dietary counseling",
//     notes: "Blood glucose levels improving with new regimen.",
//     attachments: [
//       { name: "Blood_Test_Results.pdf", type: "pdf", size: "1.2 MB" },
//     ],
//     status: "completed",
//   },
// ];

// const mockPatients = [
//   { id: 1, name: "John Smith", avatar: "JS" },
//   { id: 2, name: "Emily Davis", avatar: "ED" },
//   { id: 3, name: "Michael Johnson", avatar: "MJ" },
//   { id: 4, name: "Sarah Wilson", avatar: "SW" },
// ];

// export function RecordsPage() {
//   const [records, setRecords] = useState(mockRecords);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [selectedRecord, setSelectedRecord] =
//     useState<typeof mockRecords[0] | null>(null);
//   const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
//   const [activeTab, setActiveTab] = useState("history");
//   const [newRecord, setNewRecord] = useState({
//     patientId: "",
//     type: "",
//     symptoms: "",
//     diagnosis: "",
//     treatment: "",
//     notes: "",
//   });

//   const filteredRecords = records.filter(
//     (record) =>
//       record.patientName
//         .toLowerCase()
//         .includes(searchQuery.toLowerCase()) ||
//       record.symptoms
//         .toLowerCase()
//         .includes(searchQuery.toLowerCase()) ||
//       record.diagnosis
//         .toLowerCase()
//         .includes(searchQuery.toLowerCase())
//   );

//   // ✅ Export to PDF
//   const handleExportPDF = (record: typeof mockRecords[0]) => {
//     const doc = new jsPDF();

//     doc.setFontSize(18);
//     doc.text("Medical Record", 20, 20);

//     doc.setFontSize(12);
//     doc.text(`Patient: ${record.patientName}`, 20, 40);
//     doc.text(`Date: ${record.date}`, 20, 50);
//     doc.text(`Visit Type: ${record.type}`, 20, 60);
//     doc.text(`Symptoms: ${record.symptoms}`, 20, 70);
//     doc.text(`Diagnosis: ${record.diagnosis}`, 20, 80);
//     doc.text(`Treatment: ${record.treatment}`, 20, 90);
//     doc.text(`Notes: ${record.notes}`, 20, 100);

//     doc.save(`${record.patientName}_Record.pdf`);
//   };

//   // ✅ Upload new file to record
//   const handleFileUpload = (
//     event: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     if (!selectedRecord || !event.target.files?.length) return;

//     const file = event.target.files[0];
//     const updatedRecord = {
//       ...selectedRecord,
//       attachments: [
//         ...selectedRecord.attachments,
//         {
//           name: file.name,
//           type: file.type.includes("image") ? "image" : "pdf",
//           size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
//         },
//       ],
//     };

//     setRecords(
//       records.map((r) =>
//         r.id === selectedRecord.id ? updatedRecord : r
//       )
//     );
//     setSelectedRecord(updatedRecord);
//     toast.success("File uploaded successfully!");
//   };

//   const handleAddRecord = () => {
//     if (!newRecord.patientId || !newRecord.symptoms || !newRecord.diagnosis) {
//       toast.error("Please fill in all required fields");
//       return;
//     }

//     const patient = mockPatients.find(
//       (p) => p.id === parseInt(newRecord.patientId)
//     );
//     if (!patient) return;

//     if (!newRecord.patientId || !newRecord.symptoms || !newRecord.diagnosis) {
//     toast.error("Please fill in all required fields");
//     return;
//   }

//   // const patient = mockPatients.find(
//   //   (p) => p.id === parseInt(newRecord.patientId)
//   // );
//   // if (!patient) return;

//   const record = {
//     id: records.length + 1,
//     ...newRecord, // spread first
//     patientId: parseInt(newRecord.patientId), // then override with integer
//     patientName: patient.name,
//     patientAvatar: patient.avatar,
//     date: new Date().toISOString().split("T")[0],
//     attachments: [],
//     status: "draft",
//   };

//   setRecords([record, ...records]);
//   setNewRecord({
//     patientId: "",
//     type: "",
//     symptoms: "",
//     diagnosis: "",
//     treatment: "",
//     notes: "",
//   });
//   setIsAddDialogOpen(false);
//   toast.success("Medical record created successfully!");

//     setRecords([record, ...records]);
//     setNewRecord({
//       patientId: "",
//       type: "",
//       symptoms: "",
//       diagnosis: "",
//       treatment: "",
//       notes: "",
//     });
//     setIsAddDialogOpen(false);
//     toast.success("Medical record created successfully!");
//   };

//   const handleDeleteRecord = (id: number) => {
//     setRecords(records.filter((r) => r.id !== id));
//     toast.success("Record deleted successfully");
//   };

//   const getTypeColor = (type: string) => {
//     switch (type.toLowerCase()) {
//       case "consultation":
//         return "bg-blue-100 text-blue-800";
//       case "follow-up":
//         return "bg-green-100 text-green-800";
//       case "annual checkup":
//         return "bg-purple-100 text-purple-800";
//       case "emergency":
//         return "bg-red-100 text-red-800";
//       default:
//         return "bg-gray-100 text-gray-800";
//     }
//   };

//   return (
//     <div className="max-w-7xl mx-auto p-6 space-y-6">
//       {/* Header */}
//       <motion.div
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
//       >
//         <div>
//           <h1 className="text-3xl font-bold">Medical Records</h1>
//           <p className="text-muted-foreground">
//             Digital electronic medical records management
//           </p>
//         </div>
//       </motion.div>

//       {/* Search */}
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 0.1 }}
//       >
//         <Card className="glass">
//           <CardContent className="p-6">
//             <div className="relative">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//               <Input
//                 placeholder="Search records by patient name, symptoms, or diagnosis..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="pl-10"
//               />
//             </div>
//           </CardContent>
//         </Card>
//       </motion.div>

//       {/* Records Table */}
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 0.2 }}
//       >
//         <Card className="glass">
//           <CardHeader>
//             <CardTitle>
//               Medical Records ({filteredRecords.length})
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             <Table>
//               <TableHeader>
//                 <TableRow>
//                   <TableHead>Patient</TableHead>
//                   <TableHead>Date</TableHead>
//                   <TableHead>Type</TableHead>
//                   <TableHead>Diagnosis</TableHead>
//                   <TableHead>Status</TableHead>
//                   <TableHead>Actions</TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {filteredRecords.map((record) => (
//                   <motion.tr
//                     key={record.id}
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     whileHover={{
//                       backgroundColor: "rgba(0, 0, 0, 0.02)",
//                     }}
//                   >
//                     <TableCell className="font-medium">
//                       <div className="flex items-center space-x-3">
//                         <Avatar className="h-8 w-8">
//                           <AvatarFallback className="bg-primary text-primary-foreground text-xs">
//                             {record.patientAvatar}
//                           </AvatarFallback>
//                         </Avatar>
//                         <span>{record.patientName}</span>
//                       </div>
//                     </TableCell>
//                     <TableCell>{record.date}</TableCell>
//                     <TableCell>
//                       <Badge className={getTypeColor(record.type)}>
//                         {record.type}
//                       </Badge>
//                     </TableCell>
//                     <TableCell className="max-w-xs truncate">
//                       {record.diagnosis}
//                     </TableCell>
//                     <TableCell>
//                       <Badge
//                         variant={
//                           record.status === "completed"
//                             ? "default"
//                             : "secondary"
//                         }
//                       >
//                         {record.status}
//                       </Badge>
//                     </TableCell>
//                     <TableCell>
//                       <div className="flex space-x-2">
//                         <Button
//                           variant="ghost"
//                           size="sm"
//                           onClick={() => setSelectedRecord(record)}
//                         >
//                           <Eye className="h-4 w-4" />
//                         </Button>
//                         <Button variant="ghost" size="sm">
//                           <Edit className="h-4 w-4" />
//                         </Button>
//                         <Button
//                           variant="ghost"
//                           size="sm"
//                           onClick={() => handleDeleteRecord(record.id)}
//                           className="text-destructive hover:text-destructive"
//                         >
//                           <Trash2 className="h-4 w-4" />
//                         </Button>
//                       </div>
//                     </TableCell>
//                   </motion.tr>
//                 ))}
//               </TableBody>
//             </Table>
//           </CardContent>
//         </Card>
//       </motion.div>

//       {/* Record Details Dialog */}
//       <Dialog
//         open={!!selectedRecord}
//         onOpenChange={() => setSelectedRecord(null)}
//       >
//         <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
//           {selectedRecord && (
//             <>
//               <DialogHeader>
//                 <DialogTitle className="flex items-center space-x-3">
//                   <Avatar className="h-10 w-10">
//                     <AvatarFallback className="bg-primary text-primary-foreground">
//                       {selectedRecord.patientAvatar}
//                     </AvatarFallback>
//                   </Avatar>
//                   <div>
//                     <h2>
//                       {selectedRecord.patientName} - Medical Record
//                     </h2>
//                     <p className="text-sm text-muted-foreground">
//                       {selectedRecord.date} | {selectedRecord.type}
//                     </p>
//                   </div>
//                 </DialogTitle>
//               </DialogHeader>

//               <Tabs
//                 value={activeTab}
//                 onValueChange={setActiveTab}
//                 className="w-full"
//               >
//                 <TabsList className="grid w-full grid-cols-4">
//                   <TabsTrigger value="history">
//                     <ClipboardList className="h-4 w-4 mr-1" /> History
//                   </TabsTrigger>
//                   <TabsTrigger value="diagnosis">
//                     <Activity className="h-4 w-4 mr-1" /> Diagnosis
//                   </TabsTrigger>
//                   <TabsTrigger value="prescriptions">
//                     <Pill className="h-4 w-4 mr-1" /> Prescriptions
//                   </TabsTrigger>
//                   <TabsTrigger value="notes">
//                     <FileText className="h-4 w-4 mr-1" /> Notes
//                   </TabsTrigger>
//                 </TabsList>

//                 <TabsContent value="notes" className="space-y-4">
//                   <Card>
//                     <CardHeader>
//                       <CardTitle>
//                         Additional Notes & Attachments
//                       </CardTitle>
//                     </CardHeader>
//                     <CardContent className="space-y-4">
//                       <div>
//                         <Label>Doctor's Notes</Label>
//                         <p className="mt-1">
//                           {selectedRecord.notes || "No notes"}
//                         </p>
//                       </div>

//                       {selectedRecord.attachments.length > 0 && (
//                         <div>
//                           <Label>Attachments</Label>
//                           <div className="mt-2 space-y-2">
//                             {selectedRecord.attachments.map(
//                               (attachment, index) => (
//                                 <div
//                                   key={index}
//                                   className="flex items-center justify-between p-3 bg-accent/50 rounded-lg"
//                                 >
//                                   <div className="flex items-center space-x-3">
//                                     {attachment.type === "image" ? (
//                                       <ImageIcon className="h-5 w-5 text-muted-foreground" />
//                                     ) : (
//                                       <File className="h-5 w-5 text-muted-foreground" />
//                                     )}
//                                     <div>
//                                       <p className="text-sm font-medium">
//                                         {attachment.name}
//                                       </p>
//                                       <p className="text-xs text-muted-foreground">
//                                         {attachment.size}
//                                       </p>
//                                     </div>
//                                   </div>
//                                   <Button variant="ghost" size="sm">
//                                     <Download className="h-4 w-4" />
//                                   </Button>
//                                 </div>
//                               )
//                             )}
//                           </div>
//                         </div>
//                       )}

//                       {/* ✅ File Upload */}
//                       <div className="pt-4 border-t">
//                         <label className="w-full">
//                           <input
//                             type="file"
//                             className="hidden"
//                             accept="application/pdf,image/*"
//                             onChange={handleFileUpload}
//                           />
//                           <Button variant="outline" className="w-full">
//                             <Upload className="mr-2 h-4 w-4" />
//                             Upload File
//                           </Button>
//                         </label>
//                       </div>
//                     </CardContent>
//                   </Card>
//                 </TabsContent>
//               </Tabs>

//               {/* ✅ Footer Actions */}
//               <div className="flex justify-end space-x-2 pt-4 border-t">
//                 <Button
//                   variant="outline"
//                   onClick={() => handleExportPDF(selectedRecord)}
//                 >
//                   <Download className="mr-2 h-4 w-4" />
//                   Export PDF
//                 </Button>
//                 <Button variant="outline">
//                   <Pill className="mr-2 h-4 w-4" />
//                   Create Prescription
//                 </Button>
//                 <Button className="glow-button">
//                   <Edit className="mr-2 h-4 w-4" />
//                   Edit Record
//                 </Button>
//               </div>
//             </>
//           )}
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// }


"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import jsPDF from "jspdf";
import {
  Search,
  Plus,
  FileText,
  Upload,
  Download,
  Eye,
  Edit,
  Trash2,
  Activity,
  Pill,
  ClipboardList,
  Image as ImageIcon,
  File,
} from "lucide-react";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Badge } from "./ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "./ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Avatar, AvatarFallback } from "./ui/avatar";

// Mock Data
const mockPatients = [
  { id: 1, name: "John Smith", avatar: "JS" },
  { id: 2, name: "Emily Davis", avatar: "ED" },
  { id: 3, name: "Michael Johnson", avatar: "MJ" },
  { id: 4, name: "Sarah Wilson", avatar: "SW" },
];

const mockRecords = [
  {
    id: 1,
    patientId: 1,
    patientName: "John Smith",
    patientAvatar: "JS",
    date: "2024-01-20",
    type: "Consultation",
    symptoms: "Chest pain, shortness of breath",
    diagnosis: "Hypertension, mild cardiac stress",
    treatment:
      "Prescribed Lisinopril 10mg daily, recommended diet changes",
    notes: "Patient responded well to treatment. Follow-up in 2 weeks.",
    attachments: [
      { name: "ECG_Report.pdf", type: "pdf", size: "2.3 MB" },
      { name: "Chest_Xray.jpg", type: "image", size: "1.8 MB" },
    ],
    status: "completed",
  },
  {
    id: 2,
    patientId: 2,
    patientName: "Emily Davis",
    patientAvatar: "ED",
    date: "2024-01-18",
    type: "Follow-up",
    symptoms: "Blood sugar fluctuations, fatigue",
    diagnosis: "Diabetes Type 2 - adjustment needed",
    treatment: "Adjusted insulin dosage, dietary counseling",
    notes: "Blood glucose levels improving with new regimen.",
    attachments: [
      { name: "Blood_Test_Results.pdf", type: "pdf", size: "1.2 MB" },
    ],
    status: "completed",
  },
];

export function RecordsPage() {
  const [records, setRecords] = useState(mockRecords);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRecord, setSelectedRecord] =
    useState<typeof mockRecords[0] | null>(null);
  const [activeTab, setActiveTab] = useState("history");
  const [isAddEditDialogOpen, setIsAddEditDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    patientId: "",
    type: "",
    symptoms: "",
    diagnosis: "",
    treatment: "",
    notes: "",
  });

  const filteredRecords = records.filter(
    (record) =>
      record.patientName
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      record.symptoms
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      record.diagnosis
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
  );

  // --------------------- Handlers ---------------------

  // Add or Edit Record
  const handleSaveRecord = () => {
    if (!formData.patientId || !formData.symptoms || !formData.diagnosis) {
      toast.error("Please fill in all required fields");
      return;
    }

    const patient = mockPatients.find(
      (p) => p.id === parseInt(formData.patientId)
    );
    if (!patient) return;

    if (isEditing && selectedRecord) {
      // Edit existing
      const updatedRecord = {
        ...selectedRecord,
        ...formData,
        patientId: parseInt(formData.patientId),
        patientName: patient.name,
        patientAvatar: patient.avatar,
      };
      setRecords(records.map((r) => (r.id === selectedRecord.id ? updatedRecord : r)));
      setSelectedRecord(updatedRecord);
      toast.success("Record updated successfully!");
    } else {
      // Add new
      const newRecord = {
        id: records.length + 1,
        ...formData,
        patientId: parseInt(formData.patientId),
        patientName: patient.name,
        patientAvatar: patient.avatar,
        date: new Date().toISOString().split("T")[0],
        attachments: [],
        status: "draft",
      };
      setRecords([newRecord, ...records]);
      toast.success("Record added successfully!");
    }

    setFormData({
      patientId: "",
      type: "",
      symptoms: "",
      diagnosis: "",
      treatment: "",
      notes: "",
    });
    setIsAddEditDialogOpen(false);
    setIsEditing(false);
  };

  // Delete record
  const handleDeleteRecord = (id: number) => {
    setRecords(records.filter((r) => r.id !== id));
    toast.success("Record deleted successfully");
  };

  // Export PDF
  const handleExportPDF = (record: typeof mockRecords[0]) => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Medical Record", 20, 20);
    doc.setFontSize(12);
    doc.text(`Patient: ${record.patientName}`, 20, 40);
    doc.text(`Date: ${record.date}`, 20, 50);
    doc.text(`Visit Type: ${record.type}`, 20, 60);
    doc.text(`Symptoms: ${record.symptoms}`, 20, 70);
    doc.text(`Diagnosis: ${record.diagnosis}`, 20, 80);
    doc.text(`Treatment: ${record.treatment}`, 20, 90);
    doc.text(`Notes: ${record.notes}`, 20, 100);
    doc.save(`${record.patientName}_Record.pdf`);
  };

  // File upload
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!selectedRecord || !event.target.files?.length) return;
    const file = event.target.files[0];
    const updatedRecord = {
      ...selectedRecord,
      attachments: [
        ...selectedRecord.attachments,
        {
          name: file.name,
          type: file.type.includes("image") ? "image" : "pdf",
          size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
        },
      ],
    };
    setRecords(records.map((r) => (r.id === selectedRecord.id ? updatedRecord : r)));
    setSelectedRecord(updatedRecord);
    toast.success("File uploaded successfully!");
  };

  // Edit record button
  const openEditDialog = (record: typeof mockRecords[0]) => {
    setIsEditing(true);
    setFormData({
      patientId: record.patientId.toString(),
      type: record.type,
      symptoms: record.symptoms,
      diagnosis: record.diagnosis,
      treatment: record.treatment,
      notes: record.notes,
    });
    setIsAddEditDialogOpen(true);
  };

  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case "consultation":
        return "bg-blue-100 text-blue-800";
      case "follow-up":
        return "bg-green-100 text-green-800";
      case "annual checkup":
        return "bg-purple-100 text-purple-800";
      case "emergency":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // --------------------- JSX ---------------------

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold">Medical Records</h1>
          <p className="text-muted-foreground">
            Digital electronic medical records management
          </p>
        </div>
        <Button onClick={() => setIsAddEditDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Record
        </Button>
      </motion.div>

      {/* Search */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <Card className="glass">
          <CardContent className="p-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search records by patient name, symptoms, or diagnosis..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Records Table */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <Card className="glass">
          <CardHeader>
            <CardTitle>Medical Records ({filteredRecords.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Patient</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Diagnosis</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRecords.map((record) => (
                  <motion.tr key={record.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} whileHover={{ backgroundColor: "rgba(0,0,0,0.02)" }}>
                    <TableCell className="font-medium">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                            {record.patientAvatar}
                          </AvatarFallback>
                        </Avatar>
                        <span>{record.patientName}</span>
                      </div>
                    </TableCell>
                    <TableCell>{record.date}</TableCell>
                    <TableCell>
                      <Badge className={getTypeColor(record.type)}>{record.type}</Badge>
                    </TableCell>
                    <TableCell className="max-w-xs truncate">{record.diagnosis}</TableCell>
                    <TableCell>
                      <Badge variant={record.status === "completed" ? "default" : "secondary"}>
                        {record.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm" onClick={() => setSelectedRecord(record)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => openEditDialog(record)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteRecord(record.id)}
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

      {/* Add/Edit Dialog */}
      <Dialog open={isAddEditDialogOpen} onOpenChange={() => { setIsAddEditDialogOpen(false); setIsEditing(false); }}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle>{isEditing ? "Edit Record" : "Add New Record"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Label>Patient</Label>
            <Select value={formData.patientId} onValueChange={(v:any) => setFormData({ ...formData, patientId: v })}>
              <SelectTrigger>
                <SelectValue placeholder="Select Patient" />
              </SelectTrigger>
              <SelectContent>
                {mockPatients.map((p) => (
                  <SelectItem key={p.id} value={p.id.toString()}>{p.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Label>Type</Label>
            <Input value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })} placeholder="Consultation / Follow-up / etc." />

            <Label>Symptoms</Label>
            <Textarea value={formData.symptoms} onChange={(e) => setFormData({ ...formData, symptoms: e.target.value })} />

            <Label>Diagnosis</Label>
            <Textarea value={formData.diagnosis} onChange={(e) => setFormData({ ...formData, diagnosis: e.target.value })} />

            <Label>Treatment</Label>
            <Textarea value={formData.treatment} onChange={(e) => setFormData({ ...formData, treatment: e.target.value })} />

            <Label>Notes</Label>
            <Textarea value={formData.notes} onChange={(e) => setFormData({ ...formData, notes: e.target.value })} />

            <div className="flex justify-end space-x-2 pt-2">
              <Button variant="outline" onClick={() => { setIsAddEditDialogOpen(false); setIsEditing(false); }}>Cancel</Button>
              <Button onClick={handleSaveRecord}>{isEditing ? "Update" : "Add"}</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Record Details Dialog */}
      <Dialog open={!!selectedRecord} onOpenChange={() => setSelectedRecord(null)}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          {selectedRecord && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center space-x-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {selectedRecord.patientAvatar}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h2>{selectedRecord.patientName} - Medical Record</h2>
                    <p className="text-sm text-muted-foreground">{selectedRecord.date} | {selectedRecord.type}</p>
                  </div>
                </DialogTitle>
              </DialogHeader>

              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="history"><ClipboardList className="h-4 w-4 mr-1" /> History</TabsTrigger>
                  <TabsTrigger value="diagnosis"><Activity className="h-4 w-4 mr-1" /> Diagnosis</TabsTrigger>
                  <TabsTrigger value="prescriptions"><Pill className="h-4 w-4 mr-1" /> Prescriptions</TabsTrigger>
                  <TabsTrigger value="notes"><FileText className="h-4 w-4 mr-1" /> Notes</TabsTrigger>
                </TabsList>

                <TabsContent value="history">History content goes here.</TabsContent>
                <TabsContent value="diagnosis">{selectedRecord.diagnosis}</TabsContent>
                <TabsContent value="prescriptions">{selectedRecord.treatment}</TabsContent>
                <TabsContent value="notes" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Additional Notes & Attachments</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label>Doctor's Notes</Label>
                        <p className="mt-1">{selectedRecord.notes || "No notes"}</p>
                      </div>
                      {selectedRecord.attachments.length > 0 && (
                        <div>
                          <Label>Attachments</Label>
                          <div className="mt-2 space-y-2">
                            {selectedRecord.attachments.map((attachment, idx) => (
                              <div key={idx} className="flex items-center justify-between p-3 bg-accent/50 rounded-lg">
                                <div className="flex items-center space-x-3">
                                  {attachment.type === "image" ? <ImageIcon className="h-5 w-5 text-muted-foreground" /> : <File className="h-5 w-5 text-muted-foreground" />}
                                  <div>
                                    <p className="text-sm font-medium">{attachment.name}</p>
                                    <p className="text-xs text-muted-foreground">{attachment.size}</p>
                                  </div>
                                </div>
                                <Button variant="ghost" size="sm"><Download className="h-4 w-4" /></Button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      <div className="pt-4 border-t">
                        <label className="w-full">
                          <input type="file" className="hidden" accept="application/pdf,image/*" onChange={handleFileUpload} />
                          <Button variant="outline" className="w-full">
                            <Upload className="mr-2 h-4 w-4" /> Upload File
                          </Button>
                        </label>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>

              {/* Footer Actions */}
              <div className="flex justify-end space-x-2 pt-4 border-t">
                <Button variant="outline" onClick={() => handleExportPDF(selectedRecord)}>
                  <Download className="mr-2 h-4 w-4" /> Export PDF
                </Button>
                <Button variant="outline"><Pill className="mr-2 h-4 w-4" /> Create Prescription</Button>
                <Button className="glow-button" onClick={() => openEditDialog(selectedRecord)}>
                  <Edit className="mr-2 h-4 w-4" /> Edit Record
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
