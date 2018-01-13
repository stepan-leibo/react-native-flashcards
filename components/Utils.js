import React from 'react'
import {Icon} from 'react-native-elements'
import {TouchableOpacity} from 'react-native'

export const HomeButton = ({navigation, icon}) => (
    <TouchableOpacity onPress={e => navigation.navigate('DrawerOpen')}>
        <Icon name='menu' color='#fff' />
    </TouchableOpacity>
);

export const HeaderButton = ({onPress, icon}) => (
    <TouchableOpacity onPress={e => onPress()}>
        <Icon name={icon} color='#fff' />
    </TouchableOpacity>
);