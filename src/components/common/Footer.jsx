const Footer = () => {
    return (
        <footer className="mt-20 bg-white bg-opacity-5 w-full h-20">
            <div className="flex justify-between items-center p-10 bg-white bg-opacity-5 w-full h-20">
                <div>
                    <h1>© 2024 Chaos Type</h1>
                </div>
                <div className="flex gap-5">
                    <a href="https://github.com/emdecaiman/chaos-type-v2"><img src="/github-mark-white.svg" alt="github" className="w-5 h-5"/></a>
                    <a href="https://www.linkedin.com/in/emmanuel-decaiman/"><img src="/linkedin.svg" alt="linkedin" className="w-5 h-5 filter invert"/></a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;