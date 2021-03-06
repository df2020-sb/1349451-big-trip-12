import SmartView from './smart';
import {ICONS, POINT_TYPES} from '../const';
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import moment from 'moment';

const BAR_HEIGHT = 330;

const FontSize = {
  LABEL: 13,
  TITLE: 23,
  TICK: 13
};

const BAR_THICKNESS = 44;

const MIN_BAR_LENGTH = 50;

const PADDING = 5;

const options = {
  scales: {
    yAxes: [{
      ticks: {
        fontColor: `#000000`,
        padding: PADDING,
        fontSize: FontSize.TICK,
      },
      gridLines: {
        display: false,
        drawBorder: false
      },
    }],
    xAxes: [{
      ticks: {
        display: false,
        beginAtZero: true,
      },
      gridLines: {
        display: false,
        drawBorder: false
      },
    }],
  },
  legend: {
    display: false
  },
  tooltips: {
    enabled: false,
  }
};


const moneyPerPointType = (points) => {
  let result = points.reduce((acc, point) => {
    acc[point.type] = (acc[point.type] || 0) + point.price;
    return acc;
  }, {});
  result = Object.fromEntries(Object.entries(result).sort((a, b) => b[1] - a[1]));
  return result;
};


const ridesPerTransferType = (points) => {

  let result = points
    .filter((point) => POINT_TYPES.transfers.includes(point.type))
    .reduce((acc, point) => {
      acc[point.type] = (acc[point.type] || 0) + 1;
      return acc;
    }, {});
  result = Object.fromEntries(Object.entries(result).sort((a, b) => b[1] - a[1]));
  return result;
};


const timePerPointType = (points) => {

  let result = points.reduce((acc, point) => {
    acc[point.type] = (acc[point.type] || 0) + moment.duration(point.endDate - point.startDate).asHours();
    return acc;
  }, {});
  result = Object.fromEntries(Object.entries(result).sort((a, b) => b[1] - a[1]));
  return result;
};


const renderMoneyChart = (moneyCtx, points) => {
  const data = moneyPerPointType(points);
  return new Chart(moneyCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: Object.keys(data).map((type) => ICONS.get(type.toLowerCase()) + type.toUpperCase()),
      datasets: [{
        data: Object.values(data),
        backgroundColor: `#ffffff`,
        hoverBackgroundColor: `#ffffff`,
        anchor: `start`,
        barThickness: BAR_THICKNESS,
        minBarLength: MIN_BAR_LENGTH
      }]
    },
    options: Object.assign({},
        options,
        {
          plugins: {
            datalabels: {
              font: {
                size: FontSize.LABEL
              },
              color: `#000000`,
              anchor: `end`,
              align: `start`,
              formatter: (val) => `€${val}`
            }
          },
          title: {
            display: true,
            text: `MONEY`,
            fontColor: `#000000`,
            fontSize: FontSize.TITLE,
            position: `left`
          },
        })
  });
};


const renderTransportChart = (transportCtx, points) => {
  const data = ridesPerTransferType(points);
  return new Chart(transportCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: Object.keys(data).map((type) => ICONS.get(type.toLowerCase()) + type.toUpperCase()),
      datasets: [{
        data: Object.values(data),
        backgroundColor: `#ffffff`,
        hoverBackgroundColor: `#ffffff`,
        anchor: `start`,
        barThickness: BAR_THICKNESS,
        minBarLength: MIN_BAR_LENGTH
      }]
    },
    options: Object.assign({},
        options,
        {
          plugins: {
            datalabels: {
              font: {
                size: FontSize.LABEL
              },
              color: `#000000`,
              anchor: `end`,
              align: `start`,
              formatter: (val) => `${val}x`
            }
          },
          title: {
            display: true,
            text: `TRANSPORT`,
            fontColor: `#000000`,
            fontSize: FontSize.TITLE,
            position: `left`
          },
        })
  });
};


const renderTimeChart = (timeCtx, points) => {
  const data = timePerPointType(points);
  return new Chart(timeCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: Object.keys(data).map((type) => ICONS.get(type.toLowerCase()) + type.toUpperCase()),
      datasets: [{
        data: Object.values(data).map((value) => Math.round(value)),
        backgroundColor: `#ffffff`,
        hoverBackgroundColor: `#ffffff`,
        anchor: `start`,
        barThickness: BAR_THICKNESS,
        minBarLength: MIN_BAR_LENGTH
      }]
    },
    options: Object.assign({},
        options,
        {
          plugins: {
            datalabels: {
              font: {
                size: FontSize.LABEL
              },
              color: `#000000`,
              anchor: `end`,
              align: `start`,
              formatter: (val) => `${val}H`
            }
          },
          title: {
            display: true,
            text: `TIME SPENT`,
            fontColor: `#000000`,
            fontSize: FontSize.TITLE,
            position: `left`
          },
        })
  });
};


const createStatisticsTemplate = () => {

  return `<section class="statistics">
          <h2>Trip statistics</h2>

          <div class="statistics__item statistics__item--money">
            <canvas class="statistics__chart  statistics__chart--money" width="900"></canvas>
          </div>

          <div class="statistics__item statistics__item--transport">
            <canvas class="statistics__chart  statistics__chart--transport" width="900"></canvas>
          </div>

          <div class="statistics__item statistics__item--time-spend">
            <canvas class="statistics__chart  statistics__chart--time" width="900"></canvas>
          </div>
        </section>`;
};


export default class Statistics extends SmartView {
  constructor(points) {
    super();

    this._moneyChart = null;
    this._transportChart = null;
    this._timeChart = null;
    this._points = points;

    this._setCharts();
  }


  removeElement() {
    super.removeElement();
    if (this._moneyChart || this._transportChart || this._timeChart) {
      this._moneyChart.destroy();
      this._transportChart.destroy();
      this._timeChart.destroy();
    }
  }


  restoreHandlers() {
    this._setCharts();
  }


  _getTemplate() {
    return createStatisticsTemplate();
  }


  _setCharts() {

    if (this._moneyChart || this._transportChart || this._timeChart) {
      this._moneyChart.destroy();
      this._transportChart.destroy();
      this._timeChart.destroy();
    }

    const moneyCtx = this.getElement().querySelector(`.statistics__chart--money`);
    moneyCtx.height = BAR_HEIGHT;

    const transportCtx = this.getElement().querySelector(`.statistics__chart--transport`);
    transportCtx.height = BAR_HEIGHT;

    const timeSpendCtx = this.getElement().querySelector(`.statistics__chart--time`);
    timeSpendCtx.height = BAR_HEIGHT;

    this._moneyChart = renderMoneyChart(moneyCtx, this._points);
    this._transportChart = renderTransportChart(transportCtx, this._points);
    this._timeChart = renderTimeChart(timeSpendCtx, this._points);
  }
}
