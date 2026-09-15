function getAcademicYear(date) {
    return date.getMonth() >= 8 ? date.getFullYear() : date.getFullYear() - 1;
}

function calculateStudentYear(enrollmentDate, today = new Date()) {
    const match = /^(\d{4})-(\d{2})$/.exec(enrollmentDate);
    if (!match) return null;

    const enrollmentYear = Number(match[1]);
    const enrollmentMonth = Number(match[2]) - 1;
    if (enrollmentMonth < 0 || enrollmentMonth > 11) return null;

    const enrollmentAcademicYear = enrollmentMonth >= 8 ? enrollmentYear : enrollmentYear - 1;
    return Math.max(1, getAcademicYear(today) - enrollmentAcademicYear + 1);
}

function formatStudentYear(year) {
    const names = ['first-year', 'second-year', 'third-year', 'fourth-year', 'fifth-year', 'sixth-year'];
    return names[year - 1] || `Year ${year}`;
}

function updateStudentYears(root = document) {
    root.querySelectorAll('[data-enrollment-date]').forEach(element => {
        const year = calculateStudentYear(element.dataset.enrollmentDate);
        if (year) element.textContent = formatStudentYear(year);
    });
}

window.StudentYears = Object.freeze({
    calculate: calculateStudentYear,
    format: formatStudentYear,
    update: updateStudentYears
});
