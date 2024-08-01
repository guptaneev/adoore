import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
import { NotificationService } from "./notification.service";
import {map} from "rxjs/operators";

export interface MarketData {
  qmiCount: number;
  homeCount: number;
  avgPricePerSft: number;
  poolPercentage: number;
  viewsPercentage: number;
  waterfrontPercentage: number;
  gatedPercentage: number;
  naturePercentage: number;
  parksPercentage: number;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'http://localhost:8080/HousingPricePilot-1.0-SNAPSHOT/rws/price-pilot/hello';
  private getMarketsUrl = 'http://localhost:8080/HousingPricePilot-1.0-SNAPSHOT/rws/price-pilot/markets';
  private getMarketNamesUrl = 'http://localhost:8080/HousingPricePilot-1.0-SNAPSHOT/rws/price-pilot/market-names';
  private getMarketDataUrl = 'http://localhost:8080/HousingPricePilot-1.0-SNAPSHOT/rws/price-pilot/market-data'; // Update with your API URL

  private userSelectedCities: string[] = [];
  private validCities: any;


  constructor(private http: HttpClient, private notificationService: NotificationService) {
    this.setValidCities();
  }

  getMarkets(): Observable<string> {
    return this.http.get(this.getMarketsUrl, {responseType: 'text'})
  }

  getMarketData(markets: string[]): Observable<{ [key: string]: MarketData }> {
    return this.http.post<{ [key: string]: MarketData }>(this.getMarketDataUrl, markets);

  }

  setValidCities(): Observable<void> {
    return this.http.get<string[]>(this.getMarketNamesUrl).pipe(
      map((response: string[]) => {
        this.validCities = response;  // Store the response in the global list return this.validCities;
      })
    );
  }

  getHelloMessage(): Observable<string> {
    return this.http.get(this.apiUrl, { responseType: 'text' });
  }

  getUserSelectedCities() {
    return this.userSelectedCities;
  }

  addToUserSelectedCities(city: string) {
    this.userSelectedCities.push(city);
  }

  isUserSelectedCity(city: string) {
    return this.userSelectedCities.includes(city);
  }

  clearUserSelectedCities() {
    this.userSelectedCities = [];
  }

  getValidCities() {
    return this.validCities;
  }

  isValidCity(city: string) {
    return this.validCities.includes(city);
  }

  removeCity(city: string) {
    this.notificationService.show( this.capitalizeFirstLetter(city) + ' successfully removed.')
    this.userSelectedCities.splice(this.userSelectedCities.indexOf(city), 1);
  }

  isFull() {
    return this.userSelectedCities.length >= 4;
  }

  isEmpty() {
    return this.userSelectedCities.length <= 0;
  }

  capitalizeFirstLetter(cityState: string) {
    let [city, state] = cityState.split(',').map(part => part.trim());
    city = city.split(/[- ]/).map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
    state = state.toUpperCase();
    return `${city}, ${state}`;
  }

  formatCityList(cityStateList: string[]) {
    let i: number;
    let cityStateFormattedList: string[] = [];
    for (i = 0; i < cityStateList.length; i++ ) {
        cityStateFormattedList[i] = this.capitalizeFirstLetter(cityStateList[i]);
    }
    return cityStateFormattedList;
  }
}

