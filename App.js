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
          options={{
            title: "Quizz",
            headerStyle: {
              backgroundColor: "#000"
            },
            headerTitleStyle: {
              fontWeight: 'bold',
              color: "#fff"
            },
          }}
        />
        <Stack.Screen name="Quiz" component={QuizScreen}
          options={{
            title: "Quizz",
            headerStyle: {
              backgroundColor: "#000"
            },
            headerTitleStyle: {
              fontWeight: 'bold',
              color: "#fff"
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}