export const INCREMENT: string = 'INCREMENT';

export const searchCount: (s: number, a: string) => number = (state: number, action: string): number => {
    switch (action) {
        case INCREMENT:
            return state + 1;
        default:
            return state;
    }
}