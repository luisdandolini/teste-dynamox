import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useSelector, useDispatch } from "react-redux";
import { fetchData } from "../../store/slice/chartDataSlice";
import { Container, Content } from "./styles";
import type { AppDispatch } from "../../store/store";
import { RootState } from "../../store/store";

interface DynamicChartProps {
  urls: string[];
  seriesNames: string[];
  title: string;
  titleAxisX: string;
  lineColors?: string[];
}

interface SeriesData {
  seriesName: string;
  data: Array<{ x: number; y: number }>;
  color: string;
}

const DynamicChart: React.FC<DynamicChartProps> = ({
  urls,
  seriesNames,
  title,
  titleAxisX,
  lineColors = [],
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading, error } = useSelector(
    (state: RootState) => state.chartData
  );
  const [chartOptions, setChartOptions] = useState<Highcharts.Options>({
    series: [],
  });

  useEffect(() => {
    urls.forEach((url, index) => {
      dispatch(
        fetchData({
          url,
          seriesName: seriesNames[index],
          color: lineColors[index],
        })
      );
    });
  }, [dispatch, urls, seriesNames, lineColors]);

  useEffect(() => {
    if (!loading && data.length > 0) {
      const options: Highcharts.Options = {
        title: {
          text: title,
        },
        xAxis: {
          type: "datetime",
          title: {
            text: titleAxisX,
          },
        },
        yAxis: {
          title: {
            text: "Data e Hora",
          },
        },
        series: data.map((series: SeriesData) => ({
          type: "line",
          name: series.seriesName,
          data: series.data,
          color: series.color,
        })),
        tooltip: {
          dateTimeLabelFormats: {
            day: "%A, %d de %B de %Y",
            weekday: "%A",
            hour: "%H:%M",
          },
        },
        credits: {
          enabled: false,
        },
      };
      setChartOptions(options);
    }
  }, [data, loading]);

  if (error) {
    return <div>Erro ao carregar os dados: {error}</div>;
  }

  return (
    <Container>
      <Content>
        <HighchartsReact highcharts={Highcharts} options={chartOptions} />
      </Content>
    </Container>
  );
};

export default DynamicChart;
