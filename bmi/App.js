import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
const classifyBMI = (bmi) => {
  if (bmi < 18.5) return 'Cân nặng thấp (gầy)';
  if (bmi < 25) return 'Bình thường';
  if (bmi < 30) return 'Thừa cân';
  if (bmi < 35) return 'Béo phì độ I';
  if (bmi < 40) return 'Béo phì độ II';
  return 'Béo phì độ III';
};
export default function App() {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmi, setBmi] = useState('0.0');
  const [history, setHistory] = useState([]);
  const computeBMI = () => {
    const weightNum = parseFloat(weight);
    const heightNum = parseFloat(height) / 100;
    if (weightNum && heightNum) {
      const bmiValue = (weightNum / (heightNum * heightNum)).toFixed(2);
      const bmiClass = classifyBMI(bmiValue);
      setBmi(bmiValue);
      setHistory([...history, { bmi: bmiValue, class: bmiClass }]);
    }
  };
  const resetInput = () => {
    setWeight('');
    setHeight('');
    setBmi('0.0');
    setHistory([]);
  };
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Tính chỉ số khối cơ thể (BMI)</Text>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Cân nặng (kg):</Text>
        <TextInput 
          style={styles.input} 
          keyboardType='numeric' 
          placeholder="Nhập cân nặng"
          onChangeText={setWeight}
          value={weight}
        />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Chiều cao (cm):</Text>
        <TextInput 
          style={styles.input} 
          keyboardType='numeric' 
          placeholder="Nhập chiều cao"
          onChangeText={setHeight}
          value={height}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={computeBMI}>
        <Text style={styles.buttonText}>Tính BMI</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={resetInput}>
        <Text style={styles.buttonText}>Xóa</Text>
      </TouchableOpacity>
      <Text style={styles.bmiOutput}>BMI: {bmi}</Text>
      <ScrollView style={styles.historyContainer}>
        {history.map((entry, index) => (
          <View key={index} style={styles.historyItem}>
            <Text>Lần {index + 1}: BMI {entry.bmi} - {entry.class}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  inputGroup: {
    marginBottom: 20,
    width: '80%',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: '100%',
    padding: 10,
    fontSize: 18,
  },
  button: {
    backgroundColor: 'black',
    paddingHorizontal: 20, 
    paddingVertical: 10,   
    width: '36%',          
    alignItems: 'center',
    borderRadius: 20,      
    alignSelf: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  bmiOutput: {
    marginTop: 20,
    fontSize: 24,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 24,
  },
  historyContainer: {
    marginTop: 20,
    width: '80%',
    maxHeight: 200,
  },
  historyItem: {
    backgroundColor: '#ADD8E6',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
});
