import test from "node:test";import assert from "node:assert/strict";import fs from "node:fs";
const css=fs.readFileSync("assets/style.css","utf8");
function block(s){const r=css.match(/(?::root\[data-theme=light\]|:root)\s*\{([^}]*)\}/g);return (r||[]).find(x=>s==="light"?x.startsWith(":root[data-theme=light]"):x.startsWith(":root{"))}
function colors(b){return Object.fromEntries([...b.matchAll(/--(\w+):\s*(#[0-9a-f]{6})/gi)].map(x=>[x[1],x[2]]))}
function luminance(hex){const v=[1,3,5].map(i=>parseInt(hex.slice(i,i+2),16)/255).map(x=>x<=.04045?x/12.92:((x+.055)/1.055)**2.4);return v[0]*.2126+v[1]*.7152+v[2]*.0722}
function contrast(a,b){const x=luminance(a),y=luminance(b);return (Math.max(x,y)+.05)/(Math.min(x,y)+.05)}
for(const name of ["dark","light"]){test(name+" theme foreground and accents reach WCAG AA across authored surfaces",()=>{const b=colors(block(name));for(const fg of ["text","muted","accent"]){for(const bg of ["bg","surface","raised"]){assert.ok(contrast(b[fg],b[bg])>=4.5,fg+" on "+bg+" contrast "+contrast(b[fg],b[bg]))}}assert.ok(contrast(b.bg,b.accent)>=4.5)})}
