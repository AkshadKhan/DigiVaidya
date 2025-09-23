import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Clock, Utensils, Apple, Coffee } from 'lucide-react';

export function DietPlan() {
  const mealPlan = [
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
  ];

  const guidelines = [
    'Eat meals at regular times',
    'Chew food slowly and mindfully',
    'Avoid cold drinks with meals',
    'Include all six tastes daily',
    'Drink warm water throughout the day'
  ];

  return (
    <div className="space-y-6">
      {/* Diet Plan Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Utensils className="w-5 h-5 text-green-600" />
            Daily Meal Plan
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {mealPlan.map((meal, index) => (
            <div key={index} className="flex items-start gap-4 p-4 bg-muted/30 rounded-lg">
              <div className="flex items-center gap-2 min-w-fit">
                <div className="p-2 bg-green-100 rounded-full">
                  {meal.icon}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3 h-3 text-muted-foreground" />
                    <span className="text-sm font-medium">{meal.time}</span>
                  </div>
                  <Badge variant="outline" className="mt-1 text-xs">
                    {meal.meal}
                  </Badge>
                </div>
              </div>
              <div className="flex-1">
                <ul className="space-y-1">
                  {meal.items.map((item, idx) => (
                    <li key={idx} className="text-sm text-muted-foreground">
                      • {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Guidelines */}
      <Card>
        <CardHeader>
          <CardTitle>Dietary Guidelines</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {guidelines.map((guideline, index) => (
              <li key={index} className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm">{guideline}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}