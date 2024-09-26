"use client";
import { useAppSelector } from "@/lib/hooks";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export default function Statistics() {
  const audioMessages: AudioMessage[] = useAppSelector(
    (state) => state.audioMessages.audioMessages
  );

  useEffect(() => {
    var minTimestamp = new Date().getTime();
    const incidents: number[][] = [];
    const maintenance: number[][] = [];
    const others: number[][] = [];
    audioMessages.map((audioMessage: AudioMessage) => {
      const createdAt = new Date(audioMessage.createdAt);
      const truncatedDate = new Date(
        createdAt.getFullYear(),
        createdAt.getMonth(),
        createdAt.getDate(),
        createdAt.getHours()
      );
      const timestamp = truncatedDate.getTime();
      if (minTimestamp > timestamp) {
        minTimestamp = timestamp;
      }

      if (audioMessage.textIntent == "Incidente de Seguridad") {
        const existingIncident = incidents.find(
          (entry) => entry[0] === timestamp
        );
        if (existingIncident) {
          existingIncident[1] += 1;
        } else {
          incidents.push([timestamp, 1]);
        }
      } else if (audioMessage.textIntent == "Solicitud de Mantenimiento") {
        const existingMaintenance = maintenance.find(
          (entry) => entry[0] === timestamp
        );
        if (existingMaintenance) {
          existingMaintenance[1] += 1;
        } else {
          maintenance.push([timestamp, 1]);
        }
      } else {
        const existingOthers = others.find((entry) => entry[0] === timestamp);
        if (existingOthers) {
          existingOthers[1] += 1;
        } else {
          others.push([timestamp, 1]);
        }
      }
    });
    setChart({
      ...chart,
      series: [
        {
          name: "Incidente de Seguridad",
          data: incidents,
        },
        {
          name: "Solicitud de Mantenimiento",
          data: maintenance,
        },
        {
          name: "Otros",
          data: others,
        },
      ],
      options: {
        ...chart.options,
        xaxis: {
          type: "datetime",
          min: minTimestamp,
          tickAmount: 6,
        },
      },
    });
  }, [audioMessages]);

  const [chart, setChart] = useState({
    series: [
      {
        name: "Incidente de Seguridad",
        data: [[0, 0]],
      },
      {
        name: "Solicitud de Mantenimiento",
        data: [[0, 0]],
      },
      {
        name: "Otros",
        data: [[0, 0]],
      },
    ],
    options: {
      chart: {
        id: "area-datetime",
        type: "area",
        height: 350,
        zoom: {
          autoScaleYaxis: true,
        },
        defaultLocale: "es",
        locales: [
          {
            name: "es",
            options: {
              months: [
                "Enero",
                "Febrero",
                "Marzo",
                "Abril",
                "Mayo",
                "Junio",
                "Julio",
                "Agosto",
                "Septiembre",
                "Octubre",
                "Noviembre",
                "Diciembre",
              ],
              shortMonths: [
                "Ene",
                "Feb",
                "Mar",
                "Abr",
                "May",
                "Jun",
                "Jul",
                "Ago",
                "Sep",
                "Oct",
                "Nov",
                "Dic",
              ],
              days: [
                "Domingo",
                "Lunes",
                "Martes",
                "Miércoles",
                "Jueves",
                "Viernes",
                "Sábado",
              ],
              shortDays: ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"],
              toolbar: {
                download: "Descargar SVG",
                selection: "Seleccionar",
                selectionZoom: "Seleccionar Zoom",
                zoomIn: "Ampliar",
                zoomOut: "Reducir",
                pan: "Mover",
                reset: "Restablecer Zoom",
              },
            },
          },
        ],
      },
      // dataLabels: {
      //   enabled: false,
      // },
      xaxis: {
        type: "datetime",
        min: new Date("01 Sep 2024").getTime(),
        tickAmount: 6,
      },
      tooltip: {
        x: {
          format: "dd MMM yyyy HH:mm",
        },
      },
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.7,
          opacityTo: 0.9,
          stops: [0, 100],
        },
      },
    },

    selection: "one_year",
  });

  return (
    <div className="text-center p-3">
      <div>
        <div id="chart">
          <div id="chart-timeline">
            <ReactApexChart
              options={chart.options as ApexCharts.ApexOptions}
              series={chart.series}
              type={"area"}
              height={350}
            />
          </div>
        </div>
        <div id="html-dist"></div>
      </div>
    </div>
  );
}
