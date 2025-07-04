import React from 'react';
import GoalSliderScreen from '../screens/GoalSliderScreen';

export default function StepsTracker() {
  const handleSave = (value: number) => {
    // Here you would save the steps goal to your app's state or storage
    console.log(`Saving steps goal: ${value} steps`);
  };

  return (
    <GoalSliderScreen
      title="Steps Tracker"
      questionText="Choose your walking steps?"
      motivationalText="Set a realistic Goal"
      initialValue={10000}
      minValue={1000}
      maxValue={20000}
      showUnitToggle={false}
      metricUnit="steps"
      fillColor={{
        light: 'bg-lightPurple',
        dark: 'bg-darkPurple'
      }}
      onSave={handleSave}
    />
  );
}