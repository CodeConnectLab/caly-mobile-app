import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../theme/ThemeContext';

export default function AdjustGoals() {
  const { isDark } = useTheme();
  
  // Initial values
  const [calorieGoal, setCalorieGoal] = useState('1600');
  const [proteinGoal, setProteinGoal] = useState('107');
  const [carbsGoal, setCarbsGoal] = useState('260');
  const [fatGoal, setFatGoal] = useState('99');
  
  // Track if we're in edit mode
  const [isEditing, setIsEditing] = useState(false);
  
  // Store original values for revert functionality
  const [originalValues, setOriginalValues] = useState({
    calories: calorieGoal,
    protein: proteinGoal,
    carbs: carbsGoal,
    fat: fatGoal
  });
  
  const handleEdit = () => {
    if (!isEditing) {
      // Store current values before editing
      setOriginalValues({
        calories: calorieGoal,
        protein: proteinGoal,
        carbs: carbsGoal,
        fat: fatGoal
      });
    }
    setIsEditing(!isEditing);
  };
  
  const handleRevert = () => {
    // Restore original values
    setCalorieGoal(originalValues.calories);
    setProteinGoal(originalValues.protein);
    setCarbsGoal(originalValues.carbs);
    setFatGoal(originalValues.fat);
    setIsEditing(false);
  };
  
  const handleSave = () => {
    // Save logic would go here
    setIsEditing(false);
  };
  
  const handleGoBack = () => {
    router.back();
  };
  
  return (
    <SafeAreaView className={`flex-1 ${isDark ? 'bg-darkSecondary' : 'bg-lightGray'}`}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        {/* Header */}
        <View className="flex-row items-center px-4 py-4">
          <TouchableOpacity onPress={handleGoBack} className="mr-4">
            <Ionicons name="arrow-back" size={24} color={isDark ? 'white' : 'black'} />
          </TouchableOpacity>
          <Text className={`text-xl font-bold ${isDark ? 'text-white' : 'text-black'}`}>
            Adjust Goals
          </Text>
        </View>
        
        {/* Macronutrients Title */}
        <View className="px-4 py-2">
          <Text className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-black'}`}>
            Macronutrients
          </Text>
        </View>
        
        {/* Macronutrient Circle */}
        <View className="items-center justify-center py-6">
          <View className="w-40 h-40 relative items-center justify-center">
            {/* Circle background */}
            <View className="w-full h-full rounded-full border-8 border-lightGray" />
            
            {/* Carbs segment (yellow) */}
            <View className="absolute top-0 right-0 w-20 h-20 rounded-tr-full border-t-8 border-r-8 border-carbs" />
            
            {/* Protein segment (red) */}
            <View className="absolute bottom-0 right-0 w-20 h-20 rounded-br-full border-b-8 border-r-8 border-protein" />
            
            {/* Fat segment (green) */}
            <View className="absolute bottom-0 left-0 w-20 h-20 rounded-bl-full border-b-8 border-l-8 border-fat" />
            
            {/* Center icon */}
            <View className="absolute">
              <Ionicons name="flame" size={32} color={isDark ? '#3A5AE8' : '#2846D0'} />
            </View>
            
            {/* Macro labels */}
            <View className="absolute top-0 right-0 -mr-16 mt-4">
              <View className="bg-carbs px-2 py-1 rounded-full">
                <Text className="text-white font-bold text-xs">260 g</Text>
              </View>
            </View>
            
            <View className="absolute bottom-0 right-0 -mr-14 mb-4">
              <View className="bg-protein px-2 py-1 rounded-full">
                <Text className="text-white font-bold text-xs">107 g</Text>
              </View>
            </View>
            
            <View className="absolute bottom-0 left-0 -ml-12 mb-4">
              <View className="bg-fat px-2 py-1 rounded-full">
                <Text className="text-white font-bold text-xs">99 g</Text>
              </View>
            </View>
          </View>
        </View>
        
        {/* Goal Input Fields */}
        <View className="px-4 space-y-4">
          {/* Calorie Goal */}
          <View className={`p-4 rounded-xl ${isDark ? 'bg-darkSecondary' : 'bg-white'} shadow-sm`}>
            <Text className={`text-sm ${isDark ? 'text-darkDarkGray' : 'text-darkGray'}`}>
              Calorie goal
            </Text>
            <View className="flex-row items-center justify-between">
              {isEditing ? (
                <TextInput
                  className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-black'}`}
                  value={calorieGoal}
                  onChangeText={setCalorieGoal}
                  keyboardType="number-pad"
                  autoFocus
                />
              ) : (
                <Text className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-black'}`}>
                  {calorieGoal}
                </Text>
              )}
              <Ionicons name="flame" size={24} color={isDark ? '#3A5AE8' : '#2846D0'} />
            </View>
          </View>
          
          {/* Protein Goal */}
          <View className={`p-4 rounded-xl ${isDark ? 'bg-darkSecondary' : 'bg-white'} shadow-sm`}>
            <Text className={`text-sm ${isDark ? 'text-darkDarkGray' : 'text-darkGray'}`}>
              Protein goal
            </Text>
            <View className="flex-row items-center justify-between">
              {isEditing ? (
                <TextInput
                  className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-black'}`}
                  value={proteinGoal}
                  onChangeText={setProteinGoal}
                  keyboardType="number-pad"
                />
              ) : (
                <Text className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-black'}`}>
                  {proteinGoal}
                </Text>
              )}
              <Ionicons name="flame-outline" size={24} color="#F45641" />
            </View>
          </View>
          
          {/* Carbs Goal */}
          <View className={`p-4 rounded-xl ${isDark ? 'bg-darkSecondary' : 'bg-white'} shadow-sm`}>
            <Text className={`text-sm ${isDark ? 'text-darkDarkGray' : 'text-darkGray'}`}>
              Carbs goal
            </Text>
            <View className="flex-row items-center justify-between">
              {isEditing ? (
                <TextInput
                  className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-black'}`}
                  value={carbsGoal}
                  onChangeText={setCarbsGoal}
                  keyboardType="number-pad"
                />
              ) : (
                <Text className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-black'}`}>
                  {carbsGoal}
                </Text>
              )}
              <Ionicons name="pizza-outline" size={24} color="#FFAE38" />
            </View>
          </View>
          
          {/* Fat Goal */}
          <View className={`p-4 rounded-xl ${isDark ? 'bg-darkSecondary' : 'bg-white'} shadow-sm`}>
            <Text className={`text-sm ${isDark ? 'text-darkDarkGray' : 'text-darkGray'}`}>
              Fat goal
            </Text>
            <View className="flex-row items-center justify-between">
              {isEditing ? (
                <TextInput
                  className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-black'}`}
                  value={fatGoal}
                  onChangeText={setFatGoal}
                  keyboardType="number-pad"
                />
              ) : (
                <Text className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-black'}`}>
                  {fatGoal}
                </Text>
              )}
              <Ionicons name="water-outline" size={24} color="#72A91B" />
            </View>
          </View>
        </View>
        
        {/* Action Buttons */}
        {isEditing ? (
          <View className="flex-row px-4 py-6 space-x-4">
            <TouchableOpacity 
              onPress={handleRevert}
              className="flex-1 py-4 rounded-xl bg-gray-200 items-center justify-center"
            >
              <Text className="font-bold text-gray-700">Revert</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={handleSave}
              className="flex-1 py-4 rounded-xl bg-primary items-center justify-center"
            >
              <Text className="font-bold text-white">Save</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View className="px-4 py-6">
            <TouchableOpacity 
              onPress={handleEdit}
              className="py-4 rounded-xl bg-primary items-center justify-center"
            >
              <Text className="font-bold text-white">Auto Generate Goals</Text>
            </TouchableOpacity>
          </View>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}


// import { Ionicons } from '@expo/vector-icons';
// import { router } from 'expo-router';
// import React, { useState } from 'react';
// import { KeyboardAvoidingView, Platform, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
// import { useTheme } from '../theme/ThemeContext';

// export default function AdjustGoals() {
//   const { isDark } = useTheme();
  
//   // Initial values
//   const [calorieGoal, setCalorieGoal] = useState('1600');
//   const [proteinGoal, setProteinGoal] = useState('107');
//   const [carbsGoal, setCarbsGoal] = useState('260');
//   const [fatGoal, setFatGoal] = useState('99');
  
//   // Track if we're in edit mode
//   const [isEditing, setIsEditing] = useState(false);
  
//   // Store original values for revert functionality
//   const [originalValues, setOriginalValues] = useState({
//     calories: calorieGoal,
//     protein: proteinGoal,
//     carbs: carbsGoal,
//     fat: fatGoal
//   });
  
//   const handleEdit = () => {
//     if (!isEditing) {
//       // Store current values before editing
//       setOriginalValues({
//         calories: calorieGoal,
//         protein: proteinGoal,
//         carbs: carbsGoal,
//         fat: fatGoal
//       });
//     }
//     setIsEditing(!isEditing);
//   };
  
//   const handleRevert = () => {
//     // Restore original values
//     setCalorieGoal(originalValues.calories);
//     setProteinGoal(originalValues.protein);
//     setCarbsGoal(originalValues.carbs);
//     setFatGoal(originalValues.fat);
//     setIsEditing(false);
//   };
  
//   const handleSave = () => {
//     // Save logic would go here
//     setIsEditing(false);
//   };
  
//   const handleGoBack = () => {
//     router.back();
//   };
  
//   const styles = createStyles(isDark);
  
//   return (
//     <SafeAreaView style={styles.container}>
//       <KeyboardAvoidingView 
//         behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//         style={styles.keyboardView}
//       >
//         {/* Header */}
//         <View style={styles.header}>
//           <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
//             <Ionicons name="arrow-back" size={24} color={isDark ? 'white' : 'black'} />
//           </TouchableOpacity>
//           <Text style={styles.headerTitle}>
//             Adjust Goals
//           </Text>
//         </View>
        
//         {/* Macronutrients Title */}
//         <View style={styles.titleContainer}>
//           <Text style={styles.title}>
//             Macronutrients
//           </Text>
//         </View>
        
//         {/* Macronutrient Circle */}
//         <View style={styles.circleContainer}>
//           <View style={styles.circleWrapper}>
//             {/* Circle background */}
//             <View style={styles.circleBackground} />
            
//             {/* Carbs segment (yellow) */}
//             <View style={styles.carbsSegment} />
            
//             {/* Protein segment (red) */}
//             <View style={styles.proteinSegment} />
            
//             {/* Fat segment (green) */}
//             <View style={styles.fatSegment} />
            
//             {/* Center icon */}
//             <View style={styles.centerIcon}>
//               <Ionicons name="flame" size={32} color={isDark ? '#3A5AE8' : '#2846D0'} />
//             </View>
            
//             {/* Macro labels */}
//             <View style={styles.carbsLabel}>
//               <View style={styles.carbsBadge}>
//                 <Text style={styles.badgeText}>260 g</Text>
//               </View>
//             </View>
            
//             <View style={styles.proteinLabel}>
//               <View style={styles.proteinBadge}>
//                 <Text style={styles.badgeText}>107 g</Text>
//               </View>
//             </View>
            
//             <View style={styles.fatLabel}>
//               <View style={styles.fatBadge}>
//                 <Text style={styles.badgeText}>99 g</Text>
//               </View>
//             </View>
//           </View>
//         </View>
        
//         {/* Goal Input Fields */}
//         <View style={styles.inputContainer}>
//           {/* Calorie Goal */}
//           <View style={styles.inputCard}>
//             <Text style={styles.inputLabel}>
//               Calorie goal
//             </Text>
//             <View style={styles.inputRow}>
//               {isEditing ? (
//                 <TextInput
//                   style={styles.inputText}
//                   value={calorieGoal}
//                   onChangeText={setCalorieGoal}
//                   keyboardType="number-pad"
//                   autoFocus
//                 />
//               ) : (
//                 <Text style={styles.inputText}>
//                   {calorieGoal}
//                 </Text>
//               )}
//               <Ionicons name="flame" size={24} color={isDark ? '#3A5AE8' : '#2846D0'} />
//             </View>
//           </View>
          
//           {/* Protein Goal */}
//           <View style={styles.inputCard}>
//             <Text style={styles.inputLabel}>
//               Protein goal
//             </Text>
//             <View style={styles.inputRow}>
//               {isEditing ? (
//                 <TextInput
//                   style={styles.inputText}
//                   value={proteinGoal}
//                   onChangeText={setProteinGoal}
//                   keyboardType="number-pad"
//                 />
//               ) : (
//                 <Text style={styles.inputText}>
//                   {proteinGoal}
//                 </Text>
//               )}
//               <Ionicons name="flame-outline" size={24} color="#F45641" />
//             </View>
//           </View>
          
//           {/* Carbs Goal */}
//           <View style={styles.inputCard}>
//             <Text style={styles.inputLabel}>
//               Carbs goal
//             </Text>
//             <View style={styles.inputRow}>
//               {isEditing ? (
//                 <TextInput
//                   style={styles.inputText}
//                   value={carbsGoal}
//                   onChangeText={setCarbsGoal}
//                   keyboardType="number-pad"
//                 />
//               ) : (
//                 <Text style={styles.inputText}>
//                   {carbsGoal}
//                 </Text>
//               )}
//               <Ionicons name="pizza-outline" size={24} color="#FFAE38" />
//             </View>
//           </View>
          
//           {/* Fat Goal */}
//           <View style={styles.inputCard}>
//             <Text style={styles.inputLabel}>
//               Fat goal
//             </Text>
//             <View style={styles.inputRow}>
//               {isEditing ? (
//                 <TextInput
//                   style={styles.inputText}
//                   value={fatGoal}
//                   onChangeText={setFatGoal}
//                   keyboardType="number-pad"
//                 />
//               ) : (
//                 <Text style={styles.inputText}>
//                   {fatGoal}
//                 </Text>
//               )}
//               <Ionicons name="water-outline" size={24} color="#72A91B" />
//             </View>
//           </View>
//         </View>
        
//         {/* Action Buttons */}
//         {isEditing ? (
//           <View style={styles.buttonContainer}>
//             <TouchableOpacity 
//               onPress={handleRevert}
//               style={styles.revertButton}
//             >
//               <Text style={styles.revertButtonText}>Revert</Text>
//             </TouchableOpacity>
//             <TouchableOpacity 
//               onPress={handleSave}
//               style={styles.saveButton}
//             >
//               <Text style={styles.saveButtonText}>Save</Text>
//             </TouchableOpacity>
//           </View>
//         ) : (
//           <View style={styles.singleButtonContainer}>
//             <TouchableOpacity 
//               onPress={handleEdit}
//               style={styles.primaryButton}
//             >
//               <Text style={styles.primaryButtonText}>Auto Generate Goals</Text>
//             </TouchableOpacity>
//           </View>
//         )}
//       </KeyboardAvoidingView>
//     </SafeAreaView>
//   );
// }

// const createStyles = (isDark) => StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: isDark ? '#1E1E1E' : '#F5F5F5', // darkSecondary : lightGray
//   },
//   keyboardView: {
//     flex: 1,
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 16,
//     paddingVertical: 16,
//   },
//   backButton: {
//     marginRight: 16,
//   },
//   headerTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: isDark ? 'white' : 'black',
//   },
//   titleContainer: {
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: isDark ? 'white' : 'black',
//   },
//   circleContainer: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingVertical: 24,
//   },
//   circleWrapper: {
//     width: 160,
//     height: 160,
//     position: 'relative',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   circleBackground: {
//     width: '100%',
//     height: '100%',
//     borderRadius: 80,
//     borderWidth: 8,
//     borderColor: '#F5F5F5', // lightGray
//   },
//   carbsSegment: {
//     position: 'absolute',
//     top: 0,
//     right: 0,
//     width: 80,
//     height: 80,
//     borderTopRightRadius: 80,
//     borderTopWidth: 8,
//     borderRightWidth: 8,
//     borderColor: '#FFAE38', // carbs color
//   },
//   proteinSegment: {
//     position: 'absolute',
//     bottom: 0,
//     right: 0,
//     width: 80,
//     height: 80,
//     borderBottomRightRadius: 80,
//     borderBottomWidth: 8,
//     borderRightWidth: 8,
//     borderColor: '#F45641', // protein color
//   },
//   fatSegment: {
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     width: 80,
//     height: 80,
//     borderBottomLeftRadius: 80,
//     borderBottomWidth: 8,
//     borderLeftWidth: 8,
//     borderColor: '#72A91B', // fat color
//   },
//   centerIcon: {
//     position: 'absolute',
//   },
//   carbsLabel: {
//     position: 'absolute',
//     top: 0,
//     right: -64,
//     marginTop: 16,
//   },
//   carbsBadge: {
//     backgroundColor: '#FFAE38',
//     paddingHorizontal: 8,
//     paddingVertical: 4,
//     borderRadius: 20,
//   },
//   proteinLabel: {
//     position: 'absolute',
//     bottom: 0,
//     right: -56,
//     marginBottom: 16,
//   },
//   proteinBadge: {
//     backgroundColor: '#F45641',
//     paddingHorizontal: 8,
//     paddingVertical: 4,
//     borderRadius: 20,
//   },
//   fatLabel: {
//     position: 'absolute',
//     bottom: 0,
//     left: -48,
//     marginBottom: 16,
//   },
//   fatBadge: {
//     backgroundColor: '#72A91B',
//     paddingHorizontal: 8,
//     paddingVertical: 4,
//     borderRadius: 20,
//   },
//   badgeText: {
//     color: 'white',
//     fontWeight: 'bold',
//     fontSize: 12,
//   },
//   inputContainer: {
//     paddingHorizontal: 16,
//     gap: 16,
//   },
//   inputCard: {
//     padding: 16,
//     borderRadius: 12,
//     backgroundColor: isDark ? '#1E1E1E' : 'white', // darkSecondary : white
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 1,
//     },
//     shadowOpacity: 0.1,
//     shadowRadius: 2,
//     elevation: 2,
//   },
//   inputLabel: {
//     fontSize: 14,
//     color: isDark ? '#888888' : '#666666', // darkDarkGray : darkGray
//   },
//   inputRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//   },
//   inputText: {
//     fontSize: 30,
//     fontWeight: 'bold',
//     color: isDark ? 'white' : 'black',
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     paddingHorizontal: 16,
//     paddingVertical: 24,
//     gap: 16,
//   },
//   revertButton: {
//     flex: 1,
//     paddingVertical: 16,
//     borderRadius: 12,
//     backgroundColor: '#E5E5E5',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   revertButtonText: {
//     fontWeight: 'bold',
//     color: '#6B7280',
//   },
//   saveButton: {
//     flex: 1,
//     paddingVertical: 16,
//     borderRadius: 12,
//     backgroundColor: '#2846D0', // primary color
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   saveButtonText: {
//     fontWeight: 'bold',
//     color: 'white',
//   },
//   singleButtonContainer: {
//     paddingHorizontal: 16,
//     paddingVertical: 24,
//   },
//   primaryButton: {
//     paddingVertical: 16,
//     borderRadius: 12,
//     backgroundColor: '#2846D0', // primary color
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   primaryButtonText: {
//     fontWeight: 'bold',
//     color: 'white',
//   },
// });