/*
State pattern allows different behavior based on internal state. We can avoid if-else conditions when handling multiple behaviors.
*/

class MP3PlayerContext {
    standbyState = new StandByState(this);
    playingState = new PlayingState(this);
    pauseState = new PauseState(this);

    private state: State = this.standbyState;

    setState(state: State) {
        this.state = state;
    }

    getState() {
        return this.state;
    }

    pressPlayButton() {
        this.state.play();
    }
}

interface State {
    play: () => void;
}

class StandByState implements State {
    context: MP3PlayerContext;

    constructor(context: MP3PlayerContext) {
        this.context = context;
    }

    play(): void {
        console.log("preparing the music");
        this.context.setState(this.context.playingState);
    }
}


class PlayingState implements State {
    context: MP3PlayerContext;

    constructor(context: MP3PlayerContext) {
        this.context = context;
    }

    play(): void {
        console.log("pause !")
        this.context.setState(this.context.pauseState);
    }
}

class PauseState implements State {
    context: MP3PlayerContext;

    constructor(context: MP3PlayerContext) {
        this.context = context;
    }

    play(): void {
        console.log("start !")
        this.context.setState(this.context.playingState);
    }
}


const mp3Player = new MP3PlayerContext();
mp3Player.setState(mp3Player.playingState);
mp3Player.pressPlayButton();
console.log(mp3Player.getState());






