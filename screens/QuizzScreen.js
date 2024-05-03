import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

export default function QuizzScreen({ navigation, route }) {
    const { category, difficulty } = route.params;
    const [questions, setQuestions] = useState([]);
    const [questionCounter, setQuestionCounter] = useState(0);
    const [questionIndex, setQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [score, setScore] = useState(0);
    const [error, setError] = useState({ display: false, content: 'Error' });
    const [answered, setAnswered] = useState(false);

    // Save quizz state in the local storage
    const saveQuizState = async (state) => {
        try {
            await AsyncStorage.setItem('quizState', JSON.stringify(state));
        } catch (error) {
            console.error('Error saving quiz state:', error);
        }
    };

    // Get quizz state from the local storage
    const loadQuizState = async () => {
        try {
            const stateString = await AsyncStorage.getItem('quizState');
            return stateString != null ? JSON.parse(stateString) : null;
        } catch (error) {
            console.error('Error loading quiz state:', error);
            return null;
        }
    };

    useEffect(() => {
        const loadState = async () => {
            const loadedState = await loadQuizState();
            if (loadedState) {
                setQuestionIndex(loadedState.questionIndex);
                setScore(loadedState.score);
                setQuestionCounter(loadedState.questionCounter);
            }
        };

        loadState();

    }, []);

    useEffect(() => {
        if (questionIndex >= questions.length) {
            fetchQuestions();
            setQuestionIndex(0);
        }
    }, [questionIndex]);

    const fetchQuestions = async () => {
        try {

            let url = `https://opentdb.com/api.php?amount=10&category=${category}&type=multiple`;
            if (difficulty !== "all") url += `&difficulty=${difficulty}`

            const response = await fetch(url);
            const data = await response.json();

            if (data.results?.length > 0) {
                setQuestions(data.results.map(question => ({
                    ...question,
                    answers: [question.correct_answer, ...question.incorrect_answers].sort(() => Math.random() - 0.5)
                })));

            } else {
                // console.error('No questions found');
            }
        } catch (error) {
            console.error('Error fetching questions:', error);
        }
    };

    const handleValidate = () => {
        if (selectedAnswer) {
            setError({ ...error, display: false, content: '' });

            if (selectedAnswer === questions[questionIndex].correct_answer) {
                setScore(score + 1);
            }

            setQuestionCounter(questionCounter + 1);
            setAnswered(true);

        } else {
            setError({ ...error, display: true, content: 'Select an answer before submit' });
        }
    };

    const handleNextQuestion = () => {
        setSelectedAnswer(null);
        setAnswered(false);

        // If current question isn't the last question
        if (questionIndex < questions.length - 1) setQuestionIndex(questionIndex + 1);
        else setQuestionIndex(0);

    };

    useEffect(() => {
        const saveState = async () => {
            await saveQuizState({
                questionIndex,
                score,
                questionCounter,
            });
        };

        saveState();

    }, [questionIndex, score, questionCounter]);

    const currentQuestion = questions[questionIndex];

    return (
        <View style={styles.container}>
            <View>
                {currentQuestion && (
                    <View>
                        <View style={styles.scoreContainer}>
                            <Text style={styles.score}>Score : {score} / {questionCounter}</Text>
                        </View>

                        <Text style={styles.question}>{currentQuestion.question}</Text>

                        {currentQuestion.answers.map((a, index) => (
                            <TouchableOpacity
                                key={index}
                                style={[
                                    styles.answer,
                                    selectedAnswer === a && !answered && styles.selectedAnswer,
                                    answered && a === currentQuestion.correct_answer ? styles.correctAnswer : (answered && selectedAnswer === a ? styles.incorrectAnswer : null)
                                ]}
                                onPress={() => setSelectedAnswer(a)}
                                disabled={answered}
                            >
                                <Text style={styles.answerTxt}>{a}</Text>
                            </TouchableOpacity>
                        ))}

                        {error.display && <Text style={styles.error}>{error.content}</Text>}
                        {!answered ? (
                            <TouchableOpacity style={styles.btn} onPress={handleValidate}><Text style={styles.btnTxt}>Validate</Text></TouchableOpacity>
                        ) : (
                            <TouchableOpacity style={styles.btn} onPress={handleNextQuestion}><Text style={styles.btnTxt}>Next</Text></TouchableOpacity>
                        )}
                    </View>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 15,
        backgroundColor: '#fff',
    },
    question: {
        fontSize: 20,
        marginVertical: 20,
        fontWeight: 'bold'
    },
    answer: {
        backgroundColor: '#e4e4e4',
        borderRadius: 5,
        paddingHorizontal: 20,
        paddingVertical: 20,
        marginBottom: 8,
        borderWidth: 3,
        borderColor: 'transparent'
    },
    answerTxt: {
        fontSize: 18
    },
    btn: {
        backgroundColor: '#000',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginTop: 20
    },
    btnTxt: {
        fontSize: 20,
        color: '#fff',
        textAlign: 'center'
    },
    error: {
        color: 'red'
    },
    scoreContainer: {
        backgroundColor: '#000',
        marginVertical: 20,
        borderRadius: 10,
        alignSelf: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20
    },
    score: {
        fontSize: 25,
        fontWeight: 'bold',
        alignItems: 'center',
        color: '#FFF'
    },
    selectedAnswer: {
        borderColor: '#000',
    },
    correctAnswer: {
        borderColor: '#2eaf69',
    },
    incorrectAnswer: {
        borderColor: 'lightcoral',
    }
});