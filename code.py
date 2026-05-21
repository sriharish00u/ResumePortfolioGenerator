import os

OUTPUT_FILE = "code.md"

# Ignore these folders/files
IGNORE_DIRS = {
    "node_modules",
    ".git",
    "dist",
    "build",
    "__pycache__",
    ".next",
    ".turbo",
    ".idea",
    ".vscode"
}

IGNORE_FILES = {
    OUTPUT_FILE,
    "package-lock.json"
}

# Allowed file extensions
ALLOWED_EXTENSIONS = {
    ".ts",
    ".tsx",
    ".js",
    ".jsx",
    ".json",
    ".css",
    ".html",
    ".md",
    ".py",
    ".sql",
    ".env",
    ".yml",
    ".yaml",
    ".config",
}

def is_allowed_file(filename):
    _, ext = os.path.splitext(filename)

    if ext in ALLOWED_EXTENSIONS:
        return True

    # Include important files without extension
    important_files = {
        "Dockerfile",
        "README",
        "README.md",
        ".gitignore",
    }

    return filename in important_files


def should_ignore(path_parts):
    return any(part in IGNORE_DIRS for part in path_parts)


def collect_files(root_dir="."):
    collected = []

    for root, dirs, files in os.walk(root_dir):
        # Remove ignored dirs from traversal
        dirs[:] = [d for d in dirs if d not in IGNORE_DIRS]

        for file in files:
            if file in IGNORE_FILES:
                continue

            if not is_allowed_file(file):
                continue

            full_path = os.path.join(root, file)

            path_parts = full_path.split(os.sep)

            if should_ignore(path_parts):
                continue

            collected.append(full_path)

    return sorted(collected)


def read_file_content(filepath):
    try:
        with open(filepath, "r", encoding="utf-8") as f:
            return f.read()
    except UnicodeDecodeError:
        return "[Could not decode file]"
    except Exception as e:
        return f"[Error reading file: {e}]"


def generate_markdown(files):
    lines = []

    lines.append("# Codebase Export\n")

    for filepath in files:
        relative_path = os.path.relpath(filepath)

        ext = os.path.splitext(filepath)[1].replace(".", "")

        if not ext:
            ext = "text"

        lines.append(f"\n---\n")
        lines.append(f"## File: `{relative_path}`\n")

        lines.append(f"```{ext}")

        content = read_file_content(filepath)

        lines.append(content)

        lines.append("```\n")

    return "\n".join(lines)


def main():
    print("Scanning codebase...")

    files = collect_files()

    print(f"Found {len(files)} files")

    markdown_content = generate_markdown(files)

    with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
        f.write(markdown_content)

    print(f"\nDone ✅")
    print(f"Generated: {OUTPUT_FILE}")


if __name__ == "__main__":
    main()
