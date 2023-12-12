/**
 * Not to by used by itself, but to be used by other tags. 
 * @class
 * @param {string|string[]} styleName - The name (or list of names) of CSS styles to change.
 * @param {string|string[]} styleValue - The name (or list of names) of values to set the CSS styles to. Put this in the same order as styleName!
 */
class QuadStyled extends HTMLElement {
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

/**
 * Represents a quad-center tag. Prints text centered horizontally on the window.
 * @class
 */
class QuadCenteredText extends QuadStyled { 
    constructor() {
        self = super();
        self.styleName = ["textAlign","display"];
        self.styleValue = ["center","block"];

    }
}
/**
 * Represents a quad-marquee tag. Prints text that moves right-to-left and loops every 6 seconds.
 * @class
 */
class QuadMarquee extends QuadStyled { 
    constructor() {
        self = super();
        self.styleName=["animation", "whiteSpace"];
        self.styleValue=["marquee 6s linear infinite","nowrap"];
    }
}
/**
 * Represents a quad-blink tag. Prints text that blinks every second by default, but this can be changed using interval.
 * @class
 * @param {number} interval - A CSS color code, e.g. rgb(255,0,0) or #ff0000 .
 */
class QuadBlink extends QuadStyled {
    static observedAttributes = ["interval"];
    constructor() {
        self = super();
        self.styleName = "animation";
        /**
         * @constant
         * @type {string}
         * @default "blinker 1s linear infinite"
         */
        self.styleValue = "blinker 1s linear infinite";
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if(name == "interval") { 
            self.style.animation=`blinker ${newValue}s linear infinite`;
            Array.prototype.forEach.call(self.getElementsByTagName('*'),(e)=>{console.log("c", e); e.style.animation=`blinker ${newValue}s linear infinite`});
        }
    }
}
/**
 * Represents a quad-strike tag. Prints text with a line through it.
 * @class
 */
class QuadStrike extends QuadStyled { 
    constructor() {
        self = super();

        self.styleName = "textDecoration";
        self.styleValue = "line-through";
    }
}
/**
 * @see QuadStrike
 */
class QuadS extends QuadStrike {} 
class QuadU extends QuadStyled { // quad-u tag
    constructor() {
        self = super();    

        self.styleName = "textDecoration";
        self.styleValue = "underline";
    }
}
/**
 * Represents a quad-tt tag. Prints text in a teletype-like format.
 * @class
 */
class QuadTT extends QuadStyled {
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
/**
 * @classdesc Represents a quad-font tag. Anything inside this tag will inherit the color, face, and size of the quad-font tag.
 * @class
 * @param {string} color - A CSS color code, e.g. rgb(255,0,0) or #ff0000 .
 * @param {string} face - A font face name, e.g. Arial, Helvetica, Times New Roman, etc.
 * @param {string} size - A font size, e.g. 16px, 32pt, 24em, etc.
 */
class QuadFont extends QuadStyled {
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

// Define all of the elements as their respective classes.
customElements.define("quad-center", QuadCenteredText);
customElements.define("quad-marquee", QuadMarquee);
customElements.define("quad-blink", QuadBlink);
customElements.define("quad-strike", QuadStrike);
customElements.define("quad-s", QuadS);
customElements.define("quad-u", QuadU);
customElements.define("quad-tt", QuadTT);
customElements.define("quad-big", QuadBig);
customElements.define("quad-font", QuadFont);