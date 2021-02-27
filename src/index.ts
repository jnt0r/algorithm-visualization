import Application from './application/Application';
import CanvasRenderer from './application/renderer/canvasrenderer/CanvasRenderer';
import EnglishConfiguration from './application/Configuration';
import Controller from './application/Controller';

const configuration = new EnglishConfiguration();
const controller = new Controller(configuration, new CanvasRenderer());
new Application(controller);
