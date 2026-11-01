import json

with open(r'E:\OneDrive\Desktop\JAIXO STUDIO\src\data\projectsData.json', encoding='utf-8') as f:
    items = json.load(f)

lines = ["import type { ProjectItem } from '../types';\n\nexport const defaultProjectsData: ProjectItem[] = ["]

for item in items:
    page = item['page']
    lines.append('  {')
    lines.append(f"    id: 'proj-{page:02d}',")
    lines.append(f"    title: {json.dumps(item['title'])},")
    lines.append(f"    category: {json.dumps(item['category'])},")
    lines.append(f"    client: {json.dumps(item['client'])},")
    lines.append(f"    year: {json.dumps(item['year'])},")
    lines.append(f"    projectDate: {json.dumps(item['year'])},")
    lines.append(f"    designType: {json.dumps(item['designType'])},")
    lines.append(f"    featured: {'true' if item['featured'] else 'false'},")
    lines.append(f"    previewImage: '/portfolio/{item['filename']}',")
    lines.append(f"    fullImage: '/portfolio/{item['filename']}',")
    lines.append(f"    description: {json.dumps(item['description'])},")
    deliv_str = json.dumps(item['deliverables'])
    lines.append(f"    deliverables: {deliv_str},")
    tools_str = json.dumps(item['toolsUsed'])
    lines.append(f"    toolsUsed: {tools_str},")
    lines.append("    isReplaceablePlaceholder: false,")
    lines.append('  },')

lines.append('];\n')

content = '\n'.join(lines)
with open(r'E:\OneDrive\Desktop\JAIXO STUDIO\src\data\projectsData.ts', 'w', encoding='utf-8') as out:
    out.write(content)

print(f"Successfully wrote {len(items)} real projects to projectsData.ts!")
