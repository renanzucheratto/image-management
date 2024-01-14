type ToastTypes = 'danger' | 'success';

interface ToastInfo {
  body: string;
  type?: ToastTypes;
  className?: string;
  delay?: number;
}

export {
  ToastTypes,
  ToastInfo
}