import React from 'react'
import { Text, View } from 'react-native'

const SettingsPage = () => {
  return (
    <View style={{
      flex : 1,
      justifyContent : "center",
      alignItems : "center",
    }}>
      <Text style={{
        fontSize : 20,
        fontStyle :"italic",
      }}>
        SettingsPage
        </Text>
    </View>
  )
}

export default SettingsPage