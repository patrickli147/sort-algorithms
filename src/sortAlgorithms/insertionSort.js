export default function* sort() {
    let array = [...this.array];
    let len = array.length, preIndex, current;

    for (let i = 1; i < len; i ++) {
        preIndex = i - 1;
        current = array[i];

        while (preIndex >= 0 && array[preIndex].val > current.val) {
            array[preIndex + 1] = array[preIndex];
            preIndex --;
            //current is not in the arrray now, so do not yield here
            //yield array;
        }
        array[preIndex + 1] = current;
        yield array;
    }
}