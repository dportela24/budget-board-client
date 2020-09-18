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

export const compareEntries = (prev, next, sortMethod) => {
    let a = prev[sortMethod], b = next[sortMethod];

    if (sortMethod === 'description') {
        // Alphabetically Z > A, swap a with b to
        // sort from Z->A to A->Z
        const c = a.toLowerCase();
        a = b.toLowerCase();
        b = c.toLowerCase();
    }

    if (a > b) return -1;
    if (b > a) return 1;
    return 0
}

export const insertSorted = (list, newElement, sortMethod) => {
    if(list.length === 0) {
        list.push(newElement);
    } else {
        for (let i = 0; i < list.length; i++) {
            if (compareEntries(list[i], newElement, sortMethod) > 0) {
                list.splice(i, 0, newElement)
                return list;
            }
        }
        list.push(newElement);
    }
    return list;
}

export const getStoredAuth = () => {
    return {
        token: localStorage.getItem('token'),
        username: localStorage.getItem('username')
    };
}

export const storeAuth = (token, username) => {
    localStorage.setItem('token', token);
    localStorage.setItem('username', username)
}

export const logOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
}