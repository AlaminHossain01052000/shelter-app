import React, { useState } from 'react';
import { TouchableOpacity, StyleSheet, Text, Animated } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
const IconButton = ({ title, onPress, icon, color }) => {
    const [isHovered, setIsHovered] = useState(false);
  
    const handleHoverIn = () => {
      setIsHovered(true);
    };
  
    const handleHoverOut = () => {
      setIsHovered(false);
    };
  
    const buttonStyle = {
      backgroundColor: isHovered ? 'rgba(0,0,0,0.5)' : color, // Change to the desired hover color
      ...styles.button,
    };
  
    return (
      <TouchableOpacity
        style={buttonStyle}
        onPress={onPress}
        onMouseEnter={handleHoverIn}
        onMouseLeave={handleHoverOut}
      >
        <FontAwesomeIcon icon={icon} style={styles.icon} />
        <Text style={styles.title}>{title}</Text>
      </TouchableOpacity>
    );
  };
  
const styles = StyleSheet.create({
    
    
    button: {
      flexDirection: 'column',
      alignItems: 'center',
      padding: 25,
      width: 175,
      height: 90,
      borderRadius: 87.5,
      marginVertical: 10,
    },
    icon: {
      fontSize: 30,
      marginBottom: 5,
    },
    title: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#fff',
    },
  });
export default IconButton;