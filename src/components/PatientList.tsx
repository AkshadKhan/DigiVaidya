import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Clock, Utensils, Apple, Coffee, Edit, Save, X, Plus, Trash2 } from 'lucide-react';

interface MealItem {
  time: string;
  meal: string;
  items: string[];
  icon: JSX.Element;
}

interface DietPlanProps {
  isEditable?: boolean;
  onSave?: (mealPlan: MealItem[], guidelines: string[]) => void;
}

export function DietPlan({ isEditable = false, onSave }: DietPlanProps) {
  const [isEditMode, setIsEditMode] = useState(false);
  
  const [mealPlan, setMealPlan] = useState<MealItem[]>([
    {
      time: '6:00 AM',
      meal: 'Early Morning',
      items: ['Warm water with lemon', 'Ginger tea'],
      icon: <Coffee className="w-4 h-4" />
    },
    {
      time: '8:00 AM',
      meal: 'Breakfast',
      items: ['Quinoa porridge with dates', 'Almonds (soaked)', 'Fresh fruits'],
      icon: <Apple className="w-4 h-4" />
    },
    {
      time: '12:00 PM',
      meal: 'Lunch',
      items: ['Rice with dal', 'Steamed vegetables', 'Ghee', 'Yogurt'],
      icon: <Utensils className="w-4 h-4" />
    },
    {
      time: '4:00 PM',
      meal: 'Snack',
      items: ['Herbal tea', 'Nuts and seeds'],
      icon: <Coffee className="w-4 h-4" />
    },
    {
      time: '7:00 PM',
      meal: 'Dinner',
      items: ['Light soup', 'Roti with vegetables', 'Herbal tea'],
      icon: <Utensils className="w-4 h-4" />
    }
  ]);

  const [guidelines, setGuidelines] = useState<string[]>([
    'Eat meals at regular times',
    'Chew food slowly and mindfully',
    'Avoid cold drinks with meals',
    'Include all six tastes daily',
    'Drink warm water throughout the day'
  ]);

  const [originalMealPlan, setOriginalMealPlan] = useState<MealItem[]>([]);
  const [originalGuidelines, setOriginalGuidelines] = useState<string[]>([]);

  const handleEditMode = () => {
    setOriginalMealPlan(JSON.parse(JSON.stringify(mealPlan)));
    setOriginalGuidelines([...guidelines]);
    setIsEditMode(true);
  };

  const handleSave = () => {
    setIsEditMode(false);
    if (onSave) {
      onSave(mealPlan, guidelines);
    }
  };

  const handleCancel = () => {
    setMealPlan(originalMealPlan);
    setGuidelines(originalGuidelines);
    setIsEditMode(false);
  };

  const updateMealTime = (index: number, newTime: string) => {
    const updated = [...mealPlan];
    updated[index].time = newTime;
    setMealPlan(updated);
  };

  const updateMealName = (index: number, newMeal: string) => {
    const updated = [...mealPlan];
    updated[index].meal = newMeal;
    setMealPlan(updated);
  };

  const updateMealItem = (mealIndex: number, itemIndex: number, newItem: string) => {
    const updated = [...mealPlan];
    updated[mealIndex].items[itemIndex] = newItem;
    setMealPlan(updated);
  };

  const addMealItem = (mealIndex: number) => {
    const updated = [...mealPlan];
    updated[mealIndex].items.push('New food item');
    setMealPlan(updated);
  };

  const removeMealItem = (mealIndex: number, itemIndex: number) => {
    const updated = [...mealPlan];
    updated[mealIndex].items.splice(itemIndex, 1);
    setMealPlan(updated);
  };

  const updateGuideline = (index: number, newGuideline: string) => {
    const updated = [...guidelines];
    updated[index] = newGuideline;
    setGuidelines(updated);
  };

  const addGuideline = () => {
    setGuidelines([...guidelines, 'New dietary guideline']);
  };

  const removeGuideline = (index: number) => {
    const updated = guidelines.filter((_, i) => i !== index);
    setGuidelines(updated);
  };

  const getMealIcon = (mealName: string) => {
    const name = mealName.toLowerCase();
    if (name.includes('morning') || name.includes('snack')) {
      return <Coffee className="w-4 h-4" />;
    } else if (name.includes('breakfast')) {
      return <Apple className="w-4 h-4" />;
    } else {
      return <Utensils className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Diet Plan Overview */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Utensils className="w-5 h-5 text-green-600" />
              <span className="text-black">Daily Meal Plan</span>
            </CardTitle>
            {isEditable && (
              <div className="flex gap-2">
                {!isEditMode ? (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleEditMode}
                    className="flex items-center gap-2 hover:bg-green-50 hover:text-green-700 hover:border-green-200 transition-all duration-200 font-medium"
                  >
                    <Edit className="w-4 h-4" />
                    Edit Plan
                  </Button>
                ) : (
                  <>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleCancel}
                      className="flex items-center gap-2 hover:bg-red-50 hover:text-red-700 hover:border-red-200"
                    >
                      <X className="w-4 h-4" />
                      Cancel
                    </Button>
                    <Button
                      size="sm"
                      onClick={handleSave}
                      className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white"
                    >
                      <Save className="w-4 h-4" />
                      Save Changes
                    </Button>
                  </>
                )}
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {mealPlan.map((meal, index) => (
            <div key={index} className="flex items-start gap-4 p-4 bg-muted/30 rounded-lg">
              <div className="flex items-center gap-2 min-w-fit">
                <div className="p-2 bg-green-100 rounded-full">
                  {getMealIcon(meal.meal)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3 h-3 text-muted-foreground" />
                    {isEditMode ? (
                      <Input
                        value={meal.time}
                        onChange={(e) => updateMealTime(index, e.target.value)}
                        className="text-sm font-medium h-6 w-20 px-1 py-0"
                      />
                    ) : (
                      <span className="text-sm font-medium text-black">{meal.time}</span>
                    )}
                  </div>
                  {isEditMode ? (
                    <Input
                      value={meal.meal}
                      onChange={(e) => updateMealName(index, e.target.value)}
                      className="mt-1 text-xs h-6 w-28 px-1 py-0"
                    />
                  ) : (
                    <Badge variant="outline" className="mt-1 text-xs">
                      {meal.meal}
                    </Badge>
                  )}
                </div>
              </div>
              <div className="flex-1">
                <div className="space-y-1">
                  {meal.items.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      {isEditMode ? (
                        <>
                          <span className="text-black">•</span>
                          <Input
                            value={item}
                            onChange={(e) => updateMealItem(index, idx, e.target.value)}
                            className="text-sm flex-1 h-6 px-1 py-0"
                          />
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeMealItem(index, idx)}
                            className="h-6 w-6 p-0 hover:bg-red-50 hover:text-red-700"
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </>
                      ) : (
                        <span className="text-sm text-black">• {item}</span>
                      )}
                    </div>
                  ))}
                  {isEditMode && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => addMealItem(index)}
                      className="h-6 text-xs flex items-center gap-1 px-1 hover:bg-green-50 hover:text-green-700"
                    >
                      <Plus className="w-3 h-3" />
                      Add Food Item
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Guidelines */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-black">Dietary Guidelines</CardTitle>
            {isEditMode && (
              <Button
                variant="outline"
                size="sm"
                onClick={addGuideline}
                className="flex items-center gap-2 hover:bg-green-50 hover:text-green-700 hover:border-green-200"
              >
                <Plus className="w-4 h-4" />
                Add Guideline
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {guidelines.map((guideline, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0 mt-1"></div>
                {isEditMode ? (
                  <>
                    <Textarea
                      value={guideline}
                      onChange={(e) => updateGuideline(index, e.target.value)}
                      className="text-sm flex-1 min-h-[32px] py-1 px-2 resize-none"
                      rows={1}
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeGuideline(index)}
                      className="h-8 w-8 p-0 hover:bg-red-50 hover:text-red-700 flex-shrink-0"
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </>
                ) : (
                  <span className="text-sm text-black">{guideline}</span>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}