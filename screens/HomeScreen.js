import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useEffect, useState } from 'react';
import {Picker} from '@react-native-picker/picker';


export default function HomeScreen({navigation}) {

    const [selectedDifficulty, setSelectedDifficulty] = useState('easy');
    const [selectedCategory, setSelectedCategory] = useState();
    const [categories, setCategories] = useState([]);

  
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://opentdb.com/api_category.php');
        const data = await response.json();
  
        setCategories(data.trivia_categories);
  
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
  
    useEffect(() => {
      fetchCategories();
    }, []);

    const handleStartQuiz = () => {
        navigation.navigate('Quiz', {
            category: selectedCategory,
            difficulty: selectedDifficulty
        });
    };

    return (
        // <ScrollView>
        <View style={styles.container}>
            <SafeAreaView>
                <Text style={styles.title}>Quizz</Text>
                <View>
                    <Text style={styles.subTitle}>Difficulté</Text>
                    <View style={styles.difficultyContainer}>
                        <TouchableOpacity 
                            style={[styles.btnDifficulty, selectedDifficulty === "easy" && styles.activeBtn]}
                            onPress={() => setSelectedDifficulty("easy")}><Text>Facile</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={[styles.btnDifficulty, selectedDifficulty === "medium" && styles.activeBtn]}
                            onPress={() => setSelectedDifficulty("medium")}><Text>Moyen</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={[styles.btnDifficulty, selectedDifficulty === "hard" && styles.activeBtn]}
                            onPress={() => setSelectedDifficulty("hard")}><Text>Difficile</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={[styles.btnDifficulty, selectedDifficulty === "" && styles.activeBtn]}
                            onPress={() => setSelectedDifficulty("")}><Text>Tous</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View>
                    <Text style={styles.subTitle}>Catégorie</Text>
                    <Picker
                        selectedValue={selectedCategory}
                        onValueChange={(itemValue, itemIndex) =>
                            setSelectedCategory(itemValue)
                        }>
                        {categories.map(category => (
                            <Picker.Item key={category.id} label={category.name} value={category.id} />
                        ))}
                    </Picker>
                </View>
                <TouchableOpacity style={styles.btn} onPress={handleStartQuiz}><Text style={styles.btnTxt}>Start the quizz !</Text></TouchableOpacity>
            </SafeAreaView>
        </View>
    //</ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        paddingHorizontal: 15,
        backgroundColor: '#fff',
        justifyContent: 'center'
    },
    title: {
        fontSize: 30,
        marginTop: 20,
        fontWeight: 'bold'
    },
    subTitle: {
        fontSize: 16,
        marginTop: 50,
        marginBottom: 15,
        fontWeight: 'bold'
    },
    btn: {
        backgroundColor: '#000',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10
    },
    btnTxt: {
        fontSize: 20,
        color: '#fff',
        textAlign: 'center'
    },
    difficultyContainer: {
        display: 'flex',
    },
    btnDifficulty: {
        backgroundColor: '#e4e4e4',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderWidth: 2,
        marginBottom: 5,
        borderRadius: 5,
        borderColor: 'transparent'
    },
    activeBtn: {
        borderBlockColor: '#000'
    }
});