function updateCopyright() {
    const year = document.getElementById('year');
    if (year) year.textContent = String(new Date().getFullYear());
}

async function loadPanel(panel) {
    const path = `pages/${panel.id}.html`;
    try {
        const response = await fetch(path);
        if (!response.ok) throw new Error(`Unable to load ${path}: ${response.status}`);
        panel.innerHTML = await response.text();
    } catch (error) {
        panel.textContent = 'Unable to load this page. Please refresh to try again.';
        console.error(error);
    }
}

function parseNewsDate(value) {
    if (typeof value !== 'string') return null;
    const match = value.match(/^(\d{1,2})\s+([A-Za-z]+)\s+(\d{4})$/);
    if (!match) return null;

    const months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
    const month = months.indexOf(match[2].slice(0, 3).toLowerCase());
    if (month < 0) return null;

    const date = new Date(Number(match[3]), month, Number(match[1]));
    return date.getDate() === Number(match[1]) ? date : null;
}

async function loadNews() {
    const response = await fetch('data/news.json');
    if (!response.ok) throw new Error(`Unable to load news: ${response.status}`);

    const data = await response.json();
    return data.map(item => ({ date: parseNewsDate(item.date), content: item.content }))
        .filter(item => item.date && typeof item.content === 'string')
        .sort((first, second) => second.date - first.date);
}

function createNewsItem(content) {
    const item = document.createElement('li');
    const paragraph = document.createElement('p');
    paragraph.innerHTML = content;
    paragraph.querySelectorAll('a').forEach(link => {
        link.removeAttribute('class');
        link.removeAttribute(',');
        if (link.target === '_blank') link.rel = 'noopener noreferrer';
    });
    item.append(paragraph);
    return item;
}

function addNewsContent(container, entries, months = 0, now = new Date()) {
    if (!container) return;

    const cutoff = new Date(now.getFullYear(), now.getMonth() - months + 1, 1);
    const visibleEntries = entries.filter(item => !months || (item.date >= cutoff && item.date <= now));
    const groups = new Map();
    const fragment = document.createDocumentFragment();
    const dateFormat = new Intl.DateTimeFormat('en', { month: 'short', year: 'numeric' });

    visibleEntries.forEach(entry => {
        const key = `${entry.date.getFullYear()}-${String(entry.date.getMonth() + 1).padStart(2, '0')}`;
        if (!groups.has(key)) {
            const group = document.createElement('div');
            const date = document.createElement('time');
            const items = document.createElement('ul');
            group.className = 'news-group';
            date.className = 'news-date';
            date.dateTime = key;
            date.textContent = dateFormat.format(entry.date);
            items.className = 'news-items';
            group.append(date, items);
            fragment.append(group);
            groups.set(key, items);
        }
        groups.get(key).append(createNewsItem(entry.content));
    });

    if (!visibleEntries.length) {
        const message = document.createElement('p');
        message.textContent = months ? 'No news in the past six months.' : 'No news yet.';
        fragment.append(message);
    }
    container.replaceChildren(fragment);
}

async function initializeNews() {
    const homeNews = document.querySelector('#home-news .news-list');
    const allNews = document.querySelector('#news .news-list');
    if (!homeNews && !allNews) return;

    try {
        const entries = await loadNews();
        addNewsContent(homeNews, entries, 6);
        addNewsContent(allNews, entries);
    } catch (error) {
        [homeNews, allNews].filter(Boolean).forEach(container => {
            container.textContent = 'Unable to load news. Please refresh to try again.';
        });
        console.error(error);
    }
}

async function loadPublications() {
    const response = await fetch('data/publications.json');
    if (!response.ok) throw new Error(`Unable to load publications: ${response.status}`);
    return response.json();
}

function appendPublicationAuthors(paragraph, authors) {
    authors.forEach((author, index) => {
        if (index > 0) {
            const separator = index === authors.length - 1
                ? (authors.length > 2 ? ', and ' : ' and ') : ', ';
            paragraph.append(separator);
        }
        const name = author.replace(/^and\s+/, '').trim();
        if (name === 'Shiqing Wu') {
            const highlighted = document.createElement('strong');
            highlighted.textContent = name;
            paragraph.append(highlighted);
        } else {
            paragraph.append(name);
        }
    });
}

function createPublicationBadge(label, value = '', href = '') {
    const badge = document.createElement(href ? 'a' : 'span');
    badge.dataset.badge = label.toLowerCase();
    badge.textContent = value ? `${label}-${value}` : label;
    if (href) {
        badge.href = href;
        badge.target = '_blank';
        badge.rel = 'noopener noreferrer';
    }
    return badge;
}

function appendPublicationBadges(paragraph, publication) {
    const badges = [
        ['jcr', 'JCR'], ['sjr', 'SJR'], ['core', 'CORE'], ['ccf', 'CCF']
    ];
    badges.forEach(([field, label]) => {
        if (!publication[field]) return;
        paragraph.append(' ', createPublicationBadge(label, publication[field]));
    });
}

function createPublicationParagraph(publication) {
    const paragraph = document.createElement('p');
    appendPublicationAuthors(paragraph, publication.author);
    paragraph.append(`. "${publication.title}". `);
    const venue = document.createElement('em');
    venue.textContent = publication.booktitle;
    paragraph.append(venue, `, ${publication.year}.`);
    if (publication.note) paragraph.append(` ${publication.note}`);
    appendPublicationBadges(paragraph, publication);

    if (publication.pdf) {
        paragraph.append(' ', createPublicationBadge('PDF', '', publication.pdf));
    }
    return paragraph;
}

function addPublicationContent(container, publications, prefix) {
    if (!container) return;

    const sorted = [...publications].sort((first, second) => Number(second.year) - Number(first.year));
    const fragment = document.createDocumentFragment();
    sorted.forEach((publication, index) => {
        const number = document.createElement('dt');
        const citation = document.createElement('dd');
        number.textContent = `[${prefix}${sorted.length - index}]`;
        citation.append(createPublicationParagraph(publication));
        fragment.append(number, citation);
    });
    container.replaceChildren(fragment);
    container.closest('section').hidden = !sorted.length;
}

async function initializePublications() {
    const panel = document.getElementById('publications');
    if (!panel) return;

    try {
        const publications = await loadPublications();
        const categories = [
            ['arxiv', 'arxiv-list', 'A'],
            ['conference', 'conference-list', 'C'],
            ['journal', 'journal-list', 'J']
        ];
        categories.forEach(([type, id, prefix]) => {
            addPublicationContent(panel.querySelector(`#${id}`),
                publications.filter(publication => publication.type === type), prefix);
        });
    } catch (error) {
        panel.querySelectorAll('dl').forEach(container => {
            container.textContent = 'Unable to load publications. Please refresh to try again.';
        });
        console.error(error);
    }
}

function updateActiveNavigation(id) {
    document.querySelectorAll('#navigation nav a').forEach(link => {
        link.toggleAttribute('data-current', link.getAttribute('href') === `#${id}`);
    });
}

function showPanel(id, panels) {
    if (!panels.some(panel => panel.id === id)) return;

    panels.forEach(panel => {
        panel.hidden = panel.id !== id;
    });
    updateActiveNavigation(id);
}

function getPanelIdFromURL(panels) {
    const id = window.location.hash.slice(1);
    return panels.find(panel => panel.id === id)?.id
        || panels.find(panel => panel.id === 'home')?.id
        || panels[0]?.id;
}

function navigateToPanel(id, switchPanel) {
    if (window.location.hash !== `#${id}`) {
        window.history.pushState(null, '', `#${id}`);
    }
    switchPanel(id);
}

function initializeRouting(panels, switchPanel) {
    function restorePanelFromURL() {
        switchPanel(getPanelIdFromURL(panels));
    }

    window.addEventListener('popstate', restorePanelFromURL);
    window.addEventListener('hashchange', restorePanelFromURL);
}

function initializePanelLinks(panels, switchPanel) {
    function handlePanelLinkClick(event) {
        if (event.defaultPrevented || event.button !== 0
            || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;

        const link = event.target.closest('.page a[href]');
        const href = link?.getAttribute('href');
        const id = href?.startsWith('#') ? href.slice(1) : null;
        if (!panels.some(panel => panel.id === id)) return;

        event.preventDefault();
        navigateToPanel(id, switchPanel);
    }

    document.addEventListener('click', handlePanelLinkClick);
}

async function animatePanel(panel, direction) {
    if (!panel.animate || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const duration = parseFloat(getComputedStyle(document.documentElement)
        .getPropertyValue('--panel-animation-duration')) || 240;
    const frames = direction === 'out'
        ? [{ opacity: 1, transform: 'translateY(0)' }, { opacity: 0, transform: 'translateY(-8px)' }]
        : [{ opacity: 0, transform: 'translateY(8px)' }, { opacity: 1, transform: 'translateY(0)' }];
    const animation = panel.animate(frames, { duration, easing: 'ease-out', fill: 'forwards' });

    try {
        await animation.finished;
    } finally {
        animation.cancel();
    }
}

function createPanelSwitcher(panels) {
    let requestedId;
    let switching = false;

    return async function switchPanel(id) {
        if (!panels.some(panel => panel.id === id)) return;
        requestedId = id;
        if (switching) return;

        switching = true;
        try {
            while (true) {
                const current = panels.find(panel => !panel.hidden);
                if (current?.id === requestedId) break;

                if (current) await animatePanel(current, 'out');
                const next = panels.find(panel => panel.id === requestedId);
                showPanel(next.id, panels);
                window.scrollTo(0, 0);
                await animatePanel(next, 'in');
            }
        } finally {
            switching = false;
        }
    };
}

async function initializePanels(panels) {
    if (!panels.length) return;

    showPanel(getPanelIdFromURL(panels), panels);
    await Promise.all(panels.map(loadPanel));
    window.StudentYears?.update();
    await Promise.all([initializeNews(), initializePublications()]);
    window.scrollTo(0, 0);
}

function initializeNavigation() {
    const navigation = document.getElementById('navigation');
    if (!navigation) return;

    const summary = navigation.querySelector('summary');
    const menu = navigation.querySelector('nav');
    if (!summary || !menu) return;
    const mobileNavigation = window.matchMedia('(max-width: 640px)');
    let expanded;
    let menuAnimation;

    function updateNavigation() {
        menuAnimation?.cancel();
        menuAnimation = null;
        expanded = !mobileNavigation.matches;
        navigation.open = expanded;
        navigation.style.overflow = '';
        menu.inert = !expanded;
    }

    async function setNavigationExpanded(open) {
        if (!mobileNavigation.matches) return;

        const startHeight = navigation.getBoundingClientRect().height;
        menuAnimation?.cancel();
        menuAnimation = null;
        expanded = open;
        menu.inert = !open;

        if (!navigation.animate || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            navigation.open = open;
            navigation.style.overflow = '';
            return;
        }

        navigation.open = true;
        const endHeight = open ? navigation.scrollHeight : summary.getBoundingClientRect().height;
        const duration = parseFloat(getComputedStyle(document.documentElement)
            .getPropertyValue('--menu-animation-duration')) || 360;
        navigation.style.overflow = 'hidden';
        const animation = navigation.animate([
            { height: `${startHeight}px` }, { height: `${endHeight}px` }
        ], { duration, easing: 'ease-out', fill: 'forwards' });
        menuAnimation = animation;

        try {
            await animation.finished;
        } catch (error) {
            if (error.name !== 'AbortError') console.error(error);
        } finally {
            if (menuAnimation === animation) {
                navigation.open = expanded;
                navigation.style.overflow = '';
                menuAnimation = null;
                animation.cancel();
            }
        }
    }

    function handleSummaryClick(event) {
        if (!mobileNavigation.matches) return;
        event.preventDefault();
        setNavigationExpanded(!expanded);
    }

    function handleNavigationClick(event) {
        if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
        setNavigationExpanded(false);
    }

    function handleNavigationKeydown(event) {
        if (event.key === 'Escape' && mobileNavigation.matches) {
            setNavigationExpanded(false);
            summary.focus();
        }
    }

    updateNavigation();
    mobileNavigation.addEventListener('change', updateNavigation);
    summary.addEventListener('click', handleSummaryClick);
    navigation.addEventListener('keydown', handleNavigationKeydown);
    navigation.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', handleNavigationClick);
    });
}

function initializeNavbarScroll() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    function updateNavbarBackground() {
        navbar.toggleAttribute('data-scrolled', window.scrollY > 8);
    }

    updateNavbarBackground();
    window.addEventListener('scroll', updateNavbarBackground, { passive: true });
}

async function loadSiteFonts() {
    if (!document.fonts) return;

    const styles = getComputedStyle(document.documentElement);
    const bodyFamily = styles.getPropertyValue('--font-family-body').trim();
    const headingFamily = styles.getPropertyValue('--font-family-heading').trim();
    const bodyWeight = styles.getPropertyValue('--font-weight-body').trim() || '400';
    const headingWeight = styles.getPropertyValue('--font-weight-heading').trim() || '500';
    const fonts = [
        `${bodyWeight} 1em ${bodyFamily}`,
        `500 1em ${bodyFamily}`,
        `600 1em ${bodyFamily}`,
        `italic ${bodyWeight} 1em ${bodyFamily}`,
        `${headingWeight} 1em ${headingFamily}`
    ];

    const results = await Promise.allSettled(fonts.map(font => document.fonts.load(font)));
    results.forEach(result => {
        if (result.status === 'rejected') console.warn('Unable to load a font:', result.reason);
    });
    await document.fonts.ready;
}

function showLoadingScreen() {
    const loading = document.getElementById('site-loading');
    if (!loading) return;

    loading.hidden = false;
    document.body.toggleAttribute('data-loading', true);
    const page = document.querySelector('.page');
    if (page) page.inert = true;
}

async function hideLoadingScreen(startedAt = performance.now()) {
    const loading = document.getElementById('site-loading');
    if (!loading) return;

    let animation;
    try {
        const minimumDuration = parseFloat(getComputedStyle(document.documentElement)
            .getPropertyValue('--loading-min-duration')) || 0;
        const remaining = minimumDuration - (performance.now() - startedAt);
        if (remaining > 0) {
            await new Promise(resolve => setTimeout(resolve, remaining));
        }

        if (loading.animate && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            const duration = parseFloat(getComputedStyle(document.documentElement)
                .getPropertyValue('--loading-fade-duration')) || 240;
            animation = loading.animate([{ opacity: 1 }, { opacity: 0 }],
                { duration, easing: 'ease-out', fill: 'forwards' });
            await animation.finished;
        }
    } finally {
        animation?.cancel();
        loading.hidden = true;
        document.body.toggleAttribute('data-loading', false);
        const page = document.querySelector('.page');
        if (page) page.inert = false;
    }
}

async function initializeSite() {
    const startedAt = performance.now();
    showLoadingScreen();
    try {
        const panels = [...document.querySelectorAll('.page > div[id]')];
        const switchPanel = createPanelSwitcher(panels);
        updateCopyright();
        initializeRouting(panels, switchPanel);
        initializePanelLinks(panels, switchPanel);
        initializeNavigation();
        initializeNavbarScroll();
        await Promise.all([initializePanels(panels), loadSiteFonts()]);
    } catch (error) {
        console.error(error);
    } finally {
        await hideLoadingScreen(startedAt);
    }
}

initializeSite();
