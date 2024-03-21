import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoaderService } from '../services/loader/loader.service';
import { finalize } from 'rxjs/operators';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  private requestsInFlight = 0;

  constructor(
    private loadingService: LoaderService
  ) {}

  // Interceptar todas las solicitudes HTTP y mostrar un indicador de carga.
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {    
    // Incrementar el contador de solicitudes en progreso.
    this.requestsInFlight++;
    
    // Activar el indicador de carga solo si esta es la primera solicitud.
    if (this.requestsInFlight === 1) {
      this.loadingService.setLoading(true);
    }
    
    return next.handle(request).pipe(
      finalize(() => {
        // Decrementar el contador de solicitudes en progreso.
        this.requestsInFlight--;
        
        // Si no hay más solicitudes en progreso, desactivar el indicador de carga.
        if (this.requestsInFlight === 0) {
          this.loadingService.setLoading(false);
        }
      })
    );
  }
}
