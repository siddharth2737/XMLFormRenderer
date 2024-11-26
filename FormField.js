import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const FormField = ({ field }) => {
  const { type, label, placeholder, options } = field;

  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  switch (type) {
    case 'text':
      return (
        <View style={{ marginBottom: 20 }}>
          <Text>{label}</Text>
          <TextInput
            placeholder={placeholder || ''}
            style={{
              borderWidth: 1,
              borderColor: 'gray',
              padding: 10,
              borderRadius: 5,
              marginTop: 5,
            }}
          />
        </View>
      );

    case 'datetime':
      return (
        <View style={{ marginBottom: 20 }}>
          <Text>{label}</Text>
          <TouchableOpacity
            style={{
              borderWidth: 1,
              borderColor: 'gray',
              padding: 10,
              borderRadius: 5,
              marginTop: 5,
            }}
            onPress={() => setShowDatePicker(true)}
          >
            <Text>{date.toDateString()} {date.toLocaleTimeString()}</Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode="datetime"
              display="default"
              onChange={handleDateChange}
            />
          )}
        </View>
      );

    case 'radio':
      if (!Array.isArray(options)) {
        return (
          <Text style={{ color: 'red' }}>Invalid options for field: {label}</Text>
        );
      }
      return (
        <View style={{ marginBottom: 20 }}>
          <Text>{label}</Text>
          {options.map((option, index) => (
            <View key={index} style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 5 }}>
              <TouchableOpacity
                style={{
                  height: 20,
                  width: 20,
                  borderWidth: 1,
                  borderRadius: 10,
                  marginRight: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <View
                  style={{
                    height: 10,
                    width: 10,
                    borderRadius: 5,
                    backgroundColor: 'black',
                  }}
                />
              </TouchableOpacity>
              <Text>{option}</Text>
            </View>
          ))}
        </View>
      );

    case 'drawing':
      return (
        <View style={{ marginBottom: 20 }}>
          <Text>{label}</Text>
          <Button title="Open Drawing Pad" onPress={() => {}} />
        </View>
      );

    default:
      return <Text style={{ color: 'red' }}>Unsupported field type: {type}</Text>;
  }
};

export default FormField;
