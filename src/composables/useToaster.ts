import { useToast } from 'vue-toastification';

let toast;

export default function useToaster(text, type) {
  if (!toast) {
    console.log('creating toast');
    toast = useToast();
  }
  toast[type](text);
}

export const toasts = {
  success(text?: string): void {
    useToaster(text || 'Изменения сохранены', 'success');
  },
  danger(text?: string): void {
    useToaster(text || 'Ошибка', 'danger');
  },
  warning(text?: string): void {
    useToaster(text || 'Требуется действие со стороны пользователя', 'warning');
  },
};
