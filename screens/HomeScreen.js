import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useEffect, useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Svg, { Path } from 'react-native-svg';


export default function HomeScreen({ navigation }) {

    const [selectedDifficulty, setSelectedDifficulty] = useState('easy');
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await fetch('https://opentdb.com/api_category.php');
            const data = await response.json();

            setCategories(data.trivia_categories);

        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const handleStartQuiz = () => {
        navigation.navigate('Quiz', {
            category: selectedCategory || 9,
            difficulty: selectedDifficulty,
        });
    };

    const resetQuiz = async () => {
        try {
            await AsyncStorage.removeItem('quizState');
        } catch (error) {
            console.error('Error resetting quiz:', error);
        }
    };

    return (
    <SafeAreaView>
        <View style={styles.container}>
                <ScrollView>
                    <Text style={styles.title}>Quizz</Text>
                    <View>
                        <Text style={styles.subTitle}>Difficulty</Text>
                        <View style={styles.difficultyContainer}>
                            <TouchableOpacity
                                style={[styles.btnDifficulty, selectedDifficulty === "easy" && styles.activeBtn]}
                                onPress={() => setSelectedDifficulty("easy")}><Text>Easy</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.btnDifficulty, selectedDifficulty === "medium" && styles.activeBtn]}
                                onPress={() => setSelectedDifficulty("medium")}><Text>Medium</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.btnDifficulty, selectedDifficulty === "hard" && styles.activeBtn]}
                                onPress={() => setSelectedDifficulty("hard")}><Text>Hard</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.btnDifficulty, selectedDifficulty === "" && styles.activeBtn]}
                                onPress={() => setSelectedDifficulty("")}><Text>All</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View>
                        <Text style={styles.subTitle}>Category</Text>
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
                </ScrollView>

                <View style={styles.btnContainer}>
                    <TouchableOpacity style={[styles.btn, styles.btnStart]} onPress={handleStartQuiz}><Text style={styles.btnTxt}>Start the quizz !</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.btn} onPress={resetQuiz}>
                        <Svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <Path d="M14.5 3.5C16.914 4.877 18.5 7.522 18.5 10.5C18.5 12.0823 18.0308 13.629 17.1518 14.9446C16.2727 16.2602 15.0233 17.2855 13.5615 17.891C12.0997 18.4965 10.4911 18.655 8.93928 18.3463C7.38743 18.0376 5.96197 17.2757 4.84315 16.1569C3.72433 15.038 2.9624 13.6126 2.65372 12.0607C2.34504 10.5089 2.50347 8.90034 3.10897 7.43853C3.71447 5.97672 4.73985 4.72729 6.05544 3.84824C7.37103 2.96919 8.91775 2.5 10.5 2.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <Path d="M14.5 7.5V3.5H18.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </Svg>
                    </TouchableOpacity>
                </View>
        </View>
    </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 15,
        backgroundColor: '#fff',
        justifyContent: 'center',
        minHeight: '100%'
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
        borderRadius: 10,
    },
    btnStart: {
        flexGrow: 1  
    },
    btnTxt: {
        fontSize: 20,
        color: '#fff',
        textAlign: 'center'
    },
    difficultyContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
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
        borderColor: '#000'
    },
    btnContainer: {
        display: 'flex',
        flexDirection: 'row',
        gap: 8,
        paddingVertical: 40,
        backgroundColor: '#FFF'
    }
});