document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Tool 1: Tag Generator Logic
    const tagForm = document.getElementById('tag-form');
    if (tagForm) {
        tagForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const keyword = document.getElementById('tag-input').value.trim();
            if (!keyword) return;

            const resultsContainer = document.getElementById('tag-results');
            const tagsOutput = document.getElementById('tags-output');
            
            // Generate realistic local variations
            const generatedTags = [
                keyword,
                `${keyword} tutorial`,
                `how to ${keyword}`,
                `best ${keyword} 2026`,
                `${keyword} for beginners`,
                `free ${keyword}`,
                `${keyword} guide`,
                `advanced ${keyword}`,
                `top ${keyword} tips`,
                `${keyword} review`
            ];

            tagsOutput.value = generatedTags.join(', ');
            resultsContainer.classList.remove('hidden');
        });
    }

    // Tool 2: Title Generator Logic
    const titleForm = document.getElementById('title-form');
    if (titleForm) {
        titleForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const topic = document.getElementById('title-input').value.trim();
            if (!topic) return;

            const resultsContainer = document.getElementById('title-results');
            const titleList = document.getElementById('title-list');
            titleList.innerHTML = '';

            const templates = [
                `How to Master ${topic} in 10 Minutes (Step-by-Step)`,
                `The Ultimate Guide to ${topic} for Beginners`,
                `Why Your ${topic} Strategy is Failing (And How to Fix It)`,
                `Top 5 Secrets About ${topic} Nobody Tells You`,
                `Complete ${topic} Masterclass (2026 Updated)`
            ];

            templates.forEach(title => {
                const div = document.createElement('div');
                div.className = 'flex items-center justify-between bg-gray-50 border border-gray-200 p-3 rounded-xl text-sm';
                div.innerHTML = `
                    <span class="text-gray-800 font-medium">${title}</span>
                    <button onclick="copySingleText(this, '${title}')" class="bg-red-50 text-red-600 hover:bg-red-100 px-3 py-1.5 rounded-lg text-xs font-semibold transition">
                        <i class="fa-solid fa-copy mr-1"></i> Copy
                    </button>
                `;
                titleList.appendChild(div);
            });

            resultsContainer.classList.remove('hidden');
        });
    }

    // Tool 3: Description Generator Logic
    const descForm = document.getElementById('desc-form');
    if (descForm) {
        descForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const title = document.getElementById('desc-title').value.trim();
            const details = document.getElementById('desc-details').value.trim();
            if (!title) return;

            const resultsContainer = document.getElementById('desc-results');
            const descOutput = document.getElementById('desc-output');

            const generatedDesc = `In this video, we explore ${title}. ${details ? details : 'Learn key strategies and practical tips to master this topic quickly and effectively.'}

Timestamps:
0:00 - Introduction
1:30 - Overview of ${title}
4:15 - Key Strategies & Best Practices
8:10 - Common Mistakes to Avoid
11:00 - Conclusion & Final Thoughts

Subscribe for more tutorials and leave your questions in the comments below!

#YouTubeSEO #${title.replace(/\s+/g, '')} #CreatorTips`;

            descOutput.value = generatedDesc;
            resultsContainer.classList.remove('hidden');
        });
    }

    // Tool 4: Keyword Ideas Generator Logic
    const kwForm = document.getElementById('kw-form');
    if (kwForm) {
        kwForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const seed = document.getElementById('kw-input').value.trim();
            if (!seed) return;

            const resultsContainer = document.getElementById('kw-results');
            const kwTableBody = document.getElementById('kw-table-body');
            kwTableBody.innerHTML = '';

            const modifiers = ['guide', 'tutorial', 'tips 2026', 'review', 'fast', 'easy', 'beginner', 'advanced'];
            modifiers.forEach((mod, index) => {
                const kw = `${seed} ${mod}`;
                const row = document.createElement('tr');
                row.className = 'border-b border-gray-100 hover:bg-gray-50';
                row.innerHTML = `
                    <td class="py-3 px-4 text-sm font-medium text-gray-900">${kw}</td>
                    <td class="py-3 px-4 text-sm text-gray-600">Local Estimate</td>
                    <td class="py-3 px-4 text-sm">
                        <span class="inline-block px-2.5 py-1 rounded-full text-xs font-semibold ${index % 2 === 0 ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}">
                            ${index % 2 === 0 ? 'Medium' : 'High'}
                        </span>
                    </td>
                    <td class="py-3 px-4 text-right">
                        <button onclick="copySingleText(this, '${kw}')" class="text-red-600 hover:text-red-700 text-xs font-semibold">Copy</button>
                    </td>
                `;
                kwTableBody.appendChild(row);
            });

            resultsContainer.classList.remove('hidden');
        });
    }

    // Tool 5: Hashtag Generator Logic
    const hashForm = document.getElementById('hash-form');
    if (hashForm) {
        hashForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const topic = document.getElementById('hash-input').value.trim();
            if (!topic) return;

            const resultsContainer = document.getElementById('hash-results');
            const hashOutput = document.getElementById('hash-output');

            const cleanWord = topic.replace(/\s+/g, '');
            const generatedHashtags = `#${cleanWord} #${cleanWord}2026 #YouTubeSEO #CreatorTips #Trending #Tutorial #${cleanWord}Guide`;

            hashOutput.value = generatedHashtags;
            resultsContainer.classList.remove('hidden');
        });
    });
});

// Global Copy Function with custom Toast
function copyToClipboard(elementId) {
    const textarea = document.getElementById(elementId);
    if (!textarea) return;
    
    // Fallback copy method compatible with iFrame restrictions
    textarea.select();
    textarea.setSelectionRange(0, 99999);
    try {
        document.execCommand('copy');
        showToast('Copied to clipboard successfully!');
    } catch (err) {
        showToast('Failed to copy text.');
    }
}

function copySingleText(btn, text) {
    const dummy = document.createElement('textarea');
    document.body.appendChild(dummy);
    dummy.value = text;
    dummy.select();
    try {
        document.execCommand('copy');
        showToast('Copied: ' + text);
    } catch (err) {
        showToast('Failed to copy.');
    }
    document.body.removeChild(dummy);
}

function showToast(message) {
    const existing = document.getElementById('toast-popup');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.id = 'toast-popup';
    toast.className = 'toast-notification fixed bottom-5 right-5 bg-gray-900 text-white px-4 py-3 rounded-xl shadow-lg z-50 text-sm font-medium flex items-center space-x-2';
    toast.innerHTML = `<i class="fa-solid fa-circle-check text-green-400"></i> <span>${message}</span>`;
    document.body.appendChild(toast);

    setTimeout(() => {
        if (toast) toast.remove();
    }, 2500);
}