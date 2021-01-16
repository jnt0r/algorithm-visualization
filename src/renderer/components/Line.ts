import Component from '../Component';

export default interface Line extends Component {
    setStrokeWidth(width: number): void;
}
