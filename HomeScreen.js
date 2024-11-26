import React, { useState } from 'react';
import { Button, ScrollView, TextInput, View, Text } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { parseString } from 'react-native-xml2js';

const HomeScreen = ({ navigation }) => {
  const [formXml, setFormXml] = useState('');

 
  const parseAndNavigate = (xml) => {
    parseString(xml, { explicitArray: false }, (err, result) => {
      if (err) {
        console.error('Invalid XML format');
      } else {
        const fields = result?.form?.fields?.field;
        const formData = Array.isArray(fields) ? fields : [fields];
        navigation.navigate('Form', { formData });
      }
    });
  };

  
  const loadXMLFile = async () => {
    const result = await DocumentPicker.getDocumentAsync({ type: 'text/plain' });
    if (result.type === 'success') {
      const xmlContent = await fetch(result.uri).then((res) => res.text());
      parseAndNavigate(xmlContent);
    }
  };

  return (
    <ScrollView style={{ padding: 20 }}>
      <Text style={{textAlign:'center', padding:30, fontSize:30}}>XML Form Renderer</Text>
      <TextInput
        value={formXml}
        onChangeText={setFormXml}
        placeholder="Enter XML here..."
        multiline
        style={{ height: 100, borderColor: 'gray', borderWidth: 1, marginBottom: 20, padding: 10 }}
      />
      <Text style={{paddingBottom:20}}>Render Form</Text>
      <Button title=" XML Input" onPress={() => parseAndNavigate(formXml)} />
        <Text style={{paddingBottom:10 ,paddingTop:10, textAlign:'center'}}>Or</Text>
      <Button title=" XML File" onPress={loadXMLFile} />
    </ScrollView>
  );
};

export default HomeScreen;
