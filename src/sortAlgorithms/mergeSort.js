export default function* sort() {
    let array = [...this.array];

    let k = 1;

    while (k < array.length) {
        let i = 0;
        while (i < array.length) {
            let low = i;
            let high;
            if (low + k * 2 - 1 < array.length) {
                high = low + k * 2 - 1;
            }
            else {
                high = array.length - 1;
            }
            let mid = Math.floor((low * 2 + k * 2 - 1) / 2);
            if (mid > array.length - 1) {
                mid = array.length - 1;
            }
            merge(array, low, mid, high);
            yield array;
            i += (k * 2);
        }
        k *= 2;
    }
}

function merge(arr, low, mid, high) {
    let i = low, j = mid + 1;
    let temp = [];
    
    while (i <= mid && j <= high) {
        if (arr[i].val < arr[j].val) {
            temp.push(arr[i ++]);
        }
        else {
            temp.push(arr[j ++]);
        }
    }

    while (i <= mid) {
        temp.push(arr[i ++]);
    }

    while (j <= high) {
        temp.push(arr[j ++]);
    }

    for (let k = 0; k < temp.length; k ++) {
        arr[low + k] = temp[k];
    }
}