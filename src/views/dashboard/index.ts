import * as echarts from 'echarts';
export default class Dashboard {
    loading3: any;
    loading4: any;
    loading2: any;
    loading1: any;
    constructor(loading1: any, loading2: any, loading3: any, loading4: any) {
        this.loading1 = loading1;
        this.loading2 = loading2;
        this.loading3 = loading3;
        this.loading4 = loading4;
    }

    drawChart1 = async () => {
        this.loading1.vlaue = true;
        const dom: any = document.querySelector('.chart1');
        const myChart = echarts.init(dom); // 初始化echarts实例
        const option = {
            title: {
                text: '近7日订单量趋势'
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {},
            toolbox: {
                show: true,
                feature: {
                    dataView: { readOnly: false },
                    magicType: { type: ['line', 'bar'] },
                    restore: {},
                    saveAsImage: {}
                }
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: ['20230316', '20230317', '20230318', '20230319', '20230320', '20230321', '20230322']
            },
            yAxis: {
                type: 'value',
                axisLabel: {
                    //   formatter: '{value} °C'
                }
            },
            series: [
                {
                    name: '订单量',
                    type: 'line',
                    smooth: true,
                    data: [820, 932, 901, 934, 1290, 1330, 1500],
                },
                {
                    name: '退单量',
                    type: 'line',
                    data: [300, 250, 200, 150, 100, 50, 0],
                }
            ]
        };
        // 设置实例参数
        myChart.setOption(option);
        this.loading1.vlaue = false;
    };

    drawChart2 = async () => {
        this.loading2.vlaue = true;
        const dom: any = document.querySelector('.chart2');
        const myChart = echarts.init(dom); // 初始化echarts实例
        const option = {
            title: {
                text: '本月销量TOP8项目',
                subtext: '不包括特殊项目',
                // left: 'center'
            },
            tooltip: {
                trigger: 'item',
                formatter: '{b0}<br/>{a0}：{c0} 单',
                axisPointer: {
                    type: 'shadow'
                }
            },
            toolbox: {
                show: true,
                feature: {
                    mark: { show: true },
                    dataView: { show: true, readOnly: false },
                    restore: { show: true },
                    saveAsImage: { show: true }
                }
            },
            grid: {
                left: '3%',
                right: '2%',
                bottom: '3%',
                containLabel: true
            },
            series: [
                {
                    name: '销量',
                    type: 'pie',
                    radius: '70%',
                    center: ['39%', '50%'],
                    label: {
                        show: true
                    },
                    emphasis: {
                        show: true,
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    },
                    data: [
                        { value: 30, name: '丙氨酸氨基转移酶测定' },
                        { value: 28, name: '血常规三分类' },
                        { value: 26, name: '血常规五分类' },
                        { value: 24, name: '免疫缺陷病毒抗体' },
                        { value: 22, name: '老年人体检' },
                        { value: 20, name: '基因检测' },
                        { value: 18, name: '组织病理' },
                        { value: 16, name: 'TCT' }
                    ]
                }
            ]
        };
        // 设置实例参数
        myChart.setOption(option);
        this.loading2.vlaue = false;
    };

    drawChart3 = async () => {
        this.loading3.vlaue = true;
        const data = [
            [
                [28604, 77, 17096869, 'Australia', 1990],
                [31163, 77.4, 27662440, 'Canada', 1990],
                [1516, 68, 1154605773, 'China', 1990],
                [13670, 74.7, 10582082, 'Cuba', 1990],
                [28599, 75, 4986705, 'Finland', 1990],
                [29476, 77.1, 56943299, 'France', 1990],
                [31476, 75.4, 78958237, 'Germany', 1990],
                [28666, 78.1, 254830, 'Iceland', 1990],
                [1777, 57.7, 870601776, 'India', 1990],
                [29550, 79.1, 122249285, 'Japan', 1990],
                [2076, 67.9, 20194354, 'North Korea', 1990],
                [12087, 72, 42972254, 'South Korea', 1990],
                [24021, 75.4, 3397534, 'New Zealand', 1990],
                [43296, 76.8, 4240375, 'Norway', 1990],
                [10088, 70.8, 38195258, 'Poland', 1990],
                [19349, 69.6, 147568552, 'Russia', 1990],
                [10670, 67.3, 53994605, 'Turkey', 1990],
                [26424, 75.7, 57110117, 'United Kingdom', 1990],
                [37062, 75.4, 252847810, 'United States', 1990]
            ],
            [
                [44056, 81.8, 23968973, 'Australia', 2015],
                [43294, 81.7, 35939927, 'Canada', 2015],
                [13334, 76.9, 1376048943, 'China', 2015],
                [21291, 78.5, 11389562, 'Cuba', 2015],
                [38923, 80.8, 5503457, 'Finland', 2015],
                [37599, 81.9, 64395345, 'France', 2015],
                [44053, 81.1, 80688545, 'Germany', 2015],
                [42182, 82.8, 329425, 'Iceland', 2015],
                [5903, 66.8, 1311050527, 'India', 2015],
                [36162, 83.5, 126573481, 'Japan', 2015],
                [1390, 71.4, 25155317, 'North Korea', 2015],
                [34644, 80.7, 50293439, 'South Korea', 2015],
                [34186, 80.6, 4528526, 'New Zealand', 2015],
                [64304, 81.6, 5210967, 'Norway', 2015],
                [24787, 77.3, 38611794, 'Poland', 2015],
                [23038, 73.13, 143456918, 'Russia', 2015],
                [19360, 76.5, 78665830, 'Turkey', 2015],
                [38225, 81.4, 64715810, 'United Kingdom', 2015],
                [53354, 79.1, 321773631, 'United States', 2015]
            ]
        ];
        const dom: any = document.querySelector('.chart3');
        const myChart = echarts.init(dom); // 初始化echarts实例
        const option = {
            // backgroundColor: new echarts.graphic.RadialGradient(0.3, 0.3, 0.8, [
            //     {
            //         offset: 0,
            //         color: '#f7f8fa'
            //     },
            //     {
            //         offset: 1,
            //         color: '#cdd0d5'
            //     }
            // ]),
            title: {
                text: '各个区域营收情况',
                left: '5%',
                top: '3%'
            },
            legend: {
                right: '10%',
                top: '3%',
                data: ['盈利', '亏损']
            },
            grid: {
                left: '8%',
                top: '10%'
            },
            xAxis: {
                splitLine: {
                    lineStyle: {
                        type: 'dashed'
                    }
                }
            },
            yAxis: {
                splitLine: {
                    lineStyle: {
                        type: 'dashed'
                    }
                },
                scale: true
            },
            series: [
                {
                    name: '亏损',
                    data: data[0],
                    type: 'scatter',
                    symbolSize: function (data: any) {
                        return Math.sqrt(data[2]) / 5e2;
                    },
                    emphasis: {
                        focus: 'series',
                        label: {
                            show: true,
                            formatter: function (param: any) {
                                return param.data[3];
                            },
                            position: 'top'
                        }
                    },
                    itemStyle: {
                        shadowBlur: 10,
                        shadowColor: 'rgba(120, 36, 50, 0.5)',
                        shadowOffsetY: 5,
                        color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [
                            {
                                offset: 0,
                                color: 'rgb(251, 118, 123)'
                            },
                            {
                                offset: 1,
                                color: 'rgb(204, 46, 72)'
                            }
                        ])
                    }
                },
                {
                    name: '盈利',
                    data: data[1],
                    type: 'scatter',
                    symbolSize: function (data: any) {
                        return Math.sqrt(data[2]) / 5e2;
                    },
                    emphasis: {
                        focus: 'series',
                        label: {
                            show: true,
                            formatter: function (param: any) {
                                return param.data[3];
                            },
                            position: 'top'
                        }
                    },
                    itemStyle: {
                        shadowBlur: 10,
                        shadowColor: 'rgba(25, 100, 150, 0.5)',
                        shadowOffsetY: 5,
                        color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [
                            {
                                offset: 0,
                                color: 'rgb(129, 227, 238)'
                            },
                            {
                                offset: 1,
                                color: 'rgb(25, 183, 207)'
                            }
                        ])
                    }
                }
            ]
        };
        // 设置实例参数
        myChart.setOption(option);
        this.loading3.vlaue = false;
    };
    drawChart4 = async () => {
        this.loading4.vlaue = true;
        const dom: any = document.querySelector('.chart4');
        const myChart = echarts.init(dom); // 初始化echarts实例
        const option = {
            title: {
                text: '近7日订单量趋势'
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {},
            toolbox: {
                show: true,
                feature: {
                    dataView: { readOnly: false },
                    magicType: { type: ['bar', 'line'] },
                    restore: {},
                    saveAsImage: {}
                }
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: ['20230316', '20230317', '20230318', '20230319', '20230320', '20230321', '20230322']
            },
            yAxis: {
                type: 'value',
                axisLabel: {
                    //   formatter: '{value} °C'
                }
            },
            series: [
                {
                    name: '订单量',
                    type: 'bar',
                    smooth: true,
                    data: [820, 932, 901, 934, 1290, 1330, 1500],
                },
                {
                    name: '退单量',
                    type: 'bar',
                    data: [300, 250, 200, 150, 100, 50, 0],
                }
            ]
        };
        // 设置实例参数
        myChart.setOption(option);
        this.loading4.vlaue = false;
    };
}