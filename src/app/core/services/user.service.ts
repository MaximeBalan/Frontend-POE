import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { config } from 'rxjs';
import { environment } from 'src/environments/environment';



@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>(`${environment.api}/users`);
    }

    register(user: User) {
        return this.http.post(`${environment.api}/users/register`, user);
    }

    delete(id: number) {
        return this.http.delete(`${environment.api}/users/${id}`);
    }
}