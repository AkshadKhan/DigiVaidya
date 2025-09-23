import React, { useState } from 'react';
import { UserPlus } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from './ui/dialog';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { toast } from 'sonner';

type FormData = {
  name: string;
  age: number;
  ageGroup: string;
  gender: string;
  bodyType: string;
  activityLevel: string;
  healthIssues: string[];
  sleepHours: number;
  sleepQuality: string;
  temperaturePreference: string;
  digestion: string;
  skinTexture: string;
  mentalState: string;
  afterMealFeeling: string;
  craveSpecificFoods: string;
  goals: string[];
  dietStrictness: string;
  mainMealsPerDay: number;
  dietType: string;
  recipePortionGuidelines: boolean;
  recipeMealtimeAligned: boolean;
  includeAnimalProtein: boolean;
};

const healthIssueOptions = [
  { id: "none", label: "None" },
  { id: "digestive", label: "Digestive issues" },
  { id: "thyroid", label: "Thyroid/metabolism" },
  { id: "joint", label: "Joint pain" },
  { id: "anxiety", label: "Anxiety/Stress" },
  { id: "others", label: "Others" },
];

const goalOptions = [
  { id: "weight-loss", label: "Weight loss" },
  { id: "weight-gain", label: "Weight gain" },
  { id: "maintain-weight", label: "Maintain weight" },
  { id: "improve-energy", label: "Improve energy" },
  { id: "reduce-stress", label: "Reduce stress" },
  { id: "improve-sleep", label: "Improve sleep" },
];

interface AyurvedaPatientFormProps {
  onSubmit: (data: FormData) => void;
}

export function AyurvedaPatientForm({ onSubmit }: AyurvedaPatientFormProps) {
  const [open, setOpen] = useState(false);
  const [healthIssues, setHealthIssues] = useState<string[]>([]);
  const [goals, setGoals] = useState<string[]>([]);

  const form = useForm<FormData>({
    defaultValues: {
      name: "",
      age: 25,
      ageGroup: "",
      gender: "",
      bodyType: "",
      activityLevel: "",
      healthIssues: [],
      sleepHours: 8,
      sleepQuality: "",
      temperaturePreference: "",
      digestion: "",
      skinTexture: "",
      mentalState: "",
      afterMealFeeling: "",
      craveSpecificFoods: "",
      goals: [],
      dietStrictness: "",
      mainMealsPerDay: 3,
      dietType: "",
      recipePortionGuidelines: false,
      recipeMealtimeAligned: false,
      includeAnimalProtein: false,
    },
    mode: "onChange",
  });

  const handleSubmit = (data: FormData) => {
    // Validate required fields
    if (!data.name.trim()) {
      toast.error('Patient name is required');
      return;
    }
    
    if (!data.gender) {
      toast.error('Gender selection is required');
      return;
    }
    
    if (!data.bodyType) {
      toast.error('Body type selection is required');
      return;
    }
    
    if (!data.activityLevel) {
      toast.error('Activity level selection is required');
      return;
    }

    if (!data.sleepQuality) {
      toast.error('Sleep quality selection is required');
      return;
    }

    if (!data.digestion) {
      toast.error('Digestion type selection is required');
      return;
    }

    if (!data.mentalState) {
      toast.error('Mental state selection is required');
      return;
    }

    if (healthIssues.length === 0) {
      toast.error('Please select at least one health concern or "None"');
      return;
    }

    if (goals.length === 0) {
      toast.error('Please select at least one health goal');
      return;
    }

    const finalData = {
      ...data,
      healthIssues,
      goals
    };
    onSubmit(finalData);
    setOpen(false);
    form.reset();
    setHealthIssues([]);
    setGoals([]);
  };

  const handleHealthIssueChange = (issueId: string, checked: boolean) => {
    if (checked) {
      setHealthIssues((prev) => [...prev, issueId]);
    } else {
      setHealthIssues((prev) => prev.filter((id) => id !== issueId));
    }
  };

  const handleGoalChange = (goalId: string, checked: boolean) => {
    if (checked) {
      setGoals((prev) => [...prev, goalId]);
    } else {
      setGoals((prev) => prev.filter((id) => id !== goalId));
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <UserPlus className="h-4 w-4" />
          Add Patient
        </Button>
      </DialogTrigger>
      <DialogContent 
        className="w-full max-w-10xl md:max-w-11xl lg:max-w-12xl p-6 md:p-8 overflow-y-auto" 
        style={{ maxHeight: "90vh",maxWidth:"80vw" }}
      >
        <DialogHeader>
          <DialogTitle>Personalized Ayurveda Assessment</DialogTitle>
          <DialogDescription>
            Complete this comprehensive assessment to create a personalized Ayurveda plan for the patient.
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
            {/* Basic Information */}
            <Card className="border-2 w-full">
              <CardHeader className="pb-6">
                <CardTitle>Basic Information</CardTitle>
                <CardDescription className="mt-2">
                  Tell us about the patient's basic demographics and lifestyle
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 pt-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    rules={{
                      required: "Patient name is required",
                      minLength: {
                        value: 2,
                        message: "Name must be at least 2 characters long"
                      }
                    }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name <span className="text-destructive">*</span></FormLabel>
                        <FormControl>
                          <Input placeholder="Enter patient's full name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="age"
                    rules={{
                      required: "Age is required",
                      min: {
                        value: 1,
                        message: "Age must be at least 1"
                      },
                      max: {
                        value: 120,
                        message: "Age must be less than 120"
                      }
                    }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Age <span className="text-destructive">*</span></FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Enter patient's age"
                            {...field}
                            onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                            min={1}
                            max={120}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="ageGroup"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Age Group</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select age group" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="18-25">18-25</SelectItem>
                            <SelectItem value="26-35">26-35</SelectItem>
                            <SelectItem value="36-45">36-45</SelectItem>
                            <SelectItem value="46-55">46-55</SelectItem>
                            <SelectItem value="56+">56+</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="gender"
                    rules={{
                      required: "Gender selection is required"
                    }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Gender <span className="text-destructive">*</span></FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select gender" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="bodyType"
                    rules={{
                      required: "Body type selection is required"
                    }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Body Type <span className="text-destructive">*</span></FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select body type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="underweight">Underweight</SelectItem>
                            <SelectItem value="normal">Normal</SelectItem>
                            <SelectItem value="overweight">Overweight</SelectItem>
                            <SelectItem value="obese">Obese</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="activityLevel"
                    rules={{
                      required: "Activity level selection is required"
                    }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Activity Level <span className="text-destructive">*</span></FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select activity level" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="sedentary">Sedentary</SelectItem>
                            <SelectItem value="light">Light</SelectItem>
                            <SelectItem value="moderate">Moderate</SelectItem>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="very-active">Very Active</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Health Issues Section */}
            <Card className="border-2 w-full">
              <CardHeader className="pb-6">
                <CardTitle>Health Concerns <span className="text-destructive">*</span></CardTitle>
                <CardDescription className="mt-2">
                  Select any health issues the patient currently experiences (required)
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                  {healthIssueOptions.map((issue) => (
                    <div key={issue.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={issue.id}
                        checked={healthIssues.includes(issue.id)}
                        onCheckedChange={(checked:any) =>
                          handleHealthIssueChange(issue.id, checked as boolean)
                        }
                      />
                      <Label htmlFor={issue.id} className="text-sm">
                        {issue.label}
                      </Label>
                    </div>
                  ))}
                </div>
                {healthIssues.length === 0 && (
                  <p className="text-sm text-muted-foreground mt-2">
                    Please select at least one health concern or "None"
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Sleep & Wellness */}
            <Card className="border-2 w-full">
              <CardHeader className="pb-6">
                <CardTitle>Sleep & Wellness</CardTitle>
                <CardDescription className="mt-2">
                  Information about sleep patterns and general wellness
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 pt-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  <FormField
                    control={form.control}
                    name="sleepHours"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Hours of Sleep</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            {...field}
                            onChange={(e) => field.onChange(parseInt(e.target.value))}
                            min={4}
                            max={12}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="sleepQuality"
                    rules={{
                      required: "Sleep quality selection is required"
                    }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Sleep Quality <span className="text-destructive">*</span></FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select sleep quality" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="poor">Poor</SelectItem>
                            <SelectItem value="fair">Fair</SelectItem>
                            <SelectItem value="good">Good</SelectItem>
                            <SelectItem value="excellent">Excellent</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="temperaturePreference"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Temperature Preference</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select preference" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="cold">Cold</SelectItem>
                            <SelectItem value="warm">Warm</SelectItem>
                            <SelectItem value="neutral">Neutral</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Physical & Mental State */}
            <Card className="border-2 w-full">
              <CardHeader className="pb-6">
                <CardTitle>Physical & Mental State</CardTitle>
                <CardDescription className="mt-2">
                  Information about digestion, skin, and mental wellbeing
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 pt-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  <FormField
                    control={form.control}
                    name="digestion"
                    rules={{
                      required: "Digestion type selection is required"
                    }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Digestion <span className="text-destructive">*</span></FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select digestion type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="bloating-gas">Bloating/Gas</SelectItem>
                            <SelectItem value="normal">Normal</SelectItem>
                            <SelectItem value="slow">Slow</SelectItem>
                            <SelectItem value="fast">Fast</SelectItem>
                            <SelectItem value="irregular">Irregular</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="skinTexture"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Skin Texture</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select skin texture" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="balanced">Balanced</SelectItem>
                            <SelectItem value="dry">Dry</SelectItem>
                            <SelectItem value="oily">Oily</SelectItem>
                            <SelectItem value="combination">Combination</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="mentalState"
                    rules={{
                      required: "Mental state selection is required"
                    }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mental State <span className="text-destructive">*</span></FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select mental state" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="irritable">Irritable</SelectItem>
                            <SelectItem value="calm">Calm</SelectItem>
                            <SelectItem value="anxious">Anxious</SelectItem>
                            <SelectItem value="energetic">Energetic</SelectItem>
                            <SelectItem value="lethargic">Lethargic</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="afterMealFeeling"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>After Meal Feeling</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select feeling" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="energetic">Energetic</SelectItem>
                            <SelectItem value="sleepy">Sleepy</SelectItem>
                            <SelectItem value="bloated">Bloated</SelectItem>
                            <SelectItem value="satisfied">Satisfied</SelectItem>
                            <SelectItem value="uncomfortable">Uncomfortable</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Goals */}
            <Card className="border-2 w-full">
              <CardHeader className="pb-6">
                <CardTitle>Health Goals <span className="text-destructive">*</span></CardTitle>
                <CardDescription className="mt-2">
                  Select the patient's primary health goals (required)
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                  {goalOptions.map((goal) => (
                    <div key={goal.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={goal.id}
                        checked={goals.includes(goal.id)}
                        onCheckedChange={(checked:any) =>
                          handleGoalChange(goal.id, checked as boolean)
                        }
                      />
                      <Label htmlFor={goal.id} className="text-sm">
                        {goal.label}
                      </Label>
                    </div>
                  ))}
                </div>
                {goals.length === 0 && (
                  <p className="text-sm text-muted-foreground mt-2">
                    Please select at least one health goal
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Submit */}
            <div className="flex justify-end pt-4">
              <Button 
                type="submit" 
                disabled={
                  !form.formState.isValid || 
                  healthIssues.length === 0 || 
                  goals.length === 0 ||
                  form.formState.isSubmitting
                }
              >
                {form.formState.isSubmitting ? 'Adding Patient...' : 'Add Patient'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}