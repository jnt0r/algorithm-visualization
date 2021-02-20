import Component from '../Component';

export default interface Text extends Component {
    setText(text: string): void;
}
