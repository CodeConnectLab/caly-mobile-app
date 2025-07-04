import React from 'react';
import GoalSliderScreen from '../screens/GoalSliderScreen';

export default function WaterIntake() {
  const handleSave = (value: number, unit?: string) => {
    // Here you would save the water intake value to your app's state or storage
    console.log(`Saving water intake: ${value} ${unit}`);
  };

  return (
    <GoalSliderScreen
      title="Water Intake"
      questionText="Choose your daily water intake?"
      motivationalText="Just stay Hydrated"
      initialValue={5}
      minValue={0}
      maxValue={10}
      showUnitToggle={true}
      metricUnit="Liter"
      britishUnit="Gallon"
      fillColor={{
        light: 'bg-lightBlue',
        dark: 'bg-darkLightBlue'
      }}
      onSave={handleSave}
    />
  );
}