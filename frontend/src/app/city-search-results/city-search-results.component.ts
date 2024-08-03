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

    const barCanvas = document.getElementById('barChart') as HTMLCanvasElement;
    const barCtx = barCanvas?.getContext('2d');

    if (barCtx) {
      const gradient = barCtx.createLinearGradient(0, 0, 0, barCtx.canvas.height);
      gradient.addColorStop(0, 'rgba(255, 99, 132, 0.5)');
      gradient.addColorStop(1, 'rgba(54, 162, 235, 0.5)');

      new Chart(barCanvas, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            label: 'Quick Move-In Homes (%)',
            data: data,
            backgroundColor: gradient,
            borderColor: '#6495ED',
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false
            },
            title: {
              display: false
            },
            tooltip: {
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              titleFont: {
                size: 14
              },
              bodyFont: {
                size: 12
              },
              cornerRadius: 5,
              caretSize: 8,
              padding: {
                top: 10,
                right: 10,
                bottom: 10,
                left: 10
              },
              displayColors: false
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
                color: '#ffffff',
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
                color: '#ffffff',
                font: {
                  size: 14
                }
              }
            }
          }
        }
      });
    } else {
      console.error('Failed to get 2D context for bar chart');
    }
  }

  createLineChart(): void {
    const labels = Object.keys(this.marketData);
    const data = labels.map(market => this.marketData[market].avgPricePerSft);

    const lineCanvas = document.getElementById('lineChart') as HTMLCanvasElement;
    const lineCtx = lineCanvas?.getContext('2d');

    if (lineCtx) {
      // Create gradient that spans the entire height of the canvas
      const gradient = lineCtx.createLinearGradient(0, 0, 0, lineCtx.canvas.height);
      gradient.addColorStop(0, 'rgb(100,149,237)');
      gradient.addColorStop(1, 'rgba(243,47,90,0)');

      new Chart(lineCanvas, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [{
            label: 'Median Price per Square Foot ($)',
            data: data,
            backgroundColor: gradient,
            borderColor: '#6495ED',
            borderWidth: 2,
            pointBackgroundColor: '#6495ED',
            pointBorderColor: '#6495ED',
            pointHoverBackgroundColor: '#6495ED',
            pointHoverBorderColor: '#6495ED',
            tension: 0.4,
            fill: true // This ensures the area under the line is filled
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false
            },
            title: {
              display: false
            },
            tooltip: {
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              titleFont: {
                size: 14
              },
              bodyFont: {
                size: 12
              },
              cornerRadius: 5,
              caretSize: 8,
              padding: {
                top: 10,
                right: 10,
                bottom: 10,
                left: 10
              },
              displayColors: false
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
                color: '#ffffff',
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
                color: '#ffffff',
                font: {
                  size: 14
                }
              }
            }
          },
          elements: {
            line: {
              fill: 'start'
            }
          }
        }
      });
    } else {
      console.error('Failed to get 2D context for line chart');
    }
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
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            labels: {
              color: '#ffffff'
            }
          },
          tooltip: {
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            titleFont: {
              size: 14
            },
            bodyFont: {
              size: 12
            },
            cornerRadius: 5,
            caretSize: 8,
            padding: {
              top: 10,
              right: 10,
              bottom: 10,
              left: 10
            },
            displayColors: false
          }
        },
        scales: {
          r: {
            grid: {
              display: false
            },
            pointLabels: {
              color: '#ffffff',
              font: {
                size: 14
              }
            },
            angleLines: {
              color: '#ffffff'
            }
          }
        }
      }
    });
  }
}
