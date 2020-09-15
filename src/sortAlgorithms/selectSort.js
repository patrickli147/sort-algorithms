export default function* sort() {
    let array = [...this.array];

    for (let i = 0; i < array.length; i ++) {
        let min = array[i].val;
        let minIndex = i;
        for (let j = i + 1; j < array.length; j ++) {
            if (array[j].val < min) {
                min = array[j].val;
                minIndex = j;
            }
        }
        if (minIndex == i) {
            continue;
        }
        let temp = array[i];
        array[i] = array[minIndex];
        array[minIndex] = temp;
        yield array;
    }
}