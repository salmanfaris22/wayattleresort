"""Usage: pnpm build && python3 -m pip install openpyxl && python3 scripts/build-seo-files.py
Build the seo/ keyword files for resortinwayanad.in from the built site + the old keyword list.
Formats copied from rootmedia.in-website/seo (CSV) and 360-landingpage/seo (xlsx workbook).
Run from the repo root after `pnpm build`."""
import csv, json, os, re, html, glob, datetime
from collections import Counter, defaultdict
from openpyxl import Workbook
from openpyxl.styles import Font, PatternFill, Alignment

SITE = 'https://www.resortinwayanad.in'
TODAY = datetime.date(2026, 11, 3).isoformat()
NOT_MEASURED = 'NOT MEASURED - fill from Search Console / Keyword Planner / Ahrefs'

# ---------- pages from dist ----------
def page_info(path):
    h = open(path, encoding='utf-8').read()
    url = '/' + os.path.relpath(path, 'dist').replace('index.html', '')
    url = url.replace('//', '/')
    g = lambda pat: html.unescape(re.search(pat, h, re.S).group(1)) if re.search(pat, h, re.S) else ''
    title = g(r'<title>(.*?)</title>')
    desc = g(r'<meta name="description" content="(.*?)"')
    robots = g(r'<meta name="robots" content="(.*?)"')
    kw = g(r'<meta name="keywords" content="(.*?)"')
    h1 = re.sub(r'<[^>]+>', '', g(r'<h1[^>]*>(.*?)</h1>')).strip()
    body = re.sub(r'<script.*?</script>|<style.*?</style>', ' ', h, flags=re.S)
    words = len(re.sub(r'<[^>]+>', ' ', body).split())
    types, faqs = set(), []
    for block in re.findall(r'<script type="application/ld\+json">(.*?)</script>', h, re.S):
        data = json.loads(block)
        for n in data.get('@graph', [data]):
            t = n.get('@type'); types.update(t if isinstance(t, list) else [t])
            if n.get('@type') == 'FAQPage':
                faqs += [q['name'] for q in n['mainEntity']]
    return dict(url=url, title=title, desc=desc, robots=robots, keywords=kw, h1=h1, words=words,
                types=sorted(t for t in types if t), faqs=faqs)

pages = [page_info(p) for p in sorted(glob.glob('dist/**/index.html', recursive=True))]
pages = [p for p in pages if p['url'] != '/404/' and 'noindex' not in p['robots']]
live = {p['url'] for p in pages}

# ---------- keywords ----------
DRAFT = {'/wayanad-resort-prices/': 'publish when real rate ranges per budget are supplied'}
REMAP_NOT_TARGETED = {
    # broker can now serve these honestly
    'resorts with infinity pool in wayanad': ('/resorts-in-wayanad-with-swimming-pool/', 'Pool page covers infinity / view pools'),
    'resorts in wayanad for 20 people': ('/group-stays-in-wayanad/', 'Group page: private villas and big resorts'),
    'group accommodation for 20 people wayanad': ('/group-stays-in-wayanad/', 'Group page'),
    'forest resorts in wayanad': ('GAP', 'Possible page once partner forest resorts are confirmed'),
    'riverside resorts in wayanad': ('GAP', 'Possible page once partner riverside resorts are confirmed'),
    'resorts with indoor pool wayanad': ('GAP', 'Only if a partner resort really has one'),
    'wayanad resort with waterfall view': ('GAP', 'Only if a partner resort really has one'),
    'wayanad private pool villa with waterfall': ('GAP', 'Only if a partner villa really has one'),
}
NEW = [
    # keyword, cluster, intent, target, priority, notes
    ('resort booking in wayanad', 'Main', 'Transactional', '/', 'P1', 'Core broker query'),
    ('wayanad resort booking whatsapp', 'Main', 'Transactional', '/contact/', 'P1', ''),
    ('resortinwayanad', 'Brand', 'Navigational', '/', 'P1', 'Domain name search'),
    ('luxury resorts in wayanad', 'Budget tier', 'Commercial', '/', 'P1', 'Home #luxury card; own page later'),
    ('budget resorts in wayanad', 'Budget tier', 'Commercial', '/', 'P1', 'Home #budget card; own page later'),
    ('cheap resorts in wayanad', 'Budget tier', 'Commercial', '/', 'P2', 'Home #budget card'),
    ('affordable resorts in wayanad', 'Budget tier', 'Commercial', '/', 'P2', 'Home #affordable card'),
    ('private villa in wayanad', 'Private', 'Commercial', '/private-resort-in-wayanad/', 'P1', ''),
    ('tree house in wayanad', 'Room type', 'Commercial', '/rooms/tree-house/', 'P1', ''),
    ('couple friendly resorts in wayanad', 'Couples', 'Commercial', '/rooms/couple-stay/', 'P1', ''),
    ('honeymoon resort in wayanad', 'Couples', 'Commercial', '/resorts-in-wayanad-for-couples/', 'P1', ''),
    ('plantation stay in wayanad', 'Room type', 'Commercial', '/rooms/plantation-cottage/', 'P2', ''),
    ('family room in wayanad', 'Room type', 'Commercial', '/rooms/family-suite/', 'P2', ''),
]
TOWNS = ['vythiri', 'lakkidi', 'kalpetta', 'meppadi', 'sulthan bathery', 'mananthavady', 'pookode']
ORIGINS = {'bangalore': 'Bengaluru', 'bengaluru': 'Bengaluru', 'mysore': 'Mysuru', 'mysuru': 'Mysuru', 'kochi': 'Kochi', 'kozhikode': 'Kozhikode', 'calicut': 'Kozhikode'}

def geo_of(k):
    kl = k.lower()
    for o, name in ORIGINS.items():
        if o in kl: return name, 'travel-in'
    for t in TOWNS:
        if t in kl: return t.title(), 'town'
    return 'Wayanad', 'district'

rows, seen = [], set()
def add(keyword, cluster, intent, target, priority, page_status, action, source):
    k = keyword.strip()
    if k.lower() in seen: return
    seen.add(k.lower())
    geo, tier = geo_of(k)
    rows.append(dict(cluster=cluster, keyword=k, geo=geo, geo_tier=tier, intent=intent, priority=priority,
                     target_url=target, page_status=page_status, action=action, source=source))

PRI = {'High': 'P1', 'Medium': 'P2', 'Low': 'P3'}
for r in csv.DictReader(open('docs/seo-keyword-map.csv', encoding='utf-8')):
    k, target, cluster = r['Keyword'], r['Target Page'].strip(), r['Keyword Cluster']
    note = r['Notes']
    if target.startswith('Not targeted'):
        if k.lower() in REMAP_NOT_TARGETED:
            t, why = REMAP_NOT_TARGETED[k.lower()]
            if t == 'GAP':
                add(k, cluster, r['Search Intent'], '-', 'P3', 'GAP - no page', why, r['Validation Status'])
            else:
                add(k, cluster, r['Search Intent'], t, PRI.get(r['Priority'], 'P3'), 'live', why, r['Validation Status'])
        else:
            add(k, cluster, r['Search Intent'], '-', '-', 'do not build', note, r['Validation Status'])
        continue
    target = target.split(' + ')[0].replace(' (no separate page)', '').strip()
    if target in DRAFT:
        status, action = 'draft', DRAFT[target]
    elif target in live:
        status, action = 'live', 'optimise the existing page'
    else:
        status, action = 'GAP - no page', note
    add(k, cluster, r['Search Intent'], target, PRI.get(r['Priority'], 'P3'), status, action, r['Validation Status'])

for k, cluster, intent, target, pri, note in NEW:
    add(k, cluster, intent, target, pri, 'live', note or 'optimise the existing page', 'Broker repositioning 2026-11-03')

# landing-page frontmatter keywords (what each page's meta keywords target)
for f in sorted(glob.glob('src/content/landing/*.md')):
    s = open(f, encoding='utf-8').read()
    slug = '/' + os.path.basename(f)[:-3] + '/'
    pk = re.search(r'^primaryKeyword: "(.*)"', s, re.M).group(1)
    sk = json.loads(re.search(r'^secondaryKeywords: (\[.*\])', s, re.M).group(1))
    status = 'live' if slug in live else 'draft'
    for i, k in enumerate([pk] + sk):
        add(k, 'Landing: ' + slug.strip('/'), 'Commercial' if status == 'live' else 'Commercial', slug,
            'P1' if i == 0 else 'P2', status, 'optimise the existing page' if status == 'live' else DRAFT.get(slug, 'publish'), 'Page frontmatter')

os.makedirs('seo/audit', exist_ok=True)
fields = ['cluster', 'keyword', 'geo', 'geo_tier', 'intent', 'priority', 'target_url', 'page_status', 'action', 'source']
with open('seo/keyword-map.csv', 'w', newline='', encoding='utf-8') as fh:
    w = csv.DictWriter(fh, fields); w.writeheader(); w.writerows(rows)

# summary per cluster (rootmedia keyword-summary.csv)
summ = defaultdict(lambda: Counter())
tgt = {}
for r in rows:
    c = r['cluster']; summ[c]['keywords'] += 1; summ[c][r['priority']] += 1
    if r['page_status'] == 'do not build': summ[c]['do_not_build'] += 1
    tgt.setdefault(c, Counter())[(r['target_url'], r['page_status'])] += 1
with open('seo/keyword-summary.csv', 'w', newline='', encoding='utf-8') as fh:
    w = csv.writer(fh); w.writerow(['cluster', 'target_url', 'page_status', 'keywords', 'P1', 'P2', 'P3', 'do_not_build'])
    for c, n in sorted(summ.items(), key=lambda x: -x[1]['keywords']):
        (t, st), _ = tgt[c].most_common(1)[0]
        w.writerow([c, t, st, n['keywords'], n['P1'], n['P2'], n['P3'], n['do_not_build']])

# intent map: one query -> one page
INTENT = [
    ('best resort in wayanad / resort in wayanad', 'Commercial: compare & book', '/', '/where-to-stay-in-wayanad/', 'Home answers "best" with what to compare; no bare claim'),
    ('resort booking in wayanad / wayanad resort booking whatsapp', 'Transactional', '/', '/contact/', 'WhatsApp CTA + how booking works'),
    ('luxury / budget / affordable / private resorts in wayanad', 'Commercial by budget', '/ (#luxury #budget #affordable #private)', '/rooms/', 'Tier cards on home; split into own pages when partner data allows'),
    ('family resorts in wayanad', 'Commercial', '/family-resorts-in-wayanad/', '/rooms/family-suite/', 'Room page = stay type; landing = choose & book'),
    ('resorts in wayanad for couples / honeymoon', 'Commercial', '/resorts-in-wayanad-for-couples/', '/rooms/couple-stay/', 'Same split'),
    ('private resort / private villa in wayanad', 'Commercial', '/private-resort-in-wayanad/', '/rooms/pool-villa/', 'Same split'),
    ('resort in wayanad with swimming pool', 'Commercial', '/resorts-in-wayanad-with-swimming-pool/', '/rooms/pool-villa/', ''),
    ('group stay / resorts for friends in wayanad', 'Commercial', '/group-stays-in-wayanad/', '/resort-in-wayanad-for-10-people/', '10-people page owns the exact-number queries'),
    ('resort in wayanad for 10 people', 'Transactional', '/resort-in-wayanad-for-10-people/', '/group-stays-in-wayanad/', ''),
    ('resort in vythiri / lakkidi resorts', 'Local commercial', '/resorts-in-vythiri/', '/where-to-stay-in-wayanad/', ''),
    ('campfire / activities resorts in wayanad', 'Commercial', '/wayanad-resort-activities/', '/things-to-do-in-wayanad/', ''),
    ('wayanad resort price list', 'Transactional', '/wayanad-resort-prices/ (draft)', '/', 'Publish only with real rate ranges'),
    ('tree house in wayanad', 'Commercial', '/rooms/tree-house/', '/resorts-in-vythiri/', ''),
    ('places to visit / things to do in wayanad', 'Informational', '/things-to-do-in-wayanad/', 'sight guides', ''),
    ('where to stay in wayanad', 'Informational', '/where-to-stay-in-wayanad/', '/resorts-in-vythiri/', ''),
    ('best time to visit wayanad', 'Informational', '/best-time-to-visit-wayanad/', '/wayanad-in-monsoon/', ''),
    ('<city> to wayanad', 'Informational: route', '/<city>-to-wayanad/', '/contact/', 'One page per origin city'),
    ('vythiri village resort / taj / other resort brands', 'Navigational (other business)', 'none', '-', 'Never target another business brand'),
]
with open('seo/audit/intent-map.csv', 'w', newline='', encoding='utf-8') as fh:
    w = csv.writer(fh); w.writerow(['QUERY', 'SEARCH_INTENT', 'PRIMARY_PAGE', 'SECONDARY_PAGE', 'NOTES'])
    w.writerows(INTENT)

# ---------- workbook (media360 format) ----------
wb = Workbook()
HEAD = Font(bold=True, color='FFFFFF'); FILL = PatternFill('solid', fgColor='24493A')
def sheet(name, header, data, widths=None, first=False):
    ws = wb.active if first else wb.create_sheet()
    ws.title = name
    ws.append(header)
    for c in ws[1]: c.font, c.fill, c.alignment = HEAD, FILL, Alignment(wrap_text=True, vertical='top')
    for row in data: ws.append(list(row))
    for i, wdt in enumerate(widths or [30] * len(header)):
        ws.column_dimensions[chr(65 + i) if i < 26 else 'A' + chr(65 + i - 26)].width = wdt
    ws.freeze_panes = 'A2'
    return ws

readme = [
    ['Resort in Wayanad (resortinwayanad.in) - SEO keyword & page map'],
    [f'Generated {TODAY} from the Astro build (dist/) and seo/keyword-map.csv.'],
    ['Business: resort booking service for many partner resorts across Wayanad; booking on WhatsApp; no office, no email.'],
    ['Search volume and keyword difficulty were NOT measured. Fill them from Search Console, Google Keyword Planner or Ahrefs.'],
    [''],
    ['Summary'],
    [f'Indexable pages: {len(pages)}'],
    [f'Keywords mapped: {len(rows)} ({sum(r["page_status"]=="live" for r in rows)} to live pages, '
     f'{sum(r["page_status"]=="draft" for r in rows)} to drafts, {sum(r["page_status"].startswith("GAP") for r in rows)} gaps, '
     f'{sum(r["page_status"]=="do not build" for r in rows)} do-not-build)'],
    [f'FAQ questions answered on the site: {sum(len(p["faqs"]) for p in pages)}'],
    [''],
    ['Rules'],
    ['1. Never invent facts: no ratings, reviews, star categories, partner counts or prices we cannot show.'],
    ['2. One query, one page (see Page Map + seo/audit/intent-map.csv).'],
    ['3. Never target another business brand (Vythiri Village Resort, Taj, etc.).'],
    ['4. "Best" appears as the searcher\'s question in titles and is answered with what to compare.'],
]
ws = sheet('Read Me', ['Read Me'], readme, [120], first=True)

GOAL = lambda u: 'WhatsApp click' if u not in ('/privacy/',) else '-'
sheet('Page Map', ['URL', 'Status', 'Primary keyword (one per URL)', 'Meta keywords', 'SEO title (live)', 'Title chars', 'Meta description (live)',
                   'Desc chars', 'H1', 'Words in HTML', 'Schema types', 'Conversion goal'],
      [[SITE + p['url'], 'Live', (p['keywords'].split(', ')[0] if p['keywords'] else ''), p['keywords'], p['title'], len(p['title']), p['desc'],
        len(p['desc']), p['h1'], p['words'], ', '.join(p['types']), GOAL(p['url'])] for p in pages]
      + [[SITE + u, 'Draft', '', '', '', '', '', '', '', '', '', why] for u, why in DRAFT.items()],
      [45, 8, 34, 50, 50, 8, 60, 8, 40, 8, 50, 16])

sheet('Keywords', ['Keyword', 'Cluster', 'Search intent', 'Target geography', 'Mapped URL (one primary page)', 'Priority', 'Page status',
                   'Action / notes', 'Monthly volume', 'KD', 'Source'],
      [[r['keyword'], r['cluster'], r['intent'], r['geo'], (SITE + r['target_url']) if r['target_url'].startswith('/') else r['target_url'],
        r['priority'], r['page_status'], r['action'], NOT_MEASURED, NOT_MEASURED, r['source']] for r in rows],
      [42, 22, 18, 14, 50, 8, 14, 50, 22, 22, 30])

sheet('Question Bank', ['Question', 'Answering URL', 'Status'],
      [[q, SITE + p['url'], 'Answered on page (FAQ + FAQPage schema)'] for p in pages for q in p['faqs']], [70, 55, 40])

PROMPTS = ['best resort in Wayanad', 'resort booking in Wayanad on WhatsApp', 'best family resort in Wayanad with pool',
           'best resort in Wayanad for couples', 'honeymoon resort in Wayanad', 'private resort in Wayanad with pool',
           'resort in Wayanad for 10 people', 'group stay in Wayanad for friends', 'luxury resorts in Wayanad',
           'budget resorts in Wayanad', 'tree house stay in Wayanad', 'resorts in Vythiri', 'where to stay in Wayanad',
           'best time to visit Wayanad', 'things to do in Wayanad in 2 days', 'how to reach Wayanad from Bangalore',
           'Wayanad resorts with campfire', 'is Wayanad safe in monsoon', 'who can book a Wayanad resort for me',
           'Resort in Wayanad']
sheet('AI Prompts', ['#', 'Prompt (fixed wording - rerun monthly)', 'Engine', 'Date', 'Brand mentioned? (Y/N)', 'Our URL cited',
                     'Citation position', 'Competitors named', 'Sentiment'],
      [[i + 1, p, 'ChatGPT / Perplexity / Gemini / Google AI Overview'] for i, p in enumerate(PROMPTS)], [5, 50, 40, 12, 14, 40, 10, 40, 12])

CAL = [
    ('Week 1', 'Wayanad Resort Prices by Season and Budget (2027)', 'wayanad resort price list', 'Cost guide', '/wayanad-resort-prices/', 'Real rate ranges per tier from partner resorts'),
    ('Week 2', 'Luxury Resorts in Wayanad: What You Get for the Price', 'luxury resorts in wayanad', 'Guide', '/', 'Photos and rates of real partner luxury resorts (with permission)'),
    ('Week 3', 'Budget Resorts in Wayanad That Still Have a Pool', 'budget resorts in wayanad with pool', 'Guide', '/resorts-in-wayanad-with-swimming-pool/', 'Real budget partner options'),
    ('Week 4', 'Tree House vs Pool Villa in Wayanad: Which to Book', 'tree house or pool villa wayanad', 'Comparison', '/rooms/tree-house/', 'Guest photos / feedback with consent'),
    ('Week 5', '2-Day Wayanad Itinerary for Families', 'wayanad 2 day itinerary family', 'Itinerary', '/family-resorts-in-wayanad/', 'Drive times checked on the road'),
    ('Week 6', 'Wayanad Honeymoon Plan: 3 Nights', 'wayanad honeymoon package', 'Itinerary', '/resorts-in-wayanad-for-couples/', 'Real couple stays booked'),
    ('Week 7', 'Bachelor and Student Groups: Which Wayanad Resorts Accept You', 'resorts in wayanad for bachelors', 'Guide', '/group-stays-in-wayanad/', 'Confirmed partner policies'),
    ('Week 8', 'Wayanad in December: Weather, Crowds and Booking Tips', 'wayanad in december', 'Seasonal guide', '/best-time-to-visit-wayanad/', 'Booking lead times from our own enquiries'),
    ('Week 9', 'Muthanga vs Tholpetty Safari: Timings and Tips', 'muthanga safari timings', 'Guide', '/things-to-do-in-wayanad/', 'Current timings checked with the counters'),
    ('Week 10', 'Onam and Christmas in Wayanad: When to Book', 'wayanad resort booking christmas', 'Seasonal guide', '/', 'Our own sell-out dates'),
]
sheet('Content Calendar', ['Week', 'Title', 'Target keyword', 'Format', 'Links to page', 'Evidence needed (information gain)', 'Status'],
      [list(c[:4]) + [SITE + c[4], c[5], 'Draft'] for c in CAL], [10, 55, 34, 14, 50, 50, 10])

LINKS = [
    ('Google Business Profile', 'Local entity (critical)', 'Create as a service-area business (category: Travel agency), area Wayanad; hide address; same name + phone as site', 'P1'),
    ('Bing Places for Business', 'Local citation', 'Import from GBP', 'P1'),
    ('Apple Business Connect', 'Local citation', 'Add brand + phone', 'P2'),
    ('Justdial', 'India directory', 'Free listing as travel agent, same name + phone', 'P1'),
    ('Sulekha', 'India directory', 'Free listing', 'P2'),
    ('Instagram business profile', 'Social / sameAs', 'Link in bio to www.resortinwayanad.in; add URL to site schema', 'P1'),
    ('Facebook page', 'Social / sameAs', 'Same name + phone; add URL to site schema', 'P1'),
    ('YouTube channel', 'Social / sameAs', 'Short resort walk-through videos (with partner permission)', 'P2'),
    ('Partner resort websites', 'Earned link', 'Ask partners to list "Book via Resort in Wayanad" with a link', 'P1'),
    ('Kerala travel bloggers / vloggers', 'Earned link', 'Host a stay; ask for an honest review with a link', 'P2'),
    ('Reddit / Quora Wayanad threads', 'Brand mention', 'Answer real questions honestly; disclose you are a booking agent', 'P3'),
    ('TripAdvisor forums', 'Brand mention', 'Answer questions; no self-promotion links where not allowed', 'P3'),
]
sheet('Backlinks & Citations', ['Target', 'Type', 'How to get it', 'Priority', 'Status', 'Live URL'], [list(l) for l in LINKS], [32, 24, 70, 8, 10, 40])

AUDIT = [
    ('Critical', 'Business model', 'Site described one resort (own estate, rooms, address, "no agent commission")', 'Rewritten as a resort booking service; TravelAgency schema; no fake address', 'Done', 'grep dist for single-resort claims = 0'),
    ('Critical', 'Indexing', 'Every page noindex (staging), no sitemap', 'Launch check passes; robots + sitemap live', 'Done', 'curl /robots.txt, /sitemap-index.xml'),
    ('High', 'Domain', 'Canonicals on .vercel.app', 'www.resortinwayanad.in everywhere; apex 308 to www', 'Done', 'curl -I https://resortinwayanad.in'),
    ('High', 'Keyword coverage', '9 commercial pages hidden', '8 rewritten and published; prices page drafted until real rates', 'Done', 'Page Map tab'),
    ('High', 'Search Console', 'Not verified', 'Meta tag + HTML file; sitemap submitted', 'Done', 'GSC Sitemaps: Success'),
    ('Medium', 'Head tags', 'No robots preview directive, no meta keywords, no manifest', 'index,follow,max-image-preview:large; per-page keywords; manifest; llms.txt link', 'Done', 'view-source'),
    ('Medium', 'Bing / IndexNow', 'Manual only', 'GitHub Action submits all URLs after each production deploy', 'Done', 'Actions: IndexNow after deploy'),
    ('Medium', 'Photos', 'Stock photos', 'Labelled "Example photo"; replace with partner photos (with permission)', 'Open', 'Owner'),
    ('Medium', 'Social / sameAs', 'No profiles', 'Add Instagram / Facebook URLs to site.socials', 'Open', 'Owner'),
    ('Low', 'Reviews', 'None', 'Ask guests for Google reviews on the Business Profile; never add review schema without them', 'Open', 'Owner'),
]
sheet('Audit', ['Severity', 'Area', 'Before', 'Fix', 'Status', 'Verification'], [list(a) for a in AUDIT], [10, 18, 50, 60, 8, 40])

wb.save('seo/resortinwayanad-seo-keyword-map.xlsx')
print(len(pages), 'pages;', len(rows), 'keywords;', sum(len(p['faqs']) for p in pages), 'questions')
print(Counter(r['page_status'] for r in rows))
