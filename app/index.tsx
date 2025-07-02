import { Redirect } from 'expo-router';

export default function Index() {
  // Redirect to the dashboard screen
  return <Redirect href="/dashboard" />;
}
