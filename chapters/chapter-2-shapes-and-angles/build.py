"""Package the dependency-free static game and a fully embedded HTML edition."""
from pathlib import Path
import base64
import html
import re
import zipfile

root = Path(__file__).resolve().parent
page = (root / 'index.html').read_text()
css = (root / 'styles.css').read_text()

def embedded_font(match):
    path = root / match.group(1)
    return 'url(data:font/ttf;base64,' + base64.b64encode(path.read_bytes()).decode() + ')'

css = re.sub(r'url\((assets/[^)]+\.ttf)\)', embedded_font, css)
page = page.replace('<link rel="stylesheet" href="styles.css">', '<style>\n' + css + '\n</style>')
for name in ('content.js', 'learning.js', 'games.js', 'doodles.js', 'app.js'):
    # Keep execution after the document exists, as with the multi-file defer scripts.
    page = page.replace(f'  <script defer src="{name}"></script>\n', '')
scripts = '\n'.join((root / name).read_text() for name in ('content.js', 'learning.js', 'games.js', 'doodles.js', 'app.js'))
licenses = '\n\n'.join(p.read_text() for p in sorted((root / 'assets').glob('LICENSE-*.txt')))
page = page.replace('</body>', '<template id="font-licenses"><pre>' + html.escape(licenses) + '</pre></template>\n<script>\n' + scripts + '\n</script>\n</body>')
standalone = root / 'shape-safari.html'
standalone.write_text(page)

public_files = ['index.html', 'styles.css', 'content.js', 'learning.js', 'games.js', 'doodles.js', 'app.js', 'README.md', 'COVERAGE.md', 'QA_REPORT.md', 'build.py']
with zipfile.ZipFile(root / 'shape-safari-project.zip', 'w', zipfile.ZIP_DEFLATED) as archive:
    for name in public_files:
        if (root / name).exists():
            archive.write(root / name, 'shape-safari/' + name)
    for path in sorted((root / 'assets').iterdir()):
        archive.write(path, 'shape-safari/assets/' + path.name)
    for name in ('verify-models.cjs', 'doodle-models.cjs', 'browser-check.cjs', 'learning-browser.cjs', 'article-style-check.cjs', 'offline-check.cjs'):
        archive.write(root / 'qa' / name, 'shape-safari/qa/' + name)
print(f'Created {standalone.name} ({standalone.stat().st_size:,} bytes)')
print('Created shape-safari-project.zip')
