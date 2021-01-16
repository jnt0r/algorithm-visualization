import Component from '../Component';

export default interface Circle extends Component {
    setRadius(radius: number): void;
}
