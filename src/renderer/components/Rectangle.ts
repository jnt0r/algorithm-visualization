import Component from '../Component';

export default interface Rectangle extends Component {
    setHeight(height: number): void;

    setWidth(width: number): void;
}
