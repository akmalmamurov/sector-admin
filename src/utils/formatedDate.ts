export const formatDate = (dateString: string, onlyDate?:string) => {
    const date = new Date(dateString);
    if(onlyDate) {
        return date.toLocaleString("uz-UZ", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        });
    }else{
        return date.toLocaleString("uz-UZ", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
        });
    }
};
