
/**
 * Encode a string to HTML
 *
 * @return  {string}
 */
String.prototype.htmlEncode = function() {
    return this.replace(/./gm, function(s) {
        // return "&#" + s.charCodeAt(0) + ";";
        return (s.match(/[a-z0-9\s]+/i)) ? s : "&#" + s.charCodeAt(0) + ";";
    });
};

/**
 * Decode a string from HTML
 *
 * @return  {string}
 */
String.prototype.htmlDecode = function() {
    return this.replace(/&#\d+;/gm,function(s) {
        return String.fromCharCode(s.match(/\d+/gm)[0]);
    })
};
