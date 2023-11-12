export const useVisitedPagesStore = defineStore('visitedPages', () => {
    const visitedPages = ref([]);
    
    

    onMounted(() => {
        const storedPages = useLocalStorage("visitedPages", []).value
        visitedPages.value = storedPages
        
    });

    function addVisitedPage(pageName) {
        visitedPages.value.push(pageName);
        useLocalStorage("visitedPages").value = JSON.stringify(visitedPages.value)
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

