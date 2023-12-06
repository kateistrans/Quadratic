class QuadStyled extends HTMLElement { // general-purpose tag to be extended that allows for styling different HTMLElements
    constructor(styleName, styleValue) {
        self = super(styleName, styleValue);
    }

    connectedCallback() {
        if(Array.isArray(self.styleName) && Array.isArray(self.styleValue)) {
            self.styleName.forEach((e,i)=>self.style[e]=self.styleValue[i]);
        } else self.style[self.styleName]=self.styleValue;
        
        Array.prototype.forEach.call(self.getElementsByTagName('*'),(e)=>{e.style[self.styleName]=self.styleValue});
    }
}
class QuadCenteredText extends QuadStyled { // quad-center tag, center horizontally
    constructor() {
        self = super();
        self.styleName = ["textAlign","display"];
        self.styleValue = ["center","block"];
        
    }
}
class QuadMarquee extends QuadStyled { // quad-marquee tag, limited functionality, only does right-to-left marquee
    constructor() {
        self = super();
        self.styleName=["animation", "whiteSpace"];
        self.styleValue=["marquee 6s linear infinite","nowrap"];
    }
}
class QuadBlink extends QuadStyled { // quad-blink tag, limited functionality, only does default blinking
    static observedAttributes = ["interval"];
    constructor() {
        self = super();
        self.styleName = "animation";
        self.styleValue = "blinker 1s linear infinite";
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if(name == "interval") { 
            self.style.animation=`blinker ${newValue}s linear infinite`;
            Array.prototype.forEach.call(self.getElementsByTagName('*'),(e)=>{console.log("c", e); e.style.animation=`blinker ${newValue}s linear infinite`});
        }
    }
}

class QuadStrike extends QuadStyled { // quad-strike tag
    constructor() {
        self = super();

        self.styleName = "textDecoration";
        self.styleValue = "line-through";
    }
}

class QuadU extends QuadStyled { // quad-u tag
    constructor() {
        self = super();

        self.styleName = "textDecoration";
        self.styleValue = "underline";
    }
}
customElements.define("quad-center", QuadCenteredText);
customElements.define("quad-marquee", QuadMarquee);
customElements.define("quad-blink", QuadBlink);
customElements.define("quad-strike", QuadStrike);
customElements.define("quad-u", QuadU);
