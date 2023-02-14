import React, { useState } from 'react';

import { useTranslation } from 'react-i18next';
import { Dropdown } from 'react-native-element-dropdown';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '@/redux/rootSlices';
import { setValueSlice } from '@/redux/slices/homeSlice';

import Configs from '@/configs';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Props {}

enum LangKey {
  'zh-TW',
  'en',
}

export const LanguageDropdown: React.FC<Props> = () => {
  const { i18n } = useTranslation();
  const dispatch = useDispatch();
  const { len } = useSelector((state: RootState) => state.home.value);

  const data = [
    { label: '中文(繁)', value: LangKey[0] },
    { label: 'en', value: LangKey[1] },
  ];

  const handleLanguageChange = async (key: string) => {
    dispatch(setValueSlice({ len: key }));
    await i18n.changeLanguage(key);
    await AsyncStorage.setItem(Configs.AsyncStorage.len, key);
  };

  return (
    <Dropdown
      onChange={(val) => {
        handleLanguageChange(val.value);
      }}
      data={data}
      selectedTextStyle={{ textAlign: 'right' }}
      itemTextStyle={{ textAlign: 'right' }}
      value={len || i18n.language}
      labelField="label"
      valueField="value"
    />
  );
};
