import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Pill, Clock, AlertCircle } from 'lucide-react';

export function AusadhiPlan() {
  const herbPlan = [
    {
      name: 'Triphala',
      dosage: '1 tsp',
      timing: 'Before bed',
      duration: '30 days',
      purpose: 'Digestive health',
      instructions: 'Mix with warm water'
    },
    {
      name: 'Ashwagandha',
      dosage: '500mg',
      timing: 'Morning',
      duration: '45 days',
      purpose: 'Stress management',
      instructions: 'Take with warm milk'
    },
    {
      name: 'Brahmi',
      dosage: '2 capsules',
      timing: 'After breakfast',
      duration: '60 days',
      purpose: 'Mental clarity',
      instructions: 'Take with water'
    },
    {
      name: 'Turmeric',
      dosage: '1 tsp',
      timing: 'With meals',
      duration: 'Ongoing',
      purpose: 'Anti-inflammatory',
      instructions: 'Add to food or warm milk'
    }
  ];

  const precautions = [
    'Take herbs consistently at the same time daily',
    'Avoid taking herbs with caffeinated beverages',
    'Consult if you experience any adverse reactions',
    'Store herbs in a cool, dry place',
    'Do not exceed recommended dosage'
  ];

  return (
    <div className="space-y-6">
      {/* Herb Plan */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Pill className="w-5 h-5 text-blue-600" />
            Herbal Medicine Plan
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {herbPlan.map((herb, index) => (
            <div key={index} className="p-4 border rounded-lg space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-medium">{herb.name}</h4>
                  <p className="text-sm text-muted-foreground">{herb.purpose}</p>
                </div>
                <Badge variant="outline" className="bg-blue-50 text-blue-700">
                  {herb.duration}
                </Badge>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-2">
                  <Pill className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Dosage</p>
                    <p className="text-sm font-medium">{herb.dosage}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Timing</p>
                    <p className="text-sm font-medium">{herb.timing}</p>
                  </div>
                </div>
                
                <div>
                  <p className="text-xs text-muted-foreground">Instructions</p>
                  <p className="text-sm">{herb.instructions}</p>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Precautions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-orange-600" />
            Important Precautions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {precautions.map((precaution, index) => (
              <li key={index} className="flex items-start gap-2">
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                <span className="text-sm">{precaution}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}