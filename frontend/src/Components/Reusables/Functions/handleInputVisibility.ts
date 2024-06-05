const handleInputVisibility = (inputRef: React.RefObject<HTMLInputElement>) => {
    if (inputRef && inputRef.current) {
        if (inputRef.current.type === 'password') {
            inputRef.current.type = 'text'
        } else if (inputRef.current.type === 'text') {
            inputRef.current.type = 'password';
        }
    }
}

export default handleInputVisibility;