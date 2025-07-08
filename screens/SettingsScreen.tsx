import React from 'react';
import { View, Text, ScrollView, Switch, Alert } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import HeaderBar from '@/components/common/HeaderBar';
import SettingsSection from '@/components/settings/SettingsSection';
import SettingsItem from '@/components/settings/SettingsItem';

const SettingsScreen: React.FC = () => {
  const { isDark, toggleTheme } = useTheme();
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
  
  const handleDeleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'Are you sure you want to delete your account? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: () => console.log('Delete account') 
        }
      ]
    );
  };

  return (
    <ScrollView 
      className={`flex-1 ${isDark ? 'bg-darkBackground' : 'bg-lightGray'}`}
      showsVerticalScrollIndicator={false}
    >
      <View className="px-4 pt-2 pb-6">
        <HeaderBar title="Settings" customTextClassname="!text-2xl" />
        
        {/* Profile Section */}
        <View className="mt-4">
          <SettingsSection>
            <SettingsItem
              icon="person-outline"
              iconColor="#3B82F6"
              iconBgColor="#EFF6FF"
              title="Profile Details"
              subtitle="172 cm, 82 kg"
              onPress={() => console.log('Profile details')}
            />
            <SettingsItem
              icon="trophy-outline"
              iconColor="#F59E0B"
              iconBgColor="#FEF3C7"
              title="Goal"
              subtitle="Lose 70 kg"
              onPress={() => console.log('Goal')}
            />
            <SettingsItem
              icon="card-outline"
              iconColor="#10B981"
              iconBgColor="#D1FAE5"
              title="Subscription"
              subtitle="Inactive"
              onPress={() => console.log('Subscription')}
            />
          </SettingsSection>
        </View>

        {/* Preferences Section */}
        <SettingsSection title="Preferences">
          <SettingsItem
            icon="notifications-outline"
            iconColor="#8B5CF6"
            iconBgColor="#EDE9FE"
            title="Notifications"
            rightElement={
              <Switch
                value={notificationsEnabled}
                onValueChange={setNotificationsEnabled}
                trackColor={{ false: '#767577', true: '#3B82F6' }}
                thumbColor="#f4f3f4"
              />
            }
            onPress={() => setNotificationsEnabled(!notificationsEnabled)}
          />
          <SettingsItem
            icon="moon-outline"
            iconColor="#6B7280"
            iconBgColor="#F3F4F6"
            title="Dark Mode"
            rightElement={
              <Switch
                value={isDark}
                onValueChange={toggleTheme}
                trackColor={{ false: '#767577', true: '#3B82F6' }}
                thumbColor="#f4f3f4"
              />
            }
            onPress={toggleTheme}
          />
        </SettingsSection>

        {/* Support Section */}
        <SettingsSection title="Support">
          <SettingsItem
            icon="help-circle-outline"
            iconColor="#EC4899"
            iconBgColor="#FCE7F3"
            title="Help & Support"
            onPress={() => console.log('Help & Support')}
          />
          <SettingsItem
            icon="document-text-outline"
            iconColor="#6366F1"
            iconBgColor="#EEF2FF"
            title="Privacy Policy"
            onPress={() => console.log('Privacy Policy')}
          />
          <SettingsItem
            icon="mail-outline"
            iconColor="#2563EB"
            iconBgColor="#DBEAFE"
            title="Contact Us"
            onPress={() => console.log('Contact Us')}
          />
        </SettingsSection>

        {/* Account Section */}
        <SettingsSection title="Account">
          <SettingsItem
            icon="log-out-outline"
            iconColor="#F97316"
            iconBgColor="#FFEDD5"
            title="Logout"
            onPress={() => console.log('Logout')}
          />
          <SettingsItem
            icon="trash-outline"
            iconColor="#EF4444"
            iconBgColor="#FEE2E2"
            title="Delete Account"
            destructive
            onPress={handleDeleteAccount}
          />
        </SettingsSection>
      </View>
    </ScrollView>
  );
};

export default SettingsScreen;