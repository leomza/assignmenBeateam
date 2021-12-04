import { Injectable } from '@angular/core';
import { ResponseInterface } from '../../models/response.interface';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { environment } from '../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  //Recibe como parametro el token
  loginByPrivateKey(token: string): Observable<ResponseInterface> {
    const headers = { 'funcion': 'getTareas', 'X-Auth': `${token}` }
    return this.http.get<ResponseInterface>(environment.api_url, { headers: headers })
  }

  getAllTasks(): Observable<ResponseInterface> {
    const token = localStorage.getItem('token')
    const headers = { 'funcion': 'getTareas', 'X-Auth': `${token}` }
    return this.http.get<ResponseInterface>(environment.api_url, { headers: headers })
  }

  getTaskStates(): Observable<ResponseInterface> {
    const token = localStorage.getItem('token')
    const headers = { 'funcion': 'getEstados', 'X-Auth': `${token}` }
    return this.http.get<ResponseInterface>(environment.api_url, { headers: headers })
  }

  getTaskTypes(): Observable<ResponseInterface> {
    const token = localStorage.getItem('token')
    const headers = { 'funcion': 'getTipos', 'X-Auth': `${token}` }
    return this.http.get<ResponseInterface>(environment.api_url, { headers: headers })
  }

  getAllTasksFiltered(form: any): Observable<any> {
    const token = localStorage.getItem('token')
    const headers = { 'funcion': 'getTareas', 'X-Auth': `${token}` }
    const params = {
      cliente: form.client,
      reference: form.reference,
      usuario: form.user,
      taskType: form.taskType,
      estado: form.taskState,
    };
    console.log(params);
    return this.http.get<any>(environment.api_url, { params: params, headers: headers })
  }
}


