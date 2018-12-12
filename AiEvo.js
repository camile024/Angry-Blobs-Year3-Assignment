/* No imports! A true de-coupled module in all its glory */

const MAX_VALUE_FORCE = 120;
const MIN_VALUE_FORCE = 0;
const ANGLE_SCALE = 1000;
const ANGLE_SCALE_FITNESS = 100;
const MAX_VALUE_ANGLE = 1.396;
const MIN_VALUE_ANGLE = 0.087;


const POP_SIZE = 20;
const PARENTS_NUMBER = 4;

const MUTATION_SCALE = 8;


export class AiEvo {

    constructor(bestParams, generations) {
        this.generations = generations;
        this.best = bestParams;
        this.learnedParams = [];
        this.forces = [];
        this.angles = [];
        this.fitness = [];
    }

    /*
     * Main function - trains the AI based on optimal solution given to the algorithm and returns the
     * result.
     */
    train() {
        let self = this;

        /* train data for each level separately */
        for (let level = 1; level <= 3; level++) {

            /* First select random parameters within boundaries */
            for (let i = 0; i < POP_SIZE; i++) {
                this.forces[i] = Math.random() * (MAX_VALUE_FORCE - MIN_VALUE_FORCE) + MIN_VALUE_FORCE;
                this.angles[i] = Math.random() * (MAX_VALUE_ANGLE - MIN_VALUE_ANGLE) + MIN_VALUE_ANGLE;
            }

            /* Evaluate initial fitness */
            this.evaluate(level);

            /* Main part - generations */
            for (let generation = 1; generation <= this.generations; generation++) {

                /* Select best indexes - parents */
                let bestIndexes = this.getBest(PARENTS_NUMBER);
                let worstIndexes = this.getWorst(PARENTS_NUMBER);
                let childrenForces = [];
                let childrenAngles = [];


                /* generate children (crossover + mutation) */
                for (let i = 0; i < PARENTS_NUMBER / 2; i++) {
                    /* child 1 crossover */
                    childrenForces[i * 2] = this.forces[bestIndexes[i + 1]];
                    childrenAngles[i * 2] = this.angles[bestIndexes[i]];

                    /* child 2 crossover */
                    childrenForces[i * 2 + 1] = this.forces[bestIndexes[i]];
                    childrenAngles[i * 2 + 1] = this.angles[bestIndexes[i + 1]];

                    /* apply mutation to one of the children (increase/decrease params randomly by a bit) */
                    childrenForces[i * 2] += (Math.random() * ((MAX_VALUE_FORCE / MUTATION_SCALE - MIN_VALUE_FORCE / MUTATION_SCALE) ) + (MIN_VALUE_FORCE / MUTATION_SCALE));
                    childrenForces[i * 2] %= MAX_VALUE_FORCE;
                    childrenAngles[i * 2] += (Math.random() * ((MAX_VALUE_ANGLE / MUTATION_SCALE) - (MIN_VALUE_ANGLE / MUTATION_SCALE)) + (MIN_VALUE_ANGLE / MUTATION_SCALE));
                    childrenAngles[i * 2] %= MAX_VALUE_ANGLE;


                }

                /* replace worst members of the population with new children */
                for (let i = 0; i < PARENTS_NUMBER; i++) {
                    this.forces[worstIndexes[i]] = childrenForces[i];
                    this.angles[worstIndexes[i]] = childrenAngles[i];
                }

                /* Re-evaluate fitness */
                this.evaluate(level);
            }

            /* Get the fittest member's index and extract its parameters to be returned */
            let bestIndex = this.getBest(1);
            this.learnedParams[(level - 1) * 2] = this.forces[bestIndex];
            this.learnedParams[(level - 1) * 2 + 1] = this.angles[bestIndex];
        }

        /* Log the params chosen in the console - for debugging */
        console.log(this.learnedParams);

        return this.learnedParams;

    }

    /*
     * Evaluates the population based on 'optimal' parameters passed into the algorithm.
     * Doesn't differentiate between force and angle separately, so a lower than optimal force and higher than optimal angle can
     * balance out, potentially making the AI think the solution is 'fit', although that rarely happens (esp. when more
     * generations are considered)
     */
    evaluate(level) {
        for(let i = 0; i < POP_SIZE; i++) {
            /* Manhattan distance between forces/angles (best/in population) */
            let fitnessForce = Math.abs(this.best[(level - 1) * 2] - this.forces[i]);
            let fitnessAngle = ANGLE_SCALE_FITNESS * Math.abs(this.best[(level - 1) * 2 + 1] - (this.angles[i])); //scale angle to make it as significant as force
            this.fitness[i] = -(fitnessForce + fitnessAngle); //closer to 0/higher = fitter
        }
    }


    /*
     * Returns N fittest members of the population (as an array of indexes)
     */
    getBest(number) {
        let indexes = [];
        let values = [];
        for (let i = 0; i < number; i++ ) {
            indexes[i] = 0;
            values[i] = Number.MIN_SAFE_INTEGER;
        }
        for (let index = 0; index < POP_SIZE; index++) {
            let minValue = Number.MAX_SAFE_INTEGER;
            let minIndex = 0;
            let replace = false;
            for (let compare = 0; compare < number; compare++) {
                /* If our fitness is better than currently stored item */
                if (this.fitness[index] > values[compare]) {
                    /* Check if the item is also the smallest in array */
                    if (values[compare] <= minValue) {
                        /* if it is - mark it for replacement */
                        minIndex = compare;
                        minValue = values[compare];
                        replace = true;
                    }

                }
            }
            /* If an item was marked for replacement - replace */
            if (replace == true) {
                indexes[minIndex] = index;
                values[minIndex] = this.fitness[index];
            }
        }
        return indexes;
    }


    /*
     * Returns N least fit members of the population (as an array of indexes)
     */
    getWorst(number) {
        let indexes = [];
        let values = [];
        for (let i = 0; i < number; i++ ) {
            indexes[i] = 0;
            values[i] = Number.MAX_SAFE_INTEGER;
        }
        for (let index = 0; index < POP_SIZE; index++) {
            let maxValue = Number.MIN_SAFE_INTEGER;
            let maxIndex = 0;
            let replace = false;
            for (let compare = 0; compare < number; compare++) {
                /* If our fitness is worse than currently stored item */
                if (this.fitness[index] < values[compare]) {
                    /* Check if the item is also the biggest in array */
                    if (values[compare] >= maxValue) {
                        /* if it is - mark it for replacement */
                        maxIndex = compare;
                        maxValue = values[compare];
                        replace = true;
                    }

                }
            }
            /* If an item was marked for replacement - replace */
            if (replace == true) {
                indexes[maxIndex] = index;
                values[maxIndex] = this.fitness[index];
            }
        }
        return indexes;
    }


} /* End of class */
