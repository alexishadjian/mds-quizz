import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <Text>Difficulté</Text>
        <TouchableOpacity style={styles.btn}><Text style={styles.btnTxt}>Start the quizz !</Text></TouchableOpacity>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
    backgroundColor: '#fff',
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
  }
});
