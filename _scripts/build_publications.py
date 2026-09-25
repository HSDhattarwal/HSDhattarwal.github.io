"""Regenerate the static bibliography and BibTeX. Python standard library only.

Run from any directory: python3 _scripts/build_publications.py
Edit publications_data.json, not the generated publications.html.
"""
from pathlib import Path
import html
import json
import re

ROOT = Path(__file__).resolve().parents[1]
SELECTED = {'10.1038/s41467-023-44274-z', '10.1021/acs.jpcb.3c00390'}

def escape(value):
    return html.escape(str(value), quote=True)

def authors_html(authors):
    return escape(authors).replace('Harender S. Dhattarwal', '<strong>Harender S. Dhattarwal</strong>')

def bibtex(entry, chapter=False):
    authors = entry['authors'].replace(', and ', ', ').replace(' and ', ', ')
    fields = {'author': ' and '.join(authors.split(', ')), 'title': '{' + entry['title'] + '}', 'year': entry['year']}
    if chapter:
        fields.update(booktitle=entry['book'], publisher=entry['publisher'])
        if entry.get('doi'):
            fields['doi'] = entry['doi']
        if entry.get('pages'):
            fields['pages'] = entry['pages'].replace('–', '--')
    else:
        fields.update(journal=entry['journal'], volume=entry['vol'], pages=entry['pages'].replace('–', '--'), doi=entry['doi'])
        if entry.get('issue'):
            fields['number'] = entry['issue']
    kind = 'incollection' if chapter else 'article'
    key = 'Dhattarwal' + str(entry['year']) + '_' + str(entry['id'])
    return '@' + kind + '{' + key + ',\n' + ',\n'.join('  ' + k + ' = {' + str(v) + '}' for k, v in fields.items()) + '\n}'

def entry_html(entry, chapter=False):
    title = escape(entry['title'])
    if entry.get('doi'):
        title = '<a href="https://doi.org/' + escape(entry['doi']) + '">' + title + '<span class="visually-hidden"> (publisher page)</span></a>'
    if chapter:
        citation = '<em>' + escape(entry['book']) + '</em>. ' + escape(entry['publisher']) + ', ' + str(entry['year']) + (', pp. ' + escape(entry['pages']) if entry.get('pages') else '') + '.'
    else:
        issue = ' (' + escape(entry['issue']) + ')' if entry.get('issue') else ''
        citation = '<em>' + escape(entry['journal']) + '</em> <strong>' + escape(entry['vol']) + '</strong>' + issue + ', ' + escape(entry['pages']) + ' (' + str(entry['year']) + ').'
    meta = []
    if entry.get('doi'):
        meta.append('<span class="pub-doi">doi:' + escape(entry['doi']) + '</span>')
    if entry.get('doi') in SELECTED:
        meta.append('<span class="pub-note">Key paper</span>')
    return '\n'.join([
        '<li class="pub-entry" id="pub-' + escape(entry['id']) + '">',
        '<h3>' + title + '</h3>',
        '<p class="pub-authors">' + authors_html(entry['authors']) + '</p>',
        '<p class="pub-citation">' + citation + '</p>',
        '<p class="pub-meta">' + ''.join(meta) + '</p>' if meta else '',
        '<details><summary>BibTeX</summary><pre><code>' + escape(bibtex(entry, chapter)) + '</code></pre></details>',
        '</li>'
    ])

def build():
    data = json.loads((ROOT / 'publications_data.json').read_text())
    articles = sorted(data['articles'], key=lambda a: (a['year'], a['id']), reverse=True)
    chapters = sorted(data['chapters'], key=lambda a: (a['year'], a['id']), reverse=True)
    ids = [str(a['id']) for a in articles + chapters]
    assert len(ids) == len(set(ids)), 'Duplicate publication ID'
    dois = [a['doi'] for a in articles + chapters if a.get('doi')]
    assert all(re.fullmatch(r'10\.\d{4,9}/[^\s]+', doi) for doi in dois), 'Invalid DOI token'
    assert len(dois) == len(set(d.lower() for d in dois)), 'Duplicate DOI'
    years = sorted({a['year'] for a in articles}, reverse=True)
    blocks = []
    for year in years:
        entries = '\n'.join(entry_html(a) for a in articles if a['year'] == year)
        blocks.append(f'<section class="year-block" id="year-{year}" aria-labelledby="heading-{year}"><h2 id="heading-{year}">{year}</h2><ol class="pub-list">{entries}</ol></section>')
    if chapters:
        blocks.append('<section class="year-block" id="chapters" aria-labelledby="heading-chapters"><h2 id="heading-chapters">Book chapters</h2><ol class="pub-list">' + '\n'.join(entry_html(a, True) for a in chapters) + '</ol></section>')
    links = ' '.join(f'<a href="#year-{y}">{y}</a>' for y in years)
    if chapters:
        links += ' <a href="#chapters">Book chapters</a>'
    source = (ROOT / '_templates/publications.html').read_text()
    rendered = source.replace('{{COUNTS}}', f'{len(articles) + len(chapters)} publications: {len(articles)} articles · {len(chapters)} book chapters').replace('{{YEAR_LINKS}}', links).replace('{{BIBLIOGRAPHY}}', '\n'.join(blocks))
    assert not re.search(r'\{\{[A-Z_]+\}\}', rendered), 'Unresolved template placeholder'
    (ROOT / 'publications.html').write_text(rendered)
    (ROOT / 'assets/publications.bib').write_text('\n\n'.join([bibtex(a) for a in articles] + [bibtex(a, True) for a in chapters]) + '\n')
    print(f'Built {len(articles)} articles + {len(chapters)} chapters; {len(set(dois))} unique DOIs.')

if __name__ == '__main__':
    build()
