import React from 'react';
import { View, ScrollView, Text } from 'react-native';
import FormField from './FormField';

const FormScreen = ({ route }) => {
  const { formData } = route.params;

  return (
    <ScrollView style={{ padding: 20 }}>
      <Text style={{textAlign:'center', fontSize:20}}>Form</Text>
      <View style={{ marginTop: 20 }}>
        {formData.map((field, index) => (
          <FormField key={index} field={field} />
        ))}
      </View>
    </ScrollView>
  );
};

export default FormScreen;
