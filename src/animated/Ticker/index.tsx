// base and lib imports
import React, { Component } from 'react';
import { StyleSheet, Text, View, LayoutChangeEvent } from 'react-native';

// utils and helpers
import { StyleType, ColorType } from '../../common/types';

// common components
import Tick from './Tick';

// styles and themes
import { withColors } from '../../themes';
import { Fonts } from '../../styles';

interface TickerProps {
  text: string;
  type: string;
  textStyle: StyleType;
  Colors: any;
}
interface TickerState {
  measured: boolean;
  height: number;
}
class Ticker extends Component<TickerProps, TickerState> {
  constructor(props: TickerProps) {
    super(props);
    this.state = {
      measured: false,
      height: 0,
    };
  }

  handleLayout = (e: LayoutChangeEvent) => {
    this.setState({
      measured: true,
      height: e.nativeEvent.layout.height,
    });
  };

  render() {
    const { Colors } = this.props;
    const styles = getStyles(Colors);
    const { height, measured } = this.state;
    const wrapStyle = measured ? { height } : styles.measure;
    const { text } = this.props;

    // just in case to handle crashes
    // if (text && typeof text === 'number') {
    //   // text = text.toFixed(1);
    //   // type needs to be passed so that it will
    //   // remain reusable for any type of of text passed.
    //   // text = type === 'percentage' ? `${text.toString()}%` : text.toString();
    // }
    return (
      <View style={styles.container}>
        <View style={[styles.row, wrapStyle]}>
          {text.split('').map((v, i) => {
            // eslint-disable-next-line no-restricted-globals
            if (isNaN(parseFloat(v))) {
              return (
                <Text key={i.toString()} style={[styles.text]}>
                  {v}
                </Text>
              );
            }
            return (
              <Tick
                key={i.toString()}
                value={v}
                height={height}
                styles={styles}
              />
            );
          })}
        </View>
        {!measured ? (
          <Text
            style={[styles.text, styles.measure]}
            onLayout={this.handleLayout}
          >
            0
          </Text>
        ) : null}
      </View>
    );
  }
}

const getStyles = (Colors: ColorType) => {
  return StyleSheet.create({
    container: {
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      marginTop: 10,
    },
    measure: { opacity: 0 },
    row: {
      overflow: 'hidden',
      flexDirection: 'row',
    },
    text: {
      fontSize: Fonts.size.h1,
      fontWeight: 'bold',
      fontStyle: 'normal',
      // letterSpacing: -0.29,
      textAlign: 'left',
      color: Colors.primary,
    },
  });
};

export default withColors(Ticker);
