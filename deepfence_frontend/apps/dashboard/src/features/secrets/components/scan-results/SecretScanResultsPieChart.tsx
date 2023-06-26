import { EChartsOption } from 'echarts';
import { preset } from 'tailwind-preset';

import { ReactECharts } from '@/components/ReactEcharts';
import { SEVERITY_COLORS } from '@/constants/charts';
import { abbreviateNumber } from '@/utils/number';

function getChartOptions({ data }: { data: { [key: string]: number } }) {
  const option: EChartsOption = {
    backgroundColor: 'transparent',
    tooltip: {
      show: false,
    },
    legend: {
      show: false,
    },
    dataset: {
      source: Object.keys(data).map((key) => ({
        Secrets: key,
        value: data[key],
      })),
    },
    series: [
      {
        type: 'pie',
        radius: ['65%', '90%'],
        itemStyle: {
          borderWidth: 2,
          borderColor: preset.theme.extend.colors.bg.card,
        },
        label: {
          position: 'center',
          formatter: function () {
            return abbreviateNumber(
              Object.keys(data).reduce((prev, curr) => {
                return prev + data[curr];
              }, 0),
            ).toString();
          },
          fontSize: '30px',
          color: preset.theme.extend.colors.text['input-value'],
          fontWeight: 600,
          fontFamily: preset.theme.extend.fontFamily.sans.join(','),
        },
        cursor: 'default',
        emphasis: {
          scale: false,
        },
        color: [
          SEVERITY_COLORS['critical'],
          SEVERITY_COLORS['high'],
          SEVERITY_COLORS['medium'],
          SEVERITY_COLORS['low'],
          SEVERITY_COLORS['unknown'],
        ],
      },
    ],
  };
  return option;
}

export const SecretScanResultsPieChart = ({
  data,
}: {
  data: { [key: string]: number };
}) => {
  if (!data) {
    return null;
  }
  const options = getChartOptions({ data });
  return <ReactECharts theme="dark" option={options} />;
};
