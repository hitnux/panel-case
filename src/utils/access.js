import PageData from '../data/pages.json'

const PageAccess = (user) => {
    const path = window.location.pathname;

    if (path.includes('order')) {
        const page = PageData.pages.find(p => p.path.includes('orders'));
        return page.access.find(r => (user.role === r));
    }

    return PageData.pages.find(page => {
        if (path === page.path) return page.access.find(r => (user.role === r));
        return false;
    });
}

export default PageAccess;