export class MadelbrotSet {
    #MAX_ITERATIONS

    constructor() {
        this.#MAX_ITERATIONS = 1000

    }

    #squareComplexNumber(complex_number) {
        /*
            (3 + 5i)² = 3² + 2 * 3 * 5i + (5i)² = 9 + 30i + 25i² = 9 + 30i + 25(-1) = 9 + 30i - 25 = -16 + 30i
        */

        let real = complex_number.real ** 2 - complex_number.img ** 2
        let img  = 2 * complex_number.real * complex_number.img

        complex_number.real = real
        complex_number.img = img

        return complex_number

    }

    #modulusComplexNumber(complex_number) {
        // Euclidean distance
        let distance = Math.sqrt(complex_number.real ** 2 + complex_number.img ** 2)
        return distance

    }

    #sumComplexNumber(complex_number1, complex_number2) {
        let sum_real = complex_number1.real + complex_number2.real
        let sum_img = complex_number1.img + complex_number2.img

        let sum = { real: sum_real, img: sum_img }
        return sum

    }
 
    checkNumberInSet(x, y) {
        const complex_number = { real: x, img: y } //C -> CONST
        let Zn = { real: x, img: y } //Zn = (0 + 0i)² + C = C
        let count = 0
        let distance = 0


        do {
            distance = this.#modulusComplexNumber(Zn)
            if (distance  > 2) 
                return [this.#MAX_ITERATIONS, count, false]

            // f(Z) = Z² + C
            Zn = this.#sumComplexNumber(this.#squareComplexNumber(Zn), complex_number)
            
        } while (++count < this.#MAX_ITERATIONS)

        return [0, 0, true]

    }

}