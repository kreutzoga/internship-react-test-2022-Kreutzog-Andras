import React, {Component} from "react";
import Button from "../../components/button/Button";

interface SandboxProps {
}

interface SandboxState {
    counter: number;
    buttonDisable: boolean;
}

class Sandbox extends Component<SandboxProps, SandboxState> {
    readonly state: SandboxState = {
        counter: 0,
        buttonDisable: true,
    };

    setCounterValue = (increase: boolean) => {
        this.setState((prevState) => {
            const newValue = increase ? prevState.counter + 1 : prevState.counter - 1;
            return {counter: newValue};
        });
    };

    render() {
        return (
            <div className="card m-3 p-5">
                <h5>Counter: {this.state.counter}</h5>
                <div>
                    <Button
                        onClick={() => {
                            this.setCounterValue(true);
                        }}
                    >
                        + Increase
                    </Button>

                    <Button
                        className="btn btn-primary mx-2"
                        disabled={(this.state.counter > 0) ? false : true}
                        onClick={() => {
                            this.setCounterValue(false);
                        }}
                    >
                        - Decrease
                    </Button>
                </div>
            </div>
        );
    }
}

export default Sandbox;