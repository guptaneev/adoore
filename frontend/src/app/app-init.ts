import {ApiService} from "./api-service.service";


export function initializeApp(apiService: ApiService): () => Promise<any> {
  return (): Promise<any> => {
    return apiService.setValidCities().toPromise();
  };
}
