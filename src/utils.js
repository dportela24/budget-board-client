export const formatValue = function(value, type) {
    let sign, formatedValue;
    
    if (type) {
        sign = type ==='income' ? '+ ' : '- ';
    } else {
        sign = value >= 0 ? '+ ' : '- '; 
    }

    formatedValue = Math.abs(value).toFixed(2);
    formatedValue = formatedValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    
    return sign + formatedValue;
}

export const calculatePercentage = function(value, total) {
    if (total === 0) return '---';
    if (value === 0) return '0%';

    let percentage = Math.round(( value / total) * 100);
    if (percentage === 0) percentage = '<1';

    return percentage +  '%';
}