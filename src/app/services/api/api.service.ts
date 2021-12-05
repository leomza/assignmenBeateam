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

  loginByPrivateKey(token: string): Observable<ResponseInterface> {
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

  getAllTasks(form: any): Observable<any> {
    const token = localStorage.getItem('token')
    const headers = { 'funcion': 'getTareas', 'X-Auth': `${token}` }
    //If the start date doesn't exist I will set to an empty string:
    if (!form.taskDate) {
      form.taskDate = { "inicio": '', "fin": '' }
    }
    const params = {
      'cliente': form.client,
      'referencia': form.reference,
      'usuario': form.user,
      'tipo[]': form.taskType,
      'fecha[inicio]': form.taskDate.inicio,
      'fecha[fin]': form.taskDate.fin,
      'estado[]': form.taskState,
    };
    return this.http.get<any>(environment.api_url, { params: params, headers: headers })
  }
}