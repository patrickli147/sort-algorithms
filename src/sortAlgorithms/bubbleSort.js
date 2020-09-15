export default function* sort() {
    let array = [...this.array];
    let temp;
    for (let i = array.length - 1; i >= 1; i --) {
        for (let j = 0; j < i; j ++) {
            if (array[j].val > array[j + 1].val) {
                temp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = temp;
                console.log(array.map(v => v.val));
                yield array;
            }
        }
    }
}