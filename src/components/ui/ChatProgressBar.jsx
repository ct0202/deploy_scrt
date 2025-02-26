const ChatProgressBar = (props) => {
    const { completed } = props;

    const containerStyles = {
        height: '4px',
        width: '95%',
        backgroundColor: "#e0e0de",
        borderRadius: 50,
    }

    const fillerStyles = {
        height: '100%',
        width: `${completed}%`,
        backgroundColor: 'white',
        borderRadius: 'inherit',
    }

    return (
        <div style={containerStyles}>
            <div style={fillerStyles}>
            </div>
        </div>
    );
};

export default ChatProgressBar;


