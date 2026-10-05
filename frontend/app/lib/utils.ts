export const parseDateTime = (timestamp: String) => {
    const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "nov",
        "Dec"
    ];
    const uploadedAt = timestamp.split('T');
    const dateUploadedAt = uploadedAt[0].replaceAll('-', '/');
    const timeUploadedAt = uploadedAt[1].split('.')[0].slice(0, 5);
    const numberOfMonth = Number(dateUploadedAt.slice(5, 7)) - 1;

    const finalDate = `${timeUploadedAt}hs - ${dateUploadedAt.slice(8)}, ${months.at(numberOfMonth)}. ${dateUploadedAt.slice(0, 4)}`;
    
    return finalDate;
};