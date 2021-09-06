import { List, Card, Radio, Table, Menu, Dropdown, Button, Input } from 'antd';
import * as echarts from 'echarts';
import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { DownOutlined } from '@ant-design/icons';
import styles from './index.less';
import point1 from './static/images/橘黄点.png';
import point2 from './static/images/黄点.png';
import point3 from './static/images/橘黄点圆圈／实心.png';
import point4 from './static/images/黄点圆圈／实心.png';
// import expand from './static/images/收起.png';
import { tableData1, tableData2, tableData3 } from './static/data.js';

const { Search } = Input;

const china = require('./static/china.json');

const world = require('./static/world.json');

const nameMap = require('./static/world-mapping.json');

const areaData = [
  {
    title: '华南',
    value: 225,
  },
  {
    title: '华东',
    value: 168,
  },
  {
    title: '华中',
    value: 42,
  },
  {
    title: '华北',
    value: 187,
  },
  {
    title: '海外',
    value: 25,
  },
];

const cloudArray = [
  '万国',
  '沃云',
  '阿里云',
  '腾讯云',
  '华为云',
  '百度云',
  '微软云',
  '联通行业云',
  '京东云',
  '语音云',
  '云上物联',
  '青云',
  '瀮云',
  '谷歌云国际',
  '证通云',
  '香港多云平台',
  '亚马逊云',
  'Equinix',
  'GREEN DC',
  'IBM softlayer国际',
];
// const cloudItem1 = ['万国', '谷歌云', '阿里云', '百度云', '腾讯云', '沃云', '华为云', '青云'];
/* const cloudItem2 = [
  '瀮云',
  '京东云',
  '微软云',
  '语音云',
  '证通云',
  '云上物联',
  '联通行业云',
  '香港多云平台',
  '亚马逊云',
  'Equinix',
  'GREEN DC',
  'IBM softlayer',
]; */

const data = [
  {
    name: '广东',
    value: '已接入阿里云、百度云、华为云、联通行业云、青云、腾讯云、万国、沃云、云上物联',
  },
  {
    name: '香港',
    value:
      '已接入万国、阿里云、百度云、华为云、亚马逊云国际、阿里云国际、谷歌云国际、香港多云平台、IBM softlayer国际、微软云国际、腾讯云国际',
  },
  {
    name: '上海',
    value: '已接入万国、阿里云、华为云、联通行业云、青云、腾讯云、沃云、云上物联、证通云',
  },
  { name: '浙江', value: '已接入阿里、沃云、联通行业云' },
  { name: '湖北', value: '已接入沃云、联通行业云、腾讯云' },
  { name: '重庆', value: '已接入沃云' },
  { name: '广西', value: '已接入沃云' },
  { name: '宁夏', value: '已接入沃云' },
  { name: '陕西', value: '已接入沃云、云上物联' },
  { name: '贵州', value: '已接入沃云' },
  { name: '福建', value: '已接入沃云' },
  { name: '新疆', value: '已接入沃云' },
  { name: '青海', value: '已接入沃云' },
  { name: '山西', value: '已接入沃云' },
  { name: '安徽', value: '已接入沃云' },
  { name: '山东', value: '已接入沃云、云上物联' },
  { name: '辽宁', value: '已接入沃云、云上物联' },
  { name: '江西', value: '已接入沃云' },
  { name: '四川', value: '已接入万国、沃云、语音云、云上物联' },
  { name: '甘肃', value: '已接入沃云' },
  { name: '海南', value: '已接入沃云' },
  { name: '海南', value: '已接入沃云' },
  { name: '吉林', value: '已接入沃云、联通行业云、云上物联、语音云、万国' },
  { name: '江苏', value: '已接入沃云、语音云、万国、百度云、云上物联' },
  { name: '河北', value: '已接入沃云、华为云' },
  { name: '天津', value: '已接入沃云、腾讯云' },
  {
    name: '北京',
    value:
      '已接入沃云、万国、阿里云、百度云、华为云、京东云、瀮云、青云、腾讯云、云上物联、亚马逊云、微软云',
  },
  { name: '新加坡', value: '已接入亚马逊云国际、阿里云国际、华为云国际、微软云国际' },
  { name: '美国', value: '已接入亚马逊云国际、阿里云国际' },
  { name: '悉尼', value: '已接入亚马逊云国际、阿里云国际' },
  { name: '东京', value: '已接入亚马逊云国际、阿里云国际' },
  { name: '法兰克福', value: '已接入亚马逊云国际、阿里云国际、Equinix FR4' },
  { name: '伦敦', value: '已接入亚马逊云国际、阿里云国际' },
  { name: '瑞士', value: '已接入GREEN DC' },
];

const data2 = [
  { name: '安徽', value: '已接入6个DC' },
  { name: '北京', value: '已接入27个DC' },
  { name: '福建', value: '已接入20个DC' },
  { name: '福建', value: '已接入20个DC' },
  { name: '甘肃', value: '已接入4个DC' },
  { name: '广东', value: '已接入26个DC' },
  { name: '广西', value: '已接入4个DC' },
  { name: '贵州', value: '已接入4个DC' },
  { name: '海南', value: '已接入4个DC' },
  { name: '河北', value: '已接入36个DC' },
  { name: '河南', value: '已接入20个DC' },
  { name: '黑龙江', value: '已接入26个DC' },
  { name: '湖北', value: '已接入6个DC' },
  { name: '湖南', value: '已接入8个DC' },
  { name: '吉林', value: '已接入8个DC' },
  { name: '江苏', value: '已接入16个DC' },
  { name: '江西', value: '已接入2个DC' },
  { name: '辽宁', value: '已接入11个DC' },
  { name: '内蒙古', value: '已接入10个DC' },
  { name: '宁夏', value: '已接入7个DC' },
  { name: '青海', value: '已接入4个DC' },
  { name: '山东', value: '已接入21个DC' },
  { name: '山西', value: '已接入22个DC' },
  { name: '陕西', value: '已接入4个DC' },
  { name: '上海', value: '已接入8个DC' },
  { name: '四川', value: '已接入8个DC' },
  { name: '天津', value: '已接入13个DC' },
  { name: '香港', value: '已接入2个DC' },
  { name: '新疆', value: '已接入4个DC' },
  { name: '云南', value: '已接入2个DC' },
  { name: '浙江', value: '已接入42个DC' },
  { name: '重庆', value: '已接入4个DC' },
];

const geoCoordMap1 = {
  新疆: [86.61, 40.79],
  西藏: [89.13, 30.66],
  黑龙江: [128.34, 47.05],
  吉林: [126.32, 43.38],
  辽宁: [123.42, 41.29],
  内蒙古: [112.17, 41.81],
  北京: [116.4, 40.4],
  宁夏: [106.27, 36.76],
  山西: [111.95, 37.65],
  河北: [115.21, 38.44],
  天津: [117.04, 39.52],
  青海: [97.07, 35.62],
  甘肃: [103.82, 36.05],
  山东: [118.01, 36.37],
  陕西: [108.94, 34.46],
  河南: [113.46, 34.25],
  安徽: [117.28, 31.86],
  江苏: [120.26, 32.54],
  上海: [121.46, 31.28],
  四川: [103.36, 30.65],
  湖北: [112.29, 30.98],
  浙江: [120.15, 29.28],
  重庆: [107.51, 29.63],
  湖南: [112.08, 27.79],
  江西: [115.89, 27.97],
  贵州: [106.91, 26.67],
  福建: [118.31, 26.07],
  云南: [101.71, 24.84],
  台湾: [121.01, 23.54],
  广西: [108.67, 23.68],
  广东: [112.98, 23.82],
  海南: [110.03, 19.33],
  澳门: [113.54, 22.19],
  香港: [114.17, 22.15],
  新加坡: [103.51, 1.16],
  美国: [-95.71, 37.09],
  悉尼: [151.12, -33.51],
  东京: [140.5, 35.44],
  法兰克福: [8.34, 50.02],
  伦敦: [0, 51.3],
  瑞士: [7.36, 46.04],
};
const geoCoordMap2 = {};

// 地理位置增加偏移量
Object.keys(geoCoordMap1).forEach((key) => {
  geoCoordMap2[key] = geoCoordMap1[key].map((item: any, index: any) => {
    let items = item;
    if (index === 1) items += 0.8;
    return items;
  });
});
// console.log(geoCoordMap2);

const convertData = (datas: any, geomap: any) => {
  const res = [];
  for (let i = 0; i < datas.length; i += 1) {
    const geoCoord = geomap[datas[i].name];
    if (geoCoord) {
      res.push({
        name: datas[i].name,
        value: geoCoord.concat(datas[i].value),
      });
    }
  }
  return res;
};

const getOption = (mapType: string, scatter: string) => {
  const option = {
    backgroundColor: '#fff',
    tooltip: {}, // 鼠标移到图里面的浮动提示框
    visualMap: {
      show: false,
      min: 0,
      max: 2,
      realtime: true,
      calculable: false,
      seriesIndex: [0],
      color: ['#77A5D4', '#8AB6E1', '#5C88BE'],
    },
    geo: {
      map: mapType, // 底层地图，用来设置地图的阴影
      nameMap,
      zoom: mapType === 'china' ? 1.22 : 1.4,
      roam: mapType === 'world',
      selectedMode: false, // 关闭地图点击选中
      regions: [
        {
          name: '南海诸岛',
          value: 0,
          itemStyle: {
            // normal: {
            opacity: 0,
            label: { show: false },
            // },
          },
        },
      ],
      // 普通状态下的样式
      itemStyle:
        mapType === 'world'
          ? {
              areaColor: '#62A5E6',
              borderColor: '#3381CC',
              borderWidth: 0.5,
              // shadowColor: '#091476',
              // shadowOffsetX: 1,
              // shadowOffsetY: 1,
              // shadowBlur: 3,
            }
          : {
              // areaColor: '#8ab6e1', // 地图板块颜色
              // borderColor: '#58CEEE',
              borderWidth: 0,
              shadowColor: '#091476',
              shadowOffsetX: 4,
              shadowOffsetY: 5,
              // shadowBlur: 6,
            },
      emphasis: {
        // 高亮状态下的样式
        label: {
          show: mapType === 'world', // 是否显示对应地名
          formatter: (params: any) => {
            const { series } = option;
            if (series[1]?.data && series[2]?.data) {
              for (let i = 0; i < series[1].data.length; i += 1) {
                if (params.name === series[1].data[i].name) return '';
              }
            }
            return params.name;
          },
        },
        itemStyle: {
          areaColor: '#58CEEE',
          shadowOffsetX: 0,
          shadowOffsetY: 0,
          shadowBlur: 0,
          borderWidth: 0,
          // shadowColor: '#bbbebf00',
        },
      },
    },
    series: [
      mapType === 'china'
        ? {
            type: 'map',
            nameMap,
            roam: false,
            map: mapType, // 自定义扩展图表类型
            geoIndex: 1, // 顶层地图，用来显示
            zoom: 1.22,
            selectedMode: false,
            itemStyle: {
              areaColor: '#62A5E6',
              borderColor: '#3381CC', // 中国地图可以考虑#f3f3f3
              borderWidth: 0.5,
            },
            emphasis: {
              label: {
                show: true, // 是否显示对应地名
                formatter: (params: any) => {
                  const { series } = option;
                  if (series[1]?.data) {
                    for (let i = 0; i < series[1].data.length; i += 1) {
                      if (params.name === series[1].data[i].name) return '';
                    }
                  }
                  return params.name;
                },
              },
              itemStyle: {
                areaColor: '#58CEEE',
                borderWidth: 0,
              },
            },
            tooltip: {
              show: false,
            },
          }
        : null,
      scatter === '自有' && mapType === 'china'
        ? {
            name: '自有DC', // 浮动框的标题
            type: 'effectScatter',
            coordinateSystem: 'geo', // 对应上方配置
            effectType: 'ripple',
            rippleEffect: {
              // 涟漪特效相关配置。
              period: 4, // 动画的时间。
              scale: 2.5, // 动画中波纹的最大缩放比例。
              brushType: 'stroke', // 波纹的绘制方式，可选 'stroke' 和 'fill'。
            },
            symbol: `image://${point3}`,
            symbolSize: 18,
            encode: {
              value: 2,
            },
            zlevel: 1, // 控制图层的叠加顺序
            label: {
              // 散点图的标签配置
              formatter: '{b}',
              position: 'left',
              distance: 2,
              show: false,
              fontSize: 14,
              fontFamily: 'PingFangSC-Regular, PingFang SC',
              color: '#202020',
              fontWeight: 400,
            },
            itemStyle: {
              color: 'orange', // 标志颜色
            },
            emphasis: {
              label: {
                show: true,
              },
            },
            tooltip: {
              trigger: 'item',
              extraCssText: 'width:120px; white-space:pre-wrap',
              borderColor: ' #1790FC',
              position: 'top',
              formatter: (params: any) => {
                const { series } = option;
                if (series[1]?.data) {
                  for (let i = 0; i < series[1].data.length; i += 1) {
                    if (params.name === series[1].data[i].name)
                      return `${series[1].data[i].value[2]}`;
                  }
                }
                return 0;
              },
            },
            data: convertData(data2.slice(0, 27), geoCoordMap1),
          }
        : {
            name: '公有DC', // 浮动框的标题
            type: 'effectScatter',
            coordinateSystem: 'geo', // 对应上方配置
            effectType: 'ripple',
            rippleEffect: {
              period: 4,
              scale: 2.5,
              brushType: 'stroke',
            },
            symbol: `image://${point4}`,
            /*  symbol: (value: any, params: any) => { // 下个版本的尝试
            if (params.dataIndex % index === 0)
              return 'image://https://www.zhangxinxu.com/study/201408/horse.svg';
            return `image://${point4}`;
          }, */
            symbolSize: 18,
            encode: {
              value: 2,
            },
            zlevel: 0,
            label: {
              // 散点图的标签配置
              formatter: '{b}',
              position: 'left',
              distance: 2,
              show: false,
              fontSize: 14,
              fontFamily: 'PingFangSC-Regular, PingFang SC',
              color: '#202020',
              fontWeight: 400,
            },
            labelLayout() {
              return { moveOverlap: 'shiftY' };
            },
            itemStyle: {
              color: 'yellow', // 标志颜色
            },
            emphasis: {
              label: {
                show: true,
              },
            },
            tooltip: {
              trigger: 'item',
              extraCssText: 'width:160px; white-space:pre-wrap',
              borderColor: ' #1790FC',
              position: 'top',
              formatter: (params: any) => {
                const { series } = option;
                if (series[1]?.data) {
                  for (let i = 0; i < series[1]?.data.length; i += 1) {
                    if (params.name === series[1].data[i].name)
                      return `${series[1].data[i].value[2]}`;
                  }
                }
                return 0;
              },
            },
            data:
              mapType === 'world'
                ? convertData(data.slice(27), geoCoordMap1)
                : convertData(data.slice(0, 27), geoCoordMap1),
          },
    ],
  };
  return option;
};

/**
 * 统计每条数据中相同省份出现的次数，以便合并单元格
 * @param data
 */
/* const datas = (data: any) => {
  const data1 = data;
  const objs = {};
  let k;
  const arr1: number[] = [];
  for (let i = 0, len = data.length; i < len; i += 1) {
    k = data[i].province || data[i].cloudBusiness;
    console.log(k);

    if (objs[k]) objs[k] += 1;
    else objs[k] = 1;
  }
  Object.keys(objs).forEach((key) => {
    for (let i = 0; i < objs[key]; i += 1) {
      if (i === 0) {
        arr1.push(objs[key]);
      } else {
        arr1.push(0);
      }
    }
  });
  arr1.forEach((r, index) => {
    data1[index].num = r;
    data1[index].key = index;
  });
  return data1;
}; */

// 给表格每条数据添加唯一的key值
const addTableDataKey = (tableData: any[]) => {
  tableData.forEach((item, index) => {
    const items = item;
    items.key = index;
  });
};
addTableDataKey(tableData1);
addTableDataKey(tableData2);
addTableDataKey(tableData3);

const columns = (tab: number) => {
  switch (tab) {
    case 2:
      return [
        {
          title: '云商',
          width: 117,
          dataIndex: 'cloudBusiness',
          key: 'cloudBusiness',
          align: 'center' as 'center',
          className: 'columnOne',
          render: (text: any, row: any) => {
            return {
              children: row.cloudBusiness,
              props: {
                rowSpan: row.num,
              },
            };
          },
        },
        {
          title: '序号',
          width: 86,
          dataIndex: 'OrderNum',
          key: 'OrderNum',
          align: 'center' as 'center',
          className: 'columnTwo',
        },
        {
          title: '区域',
          width: 86,
          dataIndex: 'city',
          key: 'city',
          align: 'center' as 'center',
          className: 'columnThree',
        },
        {
          title: '机房名称',
          width: 170,
          dataIndex: 'roomName',
          key: 'roomName',
          align: 'center' as 'center',
          className: 'columnLast',
        },
      ];
    case 3:
      return [
        {
          title: '省份',
          width: 120,
          dataIndex: 'province',
          key: 'province',
          align: 'center' as 'center',
          className: 'columnOne',
          render: (text: any, row: any) => {
            return {
              children: row.province,
              props: {
                rowSpan: row.num,
              },
            };
          },
        },
        {
          title: 'DC序号',
          width: 86,
          dataIndex: 'DCOrderNum',
          key: 'DCOrderNum',
          align: 'center' as 'center',
          className: 'columnTwo',
        },
        {
          title: '所在城市',
          width: 86,
          dataIndex: 'city',
          key: 'city',
          align: 'center' as 'center',
          className: 'columnThree',
        },
        {
          title: '机房名称',
          width: 170,
          dataIndex: 'roomName',
          key: 'roomName',
          align: 'center' as 'center',
          className: 'columnLast',
        },
      ];
    default:
      return [
        {
          title: '省份',
          width: 120,
          dataIndex: 'province',
          key: 'province',
          align: 'center' as 'center',
          className: 'columnOne',
          render(_: any, row: any) {
            return {
              children: row.province,
              props: {
                rowSpan: row.num,
              },
            };
          },
        },
        {
          title: 'DC序号',
          width: 86,
          dataIndex: 'DCOrderNum',
          key: 'DCOrderNum',
          align: 'center' as 'center',
          className: 'columnTwo',
        },
        {
          title: '所在城市',
          width: 86,
          dataIndex: 'city',
          key: 'city',
          align: 'center' as 'center',
          className: 'columnThree',
        },
        {
          title: '机房名称',
          // width: 170,
          dataIndex: 'roomName',
          key: 'roomName',
          align: 'center' as 'center',
          className: 'columnLast',
        },
      ];
  }
};

// datas(tableData1);
// datas(tableData2);
// datas(tableData3);

interface StateType {
  tab: number;
  mapType: string;
  chart: any;
  showSelectMenu: boolean;
  panelState: boolean;
  tableData: any[];
  currents: number;
  scatter: string;
}
class ResourceDistribute extends React.Component<any, StateType> {
  tableBodyDom: any;

  newtableData: any[] = tableData1;

  scrollRef: any = React.createRef();

  constructor(props: any) {
    super(props);
    this.state = {
      tab: 1,
      mapType: 'china',
      chart: null,
      // showSelectMenu: false,
      tableData: tableData1,
      panelState: false,
      currents: -1,
      scatter: '公有',
    };
  }

  // 处理tab标签切换事件
  onChange = (e: any) => {
    this.setState({ tab: e.target.value, panelState: false });
    switch (e.target.value) {
      case 1:
        this.setState({ tableData: tableData1 });
        this.newtableData = tableData1;
        break;
      case 2:
        this.setState({ tableData: tableData2 });
        this.newtableData = tableData2;
        break;
      default:
        this.setState({ tableData: tableData3 });
        this.newtableData = tableData3;
    }
    this.tableBodyDom.scrollTop = 0; // 重置滚动条
    this.setState({ currents: -1 });
  };

  // 处理地图类型切换事件
  handleMapChange = (value: any) => {
    this.setState({ mapType: value });
  };

  // 点击切换地图散点
  scatterToggle = (type: string) => {
    this.setState({ scatter: type });
  };

  // 根据云商类别筛选表格数据
  tableClassify = (value: string) => {
    let newtableData2 = tableData2;
    newtableData2 = tableData2.filter((item: any) => item.cloudBusiness.indexOf(value) > -1);
    this.setState({ tableData: newtableData2 });
    this.tableBodyDom.scrollTop = 0; // 重置滚动条
  };

  // 表格搜索框查询，按照省份或者云商名称查找
  onSearch = (value: any) => {
    let count = 0;
    this.setState({
      tableData: this.newtableData.filter((item: any) => {
        const length = cloudArray.indexOf(item.cloudBusiness);
        if (item.cloudBusiness?.indexOf(value) > -1 && count === 0) {
          count = 1; // 计值，数据只更新一遍
          if (value !== '') this.setState({ currents: cloudArray.indexOf(item.cloudBusiness) });
          else this.setState({ currents: -1 }); // 空值重置
          if (length > 7) this.scrollRef.current.scrollLeft((length - 7) * 80);
          // 设置滚动条随数据项滑动
          else this.scrollRef.current.scrollLeft(0);
        }
        return item.province?.indexOf(value) > -1 || item.cloudBusiness?.indexOf(value) > -1;
      }),
    });
  };

  componentDidMount() {
    const dom: any = document.querySelector('.chart');
    if (dom) {
      this.setState({
        chart: echarts.init(dom, 'shine', {
          renderer: 'svg',
        }),
      });
    }
    this.tableBodyDom = document.querySelector('.ant-table-body');
    this.tableBodyDom.style.overflow = 'hidden';
  }

  componentDidUpdate() {
    const { chart, mapType, scatter } = this.state;
    if (chart) {
      if (mapType === 'china') echarts.registerMap('china', china);
      else {
        echarts.registerMap('world', world);
      }
      chart.setOption(getOption(mapType, scatter), true); // true表示不合并原来的series
      // console.log(chart.getOption());
    }
  }

  render() {
    const { tableData, mapType, panelState, tab, currents } = this.state;
    /* let n = 4; // 下个版本的尝试
    if (chart) {
      setInterval(() => {
        if (n === 0) n = 5;
        chart.setOption(getOption(mapType, scatter, n), true);
        n -= 1;
      }, 3000);
    } */
    // 滚动条参数
    const scroll = {
      width: '100%',
      // 最大高度，内容超出该高度会出现滚动条
      // height: 449,
      height: 641 - 28 - 56 - 48 - 50,
    };

    if (panelState) scroll.height = 386;
    else if (tab === 2) scroll.height = 641 - 28 - 56 - 48 - 44 - 50;

    // 用react-custom-scrollbars包裹住表格内容
    const components = {
      table(props: any) {
        const { className } = props;
        return (
          <Scrollbars style={scroll} className={styles.scrollbars1}>
            <table className={className}>{props.children}</table>
          </Scrollbars>
        );
      },
    };

    const menu = (
      <Menu>
        <Menu.Item>
          <div onClick={() => this.handleMapChange('china')}>中国地图</div>
        </Menu.Item>
        <Menu.Item>
          <div onClick={() => this.handleMapChange('world')}>世界地图</div>
        </Menu.Item>
      </Menu>
    );

    return (
      <div className={styles.body}>
        <div className={styles.container}>
          <div className={styles.left}>
            <List
              itemLayout="horizontal"
              grid={{ column: 5, gutter: 28 }}
              dataSource={areaData}
              renderItem={(item: any) => (
                <List.Item>
                  <Card style={{ width: 98, height: 72, textAlign: 'center' }}>
                    <Card.Meta title={item.title} description={item.value} />
                  </Card>
                </List.Item>
              )}
            />
            <Dropdown overlay={menu}>
              <Button className={styles['dropdown-menu']}>
                {mapType === 'china' ? '中国地图' : '世界地图'} <DownOutlined />
              </Button>
            </Dropdown>
            <div className={`${styles['map-wrapper']} chart`} />
            <div className={styles.pointbox}>
              {mapType === 'china' ? (
                <div>
                  <img
                    src={point1}
                    alt=""
                    onClick={() => {
                      this.scatterToggle('自有');
                    }}
                    style={{ cursor: 'pointer' }}
                  />
                  <span>自有DC</span>
                </div>
              ) : null}
              <div>
                <img
                  src={point2}
                  alt=""
                  onClick={() => {
                    this.scatterToggle('公有');
                  }}
                  style={{ cursor: 'pointer' }}
                />
                <span>公有DC</span>
              </div>
            </div>
          </div>
          <div className={styles.right}>
            <div className={styles.title}>网络触点覆盖</div>
            <div className={`${styles.nav} ${tab === 2 ? styles.nav2 : null}`}>
              <Radio.Group defaultValue={1} buttonStyle="solid" onChange={this.onChange}>
                <Radio.Button value={1}>数据中心覆盖范围</Radio.Button>
                <Radio.Button value={2}>云资源覆盖范围</Radio.Button>
                <Radio.Button value={3}>SDWAN覆盖范围</Radio.Button>
              </Radio.Group>
            </div>
            <Search
              placeholder="请输入省份或云商名称关键字查找"
              allowClear
              enterButton="搜索"
              size="large"
              onSearch={this.onSearch}
              style={{ paddingBottom: 8 }}
            />
            {this.state.tab === 2 ? (
              // <div className={styles.collapsePanel}>
              //   {cloudItem1.map((item, index) => {
              //     return (
              //       <span
              //         key={index.toString()}
              //         className={`${styles.cloud} ${
              //           currents === index ? styles.cloudSelect : null
              //         } `}
              //         style={{ cursor: 'pointer' }}
              //         onClick={() => {
              //           this.tableClassify(item);
              //           this.setState({ currents: index });
              //         }}
              //       >
              //         {item}
              //       </span>
              //     );
              //   })}
              //   <img
              //     src={expand}
              //     className={panelState ? null : styles.close}
              //     onClick={() => {
              //       this.setState({ panelState: !panelState });
              //     }}
              //   />
              //   {panelState ? (
              //     <div>
              //       {cloudItem2.map((item, index) => {
              //         return (
              //           <span
              //             key={index.toString()}
              //             className={`${styles.cloud} ${
              //               currents === index + cloudItem1.length ? styles.cloudSelect : null
              //             } `}
              //             style={{ cursor: 'pointer' }}
              //             onClick={() => {
              //               this.tableClassify(item);
              //               this.setState({ currents: index + cloudItem1.length });
              //             }}
              //           >
              //             {item}
              //           </span>
              //         );
              //       })}
              //     </div>
              //   ) : null}
              // </div>
              <Scrollbars
                className={styles.scrollbars}
                style={{ width: 472, height: 34, marginBottom: 10 }}
                ref={this.scrollRef}
              >
                <div style={{ height: 30, whiteSpace: 'nowrap' }}>
                  {cloudArray.map((item, index) => {
                    return (
                      <span
                        key={index.toString()}
                        className={`${styles.cloud} ${
                          currents === index ? styles.cloudSelect : null
                        } `}
                        style={{ cursor: 'pointer' }}
                        onClick={() => {
                          this.tableClassify(item);
                          this.setState({ currents: index });
                        }}
                      >
                        {item}
                      </span>
                    );
                  })}
                </div>
              </Scrollbars>
            ) : null}
            <div className={styles.content}>
              {/* <Scrollbars style={{ height: 550 }}> */}
              <Table
                columns={columns(tab)}
                dataSource={tableData}
                // 此scroll选项必须开启，宽高与react-custom-scrollbars插件一致
                scroll={{ y: scroll.height, x: 'hidden' }}
                // 将react-custom-scrollbars组件插入到表格中
                components={components}
                pagination={false}
              />
              {/* </Scrollbars> */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default ResourceDistribute;
