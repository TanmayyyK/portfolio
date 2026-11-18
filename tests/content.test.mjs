import test from "node:test";import assert from "node:assert/strict";import fs from "node:fs";
const p=JSON.parse(fs.readFileSync("content/profile.json","utf8"));const c=JSON.parse(fs.readFileSync("content/site.json","utf8"));
test("portfolio features exactly five approved public projects",()=>{assert.equal(p.projects.length,5);assert.ok(p.projects.every(x=>x.repo.startsWith("https://github.com/TanmayyyK/")))});
test("employer identity hidden by default",()=>assert.equal(c.REVEAL_EMPLOYER,false));
test("independent payment integration clearly disclosed",()=>assert.match(p.projects.find(x=>x.id==="commerce").note,/Independent project using Razorpay's public APIs/));
test("internship start is centralized and in local timezone",()=>{assert.equal(p.internship.startDate,"2027-01-12");assert.equal(p.internship.timeZone,"Asia/Kolkata")});
test("every project has a labeled architecture",()=>assert.ok(p.projects.every(x=>x.architecture.length>=4)));
test("site and resume URLs are unset instead of fabricated",()=>{assert.equal(c.SITE_URL,"");assert.equal(c.RESUME_URL,"")});
