
const minMax = (arr) => {
    let min = 0
    let max = 0

    let n = arr.length

    // sap xep day so tu be den lon
    arr.sort(function (a, b) { return a - b })

    for (let i = 0, j = n - 1; i < n - 1; i++, j--) {
        min += arr[i]
        max += arr[j]
    }
    console.log(min + " " + max)
}

const arr = [20, 4, 3, 5, 7]
const arr1 = [2, 6, 3, 5, 7]
minMax(arr)
minMax(arr1)

