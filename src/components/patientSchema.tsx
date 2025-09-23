// 1️⃣ Possible values for fields
const GENDERS = ["Male", "Female", "Other"] as const;
const ACTIVITIES = ["Low", "Medium", "High"] as const;
const DOSHAS = ["Vata", "Pitta", "Kapha", "Mixed"] as const;
const FOOD_PREFS = ["Vegetarian", "Vegan", "Non-Vegetarian"] as const;

type Gender = typeof GENDERS[number];
type Activity = typeof ACTIVITIES[number];
type Dosha = typeof DOSHAS[number];
type FoodPref = typeof FOOD_PREFS[number];

export type PatientFormValues = {
  fullName: string;
  age: number;
  gender: Gender;
  contact: string;
  email: string;
  weight: number;
  height: number;
  bmi?: number;
  conditions?: string[];
  allergies?: string[];
  routine: string;
  sleepHours?: number;
  activity?: Activity;
  dosha?: Dosha;
  foodPref?: FoodPref;
  restrictions?: string;
};

// 2️⃣ Validation function
export function validatePatientForm(data: any) {
  const errors: Record<string, string> = {};

  if (!data.fullName || data.fullName.trim() === "") {
    errors.fullName = "Full name is required";
  }

  if (typeof data.age !== "number" || data.age <= 0) {
    errors.age = "Age must be a positive number";
  }

  if (!GENDERS.includes(data.gender)) {
    errors.gender = "Gender is required";
  }

  if (!data.contact || data.contact.length < 10) {
    errors.contact = "Enter a valid contact";
  }

  if (!data.email || !/\S+@\S+\.\S+/.test(data.email)) {
    errors.email = "Enter a valid email";
  }

  if (typeof data.weight !== "number" || data.weight <= 0) {
    errors.weight = "Weight is required";
  }

  if (typeof data.height !== "number" || data.height <= 0) {
    errors.height = "Height is required";
  }

  if (!data.routine || data.routine.trim() === "") {
    errors.routine = "Daily routine is required";
  }

  if (data.activity && !ACTIVITIES.includes(data.activity)) {
    errors.activity = "Invalid activity";
  }

  if (data.dosha && !DOSHAS.includes(data.dosha)) {
    errors.dosha = "Select your dosha";
  }

  if (data.foodPref && !FOOD_PREFS.includes(data.foodPref)) {
    errors.foodPref = "Invalid food preference";
  }

  return errors;
}
