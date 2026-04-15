#!/usr/bin/env python3
"""
Build script: reads content/*/meta.yaml + content/*/chapters/*.md
-> generates forensik-lab/assets/js/content-data.js

Multi-lab architecture:
  - Each lab is a directory under content/ with a meta.yaml
  - Chapters live under content/<lab>/chapters/
  - Labs are auto-discovered via directory scanning
  - Chapter ordering defined per-lab in meta.yaml canonical_order

Usage:
    python3 build_content.py
"""

import os
import re
import sys
import yaml

CONTENT_DIR = "content"
OUTPUT_FILE = os.path.join("forensik-lab", "assets", "js", "content-data.js")

REQUIRED_FRONTMATTER = ["id", "title", "icon", "section"]

REQUIRED_META = ["id", "title", "icon", "description"]


def numeric_prefix(filename):
    m = re.match(r'^(\d+)', filename)
    if not m:
        raise ValueError(
            f"Filename '{filename}' does not start with a numeric prefix. "
            f"All content files must follow the pattern: NN-name.md"
        )
    return int(m.group(1))


def validate_frontmatter(fm, dirname):
    if not fm:
        raise ValueError(f"[{dirname}] Frontmatter is empty or missing")
    for field in REQUIRED_FRONTMATTER:
        if field not in fm:
            raise ValueError(f"[{dirname}] Missing required frontmatter field: '{field}'")
        if not fm[field] or (isinstance(fm[field], str) and not fm[field].strip()):
            raise ValueError(f"[{dirname}] Frontmatter field '{field}' is empty")


def validate_meta(meta, lab_dir):
    if not meta:
        raise ValueError(f"[{lab_dir}] meta.yaml is empty or missing")
    for field in REQUIRED_META:
        if field not in meta:
            raise ValueError(f"[{lab_dir}] meta.yaml missing required field: '{field}'")
        if not meta[field] or (isinstance(meta[field], str) and not meta[field].strip()):
            raise ValueError(f"[{lab_dir}] meta.yaml field '{field}' is empty")


def parse_frontmatter(text):
    if not text.startswith("---"):
        return None, text
    parts = text.split("---", 2)
    if len(parts) < 3:
        return None, text
    try:
        fm = yaml.safe_load(parts[1])
    except yaml.YAMLError as e:
        raise ValueError(f"YAML parse error: {e}")
    body = parts[2]
    if body.startswith("\n"):
        body = body[1:]
    return fm, body.strip("\n")


def js_template_escape(s):
    s = s.replace("\\", "\\\\")
    s = s.replace("`", "\\`")
    s = s.replace("${", "\\${")
    return s


def discover_labs():
    if not os.path.isdir(CONTENT_DIR):
        print(f"Error: Content directory '{CONTENT_DIR}' not found.", file=sys.stderr)
        sys.exit(1)

    labs = []
    lab_dirs = sorted([
        d for d in os.listdir(CONTENT_DIR)
        if os.path.isdir(os.path.join(CONTENT_DIR, d))
        and os.path.isfile(os.path.join(CONTENT_DIR, d, "meta.yaml"))
    ])

    if not lab_dirs:
        print(f"Error: No labs found in {CONTENT_DIR}/. "
              f"Each lab needs a meta.yaml file.", file=sys.stderr)
        sys.exit(1)

    for lab_dir in lab_dirs:
        lab_path = os.path.join(CONTENT_DIR, lab_dir)
        meta_path = os.path.join(lab_path, "meta.yaml")

        with open(meta_path, "r", encoding="utf-8") as f:
            try:
                meta = yaml.safe_load(f)
            except yaml.YAMLError as e:
                raise ValueError(f"[{lab_dir}] meta.yaml parse error: {e}")

        validate_meta(meta, lab_dir)

        canonical_order = meta.get("canonical_order", [])
        accent = meta.get("accent", "#00d4aa")

        chapters_path = os.path.join(lab_path, "chapters")
        if not os.path.isdir(chapters_path):
            print(f"  Warning: [{lab_dir}] No chapters/ directory found, skipping lab", file=sys.stderr)
            continue

        chapters = discover_chapters(chapters_path, canonical_order, lab_dir)

        labs.append({
            "meta": meta,
            "accent": accent,
            "chapters": chapters,
        })

    return labs


def discover_chapters(chapters_dir, canonical_order, lab_dir):
    entries = sorted(os.listdir(chapters_dir))
    chapters = []

    for entry in entries:
        entry_path = os.path.join(chapters_dir, entry)

        if os.path.isfile(entry_path) and entry.endswith(".md"):
            with open(entry_path, "r", encoding="utf-8") as f:
                raw = f.read()

            fm, body = parse_frontmatter(raw)
            if fm is None:
                print(f"  Warning: [{lab_dir}] {entry} has no frontmatter, skipping", file=sys.stderr)
                continue
            validate_frontmatter(fm, f"{lab_dir}/{entry}")
            chapters.append({"frontmatter": fm, "html": body.strip()})

        elif os.path.isdir(entry_path):
            md_files = sorted([
                f for f in os.listdir(entry_path) if f.endswith(".md")
            ], key=lambda f: numeric_prefix(f))

            if not md_files:
                print(f"  Warning: [{lab_dir}] {entry}/ has no .md files, skipping", file=sys.stderr)
                continue

            frontmatter = None
            html_parts = []

            for i, filename in enumerate(md_files):
                filepath = os.path.join(entry_path, filename)
                with open(filepath, "r", encoding="utf-8") as f:
                    raw = f.read()

                if i == 0:
                    fm, body = parse_frontmatter(raw)
                    if fm is None:
                        raise ValueError(
                            f"[{lab_dir}/{entry}] First .md file '{filename}' must contain YAML frontmatter"
                        )
                    validate_frontmatter(fm, f"{lab_dir}/{entry}")
                    frontmatter = fm
                    raw = body

                html_parts.append(raw.strip())

            chapter_html = "".join(html_parts)
            chapters.append({"frontmatter": frontmatter, "html": chapter_html})

    chapter_map = {c["frontmatter"]["id"]: c for c in chapters}

    ordered = []
    for cid in canonical_order:
        if cid in chapter_map:
            ordered.append(chapter_map.pop(cid))
    for cid, c in chapter_map.items():
        ordered.append(c)

    return ordered


def write_output(labs):
    os.makedirs(os.path.dirname(OUTPUT_FILE), exist_ok=True)

    lines = []
    lines.append("// Auto-generated by build_content.py - DO NOT EDIT MANUALLY")
    lines.append("// Source: content/*/meta.yaml + content/*/chapters/*.md")
    lines.append("")

    registry_entries = []
    for lab in labs:
        meta = lab["meta"]
        accent = lab["accent"]
        registry_entries.append({
            "id": meta["id"],
            "title": meta["title"],
            "icon": meta["icon"],
            "description": meta["description"],
            "accent": accent,
        })

    lines.append("var LabRegistry = [")
    for entry in registry_entries:
        desc_escaped = entry["description"].replace('"', '\\"')
        lines.append(f'  {{ id: "{entry["id"]}", title: "{entry["title"]}", '
                     f'icon: "{entry["icon"]}", description: "{desc_escaped}", '
                     f'accent: "{entry["accent"]}" }},')
    lines.append("];")
    lines.append("")

    lines.append("var ContentData = {};")
    lines.append("")

    for lab in labs:
        lab_id = lab["meta"]["id"]
        chapters = lab["chapters"]

        lines.append(f'ContentData["{lab_id}"] = {{}};')
        lines.append("")

        for chapter in chapters:
            fm = chapter["frontmatter"]
            chapter_id = fm["id"]
            html = chapter["html"]
            escaped = js_template_escape(html)

            lines.append(f'ContentData["{lab_id}"]["{chapter_id}"] = `{escaped}`;')

    lines.append("")

    lines.append("var ContentNav = {};")
    lines.append("")

    for lab in labs:
        lab_id = lab["meta"]["id"]
        chapters = lab["chapters"]

        nav_items = []
        for chapter in chapters:
            fm = chapter["frontmatter"]
            nav_items.append({
                "id": fm["id"],
                "label": fm["title"],
                "icon": fm["icon"],
                "section": fm["section"],
            })

        lines.append(f'ContentNav["{lab_id}"] = [')
        for item in nav_items:
            lines.append(f'  {{ id: "{item["id"]}", label: "{item["label"]}", '
                         f'icon: "{item["icon"]}", section: "{item["section"]}" }},')
        lines.append("];")
        lines.append("")

    with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
        f.write("\n".join(lines))

    total_chapters = sum(len(lab["chapters"]) for lab in labs)
    return len(labs), total_chapters


def main():
    print("Building content from", CONTENT_DIR, "...")
    try:
        labs = discover_labs()
    except ValueError as e:
        print(f"Error: {e}", file=sys.stderr)
        sys.exit(1)

    for lab in labs:
        n_ch = len(lab["chapters"])
        print(f"  Lab: {lab['meta']['id']} ({n_ch} chapters)")

    n_labs, n_chapters = write_output(labs)
    print(f"  Generated {OUTPUT_FILE}")
    print(f"    {n_labs} labs, {n_chapters} total chapters")
    print("Done!")


if __name__ == "__main__":
    main()
