export interface Configuration {
    getString(p2: string): string;
}

export default class EnglishConfiguration implements Configuration {
    getString(p2: string): string {
        if (p2 == 'appTitle') {
            return 'Algorithmen Visualisierung';
        }

        return p2;
    }
}
