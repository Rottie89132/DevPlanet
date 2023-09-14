export const useVisitedPagesStore = defineStore('visitedPages', () => {
    const visitedPages = ref([]);

    onMounted(() => {
        const storedPages = JSON.parse(localStorage.getItem('visitedPages')) || [];
        visitedPages.value = storedPages;
    });

    function addVisitedPage(pageName) {
        visitedPages.value.push(pageName);
        localStorage.setItem('visitedPages', JSON.stringify(visitedPages.value));
    }

    function hasVisitedPage(pageName) {
        return visitedPages.value.includes(pageName);
    }

    return {
        visitedPages,
        addVisitedPage,
        hasVisitedPage,
    };
});

