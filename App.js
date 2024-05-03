import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './screens/HomeScreen';
import QuizScreen from './screens/QuizzScreen';

const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen}
          options={({route}) => ({
            title: 'Home',
            headerStyle: {
              backgroundColor: "#000"
            },
            headerTitleStyle: {
              fontWeight: 'bold',
              color: "#fff"
            },
          })}
          // options={({ route }) => ({ title: route.params.name })}

        />
        <Stack.Screen name="Quiz" component={QuizScreen}
          options={({route}) => ({
            title: `Quizz - ${route.params.difficulty}`,
            headerStyle: {
              backgroundColor: "#000"
            },
            headerTitleStyle: {
              fontWeight: 'bold',
              color: "#fff"
            },
            // headerLeft: () => (''),
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}