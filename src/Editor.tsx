import { useState } from "react";


export function Editor() {
    const [poem, setPoem] = useState("Hey\nJoe\n\nHelp")

    const stanzas = getStanzas(poem)

    return (
        <div style={{fontFamily: "monospace"}}>
            {stanzas.map(s => s.render()) }
        </div>
    )
}

class Stanza {
    text: string
    constructor(text: string) {
        this.text = text
    }
    render() {
        const verses = this.text.split("\n")
        return (
            <div className="stanza" style={{margin: "10px"}}>
                {verses.map((verse, index) => (
                    <Verse key={index} content={verse}/>
                ))}
            </div>
        )
    }
}

function Verse({key, content}: {key: number, content: string}) {
    return (
        <div className="verse" key={key}>{content}</div>
    )

}

function getStanzas(text: string) {
    return text.split("\n\n").map(x => new Stanza(x))
}