import Point from './Point';

export default interface Component {
    setColor(hexCode: string): void;

    setBorderColor(hexCode: string): void;

    onClick(func: () => void): void;

    onRightClick(func: () => void): void;

    onMouseOver(func: (ev: { leftMouseButton: boolean; rightMouseButton: boolean }) => void): void;

    moveTo(point: Point): Promise<void>;
}
