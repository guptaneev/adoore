import { Component, OnInit } from '@angular/core';
import { ApiService, MarketData } from "../api-service.service";
import { Chart } from 'chart.js';

@Component({
  selector: 'app-city-search-results',
  templateUrl: './city-search-results.component.html',
  styleUrls: ['./city-search-results.component.scss']
})
export class CitySearchResultsComponent implements OnInit {
  userCitiesList: string[] = this.apiService.getUserSelectedCities();
  userCitiesListFormatted: string[] = this.apiService.formatCityList(this.userCitiesList);
  marketData: { [key: string]: MarketData } = {};

  constructor(protected apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getMarketData(this.userCitiesListFormatted).subscribe(data => {
      console.log(this.userCitiesList);
      this.marketData = data;
      this.createCharts();
    });
  }

  createCharts(): void {
    this.createBarChart();
    this.createLineChart();
    this.createRadarChart();
  }

  createBarChart(): void {
    const labels = Object.keys(this.marketData);
    const data = labels.map(market => Math.round(this.marketData[market].qmiCount / this.marketData[market].homeCount * 100));

    new Chart('barChart', {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Quick Move-In Homes (%)',
          data: data,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false
          },
          title: {
            display: false
          },
          tooltip: {
            backgroundColor: 'rgba(0,0,0,0.7)',
            titleFont: {
              size: 14
            },
            bodyFont: {
              size: 12
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              display: false
            },
            title: {
              display: true,
              text: 'Percentage (%)',
              color: '#333',
              font: {
                size: 14
              }
            }
          },
          x: {
            grid: {
              display: false
            },
            title: {
              display: true,
              text: 'Markets',
              color: '#333',
              font: {
                size: 14
              }
            }
          }
        }
      }
    });
  }

  createLineChart(): void {
    const labels = Object.keys(this.marketData);
    const data = labels.map(market => this.marketData[market].avgPricePerSft);

    new Chart('lineChart', {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Median Price per Square Foot ($)',
          data: data,
          backgroundColor: 'rgba(153, 102, 255, 0.2)',
          borderColor: 'rgba(153, 102, 255, 1)',
          borderWidth: 2,
          pointBackgroundColor: 'rgba(153, 102, 255, 1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(153, 102, 255, 1)'
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false
          },
          title: {
            display: false
          },
          tooltip: {
            backgroundColor: 'rgba(0,0,0,0.7)',
            titleFont: {
              size: 14
            },
            bodyFont: {
              size: 12
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              display: false
            },
            title: {
              display: true,
              text: 'Price ($)',
              color: '#333',
              font: {
                size: 14
              }
            }
          },
          x: {
            grid: {
              display: false
            },
            title: {
              display: true,
              text: 'Markets',
              color: '#333',
              font: {
                size: 14
              }
            }
          }
        }
      }
    });
  }

  createRadarChart(): void {
    const labels = Object.keys(this.marketData);
    const colors = [
      'rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)',
      'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)',
      'rgba(199, 199, 199, 0.2)', 'rgba(83, 102, 255, 0.2)', 'rgba(255, 102, 180, 0.2)',
      'rgba(99, 255, 132, 0.2)'
    ];
    const borderColors = [
      'rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)',
      'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)',
      'rgba(199, 199, 199, 1)', 'rgba(83, 102, 255, 1)', 'rgba(255, 102, 180, 1)',
      'rgba(99, 255, 132, 1)'
    ];

    const datasets = labels.map((market, index) => ({
      label: market,
      data: [
        this.marketData[market].poolPercentage,
        this.marketData[market].viewsPercentage,
        this.marketData[market].waterfrontPercentage,
        this.marketData[market].gatedPercentage,
        this.marketData[market].naturePercentage,
        this.marketData[market].parksPercentage
      ],
      backgroundColor: colors[index % colors.length],
      borderColor: borderColors[index % borderColors.length],
      borderWidth: 1,
      pointBackgroundColor: borderColors[index % borderColors.length],
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: borderColors[index % borderColors.length]
    }));

    new Chart('radarChart', {
      type: 'radar',
      data: {
        labels: ['Pool', 'Views', 'Waterfront', 'Gated', 'Nature', 'Parks'],
        datasets: datasets
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false
          },
          title: {
            display: false
          },
          tooltip: {
            backgroundColor: 'rgba(0,0,0,0.7)',
            titleFont: {
              size: 14
            },
            bodyFont: {
              size: 12
            }
          }
        },
        scales: {
          r: {
            min: 0,  // Set minimum value to 0
            angleLines: {
              display: false
            },
            grid: {
              display: false
            },
            pointLabels: {
              color: '#333',
              font: {
                size: 14
              }
            }
          }
        }
      }
    });

  }
}
