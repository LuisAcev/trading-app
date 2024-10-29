import { createChart, ColorType } from "lightweight-charts";
import React, { useEffect, useRef } from "react";

export const Charts = (props) => {
  const { data, colors: { backgroundColor = "white" } = {} } = props;

  const chartContainerRef = useRef();

  useEffect(() => {
    const handleResize = () => {
      chart.applyOptions({ width: chartContainerRef.current.clientWidth });
    };
    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: backgroundColor },
        textColor: "black",
      },
      width: chartContainerRef.current.clientWidth,
      height: 300,
    });

    chart.timeScale().fitContent();
    // chart Type
    const newSeries = chart.addCandlestickSeries({
      upColor: "#26a69a",
      downColor: "#ef5350",
      borderVisible: false,
      wickUpColor: "#26a69a",
      wickDownColor: "#ef5350",
    });
    const areaSeries = chart.addAreaSeries();
    const barSeries = chart.addBarSeries();
    const baselineSeries = chart.addBaselineSeries();

    // Get data
    newSeries.setData(data);

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);

      chart.remove();
    };
  }, [data, backgroundColor]);

  return <div ref={chartContainerRef} />;
};
