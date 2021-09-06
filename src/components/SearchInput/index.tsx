import React, { useEffect, useState } from 'react';
import { AutoComplete, Input } from 'antd';
import { history } from 'umi';
import { /* searchKeyWordFunc , */ hotWords } from '@/pages/searchResult';
import styles from './index.less';

interface SearchInputPropsType {
  autocompleteStyle?: any;
  searchConfig?: any;
  currentValue?: string;
  className?: string;
}

const selfAutocompleteStyle = {
  width: 220,
  marginLeft: 40,
  display: 'flex',
  alignItems: 'center',
};

const selfSearchConfig = {
  style: {
    borderRadius: '2px',
  },
  className: 'header-search-input',
  placeholder: '请输入关键字',
  allowClear: true,
  // 点击清除icon、回车、按下搜索键时会触发该方法
  onSearch: (val: string, event: any) => {
    const tagName = event.target.tagName.toLowerCase();
    // 点击清除icon触发时，目标是input，val值是空
    if (val === '' && tagName === 'input') {
      return;
    }
    history.push(`/searchResult?keyWord=${val}`);
  },
};

const SearchInput = (props: SearchInputPropsType) => {
  // 备选框的options
  const [autoOptions /* , setAutoOptions */] = useState<any[]>(hotWords);

  // search输入框的value
  const [searchValue, setSearchValue] = useState<string>('');

  const {
    autocompleteStyle = selfAutocompleteStyle,
    searchConfig = selfSearchConfig,
    className,
  } = props;

  // const searchAllDataSuccess = (params: { data: any[] }) => {
  //   const { data } = params;
  //   // console.log(53, data);
  //   const options = data.map((item) => {
  //     return {
  //       value: item.title,
  //       key: item.id,
  //     };
  //   });
  //   setAutoOptions(options);
  // };

  useEffect(() => {
    const { currentValue } = props;
    if (currentValue) {
      setSearchValue(currentValue);
    }
  }, [props]);

  // useEffect(() => {
  //   if (searchValue) {
  //     searchKeyWordFunc({ keyWord: searchValue, page: 0, pageSize: 6, searchAllDataSuccess });
  //   } else {
  //     setAutoOptions(hotWords);
  //   }
  // }, [searchValue]);

  return (
    <AutoComplete
      className={`${styles['self-autocomplete-container']} ${
        props.autocompleteStyle ? '' : styles['props-autocomplete-container']
      } ${className}`}
      options={autoOptions}
      onChange={(value) => setSearchValue(value)}
      onSelect={(value) => history.push(`/searchResult?keyWord=${value}`)}
      backfill
      value={searchValue}
      style={autocompleteStyle}
      getPopupContainer={(triggerNode) => triggerNode.parentElement}
    >
      <Input.Search {...searchConfig} />
    </AutoComplete>
  );
};

export default SearchInput;
