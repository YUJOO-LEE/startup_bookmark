import { worker } from './browser';
import { companyStore, userStore } from './data/services';

const initializeMockupWorker = async () => {
  await Promise.all([userStore.init(), companyStore.init(), worker.start({ onUnhandledRequest: 'bypass' })]);
};

export default initializeMockupWorker;
