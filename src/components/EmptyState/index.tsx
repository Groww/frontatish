import React from 'react';
import { View, StyleSheet, Text, Image, Dimensions } from 'react-native';
import { Fonts } from '../../styles';
import { useColors } from '../../themes';
import Button from '../Button';
import { EmptyStatePropsType } from './types';

const EmptyState = (props: EmptyStatePropsType) => {
  const { topSection, middleSection, bottomSection } = props;
  const Colors = useColors();
  const fontColor = middleSection?.fontColor
    ? middleSection.fontColor
    : Colors.font_1;
  const styles = StyleSheet.create({
    topSection: {
      marginTop: 30,
      // marginTop: 20,
    },
    bottomSection: { margin: 0 },
    bottomSectionBorder: {
      marginTop: 15,
      borderStyle: 'dotted',
      borderRadius: 1,
      borderWidth: 1,
      borderColor: 'grey',
    },
    mainView: {
      backgroundColor: middleSection?.backgroundColor,
      height: Dimensions.get('screen').height,
    },
    titleText: {
      fontSize: Fonts.size.h5,
      color: fontColor,
      textAlign: 'center',
      fontWeight: 'bold',
    },
    supplementaryText: {
      fontSize: Fonts.size.medium_15,
      color: fontColor,
      padding: 10,
      textAlign: 'center',
    },
    singleButton: {
      backgroundColor: Colors.transparent,
      borderWidth: 0,
      marginTop: 30,
    },
    bottomButton: {
      backgroundColor: Colors.transparent,
      borderWidth: 0,
      fontSize: Fonts.size.mini,
    },
    splashScreen: {
      width: Dimensions.get('screen').width * 0.35,
      height: Dimensions.get('screen').height * 0.25,
    },
    imageContainer: {
      marginTop: 85,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 70,
    },
    bottomFlexContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    bottomLeftText: {
      flex: 1.5,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      margin: 13,
      fontSize: Fonts.size.medium_15,
      color: Colors.font_1,
      fontWeight: 'bold',
    },
    bottomRightText: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'center',
      textAlign: 'right',
      margin: 13,
      fontSize: Fonts.size.medium_15,
      fontWeight: 'bold',
    },
  });

  return (
    <View style={styles.mainView}>
      {topSection?.exists ? (
        <View style={styles.topSection}>
          <Text style={styles.titleText}> {topSection.titleText} </Text>
          <Text style={styles.supplementaryText}>
            {' '}
            {topSection.supplementaryText}{' '}
          </Text>
        </View>
      ) : (
        <View />
      )}

      {middleSection?.exists ? (
        <View>
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: middleSection?.splashImageURL }}
              style={styles.splashScreen}
            />
          </View>

          {middleSection?.titleText ? (
            <Text style={styles.titleText}> {middleSection?.titleText} </Text>
          ) : (
            <View />
          )}

          {middleSection?.supplementaryText ? (
            <Text style={styles.supplementaryText}>
              {' '}
              {middleSection?.supplementaryText}{' '}
            </Text>
          ) : (
            <View />
          )}

          {middleSection?.buttonLabel ? (
            <Button
              type="secondary"
              label={middleSection?.buttonLabel}
              customStyles={styles.singleButton}
            />
          ) : (
            <View />
          )}
        </View>
      ) : (
        <View />
      )}

      {bottomSection?.exists ? (
        <View style={styles.bottomSection}>
          <View style={styles.bottomSectionBorder} />
          <View style={styles.bottomFlexContainer}>
            <Text style={styles.bottomLeftText}>
              {bottomSection?.titleText}
            </Text>
            <View style={styles.bottomRightText}>
              <Button
                type="secondary"
                label={bottomSection?.buttonLabel}
                customStyles={styles.bottomButton}
              />
            </View>
          </View>
        </View>
      ) : (
        <View />
      )}
    </View>
  );
};

EmptyState.defaultProps = {
  topSection: { exists: false },
  middleSection: {
    exists: true,
    titleText: 'Generic Title Text',
    supplementaryText: 'Generic supplementary text in one line',
    backgroundColor: '#fff',
    splashImageURL: 'https://i.imgur.com/7LIS2G3.png',
    fontColor: 'black',
    customStyles: {},
  },
  bottomSection: { exists: false },
};

export default EmptyState;
