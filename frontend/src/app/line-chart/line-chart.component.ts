import { ChartDataset, ChartOptions } from 'chart.js';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit {
  chartData: ChartDataset[] = [
    {
      label: 'Avg Pr($)/Sqft',
      data: [334, 400, 429, 273],

      pointHitRadius: 15, // expands the hover 'detection' area
      pointHoverRadius: 8, // grows the point when hovered

      pointRadius: 2,
      borderColor: '#2D2F33', // main line color aka $midnight-medium from @riapacheco/yutes/seasonal.scss
      pointBackgroundColor: '#2D2F33',
      pointHoverBackgroundColor: '#2D2F33',
      borderWidth: 2, // main line width
      hoverBorderWidth: 0, // borders on points
      pointBorderWidth: 0, // removes POINT borders
      tension: 0, // makes line more squiggly
    }
  ];
  chartLabels: string[] = [ 'City A', 'City B','City C', 'City D'];

  chartOptions: ChartOptions =
    {
    responsive: true,
  maintainAspectRatio: false,

  // ⤵️ Remove the grids
  scales: {
    xAxis: {
      display: true,
      grid: {
        drawBorder: true // removes random border at bottom
      }
    },
    yAxis: {
      display: true
    }
  },

  // ⤵️ Remove the main legend
  plugins: {

    title: {
      text: "Average Price($) per Square Foot",
      display: true
    },
    legend: {
      display: false
    },
    tooltip: {
      // ⤵️ tooltip main styles
      backgroundColor: 'white',
      displayColors: false, // removes unnecessary legend
      padding: 10,

      // ⤵️ title
      titleColor: '#2D2F33',
      titleFont: {
        size: 18
      },

      // ⤵️ body
      bodyColor: '#2D2F33',
      bodyFont: {
        size: 13
      }
    }
  }


};

  constructor() { }

  ngOnInit(): void {
  }
}
