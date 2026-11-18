from pathlib import Path
import json
from playwright.sync_api import sync_playwright
out=Path("qa");out.mkdir(exist_ok=True)
report=[]
with sync_playwright() as p:
    browser=p.chromium.launch(headless=True)
    for width in [360,768,1024,1440]:
        page=browser.new_page(viewport={"width":width,"height":900},reduced_motion="reduce")
        errors=[]
        page.on("pageerror",lambda err:errors.append(str(err)))
        page.goto("http://127.0.0.1:4173",wait_until="networkidle")
        assert page.get_by_role("heading",name="Building intelligent systems. Designing thoughtful experiences.").is_visible()
        assert page.locator(".project").count()==5
        assert page.locator("body").evaluate("(x) => x.scrollWidth <= innerWidth"),f"Horizontal overflow: {width}"
        page.screenshot(path=str(out/f"desktop-{width}.png"),full_page=True)
        page.get_by_role("button",name="React",exact=True).click()
        assert page.locator(".project:visible").count()>=1
        page.get_by_role("button",name="All",exact=True).click()
        page.get_by_role("button",name="Switch to light theme").click()
        assert page.locator("html").get_attribute("data-theme")=="light"
        page.screenshot(path=str(out/f"light-{width}.png"),full_page=True)
        page.keyboard.press("Control+k")
        assert page.get_by_role("dialog").is_visible()
        page.keyboard.press("Escape")
        assert not page.get_by_role("dialog").is_visible()
        assert not errors,errors
        report.append({"viewport":width,"status":"passed","runtimeErrors":errors})
        page.close()
    browser.close()
(out/"report.json").write_text(json.dumps(report,indent=2))
print(json.dumps(report))
