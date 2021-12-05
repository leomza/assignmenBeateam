import { Injectable } from '@angular/core';
import { ResponseInterface } from '../../models/response.interface';
import { HttpClient, HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs'
import { environment } from '../../../environments/environment'
import { ListTasksInterface } from 'src/app/models/listTasks.interface';

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
    const params = {
      'cliente': form.client,
      'referencia': form.reference,
      'usuario': form.user,
      'tipo[]': form.taskType,
      'fecha': form.taskDate,
      'estado[]': form.taskState,
    };
    return this.http.get<any>(environment.api_url, { params: params, headers: headers })
  }
}