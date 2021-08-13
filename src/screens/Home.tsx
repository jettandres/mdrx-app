import React, { useCallback } from 'react'
import {
  View,
  Button,
  ScrollView,
  Image,
  TouchableOpacity,
  Text,
} from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
import { DateTime } from 'luxon'

import type { FC } from 'react'

import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '@routes/types'
import { RouteProp } from '@react-navigation/native'

import HorizontalLabel from '@components/HorizontalLabel'
import HomeFooter from '@components/HomeFooter'
import HorizontalSwitch from '@components/HorizontalSwitch'
import ExpensePicker from '@components/ExpensePicker'
import HorizontalInput from '@components/HorizontalInput'

import uploadIcon from '@images/outline_add_a_photo_black_24dp.png'

type HomeNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>
type HomeRouteProp = RouteProp<RootStackParamList, 'Home'>

type Props = {
  navigation: HomeNavigationProp
  route: HomeRouteProp
}

const Home: FC<Props> = (props) => {
  const { navigation } = props

  const onNextPress = useCallback(() => {}, [navigation])

  const onEndPress = useCallback(
    () => navigation.navigate('ReviewReport'),
    [navigation],
  )

  const onReviewPress = useCallback(
    () => navigation.navigate('ReviewReport'),
    [navigation],
  )

  const currentDate = DateTime.now().toLocaleString(DateTime.DATE_FULL)

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <View style={styles.formContainer}>
          <HorizontalLabel title="Date Reported" subtitle={currentDate} />
          <HorizontalLabel
            title="Assignment"
            subtitle="Mindanao Sales & Marketing"
          />
          <HorizontalSwitch title="VATable" />
          <HorizontalLabel title="Receipt Series #" subtitle="12E2A1" />
          <ExpensePicker />
          <HorizontalInput title="Expense Amount" placeholder="P100.00" />
          <HorizontalInput title="Supplier TIN #" placeholder="32125242-0000" />
          <HorizontalInput title="Supplier Name" placeholder="HPG Securities" />
          <HorizontalInput
            title="Supplier Address"
            placeholder="2312 Ford St, Malate"
          />
          <HorizontalInput
            title="Supplier Street/Brgy"
            placeholder="Brgy. 250"
          />
          <HorizontalInput
            title="Supplier Bldg"
            placeholder="Waypark Garden Bldg"
          />
          <TouchableOpacity style={styles.uploadButton}>
            <>
              <Image style={styles.uploadIcon} source={uploadIcon} />
              <Text style={styles.uploadLabel}>Upload image</Text>
            </>
          </TouchableOpacity>
          <HomeFooter
            onNext={onNextPress}
            onEnd={onEndPress}
            onReview={onReviewPress}
          />
        </View>
      </View>
    </ScrollView>
  )
}

const styles = EStyleSheet.create({
  scrollView: {
    flex: 1,
  },
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    flex: 1,
    width: '100%',
    padding: '$spacingMd',
  },
  uploadIcon: {
    height: 30,
    width: 30,
  },
  uploadButton: {
    flex: 1,
    alignSelf: 'center',
    margin: '$spacingXl',
    alignItems: 'center',
  },
  uploadLabel: {
    fontSize: '$sm',
    color: '$darkGray',
    marginTop: '$spacingXs',
  },
})

export default Home
