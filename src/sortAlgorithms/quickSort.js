export default function* sort() {
    let array = [...this.array];
    
    yield* quickSort(array, 0, array.length - 1);
}

function* quickSort(arr, left, right) {
    if (left < right) {
        let i = left, j = right;
        let base = arr[left];
        let temp;

        while (i < j) {
            while (i < j && arr[j].val >= base.val) {
                j --;
            }
            
            while (i < j && arr[i].val <= base.val) {
                i ++;
            }
            if (i < j) {
                temp = arr[j];
                arr[j] = arr[i];
                arr[i] = temp;
                yield arr;
            }
        }
        arr[left] = arr[i];
        arr[i] = base;
        yield arr;
        yield* quickSort(arr, left, i - 1);
        yield* quickSort(arr, i + 1, right);
    }
}