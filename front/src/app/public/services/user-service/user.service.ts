import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { JwtHelperService } from '@auth0/angular-jwt';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { ACCESS_TOKEN } from 'src/app/app.module';
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
  constructor(
    private http: HttpClient,
    private snackbar: MatSnackBar,
    private jwtService: JwtHelperService
  ) {}

  login(user: UserI): Observable<LoginResponseI> {
    return this.http.post<LoginResponseI>('back/users/login', user).pipe(
      tap((res: LoginResponseI) =>
        localStorage.setItem(ACCESS_TOKEN, res.access_token)
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

  getLoggedInUser() {
    const decodedToken = this.jwtService.decodeToken();
    return decodedToken.user;
  }
}
