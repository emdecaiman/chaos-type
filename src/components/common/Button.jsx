const Button = (props) => {
    return (
        <button
            className={`btn btn-neutral btn-active rounded-xl w-60 text-white bg-blue-600 hover:bg-blue-800 border-none ${props.className}`}
            onClick={props.onClick}>
            {props.label}
        </button>
    );
}

export default Button;