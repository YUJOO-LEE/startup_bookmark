import '@testing-library/jest-dom';
import { server } from './src/__mock__/node';
import { fireEvent } from '@testing-library/react';
const { JSDOM } = require('jsdom');

const { document } = new JSDOM('', { url: 'https://localhost:3000' }).window;
global.document = document;
global.window = document.defaultView;
global.history = document.defaultView.history;

global.window.HTMLCanvasElement.prototype.getContext = () => {
  return {
    fillRect: () => {},
    clearRect: () => {},
    getImageData: (x, y, w, h) => {
      return {
        data: new Array(w * h * 4),
      };
    },
    putImageData: () => {},
    createImageData: () => {
      return [];
    },
    setTransform: () => {},
    drawImage: () => {},
    save: () => {},
    fillText: () => {},
    restore: () => {},
    beginPath: () => {},
    moveTo: () => {},
    lineTo: () => {},
    closePath: () => {},
    stroke: () => {},
    translate: () => {},
    scale: () => {},
    rotate: () => {},
    arc: () => {},
    fill: () => {},
    measureText: () => {
      return {
        width: 0,
      };
    },
    transform: () => {},
    rect: () => {},
    clip: () => {},
  };
};

global.window.HTMLCanvasElement.prototype.toDataURL = () => {
  return '';
};

const originalBack = history.back.bind(history);
history.back = () => {
  originalBack();
  fireEvent.popState(window, {
    state: history.state,
  });
};

beforeAll(() => {
  server.listen({ onUnhandledRequest: 'bypass' });
});
afterAll(() => {
  server.close();
});
