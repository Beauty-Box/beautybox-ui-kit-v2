import { useErrorsStore } from '../stores/errors';

export function setErrorHandler() {
    const store = useErrorsStore();
    document.addEventListener('server-error', () => {
        store.setError('server-error');
    });
    document.addEventListener('bad-request', () => {
        store.setError('bad-request');
    });
    document.addEventListener('forbidden', () => {
        store.setError('forbidden');
    });
    document.addEventListener('not-found', () => {
        store.setError('not-found');
    });
    document.addEventListener('unknown-error', () => {
        store.setError('unknown-error');
    });
    document.addEventListener('many-requests', () => {
        store.setError('many-requests');
    });
    document.addEventListener('clear-error', () => {
        store.clearError();
    });
}

export default setErrorHandler;
