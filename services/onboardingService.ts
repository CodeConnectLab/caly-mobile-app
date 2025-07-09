import { SurveyQuestion } from '../types/onboarding';

// Mock API response for development
const mockSurveyData: { error: boolean; message: string; data: SurveyQuestion[] } = {
  error: false,
  message: "Survey fetch successful!",
  data: [
    {
      validation: {
        min: 1,
        max: 1
      },
      _id: "664c6c809e487922948d96cb",
      title: "Select your gender",
      subTitle: "",
      metaTitle: "Meta-Title",
      description: "description",
      category: "your_gender",
      metaDescription: "MetaDescription",
      isOptional: true,
      options: [
        {
          name: "Male",
          value: "male",
          description: "Description"
        },
        {
          name: "Female",
          value: "female",
          description: "Description"
        }
      ],
      isMultiSelect: true,
      seqNo: 2,
      images: ["s3 url"],
      profileKey: "gender",
      createdBy: "6645cdd345985353591dfd10",
      deleted: false,
      updatedAt: "2024-05-21T09:42:24.088Z",
      createdAt: "2024-05-21T09:42:24.088Z",
      __v: 0,
      deletedAt: null,
      deletedBy: null,
      exclusion: false
    },
    {
      _id: "664c72cf9e487922948d96f8",
      title: "Tell us your weight",
      subTitle: "We need to know your weight for the process",
      metaTitle: "weight",
      description: "weight",
      category: "your_weight",
      metaDescription: "weight",
      isOptional: false,
      options: [],
      isMultiSelect: false,
      seqNo: 8,
      images: ["s3 url"],
      profileKey: "weight",
      createdBy: "6645cdd345985353591dfd10",
      deleted: false,
      updatedAt: "2024-05-21T10:09:51.151Z",
      createdAt: "2024-05-21T10:09:51.151Z",
      __v: 0,
      deletedAt: null,
      deletedBy: null,
      exclusion: false
    },
    {
      _id: "664c7384ea5b82215f9515e8",
      exclusion: false,
      title: "Target weight",
      subTitle: "We need to know your target weight for the process",
      metaTitle: "",
      description: "",
      category: "your_weight",
      metaDescription: "",
      isOptional: true,
      options: [],
      isMultiSelect: false,
      seqNo: 9,
      images: ["s3 url"],
      profileKey: "weight",
      createdBy: "6645cdd345985353591dfd10",
      deleted: false,
      updatedAt: "2024-05-21T10:12:20.021Z",
      createdAt: "2024-05-21T10:12:20.021Z",
      __v: 0
    },
    {
      validation: {
        min: 1,
        max: 3
      },
      _id: "664c6fff9e487922948d96f4",
      title: "Let's check your flexibility",
      subTitle: "Tell us how much you can bend",
      metaTitle: "",
      description: "",
      category: "your_flexibility",
      metaDescription: "",
      isOptional: true,
      options: [
        {
          name: "Less Flexible",
          value: "less flexible"
        },
        {
          name: "Medium Flexible",
          value: "medium flexible"
        },
        {
          name: "Highly Flexible",
          value: "highly flexible"
        }
      ],
      isMultiSelect: true,
      seqNo: 5,
      images: ["s3 url"],
      profileKey: "flexibility",
      createdBy: "6645cdd345985353591dfd10",
      deleted: false,
      updatedAt: "2024-05-21T09:57:19.280Z",
      createdAt: "2024-05-21T09:57:19.280Z",
      __v: 0,
      deletedAt: null,
      deletedBy: null,
      exclusion: false
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