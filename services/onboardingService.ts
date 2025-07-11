import { SurveyQuestion } from '../types/onboarding';

// Mock API response for development
const mockSurveyData: { error: boolean; message: string; data: SurveyQuestion[] } = {
  error: false,
  message: "Survey fetch successful!",
  data: [
    {
      _id: "664c6c809e487922948d96c1",
      title: "Welcome to Caly",
      subTitle: "Your personal health and fitness companion",
      description: "We're excited to help you on your journey to better health. Let's get started by setting up your profile.",
      category: "welcome",
      isOptional: false,
      options: [],
      isMultiSelect: false,
      seqNo: 1,
      images: ["https://example.com/welcome-image.jpg"],
      profileKey: "welcome_seen",
      questionType: "info",
      deleted: false,
      updatedAt: "2024-05-21T09:42:24.088Z",
      createdAt: "2024-05-21T09:42:24.088Z"
    },
    {
      validation: {
        min: 1,
        max: 1
      },
      _id: "664c6c809e487922948d96cb",
      title: "Select your gender",
      subTitle: "This helps us personalize your experience",
      category: "your_gender",
      isOptional: false,
      options: [
        {
          name: "Male",
          value: "male",
          icon: "male"
        },
        {
          name: "Female",
          value: "female",
          icon: "female"
        },
        {
          name: "Other",
          value: "other",
          icon: "person"
        }
      ],
      isMultiSelect: false,
      seqNo: 2,
      profileKey: "gender",
      questionType: "selection",
      deleted: false,
      updatedAt: "2024-05-21T09:42:24.088Z",
      createdAt: "2024-05-21T09:42:24.088Z"
    },
    {
      _id: "664c6c809e487922948d96c3",
      title: "When were you born?",
      subTitle: "We'll use this to calculate your age",
      category: "your_birthdate",
      isOptional: false,
      options: [],
      isMultiSelect: false,
      seqNo: 3,
      profileKey: "birthdate",
      questionType: "date",
      deleted: false,
      updatedAt: "2024-05-21T09:42:24.088Z",
      createdAt: "2024-05-21T09:42:24.088Z"
    },
    {
      _id: "664c72cf9e487922948d96f8",
      title: "Tell us your current weight",
      subTitle: "This helps us track your progress",
      category: "your_weight",
      isOptional: false,
      options: [],
      isMultiSelect: false,
      seqNo: 4,
      profileKey: "current_weight",
      questionType: "numeric",
      deleted: false,
      updatedAt: "2024-05-21T10:09:51.151Z",
      createdAt: "2024-05-21T10:09:51.151Z"
    },
    {
      validation: {
        min: 1,
        max: 3
      },
      _id: "664c6fff9e487922948d96f4",
      title: "What are your fitness goals?",
      subTitle: "Select up to 3 options",
      category: "your_goals",
      isOptional: false,
      options: [
        {
          name: "Lose Weight",
          value: "lose_weight",
          description: "Reduce body fat and get leaner",
          icon: "fa5-weight"
        },
        {
          name: "Build Muscle",
          value: "build_muscle",
          description: "Increase strength and muscle mass",
          icon: "fa5-dumbbell"
        },
        {
          name: "Improve Fitness",
          value: "improve_fitness",
          description: "Enhance overall health and endurance",
          icon: "fa5-running"
        },
        {
          name: "Eat Healthier",
          value: "eat_healthier",
          description: "Develop better nutrition habits",
          icon: "fa5-apple-alt"
        },
        {
          name: "Reduce Stress",
          value: "reduce_stress",
          description: "Improve mental wellbeing",
          icon: "fa5-spa"
        }
      ],
      isMultiSelect: true,
      seqNo: 5,
      profileKey: "fitness_goals",
      questionType: "selection",
      deleted: false,
      updatedAt: "2024-05-21T09:57:19.280Z",
      createdAt: "2024-05-21T09:57:19.280Z"
    },
    {
      _id: "664c7384ea5b82215f9515e8",
      title: "What's your target weight?",
      subTitle: "Set a realistic goal to work towards",
      category: "your_target_weight",
      isOptional: false,
      options: [],
      isMultiSelect: false,
      seqNo: 6,
      profileKey: "target_weight",
      questionType: "numeric",
      deleted: false,
      updatedAt: "2024-05-21T10:12:20.021Z",
      createdAt: "2024-05-21T10:12:20.021Z"
    },
    {
      _id: "664c7384ea5b82215f9515e9",
      title: "Your Weight Loss Journey",
      subTitle: "Here's how your progress might look",
      description: "Based on your current weight and target, we've created a projection of your weight loss journey. The blue line shows your potential progress with Caly compared to average results.",
      category: "weight_loss_projection",
      isOptional: false,
      options: [
        {
          name: "Standard Plan",
          value: "standard",
          description: "Lose weight gradually with balanced nutrition and moderate exercise"
        },
        {
          name: "Accelerated Plan",
          value: "accelerated",
          description: "Faster results with more intensive workouts and stricter diet"
        }
      ],
      isMultiSelect: false,
      seqNo: 7,
      profileKey: "weight_loss_plan",
      questionType: "comparison",
      chartData: {
        labels: ["Week 1", "Week 4", "Week 8", "Week 12", "Week 16", "Week 20"],
        datasets: [
          {
            data: [180, 176, 170, 165, 160, 155],
            color: (opacity = 1) => `rgba(40, 70, 208, ${opacity})`,
            strokeWidth: 2
          },
          {
            data: [180, 178, 175, 172, 169, 166],
            color: (opacity = 1) => `rgba(131, 56, 236, ${opacity})`,
            strokeWidth: 2
          }
        ],
        legend: ["With Caly", "Average results"]
      },
      deleted: false,
      updatedAt: "2024-05-21T10:12:20.021Z",
      createdAt: "2024-05-21T10:12:20.021Z"
    },
    {
      validation: {
        min: 1,
        max: 1
      },
      _id: "664c7384ea5b82215f9515e0",
      title: "What activities do you enjoy?",
      subTitle: "Select your favorite activities",
      description: "We'll use this to recommend workouts you'll love",
      category: "favorite_activities",
      isOptional: false,
      options: [
        {
          name: "Running",
          value: "running",
          icon: "fa5-running"
        },
        {
          name: "Cycling",
          value: "cycling",
          icon: "fa5-biking"
        },
        {
          name: "Swimming",
          value: "swimming",
          icon: "fa5-swimmer"
        },
        {
          name: "Yoga",
          value: "yoga",
          icon: "fa5-pray"
        },
        {
          name: "Weightlifting",
          value: "weightlifting",
          icon: "fa5-dumbbell"
        },
        {
          name: "Dancing",
          value: "dancing",
          icon: "mc-dance-ballroom"
        },
        {
          name: "Hiking",
          value: "hiking",
          icon: "fa5-hiking"
        },
        {
          name: "Team Sports",
          value: "team_sports",
          icon: "fa5-basketball-ball"
        }
      ],
      isMultiSelect: false,
      seqNo: 8,
      profileKey: "favorite_activity",
      questionType: "selection",
      deleted: false,
      updatedAt: "2024-05-21T10:12:20.021Z",
      createdAt: "2024-05-21T10:12:20.021Z"
    }
  ]
};

// Function to fetch survey questions from the API
export const fetchSurveyQuestions = async (): Promise<SurveyQuestion[]> => {
  try {
    // In a real app, this would be an API call
    // const response = await fetch('https://api.example.com/survey');
    // const data = await response.json();
    // return data.data;

    // For now, return mock data
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockSurveyData.data);
      }, 500); // Simulate network delay
    });
  } catch (error) {
    console.error('Error fetching survey questions:', error);
    return [];
  }
};

// Function to submit onboarding data to the API
export const submitOnboardingData = async (data: Record<string, any>): Promise<boolean> => {
  try {
    // In a real app, this would be an API call
    // const response = await fetch('https://api.example.com/onboarding', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(data),
    // });
    // const result = await response.json();
    // return !result.error;

    // For now, simulate a successful submission
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Onboarding data submitted:', data);
        resolve(true);
      }, 500); // Simulate network delay
    });
  } catch (error) {
    console.error('Error submitting onboarding data:', error);
    return false;
  }
};