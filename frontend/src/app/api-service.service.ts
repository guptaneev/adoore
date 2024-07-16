import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'http://localhost:8080/HousingPricePilot-1.0-SNAPSHOT/rws/price-pilot/hello';
  private userSelectedCities: string[] = [];
  private validCities: string[] = ['austin', 'houston', 'dallas'];


  constructor(private http: HttpClient) { }

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
    console.log(city);
    this.userSelectedCities.splice(this.userSelectedCities.indexOf(city), 1);
  }
}

