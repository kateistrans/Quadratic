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
class QuadS extends QuadStrike {} // quad-s tag, just duplicate quad-strike
class QuadU extends QuadStyled { // quad-u tag
    constructor() {
        self = super();    

        self.styleName = "textDecoration";
        self.styleValue = "underline";
    }
}
class QuadTT extends QuadStyled { // quad-tt tag
    constructor() {
        self = super();    

        self.styleName = "fontFamily";
        self.styleValue = `"Lucida Console", "Menlo", "Monaco", "Courier", monospace`;
    }
}
class QuadBig extends QuadStyled { // quad-big tag
    constructor() {
        self = super();    

        self.styleName = "fontSize";
        self.styleValue = `larger`;
    }
}
class QuadFont extends QuadStyled { // quad-font tag
    static observedAttributes = ["color", "face", "size"];
    constructor() {
        self = super();
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if(name == "color") { 
            self.style.color=newValue;
            Array.prototype.forEach.call(self.getElementsByTagName('*'),(e)=>{e.style.color=newValue});
        }
        if(name == "face") { 
            self.style.fontFamily=newValue;
            Array.prototype.forEach.call(self.getElementsByTagName('*'),(e)=>{e.style.fontFamily=newValue});
        }
        if(name == "size") { 
            self.style.fontSize=newValue;
            Array.prototype.forEach.call(self.getElementsByTagName('*'),(e)=>{e.style.fontSize=newValue});
        }
    }
}

customElements.define("quad-center", QuadCenteredText);
customElements.define("quad-marquee", QuadMarquee);
customElements.define("quad-blink", QuadBlink);
customElements.define("quad-strike", QuadStrike);
customElements.define("quad-s", QuadS);
customElements.define("quad-u", QuadU);
customElements.define("quad-tt", QuadTT);
customElements.define("quad-big", QuadBig);
customElements.define("quad-font", QuadFont);
