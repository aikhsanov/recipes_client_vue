import { useToast } from 'vue-toastification';

let toast;

export default function useToaster(text, type) {
  if (!toast) {
    console.log('creating toast');
    toast = useToast();
  }
  toast[type](text);
}
