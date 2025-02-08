import { useEffect, useState } from "react";

import { EditorState, Extension, Facet, Range } from "@codemirror/state"
import { EditorView, gutter, GutterMarker } from "@codemirror/view"
import {Decoration, DecorationSet} from "@codemirror/view"
import {StateField, StateEffect} from "@codemirror/state"


const samplePoem = `
Versos, caro leitor,
É pra quem tem competência.
É para quem possui
Um pouco de inteligência
Para concretizá-los
Com toda fibra e cadência.

Versos é pra quem tem
O dom que Deus lhe deu.
Aquele dom que veio
Do berço quando nasceu.
Na Bahia tem alguém
Que tem dom igual ao meu?
`

let eState = EditorState.create({
    doc: samplePoem,
    extensions: [
        gutterConfig(),
        sylExtension(),
    ]
})

export function Editor() {
    // const [poem, setPoem] = useState("")

    useEffect(()=>{
        let view = new EditorView({
          state: eState,
          parent: document.getElementById("editor")!,
        })
        let dom = view.dom
        dom.style.marginTop = "40px" // Hardcoded for header. Fix these hardcodes
        dom.style.minHeight = "300px"
        dom.style.height = "80vh"
        dom.style.maxHeight = "800px"
        dom.style.minWidth = "500px"
        dom.style.textAlign = "left"
        return () => dom.remove()
    }, )

    return (
        <div id="editor"></div>
    )
}

const emptyMarker = new class extends GutterMarker {
    toDOM() { return document.createTextNode("ø") }
  }
  
function gutterConfig() : Extension {
    return gutter({
        lineMarker(view, line){
            return emptyMarker
        },
        initialSpacer: () => emptyMarker
    })
}



function sylExtension() {
// Define the StateField to manage the syl decorations
const sylField = StateField.define<DecorationSet>({
    create() {
        return Decoration.none;
    },
    update(syls, tr) {
        let cursor = tr.selection?.ranges[0].from
        if(!cursor || !tr.changes)
            return syls
        syls = Decoration.none
        let pos = 0
        for (let line of tr.newDoc.iterLines()) {
            let sils = get_syllables_positions(line)
            sils = sils.map(x => x + pos)
            let marks: Range<Decoration>[] = sils.map(
                sil => sylMark.range(sil, sil + 2))
            syls = syls.update({
                add: marks
            })
            pos += line.length + 1
        }
        return syls;
    },
    provide: f => EditorView.decorations.from(f)
});

function get_syllables_positions(text: string) : number[] {
    let regex = /(?=\b\w*ss)ss\w*\b/g
    let matches = text.match(regex)
    if (matches) {
        return matches.map(match => text.indexOf(match));
    }
    return []
}

// Define the Decoration used to syl text
const sylMark = Decoration.mark({class: "cm-syl"});

// Define the theme for the syl decoration
const sylTheme = EditorView.baseTheme({
    ".cm-syl": { textDecoration: "syl 3px red" }
});

// Main extension function to add syl functionality
    return [
        sylField,
        sylTheme
    ];
}