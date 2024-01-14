import { Injectable } from '@angular/core';
import { ToastInfo } from '../models/toast';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  toasts: ToastInfo[] = [];

  show(toastData: ToastInfo) {
    const { type, body, delay, className } = toastData;

    const typeCssClass = type ? `bg-${type} text-light` : '';

    this.toasts.push({
      type,
      body,
      delay,
      className: `${typeCssClass} ${className}`
    });
  }

  remove(toast: ToastInfo) {
    this.toasts = this.toasts.filter(t => t != toast);
  }
}
