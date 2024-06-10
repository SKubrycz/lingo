const handleInputVisibility = (e: React.MouseEvent<HTMLDivElement>, inputRef: React.RefObject<HTMLInputElement>) => {
    if (inputRef && inputRef.current) {
        const target = e.target as HTMLElement;
        if (inputRef.current.type === 'password') {
            inputRef.current.type = 'text';
            target.textContent = 'Ukryj';
        } else if (inputRef.current.type === 'text') {
            inputRef.current.type = 'password';
            target.textContent = 'Pokaż';
        }
    }
}

export default handleInputVisibility;