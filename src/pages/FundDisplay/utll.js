let currentDate, newDate;
export const monthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

currentDate = new Date();
export const yesterday = String((+currentDate.getDate() - 2) + "-" + monthNames[currentDate.getMonth()] + "-" + currentDate.getFullYear());

currentDate = new Date();
newDate = currentDate.getDate() - 7;
currentDate.setDate(newDate);
export const oneWeekBefore = String(currentDate.getDate() + "-" + monthNames[currentDate.getMonth()] + "-" + currentDate.getFullYear());

currentDate = new Date();
newDate = currentDate.getMonth() - 1;
currentDate.setMonth(newDate);
export const oneMonthBefore = String(currentDate.getDate() + "-" + monthNames[currentDate.getMonth()] + "-" + currentDate.getFullYear());

currentDate = new Date();
newDate = currentDate.getMonth() - 6;
currentDate.setMonth(newDate);
export const sixMonthsBefore = String(currentDate.getDate() + "-" + monthNames[currentDate.getMonth()] + "-" + currentDate.getFullYear());

currentDate = new Date()
newDate = (+currentDate.getFullYear()) - 1;
currentDate.setFullYear(newDate);
export const oneYearBefore = String(currentDate.getDate() + "-" + monthNames[currentDate.getMonth()] + "-" + currentDate.getFullYear());

currentDate = new Date();
newDate = (+currentDate.getFullYear()) - 2;
currentDate.setFullYear(newDate);
export const twoYearsBefore = String(currentDate.getDate() + "-" + monthNames[currentDate.getMonth()] + "-" + currentDate.getFullYear());