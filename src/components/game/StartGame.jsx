import Button from "../common/Button";
import { GAME_STATES } from "../utils/constants";

const StartGame = (props) => {
    if (props.gameState == GAME_STATES.START) {
        return (
            // centering div within parent
            // https://www.frontendreference.com/center-div-with-tailwind.html#:~:text=We%20can%20center%20a%20div,to%20center%20the%20child%20div.&text=I'm%20a%20centered%20div%20using%20Grid!&text=In%20this%20example%2C%20grid%20makes,div%20both%20vertically%20and%20horizontally.
            <Button
                className={"absolute inset-0 mx-auto my-auto z-50"}
                label={"Start"}
                onClick={props.onStart}
            />
        );
    }
}

export default StartGame;