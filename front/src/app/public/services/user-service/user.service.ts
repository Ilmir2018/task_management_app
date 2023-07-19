import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { LoginResponseI, UserI } from '../../public.interfaces';

export const snackBarConfig: MatSnackBarConfig = {
  duration: 2500,
  horizontalPosition: 'right',
  verticalPosition: 'top',
};

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient, private snackbar: MatSnackBar) {}

  login(user: UserI): Observable<LoginResponseI> {
    return this.http.post<LoginResponseI>('back/users/login', user).pipe(
      tap((res: LoginResponseI) =>
        localStorage.setItem('access_token', res.access_token)
      ),
      tap(() =>
        this.snackbar.open('Login Successfull', 'Close', snackBarConfig)
      ),
      catchError((e) => {
        this.snackbar.open(
          `Login was not successfull: ${e.error.message}`,
          'Close',
          snackBarConfig
        );
        return throwError(e);
      })
    );
  }

  register(user: UserI): Observable<UserI> {
    return this.http.post<UserI>('back/users', user).pipe(
      tap((createdUser: UserI) =>
        this.snackbar.open(
          `User ${createdUser.username} created successfully`,
          'Close',
          snackBarConfig
        )
      ),
      catchError((e) => {
        this.snackbar.open(
          `User culd not be created, due to: ${e.error.message}`,
          'Close',
          snackBarConfig
        );
        return throwError(e);
      })
    );
  }
}
