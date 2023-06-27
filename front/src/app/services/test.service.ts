import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Test {
  title: string;
}

@Injectable({
  providedIn: 'root',
})
export class TestService {
  constructor(private http: HttpClient) {}

  getUser(id: number): Observable<Test> {
    return this.http.get<Test>(`/back/users/${id}`);
  }
}
