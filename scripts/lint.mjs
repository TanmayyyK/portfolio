import fs from "node:fs";import assert from "node:assert/strict";
const p=JSON.parse(fs.readFileSync("content/profile.json","utf8")),c=JSON.parse(fs.readFileSync("content/site.json","utf8"));
assert.equal(c.REVEAL_EMPLOYER,false,"Employer must remain hidden by default");
assert.equal(c.PROFILE_REPOSITORY,"TanmayyyK/TanmayyyK");assert.equal(p.projects.length,5);
assert.equal(new Set(p.projects.map(x=>x.id)).size,5);
for(const project of p.projects){assert.ok(project.architecture.length>=4);assert.ok(project.stack.length>=3);assert.ok(project.repo.startsWith("https://github.com/TanmayyyK/"));assert.ok(!project.summary.includes("production-grade"));}
assert.match(p.projects.find(x=>x.id==="commerce").note,/Independent project using Razorpay's public APIs/);
assert.equal(p.internship.startDate,"2027-01-12");
console.log("Static content and publication rules passed.");
