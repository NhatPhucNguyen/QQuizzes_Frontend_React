export const btnColorGenerate = (method: string | undefined) => {
    if (method === "edit") {
        return "#139992";
    }
    if (method === "delete") {
        return "#F2421B";
    }
    if (method === "play") {
        return "#8BCD30";
    }
    return "#474747";
};
export const levelColorText = (level: string | undefined) => {
    if (level?.toLowerCase() === "basic") {
        return "#027313";
    }
    if (level?.toLowerCase() === "medium") {
        return "#1BA1BF";
    }
    if (level?.toLowerCase() === "hard") {
        return "#FF0000";
    }
    return "#000000";
};
