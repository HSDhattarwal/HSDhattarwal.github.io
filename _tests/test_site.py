"""Static regression checks. Run: python3 -m unittest discover -s _tests -v"""
from pathlib import Path
from html.parser import HTMLParser
import unittest

ROOT = Path(__file__).resolve().parents[1]

class Page(HTMLParser):
    def __init__(self, path):
        super().__init__()
        self.links = []
        self.ids = []
        self.words = []
        self.comments = []
        self.feed(path.read_text())
    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if 'id' in attrs:
            self.ids.append(attrs['id'])
        for key in ('href', 'src'):
            if key in attrs:
                self.links.append(attrs[key])
    def handle_data(self, data):
        self.words.extend(data.split())
    def handle_comment(self, data):
        self.comments.append(data)

class SiteTests(unittest.TestCase):
    def test_home_presents_current_profile_and_selected_work(self):
        page = Page(ROOT / 'index.html')
        visible = ' '.join(page.words)
        self.assertIn('Cornell University', visible)
        self.assertIn('Shuwen Yue', visible)
        self.assertIn('Postdoctoral Associate', visible)
        self.assertIn('mailto:hd436@cornell.edu', page.links)
        self.assertIn('https://doi.org/10.1038/s41467-023-44274-z', page.links)
        self.assertIn('https://doi.org/10.1021/acs.jpcb.3c00390', page.links)
        self.assertNotIn('harender.dhattarwal@rutgers.edu', visible)
        self.assertLess(len(page.words), 430, 'Homepage should be skimmable')

    def test_research_is_concise_and_future_directions_are_only_a_comment(self):
        page = Page(ROOT / 'research.html')
        visible = ' '.join(page.words)
        self.assertLess(len(page.words), 450, 'Research should fit a short reading session')
        self.assertIn('catalysis', visible.lower())
        self.assertIn('battery interfaces', visible.lower())
        self.assertIn('long-range', page.ids)
        self.assertIn('paddle-wheels', page.ids)
        self.assertNotIn('future directions', visible.lower())
        self.assertTrue(any('FUTURE DIRECTIONS' in c for c in page.comments))

    def test_bibliography_preserves_every_record_and_citation(self):
        import json
        data = json.loads((ROOT / 'publications_data.json').read_text())
        page = Page(ROOT / 'publications.html')
        self.assertEqual(len(data['articles']), 21)
        self.assertEqual(len(data['chapters']), 2)
        self.assertEqual(len({a['doi'].lower() for a in data['articles']}), 21)
        for entry in data['articles'] + data['chapters']:
            self.assertIn('pub-' + str(entry['id']), page.ids)
        self.assertIn('assets/publications.bib', page.links)
        self.assertEqual((ROOT / 'assets/publications.bib').read_text().count('@article{'), 21)
        self.assertEqual((ROOT / 'assets/publications.bib').read_text().count('@incollection{'), 2)
        for entry in data['articles'] + data['chapters']:
            self.assertIn('https://doi.org/' + entry['doi'], page.links)
            self.assertIn(entry['doi'], (ROOT / 'assets/publications.bib').read_text())

    def test_all_public_internal_links_and_fragments_resolve(self):
        from urllib.parse import urlsplit, unquote
        pages = [f for f in ROOT.rglob('*.html') if not any(p.startswith('_') for p in f.relative_to(ROOT).parts)]
        for file in pages:
            page = Page(file)
            self.assertEqual(len(page.ids), len(set(page.ids)), f'Duplicate HTML IDs: {file}')
            for link in page.links:
                target = urlsplit(link)
                if target.scheme or target.netloc:
                    continue
                resolved = (ROOT / target.path.lstrip('/')) if target.path.startswith('/') else (file.parent / unquote(target.path) if target.path else file)
                if resolved.is_dir():
                    resolved = resolved / 'index.html'
                self.assertTrue(resolved.is_file(), f'{file.name}: broken link {link}')
                if target.fragment and resolved.suffix == '.html':
                    self.assertIn(unquote(target.fragment), Page(resolved).ids, f'{file.name}: broken fragment {link}')

    def test_retired_material_is_not_published(self):
        for name in ['about.html', 'group.html', 'CV_Dhattarwal.pdf', 'assets/CV_Dhattarwal.pdf']:
            with self.subTest(name=name):
                self.assertFalse((ROOT / name).exists(), f'{name} is still publicly reachable')
        for file in ROOT.rglob('*.html'):
            if any(p.startswith('_') for p in file.relative_to(ROOT).parts):
                continue
            for link in Page(file).links:
                self.assertNotIn('group.html', link)
                self.assertNotIn('about.html', link)
                self.assertNotIn('CV_Dhattarwal.pdf', link)

if __name__ == '__main__':
    unittest.main()
