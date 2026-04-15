#!/usr/bin/env python3
"""
One-time conversion script for Themen content.
Converts forensik-content and netzwerk-content into standardized format:
  - Single .md file per chapter
  - YAML frontmatter (id, title, icon, section)
  - Pure HTML content

Usage:
    python3 convert_themen.py
"""

import json
import os
import re
import sys
import yaml

from markdown_it import MarkdownIt

THEMEN_DIR = "Themen/content"
CONTENT_DIR = "content"

ICON_MAP = {
    "ch01-grundlagen": "&#9881;",
    "ch02-identifikation": "&#128269;",
    "ch03-imaging": "&#128190;",
    "ch04-hashing": "&#9919;",
    "ch05-mounting": "&#128194;",
    "ch06-hex": "&#128270;",
    "ch07-strings": "&#128270;",
    "ch08-dateisysteme": "&#128193;",
    "ch09-wipping": "&#128465;",
    "ch10-artefakte": "&#128270;",
    "ch11-casestudy": "&#9888;",
    "ch10-labs": "&#128187;",
    "ch11-ctf": "&#127919;",
    "ch12-image-formate": "&#128190;",
    "ch13-vergleich": "&#128270;",
    "ch14-protokollierung": "&#128195;",
    "ch15-write-blocker": "&#128269;",
    "ch16-sicheres-loeschen": "&#128465;",
    "ch17-best-practices": "&#9989;",
    "ch18-tools": "&#128187;",
    "ch19-datenrettung": "&#128269;",
    "ch20-memory-forensik": "&#9881;",
    "ch21-netzwerkforensik": "&#127760;",
    "ch22-zeitlinienanalyse": "&#128339;",
    "welcome": "&#8962;",
    "ch01-osi": "&#127760;",
    "ch02-geraete": "&#128187;",
    "ch03-ipv4": "&#128202;",
    "ch04-ipv6": "&#128202;",
    "ch05-mac-arp": "&#128269;",
    "ch06-tcp-udp": "&#128260;",
    "ch07-dns": "&#128225;",
    "ch08-dhcp": "&#128274;",
    "ch09-http": "&#127760;",
    "ch10-verschluesselung": "&#128274;",
    "ch11-icmp": "&#128172;",
    "ch12-linux-tools": "&#128187;",
    "ch13-routing": "&#128260;",
    "ch14-firewall": "&#128736;",
    "ch15-wireshark": "&#128202;",
    "ch16-casestudy": "&#9888;",
}

md_parser = MarkdownIt().enable("table")


def make_frontmatter(chapter_id, title, section, icon=None):
    if icon is None:
        icon = ICON_MAP.get(chapter_id, "&#128196;")
    fm = {
        "id": chapter_id,
        "title": title,
        "icon": icon,
        "section": section,
    }
    return "---\n" + yaml.dump(fm, allow_unicode=True, default_flow_style=False).strip() + "\n---\n\n"


def convert_forensik():
    src_dir = os.path.join(THEMEN_DIR, "forensik-content")
    chapters_file = os.path.join(src_dir, "chapters.json")
    chapters_src = os.path.join(src_dir, "chapters")
    out_dir = os.path.join(CONTENT_DIR, "linux-forensik", "chapters")

    with open(chapters_file, "r", encoding="utf-8") as f:
        data = json.load(f)

    os.makedirs(out_dir, exist_ok=True)

    for ch in data["chapters"]:
        src_file = os.path.join(chapters_src, ch["file"])
        if not os.path.isfile(src_file):
            print(f"  WARNING: {ch['file']} not found, skipping", file=sys.stderr)
            continue

        with open(src_file, "r", encoding="utf-8") as f:
            html_content = f.read().strip()

        frontmatter = make_frontmatter(ch["id"], ch["title"], ch["section"])
        out_file = os.path.join(out_dir, ch["file"])

        with open(out_file, "w", encoding="utf-8") as f:
            f.write(frontmatter + html_content + "\n")

        print(f"  Converted: {ch['id']}")

    for extra_id in ["welcome", "ch10-labs", "ch11-ctf"]:
        src_path = os.path.join(CONTENT_DIR, "linux-forensik", "chapters", extra_id)
        if os.path.isdir(src_path):
            md_files = sorted([f for f in os.listdir(src_path) if f.endswith(".md")])
            parts = []
            fm_data = None
            for i, mf in enumerate(md_files):
                with open(os.path.join(src_path, mf), "r", encoding="utf-8") as f:
                    raw = f.read()
                if i == 0:
                    fm_data, body = parse_frontmatter(raw)
                    parts.append(body.strip())
                else:
                    parts.append(raw.strip())

            import shutil
            shutil.rmtree(src_path)

            if fm_data:
                frontmatter = make_frontmatter(
                    fm_data.get("id", extra_id),
                    fm_data.get("title", extra_id),
                    fm_data.get("section", "Extras"),
                    fm_data.get("icon"),
                )
                html_content = "\n".join(p for p in parts if p)
                out_file = os.path.join(out_dir, extra_id + ".md")
                with open(out_file, "w", encoding="utf-8") as f:
                    f.write(frontmatter + html_content + "\n")
                print(f"  Merged dir -> file: {extra_id}")


def parse_frontmatter(text):
    if not text.startswith("---"):
        return None, text
    parts = text.split("---", 2)
    if len(parts) < 3:
        return None, text
    try:
        fm = yaml.safe_load(parts[1])
    except yaml.YAMLError:
        return None, text
    body = parts[2]
    if body.startswith("\n"):
        body = body[1:]
    return fm, body.strip("\n")


def convert_network():
    src_dir = os.path.join(THEMEN_DIR, "netzwerk-content")
    chapters_file = os.path.join(src_dir, "chapters.json")
    chapters_src = os.path.join(src_dir, "chapters")
    out_dir = os.path.join(CONTENT_DIR, "netzwerk-forensik", "chapters")

    with open(chapters_file, "r", encoding="utf-8") as f:
        data = json.load(f)

    os.makedirs(out_dir, exist_ok=True)

    for ch in data["chapters"]:
        src_file = os.path.join(chapters_src, ch["file"])
        if not os.path.isfile(src_file):
            print(f"  WARNING: {ch['file']} not found, skipping", file=sys.stderr)
            continue

        with open(src_file, "r", encoding="utf-8") as f:
            raw = f.read()

        html_content = convert_network_chapter(raw, ch["id"])
        frontmatter = make_frontmatter(ch["id"], ch["title"], ch["section"])
        out_file = os.path.join(out_dir, ch["file"])

        with open(out_file, "w", encoding="utf-8") as f:
            f.write(frontmatter + html_content + "\n")

        print(f"  Converted: {ch['id']}")

    welcome_html = (
        '<div class="welcome-hero">'
        '<p class="welcome-hero-eyebrow">ABB IT-FAHNDUNG</p>'
        '<h1>Netzwerk Forensik</h1>'
        '<p class="welcome-hero-desc">Grundlagen der Netzwerkanalyse f&uuml;r IT-Fahnder — von OSI bis Wireshark.</p>'
        '<button class="welcome-cta" onclick="App.navigateTo(\'ch01-osi\')">Training starten &rarr;</button>'
        '</div>'
        '<div class="welcome-modules">'
        '<div class="welcome-module" onclick="App.navigateTo(\'ch01-osi\')">Modul 01: Netzwerkgrundlagen</div>'
        '<div class="welcome-module" onclick="App.navigateTo(\'ch06-tcp-udp\')">Modul 02: Protokolle</div>'
        '<div class="welcome-module" onclick="App.navigateTo(\'ch15-wireshark\')">Modul 03: Analyse & Fallstudie</div>'
        '</div>'
    )
    frontmatter = make_frontmatter("welcome", "Willkommen", "Start", "&#127760;")
    with open(os.path.join(out_dir, "welcome.md"), "w", encoding="utf-8") as f:
        f.write(frontmatter + welcome_html + "\n")
    print(f"  Created: welcome")


def convert_network_chapter(raw, chapter_id):
    lines = raw.split("\n")
    html_lines = []
    i = 0
    in_html_block = False
    html_depth = 0

    while i < len(lines):
        line = lines[i]

        if is_html_line(line):
            html_lines.append(line)
            i += 1
            continue

        if line.strip().startswith(":::"):
            handled, new_i = handle_directive(lines, i, html_lines)
            if handled:
                i = new_i
                continue

        md_text = convert_markdown_line(line)
        html_lines.append(md_text)
        i += 1

    return "\n".join(html_lines)


def is_html_line(line):
    s = line.strip()
    if not s:
        return True
    if s.startswith("<") and not s.startswith("< ") and not s.startswith("</ "):
        return True
    if re.match(r'^<(h[1-6]|div|p|span|button|table|pre|code|ol|ul|li|a|strong|em|br|hr|img)\b', s):
        return True
    if s.startswith("</"):
        return True
    return False


def handle_directive(lines, start_idx, output):
    opener = lines[start_idx].strip()
    m = re.match(r'^:::(\w+)(?:\s+(\w+))?\s*(.*)', opener)
    if not m:
        return False, start_idx

    dir_type = m.group(1)
    lang = m.group(2)
    extra = m.group(3)

    content_lines = []
    j = start_idx + 1
    while j < len(lines):
        if lines[j].strip() == ":::":
            break
        content_lines.append(lines[j])
        j += 1

    if j >= len(lines):
        return False, start_idx

    end_idx = j
    content = "\n".join(content_lines)

    if dir_type == "code":
        output.append(make_code_block(content, lang or ""))
        return True, end_idx + 1

    if dir_type == "callout":
        callout_type = lang or "info"
        title = extra.strip() or callout_type.capitalize()
        icon_map = {
            "warning": "&#9888;",
            "danger": "&#9888;",
            "info": "&#9432;",
            "tip": "&#128161;",
            "success": "&#9989;",
        }
        icon = icon_map.get(callout_type, "&#9432;")
        output.append(
            f'<div class="callout callout-{callout_type}">'
            f'<div class="callout-header">{icon} {escape_html_basic(title)}</div>'
            f'<p>{convert_inline_md(content)}</p>'
            f'</div>'
        )
        return True, end_idx + 1

    return False, start_idx


def make_code_block(content, lang):
    lang_label = lang.upper() if lang else ""
    content_escaped = escape_html_basic(content)
    header = ""
    if lang_label:
        header = f'<span class="lang">{lang_label}</span>'
    header += '<button class="copy-btn">Kopieren</button>'
    return (
        f'<div class="code-block">'
        f'<div class="code-header">{header}</div>'
        f'<pre><code>{content_escaped}</code></pre>'
        f'</div>'
    )


def convert_markdown_line(line):
    s = line
    if not s.strip():
        return s

    s = convert_headings(s)
    s = convert_inline_md(s)

    return s


def convert_headings(line):
    m = re.match(r'^(#{1,6})\s+(.*)', line)
    if not m:
        return line

    level = len(m.group(1))
    text = m.group(2)

    if level == 2:
        num_match = re.match(r'^(\d+\.\d+)\s+(.*)', text)
        if num_match:
            number = num_match.group(1)
            title = num_match.group(2)
            return f'<h2 class="section-title"><span class="number">{number}</span> {title}</h2>'
        return f'<h2 class="section-title">{text}</h2>'

    return f'<h{level}>{text}</h{level}>'


def convert_inline_md(text):
    text = re.sub(r'\*\*(.+?)\*\*', r'<strong>\1</strong>', text)
    text = re.sub(r'\*(.+?)\*', r'<em>\1</em>', text)
    text = re.sub(r'`([^`]+)`', r'<span class="inline-code">\1</span>', text)

    if text.startswith("> "):
        quote_content = text[2:]
        return f'<blockquote><p>{quote_content}</p></blockquote>'

    return text


def escape_html_basic(text):
    text = text.replace("&", "&amp;")
    text = text.replace("<", "&lt;")
    text = text.replace(">", "&gt;")
    return text


def create_netzwerk_meta():
    meta = {
        "id": "netzwerk-forensik",
        "title": "Netzwerk Forensik Lab",
        "icon": "&#127760;",
        "description": "Netzwerkgrundlagen f\u00fcr IT-Fahnder — von OSI bis Wireshark",
        "accent": "#3b82f6",
        "canonical_order": [
            "welcome",
            "ch01-osi",
            "ch02-geraete",
            "ch03-ipv4",
            "ch04-ipv6",
            "ch05-mac-arp",
            "ch06-tcp-udp",
            "ch07-dns",
            "ch08-dhcp",
            "ch09-http",
            "ch10-verschluesselung",
            "ch11-icmp",
            "ch12-linux-tools",
            "ch13-routing",
            "ch14-firewall",
            "ch15-wireshark",
            "ch16-casestudy",
        ],
    }
    out_dir = os.path.join(CONTENT_DIR, "netzwerk-forensik")
    os.makedirs(out_dir, exist_ok=True)
    with open(os.path.join(out_dir, "meta.yaml"), "w", encoding="utf-8") as f:
        f.write(yaml.dump(meta, allow_unicode=True, default_flow_style=False))


def update_forensik_meta():
    meta_path = os.path.join(CONTENT_DIR, "linux-forensik", "meta.yaml")
    with open(meta_path, "r", encoding="utf-8") as f:
        meta = yaml.safe_load(f)

    new_order = [
        "welcome",
        "ch01-grundlagen", "ch02-identifikation", "ch03-imaging", "ch04-hashing",
        "ch05-mounting", "ch06-hex", "ch07-strings", "ch08-dateisysteme",
        "ch09-wipping", "ch10-artefakte", "ch11-casestudy",
        "ch10-labs", "ch11-ctf",
        "ch12-image-formate", "ch13-vergleich", "ch14-protokollierung",
        "ch15-write-blocker", "ch16-sicheres-loeschen", "ch17-best-practices",
        "ch18-tools", "ch19-datenrettung", "ch20-memory-forensik",
        "ch21-netzwerkforensik", "ch22-zeitlinienanalyse",
    ]
    meta["canonical_order"] = new_order

    with open(meta_path, "w", encoding="utf-8") as f:
        f.write(yaml.dump(meta, allow_unicode=True, default_flow_style=False))


def copy_reference_files():
    ref_dir = os.path.join("forensik-lab", "assets", "js")

    forensik_src = os.path.join(THEMEN_DIR, "forensik-content", "reference.js")
    if os.path.isfile(forensik_src):
        import shutil
        shutil.copy2(forensik_src, os.path.join(ref_dir, "reference-forensik.js"))
        print("  Copied: reference-forensik.js")

    netzwerk_src = os.path.join(THEMEN_DIR, "netzwerk-content", "reference.js")
    if os.path.isfile(netzwerk_src):
        import shutil
        shutil.copy2(netzwerk_src, os.path.join(ref_dir, "reference-netzwerk.js"))
        print("  Copied: reference-netzwerk.js")


def main():
    print("=== Converting Themen content ===")
    print()

    print("[1/4] Converting forensik-content...")
    convert_forensik()

    print()
    print("[2/4] Converting netzwerk-content...")
    convert_network()
    create_netzwerk_meta()

    print()
    print("[3/4] Updating meta.yaml files...")
    update_forensik_meta()

    print()
    print("[4/4] Copying reference files...")
    copy_reference_files()

    print()
    print("Done!")


if __name__ == "__main__":
    main()
