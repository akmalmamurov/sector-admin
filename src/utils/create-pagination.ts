export function createPagination(totalPages: number, currentPage: number): (number | string)[] {
    const pages: (number | string)[] = [];

    if (totalPages <= 7) {
        for (let i = 1; i <= totalPages; i++) {
            pages.push(i);
        }
        return pages;
    }

    pages.push(1);


    let start = currentPage - 2;
    let end = currentPage + 2;

    if (start < 2) {
        start = 2;
    }
    if (end > totalPages - 1) {
        end = totalPages - 1;
    }

    if (start > 2) {
        pages.push("...");
    }

    for (let i = start; i <= end; i++) {
        pages.push(i);
    }

    if (end < totalPages - 1) {
        pages.push("...");
    }

    pages.push(totalPages);

    return pages;
}