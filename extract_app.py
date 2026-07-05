# extract_app.py
with open('dist/assets/index-B_h4Xztu.js', 'r', encoding='utf-8') as f:
    js_content = f.read()

target = "const d=[{id:\"course-basic\""
idx = js_content.find(target)
if idx != -1:
    print("Found 'const d' at:", idx)
    # Print the preceding 1000 characters
    start = max(0, idx - 1000)
    print("--- PRECEDE ---")
    print(js_content[start:idx])
    print("--- END ---")
else:
    print("Could not find const d in JS.")
