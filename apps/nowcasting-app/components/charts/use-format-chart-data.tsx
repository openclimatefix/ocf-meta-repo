import { useMemo } from "react";
import { formatISODateString } from "../utils";
import { ChartData } from "./remix-line";

//sperate paste forcaste from furute forcast (ie: after selectedTime)
const getForecastChartData = (
  selectedTime: string,
  fr?: {
    targetTime: string;
    expectedPowerGenerationMegawatts: number;
  },
) => {
  if (!fr) return {};

  if (new Date(fr.targetTime).getTime() > new Date(selectedTime + ":00.000Z").getTime())
    return {
      FORECAST: Math.round(fr.expectedPowerGenerationMegawatts),
    };
  else if (new Date(fr.targetTime).getTime() === new Date(selectedTime + ":00.000Z").getTime())
    return {
      FORECAST: Math.round(fr.expectedPowerGenerationMegawatts),
      PAST_FORECAST: Math.round(fr.expectedPowerGenerationMegawatts),
    };
  else
    return {
      PAST_FORECAST: Math.round(fr.expectedPowerGenerationMegawatts),
    };
};
const useFormatChartData = ({
  nationalForecastData,
  pvRealDataAfter,
  pvRealDataIn,
  selectedTime,
}: {
  nationalForecastData?: {
    targetTime: string;
    expectedPowerGenerationMegawatts: number;
  }[];
  pvRealDataAfter?: {
    datetimeUtc: string;
    solarGenerationKw: number;
  }[];
  pvRealDataIn?: {
    datetimeUtc: string;
    solarGenerationKw: number;
  }[];
  selectedTime?: string;
}) => {
  const data = useMemo(() => {
    if (nationalForecastData && pvRealDataAfter && pvRealDataIn && selectedTime) {
      const chartMap: Record<string, ChartData> = {};

      const addDataToMap = (
        dataPoint: any,
        getDatetimeUtc: (dp: any) => string,
        getPvdata: (dp: any) => Partial<ChartData>,
      ) => {
        const pvData = getPvdata(dataPoint);
        const datetimeUtc = getDatetimeUtc(dataPoint);
        if (chartMap[datetimeUtc]) {
          chartMap[datetimeUtc] = {
            ...chartMap[datetimeUtc],
            ...pvData,
          };
        } else {
          chartMap[datetimeUtc] = {
            datetimeUtc: formatISODateString(datetimeUtc),
            ...pvData,
          };
        }
      };

      pvRealDataAfter.forEach((pva) =>
        addDataToMap(
          pva,
          (db) => db.datetimeUtc,
          (db) => ({
            GENERATION_UPDATED: Math.round(db.solarGenerationKw / 1000),
          }),
        ),
      );
      pvRealDataIn.forEach((pvIn) =>
        addDataToMap(
          pvIn,
          (db) => db.datetimeUtc,
          (db) => ({
            GENERATION: Math.round(db.solarGenerationKw / 1000),
          }),
        ),
      );
      nationalForecastData.forEach((fc) =>
        addDataToMap(
          fc,
          (db) => db.targetTime,
          (db) => getForecastChartData(selectedTime, db),
        ),
      );

      return Object.values(chartMap);
    }
    return [];
  }, [nationalForecastData, pvRealDataIn, pvRealDataAfter, selectedTime]);
  return data;
};

export default useFormatChartData;
