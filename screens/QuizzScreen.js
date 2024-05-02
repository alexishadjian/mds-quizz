import { useEffect, useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";

export default function QuizzScreen({ route }) {

    const { category, difficulty } = route.params;
    const [question, setQuestion] = useState(null);
    const [answers, setAnswers] = useState([]);
    const [selectedAnswer, setSelectedAnswer] = useState();
    const [correctAnswer, setCorrectAnswer] = useState();
    const [score, setScore] = useState(0);


    const fetchQuestion = async () => {
        try {

            const response = await fetch(`https://opentdb.com/api.php?amount=1&category=${category}&difficulty=${difficulty}&type=multiple`);
            const data = await response.json();

            if (data.results.length > 0) {
                setQuestion(data.results[0]);
                setAnswers(data.results[0].incorrect_answers);
                setAnswers(answers => [...answers, data.results[0].correct_answer]);
                setCorrectAnswer(data.results[0].correct_answer);

                // console.log('edch', data);
                // console.log('answers', answers);
            }
            else console.error('No question found');

        } catch (error) {
            console.error('Error fetching question:', error);
        }
    };

    const handleValidate = () => {
        if (selectedAnswer == correctAnswer) {
            setScore(score + 10);
        }
        
        fetchQuestion();

    }


    useEffect(() => {
    
        fetchQuestion();
    }, [category, difficulty]);

    return (
        <View style={styles.container}>
            <View>
                {question && (
                    <View>
                        <Text>Score: {score}</Text>
                        <Text>Category: {category}</Text>
                        <Text>Difficulty: {difficulty}</Text>
                        <Text style={styles.question}>{question.question}</Text>
                        {answers.map(a => (
                            <TouchableOpacity style={[styles.answer, selectedAnswer === a && styles.activeBtn]} onPress={() => setSelectedAnswer(a)}>
                                <Text style={styles.answerTxt}>{a}</Text>
                            </TouchableOpacity>
                        ))}
                        <TouchableOpacity style={styles.btn} onPress={handleValidate} ><Text style={styles.btnTxt}>Valider</Text></TouchableOpacity>
                    </View>
                )}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 15,
        backgroundColor: '#fff',
        // justifyContent: 'center'
    },
    title: {
        fontSize: 30,
        marginBottom: 40
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
        borderWidth: 2,
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
    activeBtn: {
        borderBlockColor: '#000'
    }
});
