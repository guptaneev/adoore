import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NotificationService } from "./notification.service";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'http://localhost:8080/HousingPricePilot-1.0-SNAPSHOT/rws/price-pilot/hello';
  private userSelectedCities: string[] = [];
  private validCities: string[] = ['Austin', 'Houston', 'Dallas'];


  constructor(private http: HttpClient, private notificationService: NotificationService) { }

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
    return this.validCities.includes(this.capitalizeFirstLetter(city));
  }

  removeCity(city: string) {
    this.notificationService.show( this.capitalizeFirstLetter(city) + ' successfully removed.')
    this.userSelectedCities.splice(this.userSelectedCities.indexOf(city), 1);
  }

  capitalizeFirstLetter(city: string) {
    city.toLowerCase();
    return city.charAt(0).toUpperCase() + city.slice(1);
  }
}

