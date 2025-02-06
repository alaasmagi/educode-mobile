import React from 'react';
import { TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Icons } from './Icons';
import i18next from '../../services/i18next';

const LanguageSwitch = () => {
  const currentLang = i18next.language;

  const toggleLanguage = () => {
    const newLang = currentLang === 'et' ? 'en' : 'et';
    i18next.changeLanguage(newLang);
  };

  return (
    <TouchableOpacity style={styles.structure} onPress={toggleLanguage}>
        <Image source={currentLang === 'en' ? Icons["eng-flag"] : Icons["est-flag"]} style={styles.image} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    structure: {
      backgroundColor: "#1E1E1E",
      borderRadius: 20,
      borderWidth: 2,
      borderColor: "#4492EA",
      paddingVertical: 15,
      paddingHorizontal: 10,
      justifyContent: "center",
    },
    image: {
      height: 20,
      width: 30,
    },
});

export default LanguageSwitch;



