import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { Observable,of} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServiciodeProductosService {
  public url = environment.baseUrl;

  constructor(private http: HttpClient) {
   }

     /* Lista de productos */
     public obtenerProductos(route: string): Observable<any>{
      return this.http.get<any[]>(route).pipe(
        map( (resp: any) => {
        return resp;
        } ),
        catchError(this.handleError<any>())
        );

     }



       //Crear pedido
     public crearOrden(url: string,usuario: string,cuenta: number, monto: number): Observable<any> {
        const payload = {
             user: usuario,
            account:cuenta,
            total:monto

        };
        return this.http.post<any>(url, payload)
            .pipe(
                map((result: any) => {
                    if (result) {
                        return result;
                    }
                }),
                catchError(this.handleError<any>(`Error create order`))
            );
    }


     private handleError<T>(result?: T) {
      return (error: any): Observable<T> => {
        console.error(error);
        return of(result as T);
    };
  }
}
