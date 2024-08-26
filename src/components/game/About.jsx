const About = ({ aboutSectionRef }) => {
    return (
        <div ref={aboutSectionRef} className="text-center max-w-[960px] mt-40 mx-auto">
            <h1 className="font-bold mb-5">How To Play!</h1>
            <p>Chaos Type v2 is designed as a fast-paced typing exercise aimed to improve your typing skills and reaction time.
                Words will randomly appear on the game screen, and your objective is to type them correctly before
                they disappear. To play, type the word in the input box and hit either 'space' or 'enter' to remove it.
                You start with three lives, and the game speeds up as you progress. Losing all lives results in game over.
            </p>
        </div>
    );
}

export default About;
